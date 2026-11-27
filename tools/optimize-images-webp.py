#!/usr/bin/env python3
"""Create responsive WebP derivatives and optionally add srcset to static HTML.

The source images are never overwritten. By default this script only reports what
it would do; pass --write to create WebP files and --write-html to update <img>
tags after the variants exist.

Requirements:
    python -m pip install Pillow

Examples:
    python tools/optimize-images-webp.py --dry-run
    python tools/optimize-images-webp.py --write
    python tools/optimize-images-webp.py --write --write-html
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path
from typing import Iterable

try:
    from PIL import Image, ImageFile, ImageOps
except ImportError:
    print("Pillow is required. Install it with: python -m pip install Pillow", file=sys.stderr)
    raise SystemExit(2)

ImageFile.LOAD_TRUNCATED_IMAGES = True

IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}
DEFAULT_WIDTHS = (480, 768, 1200, 1600)
IMG_TAG_RE = re.compile(r"<img\b[^>]*>", re.IGNORECASE)
SRC_ATTR_RE = re.compile(r"(\bsrc\s*=\s*)([\"'])([^\"']+)(\2)", re.IGNORECASE)
DATA_SRC_ATTR_RE = re.compile(r"(\bdata-src\s*=\s*)([\"'])([^\"']+)(\2)", re.IGNORECASE)
LIGHTBOX_SRC_ATTR_RE = re.compile(r"(\bdata-lightbox-src\s*=\s*)([\"'])([^\"']+)(\2)", re.IGNORECASE)
SRCSET_ATTR_RE = re.compile(r"\s+srcset\s*=\s*([\"']).*?\1", re.IGNORECASE | re.DOTALL)
SIZES_ATTR_RE = re.compile(r"\s+sizes\s*=\s*([\"']).*?\1", re.IGNORECASE | re.DOTALL)
ASSET_PATH_RE = re.compile(r"(?:^|/)(assets/images/[^?#]+)", re.IGNORECASE)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-root", type=Path, default=Path("assets/images"))
    parser.add_argument("--output-root", type=Path, default=Path("assets/images/optimized-webp"))
    parser.add_argument("--html-root", type=Path, default=Path("."))
    parser.add_argument("--min-bytes", type=int, default=512 * 1024,
                        help="Only process PNG/JPEG files at or above this size (default: 524288).")
    parser.add_argument("--widths", type=int, nargs="+", default=list(DEFAULT_WIDTHS),
                        help="Responsive widths to generate, in pixels.")
    parser.add_argument("--quality", type=int, default=82, choices=range(50, 96), metavar="50-95")
    parser.add_argument("--dry-run", action="store_true",
                        help="Report matching files without writing WebP files or HTML.")
    parser.add_argument("--write", action="store_true", help="Write WebP files. Without this, run as a dry run.")
    parser.add_argument("--write-html", action="store_true",
                        help="Update static HTML <img> tags with WebP src and responsive srcset.")
    parser.add_argument("--force", action="store_true", help="Regenerate existing WebP files.")
    return parser.parse_args()


def candidate_images(source_root: Path, output_root: Path, min_bytes: int) -> Iterable[Path]:
    for path in sorted(source_root.rglob("*")):
        if path.is_file() and output_root not in path.parents and path.suffix.lower() in IMAGE_EXTENSIONS and path.stat().st_size >= min_bytes:
            yield path


def output_path(source: Path, source_root: Path, output_root: Path, width: int) -> Path:
    relative = source.relative_to(source_root)
    source_format = relative.suffix.lower().lstrip(".")
    return output_root / relative.parent / f"{relative.stem}-{source_format}-{width}.webp"


def webp_url(path: Path, project_root: Path) -> str:
    # Site URLs are root-relative and always use forward slashes.
    return "/" + path.relative_to(project_root).as_posix()


def build_srcset(source: Path, source_root: Path, output_root: Path, widths: list[int], actual_width: int) -> list[tuple[int, Path]]:
    selected = [(width, output_path(source, source_root, output_root, width))
                for width in sorted(set(widths)) if width < actual_width]
    selected.append((actual_width, output_path(source, source_root, output_root, actual_width)))
    return selected


def create_variants(source: Path, source_root: Path, output_root: Path, widths: list[int], quality: int, force: bool) -> tuple[list[tuple[int, Path]], int, int]:
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        original_width, original_height = image.size
        selected_widths = sorted({min(width, original_width) for width in widths if width > 0})
        variants: list[tuple[int, Path]] = []
        for width in selected_widths:
            destination = output_path(source, source_root, output_root, width)
            destination.parent.mkdir(parents=True, exist_ok=True)
            variants.append((width, destination))
            if destination.exists() and not force:
                continue
            resized = image.copy()
            if resized.width != width:
                height = round(resized.height * width / resized.width)
                resized = resized.resize((width, height), Image.Resampling.LANCZOS)
            save_image = resized
            if save_image.mode not in ("RGB", "RGBA"):
                save_image = save_image.convert("RGBA" if "A" in save_image.getbands() else "RGB")
            save_image.save(destination, "WEBP", quality=quality, method=6)
            resized.close()
        return variants, original_width, original_height


def asset_key(url: str) -> str | None:
    match = ASSET_PATH_RE.search(url.split("?", 1)[0].split("#", 1)[0].replace("\\", "/"))
    return match.group(1) if match else None


def update_img_tag(tag: str, replacements: dict[str, tuple[str, str]]) -> str:
    source_match = SRC_ATTR_RE.search(tag)
    data_source_match = DATA_SRC_ATTR_RE.search(tag)
    source_key = asset_key(source_match.group(3)) if source_match else None
    data_source_key = asset_key(data_source_match.group(3)) if data_source_match else None
    if source_key not in replacements and data_source_key not in replacements:
        return tag
    new_tag = tag
    if source_key in replacements:
        primary_url, srcset = replacements[source_key]
        new_tag = SRC_ATTR_RE.sub(lambda m: f"{m.group(1)}{m.group(2)}{primary_url}{m.group(4)}", new_tag, count=1)
    else:
        srcset = ""
    if data_source_key in replacements:
        data_primary_url = replacements[data_source_key][0]
        new_tag = DATA_SRC_ATTR_RE.sub(lambda m: f"{m.group(1)}{m.group(2)}{data_primary_url}{m.group(4)}", new_tag, count=1)
    if source_key not in replacements:
        return new_tag
    new_tag = SRCSET_ATTR_RE.sub("", new_tag, count=1)
    new_tag = SIZES_ATTR_RE.sub("", new_tag, count=1)
    insertion = f' srcset="{srcset}" sizes="(max-width: 700px) 92vw, (max-width: 1200px) 50vw, 1200px"'
    return new_tag[:-1] + insertion + ">"


def add_intrinsic_dimensions(tag: str, html_root: Path) -> str:
    source_match = SRC_ATTR_RE.search(tag)
    if not source_match:
        return tag
    key = asset_key(source_match.group(3))
    if not key or not key.lower().endswith((".png", ".jpg", ".jpeg", ".webp")):
        return tag
    image_path = html_root / key
    if not image_path.exists():
        return tag
    try:
        with Image.open(image_path) as image:
            width, height = image.size
    except Exception:
        return tag
    additions = ""
    if not re.search(r"\bwidth\s*=", tag, re.IGNORECASE):
        additions += f' width="{width}"'
    if not re.search(r"\bheight\s*=", tag, re.IGNORECASE):
        additions += f' height="{height}"'
    return tag[:-1] + additions + ">" if additions else tag


def update_html(html_root: Path, replacements: dict[str, tuple[str, str]]) -> int:
    changed_files = 0
    for html_path in sorted(html_root.rglob("*.html")):
        original = html_path.read_text(encoding="utf-8")
        updated = IMG_TAG_RE.sub(lambda match: add_intrinsic_dimensions(update_img_tag(match.group(0), replacements), html_root), original)
        def replace_gallery_source(match: re.Match[str]) -> str:
            key = asset_key(match.group(3))
            if key not in replacements:
                return match.group(0)
            primary_url = replacements[key][0]
            return f"{match.group(1)}{match.group(2)}{primary_url}{match.group(4)}"
        updated = DATA_SRC_ATTR_RE.sub(replace_gallery_source, updated)
        updated = LIGHTBOX_SRC_ATTR_RE.sub(replace_gallery_source, updated)
        if updated != original:
            html_path.write_text(updated, encoding="utf-8", newline="\n")
            changed_files += 1
            print(f"HTML updated: {html_path}")
    return changed_files


def main() -> int:
    args = parse_args()
    source_root = args.source_root.resolve()
    output_root = args.output_root.resolve()
    html_root = args.html_root.resolve()
    widths = sorted(set(args.widths))
    if not source_root.exists():
        print(f"Source directory not found: {source_root}", file=sys.stderr)
        return 1
    if args.write_html and not args.write:
        print("--write-html requires --write so the referenced variants exist.", file=sys.stderr)
        return 2

    replacements: dict[str, tuple[str, str]] = {}
    total_before = 0
    total_after = 0
    processed = 0

    for source in candidate_images(source_root, output_root, args.min_bytes):
        total_before += source.stat().st_size
        with Image.open(source) as opened:
            actual_width = ImageOps.exif_transpose(opened).width
        variants = build_srcset(source, source_root, output_root, widths, actual_width)
        if args.write:
            variants, _, _ = create_variants(source, source_root, output_root, widths, args.quality, args.force)
        else:
            print(f"DRY RUN: {source} -> {', '.join(str(path) for _, path in variants)}")
        if args.write:
            total_after += sum(path.stat().st_size for _, path in variants if path.exists())
        _, primary_path = variants[-1]
        source_key = source.relative_to(html_root).as_posix().replace("\\", "/")
        primary_url = webp_url(primary_path, html_root)
        srcset = ", ".join(f"{webp_url(path, html_root)} {width}w" for width, path in variants)
        replacements[source_key] = (primary_url, srcset)
        processed += 1

    if args.write_html:
        changed = update_html(html_root, replacements)
        print(f"Updated {changed} HTML file(s).")

    if processed == 0:
        print("No PNG/JPEG files matched the threshold.")
    elif args.write:
        saved = 100 * (1 - total_after / total_before) if total_before else 0
        print(f"Processed {processed} image(s). Source bytes: {total_before:,}; WebP bytes: {total_after:,}; estimated reduction: {saved:.1f}%.")
    else:
        print(f"Dry run found {processed} image(s). Re-run with --write to create variants.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

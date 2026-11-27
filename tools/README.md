# Site maintenance tools

## Image optimization

`optimize-images.ps1` creates JPEG derivatives for oversized PNG and JPEG
assets. It preserves every original and writes output to
`assets/images/optimized/`.

The default threshold is 1 MB, the maximum output width is 2400 pixels, and
JPEG quality is 82. Review the generated files visually before updating any
HTML references. The script is intentionally conservative: it does not delete
assets or rewrite page markup automatically.

Example:

```powershell
pwsh -File tools/optimize-images.ps1
```

## Responsive WebP optimization

`optimize-images-webp.py` creates responsive WebP variants for raster assets
(PNG, JPEG and existing WebP) under `assets/images`. It preserves the originals
and writes variants to
`assets/images/optimized-webp/` using 480, 768, 1200 and 1600 pixel widths by
default. It uses Pillow and does not require the existing PowerShell optimizer.
Generated filenames include the source format (for example,
`idera-home-png-1600.webp`) so same-named PNG, JPEG and WebP files cannot
overwrite one another.

Install the one Python dependency if needed:

```powershell
python -m pip install Pillow
```

Run a report without writing files:

```powershell
python tools/optimize-images-webp.py --dry-run
```

Generate the WebP variants, leaving HTML unchanged:

```powershell
python tools/optimize-images-webp.py --write
```

After reviewing the generated images, explicitly update matching static `<img>`
tags with a WebP `src` plus responsive `srcset` and `sizes` attributes:

```powershell
python tools/optimize-images-webp.py --write --write-html
```

The HTML rewrite targets matching `<img>` tags and gallery `data-src` or
`data-lightbox-src` attributes under `/assets/images/`. It adds responsive
`srcset` only to visible `<img>` tags. It does not change CSS backgrounds,
social-preview metadata, tiny technology icons under `assets/icons/`, remote
image URLs or original image files. Use `--min-bytes 0` for a complete raster
pass, and `--force` to regenerate existing variants after changing quality or
widths. The HTML pass also adds intrinsic `width` and `height` to local raster
`<img>` tags when those attributes are missing.

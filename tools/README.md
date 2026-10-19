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

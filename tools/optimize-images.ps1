<#
.SYNOPSIS
  Creates smaller JPEG derivatives for oversized raster images.

.DESCRIPTION
  Originals are never modified or deleted. The script only processes images
  larger than MinBytes and writes derivatives to assets/images/optimized by
  default. Review the generated files before changing page references.

.EXAMPLE
  pwsh -File tools/optimize-images.ps1
  pwsh -File tools/optimize-images.ps1 -MinBytes 500KB -MaxWidth 1800 -Quality 82
#>

[CmdletBinding()]
param(
  [int64]$MinBytes = 1MB,
  [int]$MaxWidth = 2400,
  [ValidateRange(50, 95)]
  [int]$Quality = 82,
  [string]$SourceRoot = 'assets\images',
  [string]$OutputRoot = 'assets\images\optimized'
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

New-Item -ItemType Directory -Force -Path $OutputRoot | Out-Null
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq 'image/jpeg' } |
  Select-Object -First 1
$qualityEncoder = New-Object System.Drawing.Imaging.EncoderParameters(1)
$qualityEncoder.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality, [int64]$Quality)

$files = Get-ChildItem -LiteralPath $SourceRoot -File |
  Where-Object { $_.Length -ge $MinBytes -and $_.Extension -match '^\.(png|jpe?g)$' }

if (-not $files) {
  Write-Output "No PNG/JPEG files at least $MinBytes bytes were found."
  exit 0
}

foreach ($file in $files) {
  $source = $null
  $bitmap = $null
  $canvas = $null
  try {
    $source = [System.Drawing.Image]::FromFile($file.FullName)
    $targetWidth = [Math]::Min($source.Width, $MaxWidth)
    $targetHeight = [Math]::Round($source.Height * ($targetWidth / [double]$source.Width))
    $sourceType = $file.Extension.TrimStart('.').ToLowerInvariant()
    $outputName = [IO.Path]::GetFileNameWithoutExtension($file.Name) + '.' + $sourceType + '.optimized.jpg'
    $outputPath = Join-Path $OutputRoot $outputName

    $canvas = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
    $canvas.SetResolution(96, 96)
    $graphics = [System.Drawing.Graphics]::FromImage($canvas)
    try {
      $graphics.Clear([System.Drawing.Color]::White)
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $graphics.DrawImage($source, 0, 0, $targetWidth, $targetHeight)
    } finally {
      $graphics.Dispose()
    }
    $canvas.Save($outputPath, $jpegCodec, $qualityEncoder)
    $saved = [Math]::Round((1 - ((Get-Item $outputPath).Length / [double]$file.Length)) * 100, 1)
    Write-Output ("{0}: {1}x{2}, {3}% smaller -> {4}" -f $file.Name, $targetWidth, $targetHeight, $saved, $outputName)
  } finally {
    if ($canvas) { $canvas.Dispose() }
    if ($source) { $source.Dispose() }
  }
}

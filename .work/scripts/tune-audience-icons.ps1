$files = @('service/business-website-design.html','service/business-website-design-in-nigeria.html')
$root = Get-Location
foreach ($f in $files) {
  $p = Join-Path $root $f
  $c = [IO.File]::ReadAllText($p, [Text.UTF8Encoding]::new($false))
  $c = $c.Replace('.bw-fit-icon{display:grid;place-items:center;width:38px;height:38px;margin-bottom:22px;border-radius:11px;background:#7355a7;color:#fff}', '.bw-fit-icon{display:grid;place-items:center;width:30px;height:30px;margin-bottom:20px;border:1px solid #cfc2df;border-radius:8px;background:#f3eef8;color:#7355a7;flex:none}')
  $c = $c.Replace('.bw-fit-icon svg{width:21px;height:21px}', '.bw-fit-icon svg{width:16px;height:16px}')
  [IO.File]::WriteAllText($p, $c, [Text.UTF8Encoding]::new($false))
}
Write-Output 'Reduced audience-card icon size and visual weight.'

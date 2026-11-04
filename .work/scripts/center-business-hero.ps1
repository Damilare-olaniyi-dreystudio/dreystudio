$source = 'service/business-website-design.html'
$copy = 'service/business-website-design-in-nigeria.html'
$root = Get-Location
$c = [IO.File]::ReadAllText((Join-Path $root $source), [Text.UTF8Encoding]::new($false))
$css = @'
    @media(min-width:901px){
      .bw-hero{padding:118px 0 150px;text-align:center}
      .bw-breadcrumb{display:flex;justify-content:center;align-items:center;gap:5px;margin-bottom:54px}
      .bw-hero-grid{display:block}
      .bw-hero-grid>div:first-child{max-width:1040px;margin:0 auto}
      .bw-hero .bw-kicker{display:table;margin:0 auto 24px;padding:11px 20px;border:1px solid var(--bw-line);border-radius:999px;background:rgba(255,255,255,.06)}
      .bw-hero .bw-h1{max-width:980px;margin:0 auto;letter-spacing:-.075em}
      .bw-hero .bw-lede{max-width:760px;margin:28px auto 0}
      .bw-hero .bw-actions{justify-content:center;margin-top:38px}
      .bw-hero-aside{max-width:680px;margin:62px auto 0;padding:24px 28px 0;border:0;border-top:2px solid var(--bw-lav);font-size:16px}
      .bw-hero-proof{justify-content:center;gap:64px;margin-top:72px}
      .bw-dashboard{width:min(840px,100%);margin:78px auto 0}
    }
'@
if ($c -notmatch '@media\(min-width:901px\)') { $c = $c.Replace('  </style>', $css + '  </style>') }
[IO.File]::WriteAllText((Join-Path $root $source), $c, [Text.UTF8Encoding]::new($false))
Copy-Item (Join-Path $root $source) (Join-Path $root $copy) -Force
Write-Output 'Applied and synchronized centered desktop hero layout.'

$root = 'C:\Users\PC\Downloads\dreystudio-main'
$names = @('business-website-design.html','business-website-design-in-nigeria.html')
foreach ($name in $names) {
  $path = Join-Path $root ('service\' + $name)
  $text = Get-Content -Raw -LiteralPath $path
  $text = $text.Replace('â†—','&#8599;')
  $text = $text.Replace('â†“','&#8595;')
  $text = $text.Replace('â‚¦','&#8358;')
  $text = $text.Replace('âˆ’','&#8722;')
  $text = $text.Replace('â€™','&#8217;')
  $text = $text.Replace('âœ“','')
  $text = $text.Replace('Business Website Design & Development in Nigeria','Business Website Design &amp; Development in Nigeria')
  $text = $text.Replace('<a class="bw-btn primary" href="/book-consultation" data-ga-cta="true" data-ga-location="business_website_hero">Book a consultation <span class="arrow">&#8599;</span></a>', '<a class="bw-btn primary" href="/book-consultation" data-ga-cta="true" data-ga-location="business_website_hero">Book a consultation</a>')
  $text = $text.Replace('<a class="bw-btn dark" href="/book-consultation" data-ga-cta="true" data-ga-location="business_website_final">Book a consultation <span class="arrow">&#8599;</span></a>', '<a class="bw-btn dark" href="/book-consultation" data-ga-cta="true" data-ga-location="business_website_final">Book a consultation</a>')
  $text = $text.Replace('href="#bw-work">See selected work', 'href="#bw-work">View selected work')
  $text = $text.Replace('<span class="bw-check"></span>', '<span class="bw-check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="m8 12.2 2.5 2.5 5.5-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span>')
  $text = $text.Replace('<span class="bw-check"> </span>', '<span class="bw-check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="m8 12.2 2.5 2.5 5.5-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span>')
  Set-Content -LiteralPath $path -Value $text -Encoding utf8
}
Write-Output 'REPAIRED'

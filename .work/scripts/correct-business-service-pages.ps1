$source = 'service/business-website-design.html'
$copy = 'service/business-website-design-in-nigeria.html'
$root = Get-Location
$c = [IO.File]::ReadAllText((Join-Path $root $source), [Text.UTF8Encoding]::new($false))

$c = $c.Replace('Business websites designed to make your business <span>easier to choose.</span>', 'Business Website Developer and Designer in Nigeria')
$c = [regex]::Replace($c, '(?s)(<section class="bw-hero">.*?<p class="bw-lede">).*?(</p>)', '$1Drey Studio designs and develops responsive business websites for companies, professionals and growing brands in Nigeria. Projects can include clear service pages, UI/UX design, responsive development and SEO-ready foundations. Business websites start from &#8358;200,000, with the final scope confirmed after consultation.$2', 1)

$badNaira = ([char]0x00E2) + ([char]0x201A) + ([char]0x00A6)
$badArrow = ([char]0x00E2) + ([char]0x2020) + ([char]0x2014)
$badDown = ([char]0x00E2) + ([char]0x2020) + ([char]0x201C)
$badMinus = ([char]0x00E2) + ([char]0x02C6) + ([char]0x2019)
$badCheck = ([char]0x00E2) + ([char]0x0153) + ([char]0x201C)
$badApos = ([char]0x00E2) + ([char]0x20AC) + ([char]0x2122)
$c = $c.Replace($badNaira, '&#8358;').Replace($badArrow, '&#8594;').Replace($badDown, '&#8595;').Replace($badMinus, '&#8722;').Replace($badCheck, '&#10003;').Replace($badApos, '&#8217;')

$c = [regex]::Replace($c, '<span class="arrow">.*?</span>', '')
$c = $c.Replace('View all work </a>', 'View all work <span class="arrow" aria-hidden="true">&#8594;</span></a>')
$c = [regex]::Replace($c, '<span class="bw-check">.*?</span>', '<span class="bw-check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m5 12 4 4L19 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>')

$newFaq = @'
<div class="bw-faq-item"><button type="button" aria-expanded="false" aria-controls="bw-faq-a5" id="bw-faq-q5"><span>How much does a business website cost?</span><span class="bw-faq-icon">+</span></button><div class="bw-faq-answer" id="bw-faq-a5" role="region" aria-labelledby="bw-faq-q5" hidden>Business website projects start from &#8358;200,000. The final price depends on page count, content depth, integrations, ecommerce or other functionality, and the level of strategy required.</div></div><div class="bw-faq-item"><button type="button" aria-expanded="false" aria-controls="bw-faq-a6" id="bw-faq-q6"><span>What pages should a business website include?</span><span class="bw-faq-icon">+</span></button><div class="bw-faq-answer" id="bw-faq-a6" role="region" aria-labelledby="bw-faq-q6" hidden>Most businesses need a focused homepage, clear service or product pages, an about or credibility section, selected work or proof and a contact route. The exact structure is planned around the business and its customers.</div></div><div class="bw-faq-item"><button type="button" aria-expanded="false" aria-controls="bw-faq-a7" id="bw-faq-q7"><span>Can I update the website after it launches?</span><span class="bw-faq-icon">+</span></button><div class="bw-faq-answer" id="bw-faq-a7" role="region" aria-labelledby="bw-faq-q7" hidden>Drey Studio will explain the agreed handoff and support arrangement before launch. Content updates can be handled according to the platform and scope selected for the project.</div></div><div class="bw-faq-item"><button type="button" aria-expanded="false" aria-controls="bw-faq-a8" id="bw-faq-q8"><span>Can you help with hosting and a domain?</span><span class="bw-faq-icon">+</span></button><div class="bw-faq-answer" id="bw-faq-a8" role="region" aria-labelledby="bw-faq-q8" hidden>We can discuss hosting and domain requirements during consultation and work with your existing provider or the setup agreed for the project.</div></div>
'@
$pattern = '(?s)(<div class="bw-faq"[^>]*>.*?)(</div></div></section>)'
if ($c -notmatch 'bw-faq-a8') { $c = [regex]::Replace($c, $pattern, { param($m) $m.Groups[1].Value + $newFaq + $m.Groups[2].Value }, 1) }

$schema = @'
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How long does a business website take?","acceptedAnswer":{"@type":"Answer","text":"The timeline depends on the size and complexity of the project. Most business websites are completed within a few weeks once the content, requirements and project details are available."}},{"@type":"Question","name":"Can you redesign our existing website?","acceptedAnswer":{"@type":"Answer","text":"Yes. A redesign can improve the visual system, content hierarchy, mobile experience, performance and conversion path without assuming the whole business needs to start again."}},{"@type":"Question","name":"What do you need before we begin?","acceptedAnswer":{"@type":"Answer","text":"We need to understand your business, audience, goals, content, preferred direction and any features or integrations the website must support."}},{"@type":"Question","name":"How much does a business website cost?","acceptedAnswer":{"@type":"Answer","text":"Business website projects start from NGN 200,000. The final price depends on page count, content depth, integrations, ecommerce or other functionality, and the level of strategy required."}},{"@type":"Question","name":"What pages should a business website include?","acceptedAnswer":{"@type":"Answer","text":"Most businesses need a focused homepage, clear service or product pages, an about or credibility section, selected work or proof and a contact route. The exact structure is planned around the business and its customers."}},{"@type":"Question","name":"Can I update the website after it launches?","acceptedAnswer":{"@type":"Answer","text":"Drey Studio will explain the agreed handoff and support arrangement before launch. Content updates can be handled according to the platform and scope selected for the project."}},{"@type":"Question","name":"Can you help with hosting and a domain?","acceptedAnswer":{"@type":"Answer","text":"We can discuss hosting and domain requirements during consultation and work with your existing provider or the setup agreed for the project."}}]}</script>
'@
if ($c -notmatch '"@type":"FAQPage"') { $c = $c.Replace('</head>', $schema + '</head>') }

[IO.File]::WriteAllText((Join-Path $root $source), $c, [Text.UTF8Encoding]::new($false))
Copy-Item (Join-Path $root $source) (Join-Path $root $copy) -Force
Write-Output 'Updated and synchronized both service-page drafts.'

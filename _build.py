# -*- coding: utf-8 -*-
"""
Assemble the Bilt Studio landing page and the room planner into one
deployable static site.

  site/
    index.html          landing (assets unpacked from the artifact bundle)
    assets/             images, video, self-hosted woff2, js
    roomplanner/        the app
    _headers            Netlify caching
    netlify.toml
    vercel.json
"""
import re, json, glob, os, gzip, base64, shutil, io

ROOT = r"C:\Users\WIN10\Desktop\CLAUDE STORAGE"
TOOL = os.path.join(ROOT, r".claude\projects\C--Users-WIN10-Desktop-CLAUDE-STORAGE\08d39735-51f4-48d2-8f62-f619d30c39ed\tool-results")
TOOL = r"C:\Users\WIN10\.claude\projects\C--Users-WIN10-Desktop-CLAUDE-STORAGE\08d39735-51f4-48d2-8f62-f619d30c39ed\tool-results"
APP = os.path.join(ROOT, "cabinetry-shop")
SITE = os.path.join(ROOT, "site")

EXT = {
    'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp',
    'image/svg+xml': '.svg', 'video/mp4': '.mp4', 'font/woff2': '.woff2',
    'text/javascript': '.js', 'text/css': '.css',
}

FAVICON = ("<link rel=\"icon\" href=\"data:image/svg+xml,"
           "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>"
           "<rect width='32' height='32' fill='%2316130F'/>"
           "<path d='M8 8h9a5 5 0 0 1 0 10H8zM8 18h10a5 5 0 0 1 0 10H8z' "
           "fill='none' stroke='%238A5E3A' stroke-width='2.6'/></svg>\">")

src = sorted(glob.glob(os.path.join(TOOL, 'artifact-0f93b548-*.html')), key=os.path.getmtime)[-1]
raw = open(src, encoding='utf-8', errors='replace').read()
manifest = json.loads(re.search(r'<script type="__bundler/manifest">(.*?)</script>', raw, re.S).group(1))
template = json.loads(re.search(r'<script type="__bundler/template">(.*?)</script>', raw, re.S).group(1))
extres_m = re.search(r'<script type="__bundler/ext_resources">(.*?)</script>', raw, re.S)
ext_resources = json.loads(extres_m.group(1)) if extres_m else []

# ---------- output tree ----------
# Deliberately NOT rmtree: a running preview server holds a handle on
# site/roomplanner, and a partial delete leaves the site broken.
os.makedirs(os.path.join(SITE, 'assets'), exist_ok=True)
for f in glob.glob(os.path.join(SITE, 'assets', '*')):
    os.remove(f)

# ---------- unpack every asset to a real file ----------
uuid_to_path = {}
for uuid, entry in manifest.items():
    data = base64.b64decode(entry['data'])
    if entry.get('compressed'):
        data = gzip.decompress(data)
    ext = EXT.get(entry['mime'], '.bin')
    name = f"{uuid[:8]}{ext}"
    with open(os.path.join(SITE, 'assets', name), 'wb') as fh:
        fh.write(data)
    uuid_to_path[uuid] = f"assets/{name}"

print(f"unpacked {len(uuid_to_path)} assets")

# ---------- rewrite uuid references to real paths ----------
html = template
for uuid, path in uuid_to_path.items():
    html = html.replace(uuid, path)

# the bundler injected a resource map some inline scripts read
if ext_resources:
    rmap = {e['id']: uuid_to_path[e['uuid']] for e in ext_resources if e['uuid'] in uuid_to_path}
    inject = '<script>window.__resources = ' + json.dumps(rmap).replace('</', '<\\/') + ';</script>'
    m = re.search(r'<head[^>]*>', html, re.I)
    html = html[:m.end()] + inject + html[m.end():]
    print(f"injected resource map with {len(rmap)} entries")

# ---------- point the CTAs at the planner on this same domain ----------
# Deep-link to the planner route, not the app's default catalogue — the
# buttons say "Open the planner", so that is where they must land.
before = html.count('https://app.biltstudio.com.au')
html = html.replace('https://app.biltstudio.com.au', '/roomplanner/#/plan')
print(f"rewrote {before} planner links -> /roomplanner/#/plan")

# ---------- strip the design-tool branding badge ----------
# The bundle ships a fixed-position "Made with Claude Design" pill. This is
# a commercial site, so it goes. Balanced-tag removal rather than a regex,
# because the block contains nested <div>s.
def strip_block(doc, marker):
    i = doc.find(marker)
    if i < 0:
        return doc, False
    start = doc.rfind('<div', 0, i + len(marker))
    depth, j = 0, start
    while j < len(doc):
        nd, cd = doc.find('<div', j), doc.find('</div>', j)
        if cd < 0:
            break
        if 0 <= nd < cd:
            depth += 1
            j = nd + 4
        else:
            depth -= 1
            j = cd + 6
            if depth == 0:
                return doc[:start] + doc[j:], True
    return doc, False

html, removed = strip_block(html, 'id="__claude_design_branding"')
print('removed design badge' if removed else 'no design badge found')

# ---------- swap in the redesigned hero ----------
# The bundle's own hero is replaced wholesale by site/hero.html, and the
# hero's stylesheet + script are linked. Doing it here rather than by
# hand-editing index.html means a rebuild never loses the new hero.
def replace_section(doc, section_id, replacement):
    open_tag = f'<section id="{section_id}"'
    i = doc.find(open_tag)
    if i < 0:
        return doc, False
    depth, j = 0, i
    while j < len(doc):
        ns, cs = doc.find('<section', j), doc.find('</section>', j)
        if cs < 0:
            break
        if 0 <= ns < cs:
            depth += 1
            j = ns + 8
        else:
            depth -= 1
            j = cs + 10
            if depth == 0:
                return doc[:i] + replacement + doc[j:], True
    return doc, False

hero_path = os.path.join(SITE, 'hero.html')
if os.path.exists(hero_path):
    hero_markup = open(hero_path, encoding='utf-8').read()
    html, swapped = replace_section(html, 'bl-top', hero_markup)
    print('replaced hero' if swapped else 'WARNING: #bl-top not found, hero not replaced')

    # The page controller binds the OLD hero's film to #bl-video / #bl-cap.
    # Those IDs left with the old hero, so that block now throws inside
    # componentDidMount and takes everything after it down with it — the
    # live price demo and every [data-rev] reveal on the page (count drifts
    # as sections are added; don't rely on an exact number here). Excise
    # just that block; the new hero does its own scrubbing in js/hero.js.
    start = html.find('// scroll-scrubbed hero film')
    end = html.find('// live price demo', start) if start >= 0 else -1
    if start >= 0 and end > start:
        html = html[:start] + html[end:]
        print('excised the old hero film block from the page controller')
    else:
        print('WARNING: old hero film block not found — check the controller still runs')

    head_m = re.search(r'<head[^>]*>', html, re.I)
    html = (html[:head_m.end()]
            + '<link rel="stylesheet" href="css/hero.css">'
            + html[head_m.end():])
    html = html.replace('</body>', '<script src="js/hero.js" defer></script></body>')
    print('linked css/hero.css + js/hero.js')

# ---------- customer reviews ----------
# Real Facebook reviews, kept in _reviews.html so the copy can be edited
# without touching build logic. They sit directly after "Come and see it"
# because every one of them is about making that drive -- they are proof
# for the exact action that section asks for.
rv = open(os.path.join(SITE, '_reviews.html'), encoding='utf-8').read()

_vis = html.find('id="bl-visit"')
assert _vis > 0, 'bl-visit section not found -- cannot place reviews'
_end = html.find('</section>', _vis) + len('</section>')
html = html[:_end] + chr(10) + rv + html[_end:]

# Renumber every eyebrow by document order. A count-limited replace would
# have hit the NEW 07 first, since it now precedes the old one.
_n = [0]
def _seq(m):
    _n[0] += 1
    return '<span>%02d / %s</span>' % (_n[0], m.group(2))
html = re.sub(r'<span>(\d{2}) / ([^<]*)</span>', _seq, html)
print('injected reviews after bl-visit; renumbered %d section eyebrows' % _n[0])

# ---------- confirmed product data (owner, 19 Aug 2026) ----------
# Replaces the [PLACEHOLDER] tokens with real figures. Hinges/runners are
# Blum -- already the sourced brand in cabinetry-shop/js/data.js (CLIP top
# BLUMOTION hinges, TANDEMBOX antaro runners), not a guess. Benchtop is
# quartz/granite standard with marble as a paid upgrade -- no timber, no
# laminate, per the owner's call. Lead time is a genuine 8-12 week range.
def _fill(marker, value, count=1):
    global html
    n = html.count(marker)
    assert n >= count, 'expected >=%d of %r, found %d' % (count, marker[:40], n)
    for _ in range(count):
        html = html.replace(marker, value, 1)

# range: size (mm) then price, tile by tile, in document order
_fill('[SIZE]', '2400', 1)   # Compact
_fill('[PRICE]', '4,590', 1)
_fill('[SIZE]', '2700', 1)   # Granny flat
_fill('[PRICE]', '5,500', 1)
_fill('[SIZE]', '3000', 1)   # Tiny home
_fill('[PRICE]', '7,500', 1)

# hardware -- Blum, confirmed sourced brand
_fill('[BRAND]', 'Blum', 2)                       # "Hinges ..." / "Runners ..." labels
_fill('[HINGE + RUNNER BRAND]', 'Blum CLIP top BLUMOTION hinges, Blum TANDEMBOX antaro runners', 1)

# benchtop -- stone only, marble as the upgrade, no timber/laminate
_fill('[STONE / LAMINATE OPTIONS]', 'Quartz &amp; granite standard, marble available as an upgrade', 1)

# lead time -- genuine 8-12 week range (all three occurrences of [LEAD])
_fill('[LEAD]', '8&ndash;12', 3)
_fill('[LEAD TIME]', '8&ndash;12', 1)

# "Lead time, not twelve" implied BILT beats a 12-week wait outright --
# no longer true at the top of an 8-12 week range, so the claim is fixed
# to what's actually being promised: a bounded number, not an open-ended one.
html = html.replace('Lead time, not twelve', 'Lead time, not open-ended', 1)

print('filled range sizes/prices, Blum hardware, benchtop options, 8-12wk lead time')

# ---------- cut the pre-planner stats strip + audience fork ----------
# Phase-1 blueprint (3b, 3e): no page-level fork before the visitor has
# seen the product (Trade already has its own nav link); stats should not
# stand alone as an unproven claims wall right after the hero -- they get
# folded into the planner section, right under the thing that proves them.
def _cut_div(doc, open_tag_text):
    """Cut one <div ...>...</div> found by its exact opening-tag text,
    balancing nested divs forward from that point (unlike a marker search
    backward, this can't accidentally anchor on a nested child div)."""
    start = doc.find(open_tag_text)
    assert start >= 0, 'open tag not found: %r' % open_tag_text[:60]
    j = doc.find('>', start) + 1
    depth = 1
    while depth > 0:
        nd, cd = doc.find('<div', j), doc.find('</div>', j)
        assert cd >= 0, 'unbalanced div'
        if 0 <= nd < cd:
            depth += 1; j = nd + 4
        else:
            depth -= 1; j = cd + 6
    return doc[:start] + doc[j:], doc[start:j]

html, sec_stats = _cut_div(html,
    '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(11rem,1fr));'
    'gap:1px;background:rgba(141,150,152,.22);border-bottom:1px solid rgba(141,150,152,.22)">')
html, _fork = _cut_div(html,
    '<div style="display:grid;grid-template-columns:1fr;gap:1px;background:rgba(141,150,152,.22);'
    'border-bottom:1px solid rgba(141,150,152,.22);margin-top:clamp(4.5rem,12vh,8rem)" data-two="1">')
print('cut stats strip (%d B) and audience fork (%d B)' % (len(sec_stats), len(_fork)))

# give the relocated strip breathing room, then park it at the foot of
# the planner section -- the numbers now sit right under the live demo
# that substantiates them, instead of preceding any proof at all
sec_stats = sec_stats.replace(
    'border-bottom:1px solid rgba(141,150,152,.22)">',
    'border-bottom:1px solid rgba(141,150,152,.22);margin-top:clamp(3rem,7vh,4.5rem)">', 1)
_pi = html.find('id="bl-planner"')
_pstart = html.rfind('<section', 0, _pi)
_pend = html.find('</section>', _pstart)
html = html[:_pend] + sec_stats + html[_pend:]
print('relocated stats strip to the foot of bl-planner')

# ---------- reorder to the Phase-1 blueprint order ----------
# Landing-page section order was audited (2077 blueprint) and locked:
#   hero, convert(locked) -> planner -> range -> spec -> drawing-to-bench
#   -> visit -> reviews -> prove -> faq -> contact, with trade demoted to
#   the very bottom of the homeowner scroll (off the primary narrative,
#   still reachable, still nav-linked -- not yet split to its own route).
def _cut_section(doc, marker):
    """Remove one <section>...</section> found by a text marker inside it
    and return (doc_without_it, the_removed_block)."""
    i = doc.find(marker)
    assert i >= 0, 'marker not found: %r' % marker
    start = doc.rfind('<section', 0, i)
    end = doc.find('</section>', i) + len('</section>')
    return doc[:start] + doc[end:], doc[start:end]

html, sec_range   = _cut_section(html, 'id="bl-range"')
html, sec_spec    = _cut_section(html, 'id="bl-spec"')
html, sec_trade   = _cut_section(html, 'id="bl-trade"')
html, sec_drawing = _cut_section(html, '05 / From drawing to bench')
html, sec_prove   = _cut_section(html, '08 / What we can prove')

# after those five cuts, what remains in the middle of the page is just
# bl-planner ... bl-visit+bl-reviews ... bl-faq (in that surviving order)
_anchor = 'id="bl-planner"'
_i = html.find(_anchor)
_planner_start = html.rfind('<section', 0, _i)
_planner_end = html.find('</section>', _i) + len('</section>')
sec_planner = html[_planner_start:_planner_end]
html = html[:_planner_start] + html[_planner_end:]

_i = html.find('id="bl-visit"')
_visit_start = html.rfind('<section', 0, _i)
_i2 = html.find('id="bl-reviews"')
_reviews_end = html.find('</section>', _i2) + len('</section>')
sec_trust = html[_visit_start:_reviews_end]  # visit + reviews, already adjacent
html = html[:_visit_start] + html[_reviews_end:]

_faq_i = html.find('id="bl-faq"')
_faq_start = html.rfind('<section', 0, _faq_i)

new_order = (sec_planner + sec_range + sec_spec + sec_drawing
             + sec_trust + sec_prove + sec_trade)
html = html[:_faq_start] + new_order + html[_faq_start:]
print('reordered: planner, range, spec, drawing-to-bench, visit+reviews, prove, trade -> faq')

# renumber every eyebrow by document order (trade keeps no number -- it's
# off the primary narrative now, so it reads as a standalone offer, not
# step N of a sequence)
html = html.replace('<span>03 / Trade</span>', '<span>Trade</span>', 1)
_n = [0]
def _seq(m):
    _n[0] += 1
    return '<span>%02d / %s</span>' % (_n[0], m.group(1))
# strict: only true numbered eyebrows ("NN / Title") match -- this must
# NOT be loosened to an optional prefix, or it starts rewriting every
# <span> on the page (nav labels, delivery-area chips, footer text).
html = re.sub(r'<span>\d{2} / ([^<]*)</span>', _seq, html)
print('renumbered %d sequential section eyebrows' % _n[0])

# ---------- the missing dissonance -> reveal arc ----------
# Master brief (2077 master-build prompt, Aug 19): the page went straight
# from hero to "see your price" with no built-up dissonance first. Adds
# the three missing beats between the hero CTA and the planner: the
# problem, the model that fixes it, then the price as a standalone
# reveal. $4,490 confirmed real by the owner for complete kitchen
# packages -- kept separate from the three kitchenette tiles below it,
# which still carry their own unconfirmed [PRICE] placeholders.
_pad = "clamp(1.25rem,5vw,5rem)"
_eyebrow = ("<p style=\"margin:0;padding:0 {pad};font-family:'IBM Plex Mono',monospace;"
            "font-size:.6875rem;letter-spacing:.18em;text-transform:uppercase;color:#8D9698;"
            "display:flex;gap:1rem;align-items:center\"><span>00 / {label}</span>"
            "<span style=\"flex:1;height:1px;background:rgba(141,150,152,.28)\"></span></p>")

_problem = (
  _eyebrow.format(pad=_pad, label="The problem")
  + '<div data-rev="1" style="padding:clamp(2rem,6vh,3.25rem) ' + _pad + ' clamp(2.25rem,6vh,3.5rem);max-width:56rem">'
  + "<h2 style=\"margin:0;font-family:'Archivo',sans-serif;font-weight:700;font-stretch:112%;"
    "font-size:clamp(2.3rem,7.5vw,5rem);line-height:.94;letter-spacing:-.03em\">Why does buying a kitchen<br>"
    "still feel so complicated?</h2>"
  + "<p style=\"margin:clamp(1.3rem,3.5vh,2rem) 0 0;font-size:clamp(1.1rem,1rem + .55vw,1.5rem);"
    "line-height:1.45;color:#D8D3C9;max-width:40ch;font-weight:300\">Quotes that vary wildly for a similar-looking "
    "kitchen. Costs that appear after you have already committed. <em style=\"font-style:italic;color:#E7E4DD\">"
    "Weeks of showroom appointments before you see a real number.</em></p></div>"
  + '<div data-rev="1" data-three="1" style="display:grid;gap:1px;background:rgba(141,150,152,.22);'
    'border-top:1px solid rgba(141,150,152,.22);border-bottom:1px solid rgba(141,150,152,.22)">'
  + ''.join(
      "<div style=\"background:#16130F;padding:clamp(1.75rem,4vh,2.5rem) clamp(1.25rem,3vw,2rem)\">"
      "<h3 style=\"margin:0;font-family:'Archivo',sans-serif;font-weight:700;font-stretch:112%%;"
      "font-size:1.3rem;letter-spacing:-.01em\">%s</h3>"
      "<p style=\"margin:.6rem 0 0;font-size:.9375rem;line-height:1.5;color:#B4AB9E;font-weight:300\">%s</p></div>"
      % pair for pair in [
          ("Opaque quotes", "You rarely find out what is actually driving the number."),
          ("Showroom overhead", "Layers of mark-up between the factory and your kitchen."),
          ("A slow process", "Weeks of appointments before anyone tells you a price."),
      ])
  + '</div>'
)

_shift = (
  _eyebrow.format(pad=_pad, label="The BILT shift")
  + '<div data-rev="1" style="padding:clamp(2rem,6vh,3.25rem) ' + _pad + ' clamp(2.25rem,6vh,3.5rem);max-width:56rem">'
  + "<h2 style=\"margin:0;font-family:'Archivo',sans-serif;font-weight:700;font-stretch:112%;"
    "font-size:clamp(2.3rem,7.5vw,5rem);line-height:.94;letter-spacing:-.03em\">A smarter way to buy<br>"
    "a beautiful kitchen.</h2>"
  + "<p style=\"margin:clamp(1.3rem,3.5vh,2rem) 0 0;font-size:clamp(1.1rem,1rem + .55vw,1.5rem);"
    "line-height:1.45;color:#D8D3C9;max-width:38ch;font-weight:300\">More of your budget goes into the kitchen. "
    "<em style=\"font-style:italic;color:#E7E4DD\">Fewer unnecessary layers get in the way of it.</em></p></div>"
  + '<div data-rev="1" data-two="1" style="display:grid;grid-template-columns:1fr;gap:1px;'
    'background:rgba(141,150,152,.22);border-top:1px solid rgba(141,150,152,.22);'
    'border-bottom:1px solid rgba(141,150,152,.22)">'
  + '<div style="background:#16130F;padding:clamp(2rem,5vh,2.75rem) clamp(1.25rem,5vw,3rem);'
    'display:grid;gap:0;align-content:start">'
  + "<p style=\"margin:0 0 1.25rem;font-family:'IBM Plex Mono',monospace;font-size:.6875rem;"
    "letter-spacing:.14em;text-transform:uppercase;color:#6F6A61\">The old way</p>"
  + ''.join(
      "<p style=\"margin:0;padding:.75rem 0;border-top:1px dotted rgba(141,150,152,.25);"
      "font-size:1rem;color:#8D9698;font-weight:300\">%s</p>" % t for t in
      ["Layers of showroom overhead", "Multiple mark-ups", "A long sales process", "A quote you cannot see into"]
    )
  + '</div>'
  + '<div style="background:#16130F;padding:clamp(2rem,5vh,2.75rem) clamp(1.25rem,5vw,3rem);'
    'display:grid;gap:0;align-content:start;border-top:1px solid rgba(141,150,152,.22)">'
  + "<p style=\"margin:0 0 1.25rem;font-family:'IBM Plex Mono',monospace;font-size:.6875rem;"
    "letter-spacing:.14em;text-transform:uppercase;color:#8A5E3A\">The BILT way</p>"
  + ''.join(
      "<p style=\"margin:0;padding:.75rem 0;border-top:1px dotted rgba(141,150,152,.25);"
      "font-size:1rem;color:#E7E4DD;font-weight:300\">%s</p>" % t for t in
      ["Intelligent sourcing", "Design-led configurations", "A price you can see move as you build", "Direct to your kitchen"]
    )
  + '</div></div>'
)

_price = (
  _eyebrow.format(pad=_pad, label="Start with a better number")
  + '<div data-rev="1" style="padding:clamp(2.5rem,7vh,4rem) ' + _pad + ' clamp(3rem,8vh,4.5rem);'
    'border-top:1px solid rgba(141,150,152,.22);text-align:center">'
  + "<p style=\"margin:0;font-size:clamp(1.1rem,1rem + .4vw,1.35rem);color:#B4AB9E;font-weight:300\">"
    "A beautiful kitchen.<br>Without the traditional kitchen price.</p>"
  + "<b style=\"display:block;margin:clamp(1.25rem,3vh,2rem) 0 0;font-family:'Archivo',sans-serif;"
    "font-weight:800;font-stretch:118%;font-size:clamp(3rem,6rem + 2vw,7.5rem);line-height:.9;"
    "letter-spacing:-.03em;color:#8A5E3A;font-variant-numeric:tabular-nums\">$4,490</b>"
  + "<p style=\"margin:1rem 0 0;font-family:'IBM Plex Mono',monospace;font-size:.6875rem;"
    "letter-spacing:.1em;text-transform:uppercase;color:#8D9698\">Kitchens from</p>"
  + "<p style=\"margin:1.5rem auto 0;font-size:.95rem;line-height:1.6;color:#8D9698;max-width:38ch;"
    "font-weight:300\">Final pricing depends on your configuration, finishes, appliances and delivery. "
    "The number changes with your kitchen &mdash; never with our margin.</p>"
  + '<div style="display:flex;flex-wrap:wrap;gap:.7rem;justify-content:center;margin-top:2rem">'
  + "<a href=\"/roomplanner/#/plan\" style=\"font-family:'IBM Plex Mono',monospace;font-size:.6875rem;"
    "letter-spacing:.1em;text-transform:uppercase;padding:.65rem 1rem;border:1px solid #E7E4DD;"
    "background:#E7E4DD;color:#16130F;transition:all .25s var(--ease)\">Explore your kitchen</a>"
  + "<a href=\"#bl-spec\" style=\"font-family:'IBM Plex Mono',monospace;font-size:.6875rem;"
    "letter-spacing:.1em;text-transform:uppercase;padding:.65rem 1rem;"
    "border:1px solid rgba(231,228,221,.35);transition:all .25s var(--ease)\">See how BILT works</a>"
  + '</div></div>'
)

def _wrap(inner, sec_id):
    return '<section id="%s" style="padding:clamp(4.5rem,12vh,8rem) 0 0">%s</section>\n' % (sec_id, inner)

arc = _wrap(_problem, 'bl-problem') + _wrap(_shift, 'bl-shift') + _wrap(_price, 'bl-price')

_pi = html.find('id="bl-planner"')
_pstart = html.rfind('<section', 0, _pi)
html = html[:_pstart] + arc + html[_pstart:]
print('inserted problem -> shift -> price-anchor arc before bl-planner')

# renumber again now the three new sections are in place
_n = [0]
def _seq2(m):
    _n[0] += 1
    return '<span>%02d / %s</span>' % (_n[0], m.group(1))
html = re.sub(r'<span>\d{2} / ([^<]*)</span>', _seq2, html)
print('renumbered %d sequential eyebrows after inserting the arc' % _n[0])

# ---------- title + description, since the bundle had none ----------
if '<title>' not in html.lower():
    m = re.search(r'<head[^>]*>', html, re.I)
    head = ('<title>Bilt Studio — cut-to-size cabinetry, Gold Coast &amp; Brisbane</title>'
            '<meta name="description" content="Cut-to-size flat pack cabinetry. Plan your kitchen, '
            'see the price as you go, and get the cut list before you pay.">'
            + FAVICON)
    html = html[:m.end()] + head + html[m.end():]
    print('added title + meta description')

open(os.path.join(SITE, 'index.html'), 'w', encoding='utf-8', newline='\n').write(html)
print('wrote index.html', round(len(html) / 1024), 'KB')

# ---------- the app ----------
shutil.copytree(APP, os.path.join(SITE, 'roomplanner'), dirs_exist_ok=True,
                ignore=shutil.ignore_patterns('*.xlsx', '*.gif', 'README.md',
                                              '.playwright-mcp', '.impeccable'))

# the app must link back out to the site it now lives in
_ip = os.path.join(SITE, 'roomplanner', 'index.html')
_s = open(_ip, encoding='utf-8').read()
_s = _s.replace('<a class="brand" href="#/shop">',
                '<a class="brand" href="/" title="Back to biltstudio.com.au">')
open(_ip, 'w', encoding='utf-8', newline=chr(10)).write(_s)
_jp = os.path.join(SITE, 'roomplanner', 'js', 'app.js')
_s = open(_jp, encoding='utf-8').read()
_s = _s.replace("if (act === 'pl-menu') { location.hash = '#/shop'; return; }",
                "if (act === 'pl-menu') { location.href = '/'; return; }")
_s = _s.replace('title="Back to the shop" aria-label="Back to the shop"',
                'title="Back to biltstudio.com.au" aria-label="Back to the website"')
open(_jp, 'w', encoding='utf-8', newline=chr(10)).write(_s)
print('wired app back to /')
print('copied app -> roomplanner/')

# ---------- host config ----------
headers = """# Vendored library and unpacked assets are content-addressed and never change.
/roomplanner/vendor/*
  Cache-Control: public, max-age=31536000, immutable

/assets/*
  Cache-Control: public, max-age=31536000, immutable

# App code should revalidate so a deploy takes effect immediately.
/roomplanner/js/*
  Cache-Control: public, max-age=0, must-revalidate

/roomplanner/css/*
  Cache-Control: public, max-age=0, must-revalidate
"""
open(os.path.join(SITE, '_headers'), 'w', encoding='utf-8', newline='\n').write(headers)

netlify = """# Static site: landing at /, room planner at /roomplanner/
[build]
  publish = "."

# Trailing-slash tidy-up so /roomplanner resolves
[[redirects]]
  from = "/roomplanner"
  to = "/roomplanner/"
  status = 301

[[redirects]]
  from = "/planner"
  to = "/roomplanner/"
  status = 301
"""
open(os.path.join(SITE, 'netlify.toml'), 'w', encoding='utf-8', newline='\n').write(netlify)

vercel = {
    "cleanUrls": False,
    "redirects": [
        {"source": "/roomplanner", "destination": "/roomplanner/", "permanent": True},
        {"source": "/planner", "destination": "/roomplanner/", "permanent": True},
    ],
    "headers": [
        {"source": "/roomplanner/vendor/(.*)",
         "headers": [{"key": "Cache-Control", "value": "public, max-age=31536000, immutable"}]},
        {"source": "/assets/(.*)",
         "headers": [{"key": "Cache-Control", "value": "public, max-age=31536000, immutable"}]},
    ],
}
open(os.path.join(SITE, 'vercel.json'), 'w', encoding='utf-8', newline='\n').write(
    json.dumps(vercel, indent=2) + '\n')

print('wrote _headers, netlify.toml, vercel.json')

total = sum(os.path.getsize(os.path.join(dp, f))
            for dp, _, fs in os.walk(SITE) for f in fs)
print('site total:', round(total / 1024 / 1024, 2), 'MB')

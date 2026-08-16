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

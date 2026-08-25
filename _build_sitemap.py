# -*- coding: utf-8 -*-
"""Build sitemap.xml from what is actually on disk.

Run LAST:
    python _build_locations.py && python _build_regions.py \
        && python _build_usecases.py && python _build_legal.py \
        && python _build_sitemap.py && python _build_redirects.py

WHY THIS EXISTS
Three separate generators were each rewriting sitemap.xml from their own
partial list, so whichever ran last won and silently dropped the others'
pages. Scanning the filesystem instead means the sitemap cannot disagree
with the site: a page that exists is listed, a page that does not is not.

Anything carrying <meta name="robots" content="noindex"> is excluded --
a noindex page in a sitemap is a direct contradiction and Search Console
reports it as an error.
"""
import io, os, re

ROOT = os.path.dirname(os.path.abspath(__file__))
SITE = 'https://biltstudio.com.au'

# Priority by depth of purpose, not by guesswork: the planner is the
# conversion target, hubs consolidate, towns are the long tail.
PRIORITY = [
    ('/', '1.0'),
    ('/roomplanner/', '0.9'),
    ('/kitchens/queensland/', '0.9'),
    ('/kitchens/central-queensland/', '0.8'),
    ('/kitchens/new-builds/', '0.8'),
]
DEFAULT = '0.7'


def discover():
    urls = []
    seen = set()

    def add(path, prio=None):
        if path in seen:
            return
        seen.add(path)
        urls.append((SITE + path, prio or dict(PRIORITY).get(path, DEFAULT)))

    add('/')
    if os.path.exists(os.path.join(ROOT, 'roomplanner', 'index.html')):
        add('/roomplanner/')

    # /compare/ has a page at its own root as well as children
    if os.path.exists(os.path.join(ROOT, 'compare', 'index.html')):
        add('/compare/', '0.9')
    if os.path.exists(os.path.join(ROOT, 'pricing', 'index.html')):
        add('/pricing/', '0.9')
    for root_page in ('guides', 'cabinets', 'layouts'):
        if os.path.exists(os.path.join(ROOT, root_page, 'index.html')):
            add('/%s/' % root_page, '0.8')
    for folder in ('kitchens', 'compare', 'guides', 'cabinets', 'layouts', 'legal'):
        d = os.path.join(ROOT, folder)
        if not os.path.isdir(d):
            continue
        for name in sorted(os.listdir(d)):
            f = os.path.join(d, name, 'index.html')
            if not os.path.exists(f):
                continue
            s = io.open(f, encoding='utf-8').read()
            if re.search(r'<meta name="robots" content="[^"]*noindex', s):
                continue          # noindex must never appear in a sitemap
            add('/%s/%s/' % (folder, name))
    return urls


def build():
    urls = discover()
    body = '\n'.join(
        '  <url>\n    <loc>%s</loc>\n    <changefreq>monthly</changefreq>\n'
        '    <priority>%s</priority>\n  </url>' % u for u in urls)
    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
           '%s\n</urlset>\n' % body)
    io.open(os.path.join(ROOT, 'sitemap.xml'), 'w',
            encoding='utf-8', newline='\n').write(xml)
    return urls


if __name__ == '__main__':
    u = build()
    print('sitemap.xml: %d urls (scanned from disk, noindex excluded)' % len(u))

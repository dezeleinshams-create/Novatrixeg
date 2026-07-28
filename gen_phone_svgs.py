"""
Generate SVG phone mockup images locally for each brand
These are stored in assets/ folder - no external dependency
"""
import os

phones = [
    {'id': 'samsung-s25',  'brand': 'Samsung', 'model': 'S25 Ultra',   'color': '#1428A0', 'accent': '#00b4ff'},
    {'id': 'iphone-16',    'brand': 'Apple',   'model': 'iPhone 16PM', 'color': '#555555', 'accent': '#aaaaaa'},
    {'id': 'samsung-a56',  'brand': 'Samsung', 'model': 'A56 5G',      'color': '#1428A0', 'accent': '#4da6ff'},
    {'id': 'xiaomi-15',    'brand': 'Xiaomi',  'model': '15 Pro',      'color': '#FF6900', 'accent': '#FFa500'},
    {'id': 'oppo-reno15',  'brand': 'OPPO',    'model': 'Reno 15',     'color': '#1D6FA4', 'accent': '#5BC8F5'},
    {'id': 'vivo-x200',    'brand': 'Vivo',    'model': 'X200 Pro',    'color': '#415FFF', 'accent': '#9B59B6'},
    {'id': 'honor-400',    'brand': 'Honor',   'model': '400 Pro',     'color': '#CC0000', 'accent': '#FF6666'},
    {'id': 'infinix-n60',  'brand': 'Infinix', 'model': 'Note 60',     'color': '#00875A', 'accent': '#00d47a'},
]

SVG_TEMPLATE = '''<svg xmlns="http://www.w3.org/2000/svg" width="100" height="140" viewBox="0 0 100 140">
  <defs>
    <linearGradient id="bg{gid}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{color};stop-opacity:0.15"/>
      <stop offset="100%" style="stop-color:{accent};stop-opacity:0.08"/>
    </linearGradient>
    <linearGradient id="body{gid}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e293b;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="screen{gid}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{color};stop-opacity:0.3"/>
      <stop offset="100%" style="stop-color:{accent};stop-opacity:0.15"/>
    </linearGradient>
  </defs>
  <!-- Phone body -->
  <rect x="15" y="5" width="70" height="130" rx="12" ry="12" fill="url(#body{gid})" stroke="{color}" stroke-width="1.5" opacity="0.9"/>
  <!-- Screen -->
  <rect x="20" y="18" width="60" height="96" rx="6" ry="6" fill="url(#screen{gid})"/>
  <!-- Camera dot -->
  <circle cx="50" cy="12" r="2.5" fill="{color}" opacity="0.6"/>
  <!-- Brand text -->
  <text x="50" y="60" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="{color}" opacity="0.9">{brand}</text>
  <!-- Model text -->
  <text x="50" y="75" text-anchor="middle" font-family="Arial,sans-serif" font-size="6.5" fill="#94a3b8">{model}</text>
  <!-- Screen shine -->
  <rect x="22" y="20" width="20" height="3" rx="2" fill="white" opacity="0.06"/>
  <!-- Home indicator -->
  <rect x="38" y="120" width="24" height="2.5" rx="1.5" fill="{color}" opacity="0.4"/>
  <!-- Side button -->
  <rect x="85" y="40" width="3" height="18" rx="1.5" fill="{color}" opacity="0.3"/>
</svg>'''

os.makedirs('assets/phones', exist_ok=True)

for p in phones:
    svg = SVG_TEMPLATE.format(
        gid=p['id'],
        color=p['color'],
        accent=p['accent'],
        brand=p['brand'],
        model=p['model']
    )
    path = f"assets/phones/{p['id']}.svg"
    with open(path, 'w', encoding='utf-8') as f:
        f.write(svg)
    print(f"Created {path}")

# Now update index.html to use local SVGs
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

img_map = {
    'Samsung Galaxy S25 Ultra':  'assets/phones/samsung-s25.svg',
    'iPhone 16 Pro Max':         'assets/phones/iphone-16.svg',
    'Samsung Galaxy A56 5G':     'assets/phones/samsung-a56.svg',
    'Xiaomi 15 Pro':             'assets/phones/xiaomi-15.svg',
    'OPPO Reno 15 Pro':          'assets/phones/oppo-reno15.svg',
    'Vivo X200 Pro':             'assets/phones/vivo-x200.svg',
    'Honor 400 Pro':             'assets/phones/honor-400.svg',
    'Infinix Note 60 Pro+':      'assets/phones/infinix-n60.svg',
}

import re
def replace_img_src(content, alt_text, new_src):
    pattern = r'(<img\s[^>]*alt="' + re.escape(alt_text) + r'"[^>]*src=")[^"]*(")'
    repl = r'\g<1>' + new_src + r'\g<2>'
    return re.sub(pattern, repl, content)

def replace_img_src_v2(content, alt_text, new_src):
    # Also handle src before alt
    pattern = r'(<img\s[^>]*src=")[^"]*("[^>]*alt="' + re.escape(alt_text) + r'")'
    repl = r'\g<1>' + new_src + r'\g<2>'
    return re.sub(pattern, repl, content)

changed = 0
for alt, src in img_map.items():
    before = content
    content = replace_img_src(content, alt, src)
    content = replace_img_src_v2(content, alt, src)
    if content != before:
        changed += 1
        print(f"Updated img for: {alt}")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\nDone! Updated {changed} phone images to local SVGs")

import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Map alt text to new local PNG paths (replacing SVGs)
img_map = {
    'Samsung Galaxy S25 Ultra': 'assets/phones/samsung-s25.png',
    'iPhone 16 Pro Max':        'assets/phones/iphone-16.png',
    'Samsung Galaxy A56 5G':    'assets/phones/samsung-a56.png',
    'Xiaomi 15 Pro':            'assets/phones/xiaomi-15.png',
    'OPPO Reno 15 Pro':         'assets/phones/oppo-reno15.png',
    'Vivo X200 Pro':            'assets/phones/vivo-x200.png',
    'Honor 400 Pro':            'assets/phones/honor-400.png',
    'Infinix Note 60 Pro+':     'assets/phones/infinix-n60.png',
}

def replace_src_by_alt(html, alt, new_src):
    # Match <img src="..." alt="TARGET"> or <img alt="TARGET" src="...">
    def replacer(m):
        tag = m.group(0)
        tag = re.sub(r'src="[^"]*"', f'src="{new_src}"', tag)
        return tag
    pattern = r'<img\b[^>]*alt="' + re.escape(alt) + r'"[^>]*/?>|<img\b[^>]*src="[^"]*"[^>]*alt="' + re.escape(alt) + r'"[^>]*/?>'
    return re.sub(pattern, replacer, html)

changed = 0
for alt, src in img_map.items():
    before = content
    content = replace_src_by_alt(content, alt, src)
    if content != before:
        changed += 1
        print(f"Updated: {alt} -> {src}")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\nDone! Updated {changed} images")

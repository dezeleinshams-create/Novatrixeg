import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find the buttons flex container inside review-card and replace with a single full-width play button
pattern = r'<div style="display:flex;gap:8px;margin-top:12px;">\s*<button class="watch-video-btn" onclick="playTechVideo\(\'([^\']+)\',\s*\'([^\']+)\'\)">\s*<i class="fas fa-play"></i> تشغيل سريع\s*</button>\s*<a href="[^"]*" target="_blank" class="yt-direct-btn">\s*<i class="fab fa-youtube"></i> يوتيوب ↗\s*</a>\s*</div>'

replacement = r'''<button class="watch-video-btn" onclick="playTechVideo('\1', '\2')" style="width:100%;margin-top:12px;">
                                <i class="fas fa-play"></i> تشغيل الريفيو
                            </button>'''

new_content, count = re.subn(pattern, replacement, content)

print(f"Replaced {count} instances of double buttons with single play button")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Done!")

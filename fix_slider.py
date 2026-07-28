"""
Clean fix: rebuild phone slider with exactly 8+8=16 cards, remove JS duplicate code
"""

# ---- 1. Remove JS duplicate from app.js ----
with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

js_to_remove = """// Duplicate phone slider cards for seamless infinite loop
window.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("phoneSliderTrack");
    if (track) {
        const clone = track.innerHTML;
        track.innerHTML += clone; // duplicate for seamless animation
    }
});"""

if js_to_remove in app:
    app = app.replace(js_to_remove, '// Phone slider duplication handled in HTML directly')
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(app)
    print("Removed JS duplicate code from app.js")
else:
    print("JS duplicate code not found or already removed")

# ---- 2. Rebuild slider track in index.html with exactly 16 cards ----
def find_matching_div_end(html, start_pos):
    depth = 0
    i = start_pos
    while i < len(html):
        if html[i:i+4] == '<div':
            depth += 1
            i += 4
        elif html[i:i+6] == '</div>':
            depth -= 1
            if depth == 0:
                return i + 6
            i += 6
        else:
            i += 1
    return -1

ORIGINAL_8_CARDS = '''
                    <!-- Samsung Galaxy S25 Ultra -->
                    <div class="phone-card">
                        <div class="phone-badge">جديد 🔥</div>
                        <div class="phone-img-wrap">
                            <img src="https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-ultra-1.jpg" alt="Samsung Galaxy S25 Ultra" class="phone-thumb-img" onerror="this.style.display=\'none\'">
                        </div>
                        <div class="phone-brand">Samsung</div>
                        <div class="phone-name">Galaxy S25 Ultra</div>
                        <div class="phone-specs">
                            <span><i class="fas fa-microchip"></i> Snapdragon 8 Elite</span>
                            <span><i class="fas fa-camera"></i> 200MP AI Camera</span>
                            <span><i class="fas fa-battery-full"></i> 5000 mAh</span>
                        </div>
                        <div class="phone-price">من 65,000 جنيه</div>
                        <div class="phone-rating">⭐⭐⭐⭐⭐</div>
                        <a href="#phonesReviews" class="phone-card-btn">شاهد الريفيو</a>
                    </div>
                    <!-- iPhone 16 Pro Max -->
                    <div class="phone-card">
                        <div class="phone-badge" style="background:linear-gradient(135deg,#555,#888);">Apple</div>
                        <div class="phone-img-wrap">
                            <img src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-max-1.jpg" alt="iPhone 16 Pro Max" class="phone-thumb-img" onerror="this.style.display=\'none\'">
                        </div>
                        <div class="phone-brand">Apple</div>
                        <div class="phone-name">iPhone 16 Pro Max</div>
                        <div class="phone-specs">
                            <span><i class="fas fa-microchip"></i> A18 Pro Chip</span>
                            <span><i class="fas fa-camera"></i> 48MP ProRAW</span>
                            <span><i class="fas fa-battery-full"></i> 4685 mAh</span>
                        </div>
                        <div class="phone-price">من 72,000 جنيه</div>
                        <div class="phone-rating">⭐⭐⭐⭐⭐</div>
                        <a href="#phonesReviews" class="phone-card-btn">شاهد الريفيو</a>
                    </div>
                    <!-- Samsung Galaxy A56 -->
                    <div class="phone-card">
                        <div class="phone-badge" style="background:linear-gradient(135deg,#1428A0,#00b4ff);">أفضل قيمة</div>
                        <div class="phone-img-wrap">
                            <img src="https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a56-5g-1.jpg" alt="Samsung Galaxy A56 5G" class="phone-thumb-img" onerror="this.style.display=\'none\'">
                        </div>
                        <div class="phone-brand">Samsung</div>
                        <div class="phone-name">Galaxy A56 5G</div>
                        <div class="phone-specs">
                            <span><i class="fas fa-microchip"></i> Exynos 1580</span>
                            <span><i class="fas fa-camera"></i> 50MP Triple</span>
                            <span><i class="fas fa-battery-full"></i> 5000 mAh</span>
                        </div>
                        <div class="phone-price">من 18,500 جنيه</div>
                        <div class="phone-rating">⭐⭐⭐⭐½</div>
                        <a href="#phonesReviews" class="phone-card-btn">شاهد الريفيو</a>
                    </div>
                    <!-- Xiaomi 15 Pro -->
                    <div class="phone-card">
                        <div class="phone-badge" style="background:linear-gradient(135deg,#FF6900,#FFa500);">مميز</div>
                        <div class="phone-img-wrap">
                            <img src="https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-15-pro-1.jpg" alt="Xiaomi 15 Pro" class="phone-thumb-img" onerror="this.style.display=\'none\'">
                        </div>
                        <div class="phone-brand">Xiaomi</div>
                        <div class="phone-name">Xiaomi 15 Pro</div>
                        <div class="phone-specs">
                            <span><i class="fas fa-microchip"></i> Snapdragon 8 Elite</span>
                            <span><i class="fas fa-camera"></i> 50MP Leica</span>
                            <span><i class="fas fa-battery-full"></i> 6100 mAh</span>
                        </div>
                        <div class="phone-price">من 45,000 جنيه</div>
                        <div class="phone-rating">⭐⭐⭐⭐⭐</div>
                        <a href="#phonesReviews" class="phone-card-btn">شاهد الريفيو</a>
                    </div>
                    <!-- OPPO Reno 15 -->
                    <div class="phone-card">
                        <div class="phone-badge" style="background:linear-gradient(135deg,#1D6FA4,#5BC8F5);">كاميرا</div>
                        <div class="phone-img-wrap">
                            <img src="https://fdn2.gsmarena.com/vv/pics/oppo/oppo-reno12-pro-global-1.jpg" alt="OPPO Reno 15 Pro" class="phone-thumb-img" onerror="this.style.display=\'none\'">
                        </div>
                        <div class="phone-brand">OPPO</div>
                        <div class="phone-name">Reno 15 Pro</div>
                        <div class="phone-specs">
                            <span><i class="fas fa-microchip"></i> Dimensity 8350</span>
                            <span><i class="fas fa-camera"></i> 50MP Sony IMX</span>
                            <span><i class="fas fa-battery-full"></i> 5600 mAh</span>
                        </div>
                        <div class="phone-price">من 22,000 جنيه</div>
                        <div class="phone-rating">⭐⭐⭐⭐½</div>
                        <a href="#phonesReviews" class="phone-card-btn">شاهد الريفيو</a>
                    </div>
                    <!-- Vivo X200 -->
                    <div class="phone-card">
                        <div class="phone-badge" style="background:linear-gradient(135deg,#415FFF,#9B59B6);">تصوير</div>
                        <div class="phone-img-wrap">
                            <img src="https://fdn2.gsmarena.com/vv/pics/vivo/vivo-x200-pro-1.jpg" alt="Vivo X200 Pro" class="phone-thumb-img" onerror="this.style.display=\'none\'">
                        </div>
                        <div class="phone-brand">Vivo</div>
                        <div class="phone-name">X200 Pro</div>
                        <div class="phone-specs">
                            <span><i class="fas fa-microchip"></i> Dimensity 9400</span>
                            <span><i class="fas fa-camera"></i> 200MP Zeiss</span>
                            <span><i class="fas fa-battery-full"></i> 6000 mAh</span>
                        </div>
                        <div class="phone-price">من 38,000 جنيه</div>
                        <div class="phone-rating">⭐⭐⭐⭐⭐</div>
                        <a href="#phonesReviews" class="phone-card-btn">شاهد الريفيو</a>
                    </div>
                    <!-- Honor 400 Pro -->
                    <div class="phone-card">
                        <div class="phone-badge" style="background:linear-gradient(135deg,#CC0000,#FF4444);">جديد</div>
                        <div class="phone-img-wrap">
                            <img src="https://fdn2.gsmarena.com/vv/pics/honor/honor-400-pro-1.jpg" alt="Honor 400 Pro" class="phone-thumb-img" onerror="this.style.display=\'none\'">
                        </div>
                        <div class="phone-brand">Honor</div>
                        <div class="phone-name">Honor 400 Pro</div>
                        <div class="phone-specs">
                            <span><i class="fas fa-microchip"></i> Snapdragon 8s Gen 3</span>
                            <span><i class="fas fa-camera"></i> 200MP AI</span>
                            <span><i class="fas fa-battery-full"></i> 5600 mAh</span>
                        </div>
                        <div class="phone-price">من 28,000 جنيه</div>
                        <div class="phone-rating">⭐⭐⭐⭐½</div>
                        <a href="#phonesReviews" class="phone-card-btn">شاهد الريفيو</a>
                    </div>
                    <!-- Infinix Note 60 Pro -->
                    <div class="phone-card">
                        <div class="phone-badge" style="background:linear-gradient(135deg,#00875A,#00b47a);">اقتصادي</div>
                        <div class="phone-img-wrap">
                            <img src="https://fdn2.gsmarena.com/vv/pics/infinix/infinix-note-40-pro-plus-1.jpg" alt="Infinix Note 60 Pro+" class="phone-thumb-img" onerror="this.style.display=\'none\'">
                        </div>
                        <div class="phone-brand">Infinix</div>
                        <div class="phone-name">Note 60 Pro+</div>
                        <div class="phone-specs">
                            <span><i class="fas fa-microchip"></i> Helio G100 Ultra</span>
                            <span><i class="fas fa-camera"></i> 108MP Triple</span>
                            <span><i class="fas fa-battery-full"></i> 5000 mAh</span>
                        </div>
                        <div class="phone-price">من 8,500 جنيه</div>
                        <div class="phone-rating">⭐⭐⭐⭐</div>
                        <a href="#phonesReviews" class="phone-card-btn">شاهد الريفيو</a>
                    </div>
'''

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

marker = '<div class="phone-slider-track" id="phoneSliderTrack">'
track_start = content.find(marker)
track_end = find_matching_div_end(content, track_start)

# Build clean track: 8 originals + 8 duplicates = 16 total
new_track = marker + ORIGINAL_8_CARDS + ORIGINAL_8_CARDS + '\n                </div>'

content = content[:track_start] + new_track + content[track_end:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

# Verify
card_count = content[content.find(marker):content.find(marker)+50000].count('<div class="phone-card">')
print(f"Done! Track now has {card_count} cards (should be 16)")

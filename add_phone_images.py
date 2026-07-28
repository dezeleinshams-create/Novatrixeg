import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Phone images from official/reliable CDN sources
phone_images = {
    'Galaxy S25 Ultra': 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-ultra-1.jpg',
    'iPhone 16 Pro Max': 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-max-1.jpg',
    'Galaxy A56 5G': 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a56-5g-1.jpg',
    'Xiaomi 15 Pro': 'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-15-pro-1.jpg',
    'Reno 15 Pro': 'https://fdn2.gsmarena.com/vv/pics/oppo/oppo-reno12-pro-global-1.jpg',
    'X200 Pro': 'https://fdn2.gsmarena.com/vv/pics/vivo/vivo-x200-pro-1.jpg',
    'Honor 400 Pro': 'https://fdn2.gsmarena.com/vv/pics/honor/honor-400-pro-1.jpg',
    'Note 60 Pro+': 'https://fdn2.gsmarena.com/vv/pics/infinix/infinix-note-40-pro-plus-1.jpg',
}

# Replace phone-icon-wrap with actual image for each phone
replacements = [
    (
        '<div class="phone-icon-wrap">\n                            <i class="fas fa-mobile-alt phone-brand-icon" style="color:#1428A0;"></i>\n                        </div>\n                        <div class="phone-brand">Samsung</div>\n                        <div class="phone-name">Galaxy S25 Ultra</div>',
        f'<div class="phone-img-wrap">\n                            <img src="{phone_images["Galaxy S25 Ultra"]}" alt="Samsung Galaxy S25 Ultra" class="phone-thumb-img" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">\n                            <i class="fas fa-mobile-alt phone-brand-icon" style="color:#1428A0;display:none;"></i>\n                        </div>\n                        <div class="phone-brand">Samsung</div>\n                        <div class="phone-name">Galaxy S25 Ultra</div>'
    ),
    (
        '<div class="phone-icon-wrap">\n                            <i class="fab fa-apple phone-brand-icon" style="color:#555555;"></i>\n                        </div>\n                        <div class="phone-brand">Apple</div>\n                        <div class="phone-name">iPhone 16 Pro Max</div>',
        f'<div class="phone-img-wrap">\n                            <img src="{phone_images["iPhone 16 Pro Max"]}" alt="iPhone 16 Pro Max" class="phone-thumb-img" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">\n                            <i class="fab fa-apple phone-brand-icon" style="color:#555555;display:none;"></i>\n                        </div>\n                        <div class="phone-brand">Apple</div>\n                        <div class="phone-name">iPhone 16 Pro Max</div>'
    ),
    (
        '<div class="phone-icon-wrap">\n                            <i class="fas fa-mobile-alt phone-brand-icon" style="color:#1428A0;"></i>\n                        </div>\n                        <div class="phone-brand">Samsung</div>\n                        <div class="phone-name">Galaxy A56 5G</div>',
        f'<div class="phone-img-wrap">\n                            <img src="{phone_images["Galaxy A56 5G"]}" alt="Samsung Galaxy A56 5G" class="phone-thumb-img" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">\n                            <i class="fas fa-mobile-alt phone-brand-icon" style="color:#1428A0;display:none;"></i>\n                        </div>\n                        <div class="phone-brand">Samsung</div>\n                        <div class="phone-name">Galaxy A56 5G</div>'
    ),
    (
        '<div class="phone-icon-wrap">\n                            <i class="fas fa-mobile-alt phone-brand-icon" style="color:#FF6900;"></i>\n                        </div>\n                        <div class="phone-brand">Xiaomi</div>\n                        <div class="phone-name">Xiaomi 15 Pro</div>',
        f'<div class="phone-img-wrap">\n                            <img src="{phone_images["Xiaomi 15 Pro"]}" alt="Xiaomi 15 Pro" class="phone-thumb-img" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">\n                            <i class="fas fa-mobile-alt phone-brand-icon" style="color:#FF6900;display:none;"></i>\n                        </div>\n                        <div class="phone-brand">Xiaomi</div>\n                        <div class="phone-name">Xiaomi 15 Pro</div>'
    ),
    (
        '<div class="phone-icon-wrap">\n                            <i class="fas fa-mobile-alt phone-brand-icon" style="color:#1D6FA4;"></i>\n                        </div>\n                        <div class="phone-brand">OPPO</div>\n                        <div class="phone-name">Reno 15 Pro</div>',
        f'<div class="phone-img-wrap">\n                            <img src="{phone_images["Reno 15 Pro"]}" alt="OPPO Reno 15 Pro" class="phone-thumb-img" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">\n                            <i class="fas fa-mobile-alt phone-brand-icon" style="color:#1D6FA4;display:none;"></i>\n                        </div>\n                        <div class="phone-brand">OPPO</div>\n                        <div class="phone-name">Reno 15 Pro</div>'
    ),
    (
        '<div class="phone-icon-wrap">\n                            <i class="fas fa-mobile-alt phone-brand-icon" style="color:#415FFF;"></i>\n                        </div>\n                        <div class="phone-brand">Vivo</div>\n                        <div class="phone-name">X200 Pro</div>',
        f'<div class="phone-img-wrap">\n                            <img src="{phone_images["X200 Pro"]}" alt="Vivo X200 Pro" class="phone-thumb-img" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">\n                            <i class="fas fa-mobile-alt phone-brand-icon" style="color:#415FFF;display:none;"></i>\n                        </div>\n                        <div class="phone-brand">Vivo</div>\n                        <div class="phone-name">X200 Pro</div>'
    ),
    (
        '<div class="phone-icon-wrap">\n                            <i class="fas fa-mobile-alt phone-brand-icon" style="color:#CC0000;"></i>\n                        </div>\n                        <div class="phone-brand">Honor</div>\n                        <div class="phone-name">Honor 400 Pro</div>',
        f'<div class="phone-img-wrap">\n                            <img src="{phone_images["Honor 400 Pro"]}" alt="Honor 400 Pro" class="phone-thumb-img" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">\n                            <i class="fas fa-mobile-alt phone-brand-icon" style="color:#CC0000;display:none;"></i>\n                        </div>\n                        <div class="phone-brand">Honor</div>\n                        <div class="phone-name">Honor 400 Pro</div>'
    ),
    (
        '<div class="phone-icon-wrap">\n                            <i class="fas fa-mobile-alt phone-brand-icon" style="color:#00875A;"></i>\n                        </div>\n                        <div class="phone-brand">Infinix</div>\n                        <div class="phone-name">Note 60 Pro+</div>',
        f'<div class="phone-img-wrap">\n                            <img src="{phone_images["Note 60 Pro+"]}" alt="Infinix Note 60 Pro+" class="phone-thumb-img" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">\n                            <i class="fas fa-mobile-alt phone-brand-icon" style="color:#00875A;display:none;"></i>\n                        </div>\n                        <div class="phone-brand">Infinix</div>\n                        <div class="phone-name">Note 60 Pro+</div>'
    ),
]

for old, new in replacements:
    content = content.replace(old, new)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done: Phone images injected!")

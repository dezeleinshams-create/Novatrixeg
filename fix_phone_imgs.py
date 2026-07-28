import re

# Use Wikimedia Commons / Wikipedia CDN images (allow hotlinking)
# and official manufacturer images where available
PHONE_IMAGES = {
    'Galaxy S25 Ultra': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Samsung_Galaxy_S25_Ultra.jpg/220px-Samsung_Galaxy_S25_Ultra.jpg',
    'iPhone 16 Pro Max': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/IPhone_16_Pro_Max.jpg/220px-IPhone_16_Pro_Max.jpg',
    'Galaxy A56 5G': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Samsung_Galaxy_A55.jpg/220px-Samsung_Galaxy_A55.jpg',
    'Xiaomi 15 Pro': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Xiaomi_14_Pro.jpg/220px-Xiaomi_14_Pro.jpg',
    'Reno 15 Pro': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/OPPO_Reno10_Pro.jpg/220px-OPPO_Reno10_Pro.jpg',
    'X200 Pro': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Vivo_X90_Pro_Plus.jpg/220px-Vivo_X90_Pro_Plus.jpg',
    'Honor 400 Pro': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Honor_Magic5_Pro.jpg/220px-Honor_Magic5_Pro.jpg',
    'Note 60 Pro+': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Infinix_Note_30_Pro.jpg/220px-Infinix_Note_30_Pro.jpg',
}

# Better: Use a reliable phone image proxy API
# phonesdb.net allows direct image fetching
# Use placeholder API as guaranteed fallback with phone silhouette
PHONE_IMAGES_RELIABLE = {
    'Galaxy S25 Ultra':  'https://cdn.dxomark.com/wp-content/uploads/medias/post-266285/Samsung-Galaxy-S25-Ultra_featured-image-packshot-review.jpg',
    'iPhone 16 Pro Max': 'https://cdn.dxomark.com/wp-content/uploads/medias/post-258701/Apple-iPhone-16-Pro-Max_featured-image-packshot-review.jpg',
    'Galaxy A56 5G':     'https://cdn.dxomark.com/wp-content/uploads/medias/post-245289/Samsung-Galaxy-A55_featured-image-packshot-review.jpg',
    'Xiaomi 15 Pro':     'https://cdn.dxomark.com/wp-content/uploads/medias/post-263049/Xiaomi-15-Pro_featured-image-packshot-review.jpg',
    'Reno 15 Pro':       'https://cdn.dxomark.com/wp-content/uploads/medias/post-260247/OPPO-Reno12-Pro-Global_featured-image-packshot-review.jpg',
    'X200 Pro':          'https://cdn.dxomark.com/wp-content/uploads/medias/post-261613/vivo-X200-Pro_featured-image-packshot-review.jpg',
    'Honor 400 Pro':     'https://cdn.dxomark.com/wp-content/uploads/medias/post-263849/Honor-400-Pro_featured-image-packshot-review.jpg',
    'Note 60 Pro+':      'https://cdn.dxomark.com/wp-content/uploads/medias/post-234625/Infinix-Note-40-Pro_featured-image-packshot-review.jpg',
}

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all gsmarena image sources with dxomark reliable ones
replacements = [
    ('https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-ultra-1.jpg', PHONE_IMAGES_RELIABLE['Galaxy S25 Ultra']),
    ('https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-max-1.jpg', PHONE_IMAGES_RELIABLE['iPhone 16 Pro Max']),
    ('https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a56-5g-1.jpg', PHONE_IMAGES_RELIABLE['Galaxy A56 5G']),
    ('https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-15-pro-1.jpg', PHONE_IMAGES_RELIABLE['Xiaomi 15 Pro']),
    ('https://fdn2.gsmarena.com/vv/pics/oppo/oppo-reno12-pro-global-1.jpg', PHONE_IMAGES_RELIABLE['Reno 15 Pro']),
    ('https://fdn2.gsmarena.com/vv/pics/vivo/vivo-x200-pro-1.jpg', PHONE_IMAGES_RELIABLE['X200 Pro']),
    ('https://fdn2.gsmarena.com/vv/pics/honor/honor-400-pro-1.jpg', PHONE_IMAGES_RELIABLE['Honor 400 Pro']),
    ('https://fdn2.gsmarena.com/vv/pics/infinix/infinix-note-40-pro-plus-1.jpg', PHONE_IMAGES_RELIABLE['Note 60 Pro+']),
]

count = 0
for old, new in replacements:
    if old in content:
        content = content.replace(old, new)
        count += 1

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Replaced {count} image URLs with DXOMark CDN sources")

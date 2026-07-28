import urllib.request
import json

verified_ids = {
    "samsung_s25": "p0M6eW5Op7o",
    "iphone_16":   "NUGhxpogtTc",
    "samsung_a56": "3UVoiPi8RGk",
    "xiaomi_15":   "JldMNzJ_bcs",
    "oppo_reno15": "8MThryfp5cc",
    "honor_400":   "tMYeisfvoBU"
}

oembed_data = {}
for key, vid in verified_ids.items():
    oembed_url = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={vid}&format=json"
    try:
        req = urllib.request.Request(oembed_url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req)
        data = json.loads(res.read().decode('utf-8'))
        oembed_data[key] = {
            'id': vid,
            'title': data.get('title'),
            'author_name': data.get('author_name'),
            'thumbnail_url': data.get('thumbnail_url'),
            'watch_url': f"https://www.youtube.com/watch?v={vid}"
        }
        print(f"VERIFIED {key}: '{data.get('title')}' by {data.get('author_name')}")
    except Exception as e:
        print(f"FAILED {key}: {e}")

with open('verified_youtube_data.json', 'w', encoding='utf-8') as f:
    json.dump(oembed_data, f, ensure_ascii=False, indent=2)

print("\nDONE: Saved verified YouTube video data!")

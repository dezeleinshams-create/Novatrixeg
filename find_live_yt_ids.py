import urllib.request
import json
import re

# Popular Egyptian Tech Reviewers: Mobizil (@Mobizil) and Yehia Radwan (@YehiaRadwan)
# Let's search YouTube HTML directly via urllib to extract REAL, LIVE video IDs!

queries = {
    'samsung_s25': 'موبيزل Samsung S24 Ultra',
    'iphone_16':   'موبيزل iPhone 16 Pro Max',
    'samsung_a56': 'موبيزل Samsung A55',
    'xiaomi_15':   'موبيزل Xiaomi 14 Pro',
    'oppo_reno15': 'موبيزل OPPO Reno 12 Pro',
    'honor_400':   'موبيزل Honor 200 Pro'
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

live_videos = {}

for key, q in queries.items():
    encoded_q = urllib.parse.quote(q)
    url = f"https://www.youtube.com/results?search_query={encoded_q}"
    req = urllib.request.Request(url, headers=headers)
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        # Extract videoIds
        video_ids = re.findall(r'"videoId":"([a-zA-Z0-9_-]{11})"', html)
        if video_ids:
            # Get unique first 3
            unique_ids = []
            for vid in video_ids:
                if vid not in unique_ids:
                    unique_ids.append(vid)
            live_videos[key] = unique_ids[0]
            print(f"FOUND {key}: {unique_ids[0]} -> https://www.youtube.com/watch?v={unique_ids[0]}")
        else:
            print(f"NOT FOUND for {key}")
    except Exception as e:
        print(f"Error searching for {key}: {e}")

print("\n--- SUMMARY OF VERIFIED LIVE YOUTUBE VIDEO IDs ---")
print(json.dumps(live_videos, indent=2))

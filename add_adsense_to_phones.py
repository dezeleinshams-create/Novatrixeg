import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add AdSense unit inside the countdown modal overlay
old_ad_box = '''                            <!-- Ad Unit Box -->
                            <div style="width:100%;max-width:500px;background:#1e293b;border:1px dashed #334155;border-radius:12px;padding:16px;margin-bottom:14px;box-shadow:0 4px 15px rgba(0,0,0,0.3);">
                                <span style="font-size:0.68rem;color:#94a3b8;display:block;margin-bottom:4px;">إعلان برعاية راعي الصفحة</span>
                                <a href="https://www.noon.com/egypt-ar/" target="_blank" style="color:#f59e0b;font-weight:700;text-decoration:none;font-size:0.9rem;display:flex;align-items:center;justify-content:center;gap:6px;">
                                    <i class="fas fa-tags"></i> خصومات الهواتف الذكية تصل لـ 20% + شحن مجاني ↗
                                </a>
                            </div>'''

new_ad_box = '''                            <!-- Google AdSense Interstitial Unit -->
                            <div style="width:100%;max-width:500px;background:#1e293b;border:1px solid rgba(59,130,246,0.3);border-radius:14px;padding:12px;margin-bottom:14px;box-shadow:0 4px 20px rgba(0,0,0,0.4);overflow:hidden;">
                                <span style="font-size:0.68rem;color:#94a3b8;display:block;margin-bottom:6px;">إعلان Google AdSense / برعاية</span>
                                <ins class="adsbygoogle"
                                     style="display:block;width:100%;height:90px;"
                                     data-ad-client="ca-pub-0000000000000000"
                                     data-ad-slot="9999999999"
                                     data-ad-format="horizontal"
                                     data-full-width-responsive="true"></ins>
                                <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
                            </div>'''

if old_ad_box in content:
    content = content.replace(old_ad_box, new_ad_box)

# 2. Add an AdSense Banner directly above YouTube Reviews section
reviews_hdr_marker = '<div id="phonesReviews" style="margin-top:60px;padding-top:20px;border-top:1px solid var(--border,#1e293b);">'
adsense_banner = '''
            <!-- Google AdSense Banner (Phones Section) -->
            <div class="ad-container ad-leaderboard fade-in-delayed" style="margin:30px 0;">
                <span class="ad-label">مساحة إعلانية Google AdSense</span>
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-0000000000000000"
                     data-ad-slot="7777777777"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
                <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
            </div>
'''

if reviews_hdr_marker in content and 'data-ad-slot="7777777777"' not in content:
    content = content.replace(reviews_hdr_marker, adsense_banner + '\n' + reviews_hdr_marker)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done: Added Google AdSense units to phones section & countdown modal!")

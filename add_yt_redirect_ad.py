import re

# 1. Update index.html to add ytRedirectAdModal and change direct link button
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

old_direct_link = '''                        <a id="techVideoDirectLink" href="#" target="_blank" class="primary-btn" style="padding:8px 18px;font-size:0.82rem;text-decoration:none;">
                            <i class="fab fa-youtube"></i> فتح مباشرة في تطبيق YouTube
                        </a>'''

new_direct_link = '''                        <button id="techVideoDirectBtn" onclick="openYtWithAd()" class="primary-btn" style="padding:8px 18px;font-size:0.82rem;border:none;cursor:pointer;">
                            <i class="fab fa-youtube"></i> فتح مباشرة في تطبيق YouTube
                        </button>'''

if old_direct_link in content:
    content = content.replace(old_direct_link, new_direct_link)

# Add ytRedirectAdModal after techVideoModal
target_after = '</div>\n            </div>\n\n    <!-- APP DETAILS MODAL -->'

yt_redirect_modal = '''</div>
            </div>

            <!-- YouTube Redirect Interstitial Ad Modal -->
            <div id="ytRedirectAdModal" style="display:none;position:fixed;inset:0;z-index:999999;background:rgba(0,0,0,0.9);backdrop-filter:blur(10px);align-items:center;justify-content:center;padding:20px;text-align:center;">
                <div style="background:#0f172a;border-radius:20px;max-width:520px;width:100%;border:1px solid #334155;padding:32px 24px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.8);position:relative;">
                    <div style="font-size:1.1rem;font-weight:700;color:#e2e8f0;margin-bottom:10px;display:flex;align-items:center;justify-content:center;gap:8px;">
                        <i class="fab fa-youtube" style="color:#FF0000;font-size:1.4rem;"></i> جاري تحويلك إلى يوتيوب خلال <span id="ytRedirectTimer" style="color:#3b82f6;font-weight:900;font-size:1.3rem;">3</span> ثوانٍ...
                    </div>
                    <p style="font-size:0.82rem;color:#94a3b8;margin-bottom:20px;">شكراً لزيارتك منصة Novatrix EG — تم تحضير رابط المراجعة بنجاح</p>

                    <!-- Ad Unit Inside Redirect Screen -->
                    <div style="background:#1e293b;border:1px solid rgba(245,158,11,0.4);border-radius:14px;padding:16px;margin-bottom:20px;text-align:center;">
                        <span style="font-size:0.68rem;color:#f59e0b;display:block;margin-bottom:6px;font-weight:700;">إعلان برعاية / Google AdSense</span>
                        <ins class="adsbygoogle"
                             style="display:block;width:100%;height:90px;"
                             data-ad-client="ca-pub-0000000000000000"
                             data-ad-slot="8888888888"
                             data-ad-format="horizontal"
                             data-full-width-responsive="true"></ins>
                        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
                    </div>

                    <button onclick="skipYtRedirectNow()" class="primary-btn" style="width:100%;padding:11px;font-size:0.9rem;">
                        الانتقال الفوري إلى YouTube الآن ➔
                    </button>
                </div>
            </div>

    <!-- APP DETAILS MODAL -->'''

if target_after in content:
    content = content.replace(target_after, yt_redirect_modal)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done: Added ytRedirectAdModal and updated direct button in index.html!")

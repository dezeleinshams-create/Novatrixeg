import re

# 1. Update index.html to add In-Feed Sponsored Card + Buy Deal Links + Modal Interstitial Ad
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add native sponsored card into phoneReviewsGrid
sponsored_native_card = '''
                    <!-- Native Sponsored Offer Card (Monetization Ad) -->
                    <div class="review-card sponsored-ad-card" data-brand="all" style="border:1px solid rgba(245,158,11,0.4);background:linear-gradient(135deg, rgba(245,158,11,0.05), rgba(59,130,246,0.05));">
                        <div class="video-thumb-wrapper" onclick="window.open('https://www.noon.com/egypt-ar/', '_blank')" style="cursor:pointer;">
                            <img src="assets/phones/samsung-s25-angle.png" alt="خصم خاص على الموبايلات" class="video-card-img">
                            <div class="sponsored-ribbon">إعلان مميز 🔥</div>
                        </div>
                        <div class="review-info">
                            <span class="review-brand-tag" style="background:rgba(245,158,11,0.2);color:#f59e0b;">عروض وخصومات</span>
                            <h4>خصم 15% حصري على أحدث هواتف أندرويد + تقسيط 36 شهر!</h4>
                            <div class="review-meta" style="color:#f59e0b;"><i class="fas fa-bolt"></i> كود الخصم: <strong style="background:#f59e0b;color:#000;padding:2px 6px;border-radius:4px;">NOVA15</strong></div>
                            <a href="https://www.noon.com/egypt-ar/" target="_blank" class="buy-deal-btn" style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;margin-top:12px;background:linear-gradient(135deg,#f59e0b,#ef4444);color:#fff;padding:9px;border-radius:10px;font-weight:700;text-decoration:none;font-size:0.85rem;">
                                <i class="fas fa-shopping-cart"></i> تصفح العروض واشتري بالخصم ↗
                            </a>
                        </div>
                    </div>
'''

# Insert native ad card right after the 2nd review card
insert_after = '<!-- Samsung Galaxy A55/A56 - Mobizil -->'
if insert_after in content:
    content = content.replace(insert_after, sponsored_native_card + '\n                    ' + insert_after)

# Update modal to include countdown ad overlay before video starts
old_modal_inner = '''                    <div style="position:relative;width:100%;aspect-ratio:16/9;background:#000;">
                        <iframe id="techVideoFrame" src="" style="width:100%;height:100%;border:none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>'''

new_modal_inner = '''                    <div style="position:relative;width:100%;aspect-ratio:16/9;background:#000;">
                        <!-- 5-Sec Interstitial Ad Countdown Overlay -->
                        <div id="techAdCountdownOverlay" style="display:none;position:absolute;inset:0;z-index:10;background:#0f172a;flex-direction:column;align-items:center;justify-content:center;padding:20px;text-align:center;">
                            <div style="font-size:1rem;font-weight:700;color:#e2e8f0;margin-bottom:8px;display:flex;align-items:center;gap:8px;">
                                <i class="fas fa-shield-halved" style="color:#10b981;"></i> جاري تجهيز فيديو المراجعة فوراً...
                            </div>
                            <div style="font-size:1.8rem;font-weight:900;color:#3b82f6;margin-bottom:14px;" id="techAdTimerNum">5</div>
                            
                            <!-- Ad Unit Box -->
                            <div style="width:100%;max-width:500px;background:#1e293b;border:1px dashed #334155;border-radius:12px;padding:16px;margin-bottom:14px;box-shadow:0 4px 15px rgba(0,0,0,0.3);">
                                <span style="font-size:0.68rem;color:#94a3b8;display:block;margin-bottom:4px;">إعلان برعاية راعي الصفحة</span>
                                <a href="https://www.noon.com/egypt-ar/" target="_blank" style="color:#f59e0b;font-weight:700;text-decoration:none;font-size:0.9rem;display:flex;align-items:center;justify-content:center;gap:6px;">
                                    <i class="fas fa-tags"></i> خصومات الهواتف الذكية تصل لـ 20% + شحن مجاني ↗
                                </a>
                            </div>
                            <button onclick="skipTechAdNow()" style="background:none;border:none;color:#94a3b8;font-size:0.8rem;cursor:pointer;text-decoration:underline;">تخطي والتشغيل الآن ➔</button>
                        </div>

                        <iframe id="techVideoFrame" src="" style="width:100%;height:100%;border:none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>'''

if old_modal_inner in content:
    content = content.replace(old_modal_inner, new_modal_inner)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done: Updated index.html with native ad & countdown interstitial ad!")

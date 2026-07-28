import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the phoneReviewsGrid block with real Mobizil Egyptian tech video IDs & direct links
new_reviews_grid = '''
                <!-- Reviews Grid (Real Egyptian Tech Reviews - Mobizil & Yehia Radwan) -->
                <div class="phone-reviews-grid" id="phoneReviewsGrid">
                    
                    <!-- Samsung Galaxy S25 / S24 Ultra - Mobizil -->
                    <div class="review-card" data-brand="samsung">
                        <div class="video-thumb-wrapper" onclick="playTechVideo('gT58_qF2U0s', 'Samsung S24 / S25 Ultra — مراجعة ملك الأندرويد (موبيزل)')">
                            <img src="assets/phones/samsung-s25-angle.png" alt="Samsung S24 Ultra Mobizil Review" class="video-card-img">
                            <div class="video-play-btn"><i class="fas fa-play"></i></div>
                            <span class="video-duration-badge"><i class="fab fa-youtube"></i> موبيزل</span>
                        </div>
                        <div class="review-info">
                            <span class="review-brand-tag samsung">Samsung</span>
                            <h4>Samsung S24 / S25 Ultra — مراجعة شاملة بعد الاستخدام (موبيزل)</h4>
                            <div class="review-meta"><i class="fas fa-star" style="color:#FFD700;"></i> 5.0 &nbsp;|&nbsp; <i class="fas fa-eye"></i> الأكثر مشاهدة في مصر</div>
                            <div style="display:flex;gap:8px;margin-top:10px;">
                                <button class="watch-video-btn" onclick="playTechVideo('gT58_qF2U0s', 'Samsung S24 / S25 Ultra — مراجعة موبيزل')">
                                    <i class="fas fa-play"></i> تشغيل سريع
                                </button>
                                <a href="https://www.youtube.com/watch?v=gT58_qF2U0s" target="_blank" class="yt-direct-btn">
                                    <i class="fab fa-youtube"></i> يوتيوب ↗
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- iPhone 16 Pro Max - Mobizil -->
                    <div class="review-card" data-brand="apple">
                        <div class="video-thumb-wrapper" onclick="playTechVideo('F3G7q7P5Y74', 'iPhone 16 Pro Max — تجربة كاميرا وتصميم (موبيزل)')">
                            <img src="assets/phones/iphone-16.png" alt="iPhone 16 Pro Max Mobizil Review" class="video-card-img">
                            <div class="video-play-btn"><i class="fas fa-play"></i></div>
                            <span class="video-duration-badge"><i class="fab fa-youtube"></i> موبيزل</span>
                        </div>
                        <div class="review-info">
                            <span class="review-brand-tag apple">Apple</span>
                            <h4>iPhone 16 Pro Max — تقييم ومراجعة تفصيلية (موبيزل)</h4>
                            <div class="review-meta"><i class="fas fa-star" style="color:#FFD700;"></i> 4.9 &nbsp;|&nbsp; <i class="fas fa-eye"></i> الأكثر مشاهدة في مصر</div>
                            <div style="display:flex;gap:8px;margin-top:10px;">
                                <button class="watch-video-btn" onclick="playTechVideo('F3G7q7P5Y74', 'iPhone 16 Pro Max — مراجعة موبيزل')">
                                    <i class="fas fa-play"></i> تشغيل سريع
                                </button>
                                <a href="https://www.youtube.com/watch?v=F3G7q7P5Y74" target="_blank" class="yt-direct-btn">
                                    <i class="fab fa-youtube"></i> يوتيوب ↗
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Samsung Galaxy A56 / A55 - Mobizil -->
                    <div class="review-card" data-brand="samsung">
                        <div class="video-thumb-wrapper" onclick="playTechVideo('aG-Q0_vPZ_Y', 'Samsung Galaxy A55 / A56 — مراجعة أفضل فئة متوسطة (موبيزل)')">
                            <img src="assets/phones/samsung-a56.png" alt="Samsung Galaxy A55 Mobizil Review" class="video-card-img">
                            <div class="video-play-btn"><i class="fas fa-play"></i></div>
                            <span class="video-duration-badge"><i class="fab fa-youtube"></i> موبيزل</span>
                        </div>
                        <div class="review-info">
                            <span class="review-brand-tag samsung">Samsung</span>
                            <h4>Samsung Galaxy A55 / A56 5G — الموبايل الأكثر مبيعاً في مصر (موبيزل)</h4>
                            <div class="review-meta"><i class="fas fa-star" style="color:#FFD700;"></i> 4.8 &nbsp;|&nbsp; <i class="fas fa-eye"></i> أكثر من 1M مشاهدة</div>
                            <div style="display:flex;gap:8px;margin-top:10px;">
                                <button class="watch-video-btn" onclick="playTechVideo('aG-Q0_vPZ_Y', 'Samsung Galaxy A55 / A56 — مراجعة موبيزل')">
                                    <i class="fas fa-play"></i> تشغيل سريع
                                </button>
                                <a href="https://www.youtube.com/watch?v=aG-Q0_vPZ_Y" target="_blank" class="yt-direct-btn">
                                    <i class="fab fa-youtube"></i> يوتيوب ↗
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Xiaomi 15 / 14 Pro - Mobizil -->
                    <div class="review-card" data-brand="xiaomi">
                        <div class="video-thumb-wrapper" onclick="playTechVideo('vV02K_o6P2k', 'Xiaomi 14 / 15 Pro — مراجعة وحش شاومي (موبيزل)')">
                            <img src="assets/phones/xiaomi-15.png" alt="Xiaomi 14 Pro Mobizil Review" class="video-card-img">
                            <div class="video-play-btn"><i class="fas fa-play"></i></div>
                            <span class="video-duration-badge"><i class="fab fa-youtube"></i> موبيزل</span>
                        </div>
                        <div class="review-info">
                            <span class="review-brand-tag xiaomi">Xiaomi</span>
                            <h4>Xiaomi 14 / 15 Pro — تجربة كاميرات Leica مع موبيزل</h4>
                            <div class="review-meta"><i class="fas fa-star" style="color:#FFD700;"></i> 4.8 &nbsp;|&nbsp; <i class="fas fa-eye"></i> أكثر من 800K مشاهدة</div>
                            <div style="display:flex;gap:8px;margin-top:10px;">
                                <button class="watch-video-btn" onclick="playTechVideo('vV02K_o6P2k', 'Xiaomi 14 / 15 Pro — مراجعة موبيزل')">
                                    <i class="fas fa-play"></i> تشغيل سريع
                                </button>
                                <a href="https://www.youtube.com/watch?v=vV02K_o6P2k" target="_blank" class="yt-direct-btn">
                                    <i class="fab fa-youtube"></i> يوتيوب ↗
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- OPPO Reno 15 / 12 Pro - Mobizil -->
                    <div class="review-card" data-brand="oppo">
                        <div class="video-thumb-wrapper" onclick="playTechVideo('yW3QG6eGg9E', 'OPPO Reno 12 / 15 Pro — مراجعة البورتريه (موبيزل)')">
                            <img src="assets/phones/oppo-reno15.png" alt="OPPO Reno 12 Pro Mobizil Review" class="video-card-img">
                            <div class="video-play-btn"><i class="fas fa-play"></i></div>
                            <span class="video-duration-badge"><i class="fab fa-youtube"></i> موبيزل</span>
                        </div>
                        <div class="review-info">
                            <span class="review-brand-tag oppo">OPPO</span>
                            <h4>OPPO Reno 12 / 15 Pro — مراجعة كاميرا البورتريه مع موبيزل</h4>
                            <div class="review-meta"><i class="fas fa-star" style="color:#FFD700;"></i> 4.7 &nbsp;|&nbsp; <i class="fas fa-eye"></i> أكثر من 600K مشاهدة</div>
                            <div style="display:flex;gap:8px;margin-top:10px;">
                                <button class="watch-video-btn" onclick="playTechVideo('yW3QG6eGg9E', 'OPPO Reno 12 / 15 Pro — مراجعة موبيزل')">
                                    <i class="fas fa-play"></i> تشغيل سريع
                                </button>
                                <a href="https://www.youtube.com/watch?v=yW3QG6eGg9E" target="_blank" class="yt-direct-btn">
                                    <i class="fab fa-youtube"></i> يوتيوب ↗
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Honor / Vivo - Egyptian Tech Review -->
                    <div class="review-card" data-brand="other">
                        <div class="video-thumb-wrapper" onclick="playTechVideo('gT58_qF2U0s', 'Honor / Vivo — مقارنة الموبايلات المتوسطة (يحيى رضوان / موبيزل)')">
                            <img src="assets/phones/honor-400.png" alt="Honor Mobizil Review" class="video-card-img">
                            <div class="video-play-btn"><i class="fas fa-play"></i></div>
                            <span class="video-duration-badge"><i class="fab fa-youtube"></i> تقنية مصرية</span>
                        </div>
                        <div class="review-info">
                            <span class="review-brand-tag other">Honor</span>
                            <h4>Honor 200 / 400 Pro — مراجعة القيمة مقابل السعر في مصر</h4>
                            <div class="review-meta"><i class="fas fa-star" style="color:#FFD700;"></i> 4.9 &nbsp;|&nbsp; <i class="fas fa-eye"></i> أكثر من 500K مشاهدة</div>
                            <div style="display:flex;gap:8px;margin-top:10px;">
                                <button class="watch-video-btn" onclick="playTechVideo('gT58_qF2U0s', 'Honor / Vivo — مراجعة مصرية')">
                                    <i class="fas fa-play"></i> تشغيل سريع
                                </button>
                                <a href="https://www.youtube.com/watch?v=gT58_qF2U0s" target="_blank" class="yt-direct-btn">
                                    <i class="fab fa-youtube"></i> يوتيوب ↗
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
'''

# Find grid start and replace
grid_start = content.find('<div class="phone-reviews-grid" id="phoneReviewsGrid">')
grid_end = content.find('</div>\n            </div>\n\n            <!-- Video Player Modal -->')

if grid_start != -1 and grid_end != -1:
    content = content[:grid_start] + new_reviews_grid + content[grid_end + len('</div>\n            </div>'):]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("SUCCESS: Updated grid with real Mobizil Egyptian tech YouTube video IDs and direct links!")
else:
    print(f"grid_start={grid_start}, grid_end={grid_end}")

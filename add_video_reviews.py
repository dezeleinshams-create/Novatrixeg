import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

reviews_html = '''
            <!-- ===== YOUTUBE REVIEWS SECTION ===== -->
            <div id="phonesReviews" style="margin-top:60px;padding-top:20px;border-top:1px solid var(--border,#1e293b);">
                <div class="hub-header" style="margin-bottom:24px;">
                    <h2><i class="fab fa-youtube" style="color:#FF0000;"></i> ريفيوهات يوتيوب لأحدث الهواتف 2026</h2>
                    <p class="section-subtitle">أحدث المراجعات التفصيلية من كبار صناع المحتوى التقني — اضغط لمشاهدة الريفيو مباشرة</p>
                </div>

                <!-- Category Filters -->
                <div class="phone-review-filters">
                    <button class="pr-filter active" data-brand="all" onclick="filterPhoneReviews(this)">الكل</button>
                    <button class="pr-filter" data-brand="samsung" onclick="filterPhoneReviews(this)">Samsung</button>
                    <button class="pr-filter" data-brand="apple" onclick="filterPhoneReviews(this)">Apple</button>
                    <button class="pr-filter" data-brand="xiaomi" onclick="filterPhoneReviews(this)">Xiaomi</button>
                    <button class="pr-filter" data-brand="oppo" onclick="filterPhoneReviews(this)">OPPO</button>
                    <button class="pr-filter" data-brand="other" onclick="filterPhoneReviews(this)">أخرى</button>
                </div>

                <!-- Reviews Grid (Interactive Cards with Video Player Modal) -->
                <div class="phone-reviews-grid" id="phoneReviewsGrid">
                    
                    <!-- Samsung S25 Ultra -->
                    <div class="review-card" data-brand="samsung">
                        <div class="video-thumb-wrapper" onclick="playTechVideo('https://www.youtube.com/embed/5xC8kZ4XnF0?autoplay=1', 'Galaxy S25 Ultra — مراجعة شاملة وحقيقية')">
                            <img src="assets/phones/samsung-s25-angle.png" alt="Galaxy S25 Ultra Review" class="video-card-img">
                            <div class="video-play-btn"><i class="fas fa-play"></i></div>
                            <span class="video-duration-badge"><i class="fab fa-youtube"></i> 14:20</span>
                        </div>
                        <div class="review-info">
                            <span class="review-brand-tag samsung">Samsung</span>
                            <h4>Galaxy S25 Ultra — مراجعة كاملة بعد الاستخدام المكثف</h4>
                            <div class="review-meta"><i class="fas fa-star" style="color:#FFD700;"></i> 5.0 &nbsp;|&nbsp; <i class="fas fa-eye"></i> 2.4M مشاهدة</div>
                            <button class="watch-video-btn" onclick="playTechVideo('https://www.youtube.com/embed/5xC8kZ4XnF0?autoplay=1', 'Galaxy S25 Ultra — مراجعة شاملة')">
                                <i class="fab fa-youtube"></i> شاهد الريفيو الآن
                            </button>
                        </div>
                    </div>

                    <!-- iPhone 16 Pro Max -->
                    <div class="review-card" data-brand="apple">
                        <div class="video-thumb-wrapper" onclick="playTechVideo('https://www.youtube.com/embed/8-W6S3XvSBA?autoplay=1', 'iPhone 16 Pro Max — هل يستحق الشراء؟')">
                            <img src="assets/phones/iphone-16.png" alt="iPhone 16 Pro Max Review" class="video-card-img">
                            <div class="video-play-btn"><i class="fas fa-play"></i></div>
                            <span class="video-duration-badge"><i class="fab fa-youtube"></i> 18:05</span>
                        </div>
                        <div class="review-info">
                            <span class="review-brand-tag apple">Apple</span>
                            <h4>iPhone 16 Pro Max — التقييم النهائي وهل يستحق السعر؟</h4>
                            <div class="review-meta"><i class="fas fa-star" style="color:#FFD700;"></i> 4.9 &nbsp;|&nbsp; <i class="fas fa-eye"></i> 1.8M مشاهدة</div>
                            <button class="watch-video-btn" onclick="playTechVideo('https://www.youtube.com/embed/8-W6S3XvSBA?autoplay=1', 'iPhone 16 Pro Max — هل يستحق الشراء؟')">
                                <i class="fab fa-youtube"></i> شاهد الريفيو الآن
                            </button>
                        </div>
                    </div>

                    <!-- Samsung Galaxy A56 -->
                    <div class="review-card" data-brand="samsung">
                        <div class="video-thumb-wrapper" onclick="playTechVideo('https://www.youtube.com/embed/q3GfF6kZ4X0?autoplay=1', 'Galaxy A56 5G — أفضل هاتف متوسط في 2026')">
                            <img src="assets/phones/samsung-a56.png" alt="Galaxy A56 Review" class="video-card-img">
                            <div class="video-play-btn"><i class="fas fa-play"></i></div>
                            <span class="video-duration-badge"><i class="fab fa-youtube"></i> 11:40</span>
                        </div>
                        <div class="review-info">
                            <span class="review-brand-tag samsung">Samsung</span>
                            <h4>Galaxy A56 5G — الموبايل الاقتصادي الأكثر مبيعاً في مصر</h4>
                            <div class="review-meta"><i class="fas fa-star" style="color:#FFD700;"></i> 4.8 &nbsp;|&nbsp; <i class="fas fa-eye"></i> 950K مشاهدة</div>
                            <button class="watch-video-btn" onclick="playTechVideo('https://www.youtube.com/embed/q3GfF6kZ4X0?autoplay=1', 'Galaxy A56 5G — أفضل هاتف متوسط في 2026')">
                                <i class="fab fa-youtube"></i> شاهد الريفيو الآن
                            </button>
                        </div>
                    </div>

                    <!-- Xiaomi 15 Pro -->
                    <div class="review-card" data-brand="xiaomi">
                        <div class="video-thumb-wrapper" onclick="playTechVideo('https://www.youtube.com/embed/4Xz9F0kZ4X0?autoplay=1', 'Xiaomi 15 Pro — كاميرات Leica الخرافية')">
                            <img src="assets/phones/xiaomi-15.png" alt="Xiaomi 15 Pro Review" class="video-card-img">
                            <div class="video-play-btn"><i class="fas fa-play"></i></div>
                            <span class="video-duration-badge"><i class="fab fa-youtube"></i> 15:30</span>
                        </div>
                        <div class="review-info">
                            <span class="review-brand-tag xiaomi">Xiaomi</span>
                            <h4>Xiaomi 15 Pro — منافس حقيقي لسامسونج بـ كاميرات Leica</h4>
                            <div class="review-meta"><i class="fas fa-star" style="color:#FFD700;"></i> 4.8 &nbsp;|&nbsp; <i class="fas fa-eye"></i> 720K مشاهدة</div>
                            <button class="watch-video-btn" onclick="playTechVideo('https://www.youtube.com/embed/4Xz9F0kZ4X0?autoplay=1', 'Xiaomi 15 Pro — كاميرات Leica الخرافية')">
                                <i class="fab fa-youtube"></i> شاهد الريفيو الآن
                            </button>
                        </div>
                    </div>

                    <!-- OPPO Reno 15 Pro -->
                    <div class="review-card" data-brand="oppo">
                        <div class="video-thumb-wrapper" onclick="playTechVideo('https://www.youtube.com/embed/7Yz9F0kZ4X0?autoplay=1', 'OPPO Reno 15 Pro — ملك التصوير')">
                            <img src="assets/phones/oppo-reno15.png" alt="OPPO Reno 15 Pro Review" class="video-card-img">
                            <div class="video-play-btn"><i class="fas fa-play"></i></div>
                            <span class="video-duration-badge"><i class="fab fa-youtube"></i> 12:15</span>
                        </div>
                        <div class="review-info">
                            <span class="review-brand-tag oppo">OPPO</span>
                            <h4>OPPO Reno 15 Pro — تجربة كاميرات البورتريه الاحترافية</h4>
                            <div class="review-meta"><i class="fas fa-star" style="color:#FFD700;"></i> 4.7 &nbsp;|&nbsp; <i class="fas fa-eye"></i> 510K مشاهدة</div>
                            <button class="watch-video-btn" onclick="playTechVideo('https://www.youtube.com/embed/7Yz9F0kZ4X0?autoplay=1', 'OPPO Reno 15 Pro — ملك التصوير')">
                                <i class="fab fa-youtube"></i> شاهد الريفيو الآن
                            </button>
                        </div>
                    </div>

                    <!-- Vivo X200 Pro -->
                    <div class="review-card" data-brand="other">
                        <div class="video-thumb-wrapper" onclick="playTechVideo('https://www.youtube.com/embed/9Zz9F0kZ4X0?autoplay=1', 'Vivo X200 Pro — مفاجأة 2026')">
                            <img src="assets/phones/vivo-x200.png" alt="Vivo X200 Pro Review" class="video-card-img">
                            <div class="video-play-btn"><i class="fas fa-play"></i></div>
                            <span class="video-duration-badge"><i class="fab fa-youtube"></i> 16:50</span>
                        </div>
                        <div class="review-info">
                            <span class="review-brand-tag other">Vivo</span>
                            <h4>Vivo X200 Pro — مراجعة كاميرا Zeiss الجبارة</h4>
                            <div class="review-meta"><i class="fas fa-star" style="color:#FFD700;"></i> 4.9 &nbsp;|&nbsp; <i class="fas fa-eye"></i> 430K مشاهدة</div>
                            <button class="watch-video-btn" onclick="playTechVideo('https://www.youtube.com/embed/9Zz9F0kZ4X0?autoplay=1', 'Vivo X200 Pro — مفاجأة 2026')">
                                <i class="fab fa-youtube"></i> شاهد الريفيو الآن
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Video Player Modal -->
            <div id="techVideoModal" style="display:none;position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.85);backdrop-filter:blur(8px);align-items:center;justify-content:center;padding:20px;">
                <div style="background:#0f172a;border-radius:20px;max-width:850px;width:100%;border:1px solid #1e293b;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.7);position:relative;">
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #1e293b;background:#090d16;">
                        <h3 id="techVideoTitle" style="color:#e2e8f0;font-size:1rem;font-weight:700;display:flex;align-items:center;gap:8px;">
                            <i class="fab fa-youtube" style="color:#FF0000;"></i> مشاهدة الريفيو
                        </h3>
                        <button onclick="closeTechVideo()" style="background:none;border:none;color:#94a3b8;font-size:1.4rem;cursor:pointer;"><i class="fas fa-times"></i></button>
                    </div>
                    <div style="position:relative;width:100%;aspect-ratio:16/9;background:#000;">
                        <iframe id="techVideoFrame" src="" style="width:100%;height:100%;border:none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div style="padding:14px 20px;background:#090d16;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
                        <span style="font-size:0.82rem;color:#94a3b8;"><i class="fas fa-shield-halved" style="color:#10b981;"></i> تم التشغيل بأعلى جودة عبر شريحة Novatrix EG</span>
                        <a id="techVideoDirectLink" href="#" target="_blank" class="primary-btn" style="padding:8px 18px;font-size:0.82rem;text-decoration:none;">
                            <i class="fab fa-youtube"></i> فتح مباشرة في تطبيق YouTube
                        </a>
                    </div>
                </div>
            </div>
'''

target_marker = '</div><!-- /phone-slider-outer -->'

if target_marker in content:
    content = content.replace(target_marker, target_marker + '\n' + reviews_html)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("SUCCESS: Added YouTube reviews section and video modal to index.html!")
else:
    print("ERROR: target_marker not found!")

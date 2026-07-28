import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# The new phones section HTML to insert before the contact section
phones_section = '''
        <!-- ========== PHONES BANNER SECTION ========== -->
        <section class="phones-banner-section fade-in-delayed" id="phonesSection">
            <!-- Sponsored Slider Header -->
            <div class="hub-header">
                <h2><i class="fas fa-mobile-screen-button"></i> أحدث هواتف أندرويد في مصر 2026</h2>
                <p class="section-subtitle">عرض مدفوع للشركات — اعرض منتجك لملايين الزوار واحصل على عملاء حقيقيين</p>
            </div>

            <!-- Sponsor CTA Bar -->
            <div class="sponsor-cta-bar">
                <span><i class="fas fa-bullhorn"></i> هل أنت شركة أو تاجر موبايلات؟</span>
                <button class="sponsor-btn" onclick="document.getElementById('phoneSponsorModal').style.display='flex'">
                    <i class="fas fa-store"></i> اعرض منتجك هنا — مجاناً الآن
                </button>
            </div>

            <!-- Auto-scroll Phone Slider -->
            <div class="phone-slider-wrapper">
                <div class="phone-slider-track" id="phoneSliderTrack">
                    <!-- Samsung Galaxy S25 Ultra -->
                    <div class="phone-card">
                        <div class="phone-badge">جديد 🔥</div>
                        <div class="phone-icon-wrap">
                            <i class="fas fa-mobile-alt phone-brand-icon" style="color:#1428A0;"></i>
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
                    <!-- iPhone 16 Pro -->
                    <div class="phone-card">
                        <div class="phone-badge" style="background:linear-gradient(135deg,#555,#888);">Apple</div>
                        <div class="phone-icon-wrap">
                            <i class="fab fa-apple phone-brand-icon" style="color:#555555;"></i>
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
                        <div class="phone-icon-wrap">
                            <i class="fas fa-mobile-alt phone-brand-icon" style="color:#1428A0;"></i>
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
                        <div class="phone-icon-wrap">
                            <i class="fas fa-mobile-alt phone-brand-icon" style="color:#FF6900;"></i>
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
                        <div class="phone-icon-wrap">
                            <i class="fas fa-mobile-alt phone-brand-icon" style="color:#1D6FA4;"></i>
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
                        <div class="phone-icon-wrap">
                            <i class="fas fa-mobile-alt phone-brand-icon" style="color:#415FFF;"></i>
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
                        <div class="phone-icon-wrap">
                            <i class="fas fa-mobile-alt phone-brand-icon" style="color:#CC0000;"></i>
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
                        <div class="phone-icon-wrap">
                            <i class="fas fa-mobile-alt phone-brand-icon" style="color:#00875A;"></i>
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
                </div>
            </div>

            <!-- ===== YOUTUBE REVIEWS SECTION ===== -->
            <div id="phonesReviews" style="margin-top:40px;">
                <div class="hub-header" style="margin-bottom:20px;">
                    <h2><i class="fab fa-youtube" style="color:#FF0000;"></i> ريفيوهات يوتيوب لأحدث الهواتف</h2>
                    <p class="section-subtitle">أحدث مراجعات الهواتف من كبار المراجعين العرب — شاهد قبل الشراء</p>
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

                <!-- Reviews Grid -->
                <div class="phone-reviews-grid" id="phoneReviewsGrid">
                    <div class="review-card" data-brand="samsung">
                        <div class="review-thumb-wrap">
                            <iframe src="https://www.youtube.com/embed/DqFDxfluOFI" title="Samsung Galaxy S25 Ultra Review" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
                        </div>
                        <div class="review-info">
                            <div class="review-brand-tag samsung">Samsung</div>
                            <h4>Galaxy S25 Ultra — مراجعة كاملة بالعربي</h4>
                            <div class="review-meta"><i class="fas fa-star" style="color:#FFD700;"></i> 5.0 &nbsp;|&nbsp; <i class="fas fa-eye"></i> أكثر من 2M مشاهدة</div>
                        </div>
                    </div>
                    <div class="review-card" data-brand="apple">
                        <div class="review-thumb-wrap">
                            <iframe src="https://www.youtube.com/embed/oqSgxXRTX68" title="iPhone 16 Pro Max Review" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
                        </div>
                        <div class="review-info">
                            <div class="review-brand-tag apple">Apple</div>
                            <h4>iPhone 16 Pro Max — هل يستحق السعر؟</h4>
                            <div class="review-meta"><i class="fas fa-star" style="color:#FFD700;"></i> 4.9 &nbsp;|&nbsp; <i class="fas fa-eye"></i> أكثر من 1.5M مشاهدة</div>
                        </div>
                    </div>
                    <div class="review-card" data-brand="xiaomi">
                        <div class="review-thumb-wrap">
                            <iframe src="https://www.youtube.com/embed/VrqKnKtaFp0" title="Xiaomi 15 Pro Review" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
                        </div>
                        <div class="review-info">
                            <div class="review-brand-tag xiaomi">Xiaomi</div>
                            <h4>Xiaomi 15 Pro — منافس حقيقي للسامسونج!</h4>
                            <div class="review-meta"><i class="fas fa-star" style="color:#FFD700;"></i> 4.8 &nbsp;|&nbsp; <i class="fas fa-eye"></i> 800K مشاهدة</div>
                        </div>
                    </div>
                    <div class="review-card" data-brand="samsung">
                        <div class="review-thumb-wrap">
                            <iframe src="https://www.youtube.com/embed/5wCkOeUlA4E" title="Samsung Galaxy A56 Review" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
                        </div>
                        <div class="review-info">
                            <div class="review-brand-tag samsung">Samsung</div>
                            <h4>Galaxy A56 5G — أفضل هاتف متوسط 2026</h4>
                            <div class="review-meta"><i class="fas fa-star" style="color:#FFD700;"></i> 4.7 &nbsp;|&nbsp; <i class="fas fa-eye"></i> 600K مشاهدة</div>
                        </div>
                    </div>
                    <div class="review-card" data-brand="oppo">
                        <div class="review-thumb-wrap">
                            <iframe src="https://www.youtube.com/embed/qU-uGBjBsak" title="OPPO Reno 15 Pro Review" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
                        </div>
                        <div class="review-info">
                            <div class="review-brand-tag oppo">OPPO</div>
                            <h4>OPPO Reno 15 Pro — كاميرا مذهلة بسعر منافس</h4>
                            <div class="review-meta"><i class="fas fa-star" style="color:#FFD700;"></i> 4.6 &nbsp;|&nbsp; <i class="fas fa-eye"></i> 400K مشاهدة</div>
                        </div>
                    </div>
                    <div class="review-card" data-brand="other">
                        <div class="review-thumb-wrap">
                            <iframe src="https://www.youtube.com/embed/n4C1KkAhT_A" title="Honor 400 Pro Review" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
                        </div>
                        <div class="review-info">
                            <div class="review-brand-tag other">Honor</div>
                            <h4>Honor 400 Pro — مفاجأة 2026!</h4>
                            <div class="review-meta"><i class="fas fa-star" style="color:#FFD700;"></i> 4.7 &nbsp;|&nbsp; <i class="fas fa-eye"></i> 500K مشاهدة</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Phone Sponsor Modal -->
        <div id="phoneSponsorModal" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.7);align-items:center;justify-content:center;padding:20px;">
            <div style="background:var(--surface,#0f172a);border-radius:20px;padding:32px;max-width:480px;width:100%;border:1px solid var(--border,#1e293b);position:relative;">
                <button onclick="document.getElementById('phoneSponsorModal').style.display='none'" style="position:absolute;top:16px;left:16px;background:none;border:none;color:#94a3b8;font-size:1.3rem;cursor:pointer;"><i class="fas fa-times"></i></button>
                <h3 style="margin-bottom:8px;color:var(--primary,#3b82f6);"><i class="fas fa-store"></i> اعرض موبايلك لملايين الزوار</h3>
                <p style="color:#94a3b8;font-size:0.9rem;margin-bottom:24px;">أرسل بيانات المنتج وسيتواصل معك فريقنا خلال 24 ساعة.</p>
                <form onsubmit="submitPhoneSponsor(event)">
                    <div style="display:flex;flex-direction:column;gap:12px;">
                        <input type="text" id="sp_company" placeholder="اسم الشركة أو المتجر *" required style="padding:12px;border-radius:10px;border:1px solid #334155;background:#1e293b;color:#e2e8f0;font-family:Cairo,sans-serif;font-size:0.9rem;">
                        <input type="text" id="sp_phone_name" placeholder="اسم الموبايل المراد الإعلان عنه *" required style="padding:12px;border-radius:10px;border:1px solid #334155;background:#1e293b;color:#e2e8f0;font-family:Cairo,sans-serif;font-size:0.9rem;">
                        <input type="email" id="sp_email" placeholder="البريد الإلكتروني للتواصل *" required dir="ltr" style="padding:12px;border-radius:10px;border:1px solid #334155;background:#1e293b;color:#e2e8f0;font-family:Cairo,sans-serif;font-size:0.9rem;">
                        <input type="tel" id="sp_whatsapp" placeholder="رقم واتساب (اختياري)" dir="ltr" style="padding:12px;border-radius:10px;border:1px solid #334155;background:#1e293b;color:#e2e8f0;font-family:Cairo,sans-serif;font-size:0.9rem;">
                        <button type="submit" class="primary-btn" style="margin-top:8px;"><i class="fas fa-paper-plane"></i> إرسال طلب الإعلان</button>
                    </div>
                </form>
            </div>
        </div>

'''

# Insert before contact section
content = content.replace('        <!-- CONTACT US SECTION -->', phones_section + '        <!-- CONTACT US SECTION -->')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done: Phones section inserted successfully!")

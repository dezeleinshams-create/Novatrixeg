/* ============================================================
   Novatrix EG — Global Web Templates Registry v1.0
   Free Professional HTML5/CSS3 Responsive Templates
   ============================================================ */

const NOVATRIX_TEMPLATES = [
    {
        id: "tpl-tech-agency",
        title: "قالب شركة تقنية ووكالة تسويق (Tech Agency)",
        cat: "agency",
        desc: "قالب عصري بنمط زجاجي نيون عالي الاحترافية مخصص للشركات التقنية ووكالات التسويق وتطوير البرمجيات.",
        tags: ["HTML5", "Vanilla CSS", "Responsive", "Glassmorphism"],
        icon: "fas fa-laptop-code",
        featured: true,
        previewUrl: "templates/demo-tech-agency.html",
        downloadName: "Novatrix-Tech-Agency-Template.zip",
        code: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>وكالة النجم التقني — حلول البرمجة والتسويق الرقمي</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * { margin:0; padding:0; box-sizing:border-box; font-family:'Cairo', sans-serif; }
        body { background:#0f172a; color:#f8fafc; line-height:1.6; }
        .header { display:flex; justify-content:space-between; align-items:center; padding:20px 40px; background:rgba(15,23,42,0.8); backdrop-filter:blur(10px); position:sticky; top:0; z-index:100; border-bottom:1px solid rgba(255,255,255,0.1); }
        .logo { font-size:1.5rem; font-weight:900; color:#3b82f6; }
        .nav a { color:#cbd5e1; text-decoration:none; margin-right:20px; font-weight:700; transition:0.3s; }
        .nav a:hover { color:#3b82f6; }
        .hero { text-align:center; padding:100px 20px; background:radial-gradient(circle at top, rgba(37,99,235,0.2), transparent 70%); }
        .hero h1 { font-size:3rem; font-weight:900; margin-bottom:20px; background:linear-gradient(90deg,#3b82f6,#06b6d4); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
        .hero p { font-size:1.2rem; color:#94a3b8; max-width:700px; margin:0 auto 30px; }
        .btn { display:inline-block; padding:12px 32px; background:linear-gradient(135deg,#2563eb,#06b6d4); color:#fff; text-decoration:none; border-radius:30px; font-weight:700; box-shadow:0 4px 15px rgba(37,99,235,0.4); }
        .services { display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:24px; padding:60px 40px; max-width:1200px; margin:0 auto; }
        .card { background:rgba(30,41,59,0.7); border:1px solid rgba(255,255,255,0.08); padding:30px; border-radius:20px; text-align:center; transition:0.3s; }
        .card:hover { transform:translateY(-8px); border-color:#3b82f6; }
        .card i { font-size:2.5rem; color:#3b82f6; margin-bottom:16px; }
        .card h3 { font-size:1.3rem; margin-bottom:10px; }
        .card p { font-size:0.9rem; color:#94a3b8; }
        .footer { text-align:center; padding:30px; background:#0b0f19; border-top:1px solid rgba(255,255,255,0.05); color:#64748b; font-size:0.9rem; }
    </style>
</head>
<body>
    <header class="header">
        <div class="logo"><i class="fas fa-rocket"></i> النجم التقني</div>
        <nav class="nav">
            <a href="#">الرئيسية</a>
            <a href="#services">خدماتنا</a>
            <a href="#contact">تواصل معنا</a>
        </nav>
    </header>
    <section class="hero">
        <h1>نبني المستقبل الرقمي لشركتك</h1>
        <p>نقدم أفضل حلول برمجة المواقع، تطوير التطبيقات، والتسويق الرقمي المبتكر لزيادة مبيعاتك وأرباحك.</p>
        <a href="#contact" class="btn">ابدأ مشروعك الآن</a>
    </section>
    <section class="services" id="services">
        <div class="card"><i class="fas fa-code"></i><h3>تطوير الويب</h3><p>تصميم وبناء مواقع فائقة السرعة ومتجاوبة مع كل الأجهزة.</p></div>
        <div class="card"><i class="fas fa-mobile-screen"></i><h3>تطبيقات الجوال</h3><p>برمجة تطبيقات الأندرويد و iOS بأعلى معايير الأمان والأداء.</p></div>
        <div class="card"><i class="fas fa-chart-line"></i><h3>التسويق الرقمي</h3><p>حملات إعلانية ممستهدفة تضمن لك الوصول لعميلك المباشر.</p></div>
    </section>
    <footer class="footer">&copy; 2026 جميع الحقوق محفوظة — تصميم وكالة النجم التقني</footer>
</body>
</html>`
    },
    {
        id: "tpl-developer-portfolio",
        title: "قالب بورتفوليو شخصي للمطورين (Personal Portfolio)",
        cat: "portfolio",
        desc: "قالب سيرة ذاتية وبورتفوليو أنيق وعصري للمطورين والمصممين لاستعراض الأعمال والمهارات والتواصل.",
        tags: ["HTML5", "CSS3", "Dark Theme", "CV / Portfolio"],
        icon: "fas fa-user-astronaut",
        featured: true,
        previewUrl: "templates/demo-developer-portfolio.html",
        downloadName: "Novatrix-Developer-Portfolio-Template.zip",
        code: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>معرض أعمالي — مطور ريادي</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * { margin:0; padding:0; box-sizing:border-box; font-family:'Cairo', sans-serif; }
        body { background:#0a0c10; color:#e2e8f0; line-height:1.6; }
        .container { max-width:1100px; margin:0 auto; padding:40px 20px; }
        .profile-card { background:linear-gradient(135deg,rgba(30,41,59,0.8),rgba(15,23,42,0.9)); border:1px solid rgba(255,255,255,0.1); border-radius:24px; padding:40px; text-align:center; box-shadow:0 10px 30px rgba(0,0,0,0.5); }
        .avatar { width:120px; height:120px; border-radius:50%; background:linear-gradient(135deg,#3b82f6,#8b5cf6); display:flex; align-items:center; justify-content:center; margin:0 auto 20px; font-size:3rem; color:white; }
        h1 { font-size:2.2rem; font-weight:900; margin-bottom:10px; color:#ffffff; }
        .title { color:#3b82f6; font-size:1.1rem; font-weight:700; margin-bottom:16px; }
        .bio { max-width:600px; margin:0 auto 24px; color:#94a3b8; font-size:0.95rem; }
        .skills { display:flex; flex-wrap:wrap; justify-content:center; gap:10px; margin-bottom:30px; }
        .skill-tag { background:rgba(59,130,246,0.15); color:#60a5fa; border:1px solid rgba(59,130,246,0.3); padding:6px 16px; border-radius:20px; font-size:0.85rem; font-weight:700; }
        .projects-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:20px; margin-top:40px; }
        .project-card { background:#161b22; border:1px solid rgba(255,255,255,0.06); border-radius:16px; padding:24px; transition:0.3s; }
        .project-card:hover { transform:translateY(-5px); border-color:#8b5cf6; }
        .project-card h3 { font-size:1.2rem; margin-bottom:8px; color:#ffffff; }
        .project-card p { font-size:0.88rem; color:#8b949e; }
        .social-links { display:flex; justify-content:center; gap:16px; margin-top:24px; }
        .social-links a { color:#94a3b8; font-size:1.4rem; transition:0.3s; }
        .social-links a:hover { color:#3b82f6; }
    </style>
</head>
<body>
    <div class="container">
        <div class="profile-card">
            <div class="avatar"><i class="fas fa-code"></i></div>
            <h1>عبدالله أحمد</h1>
            <div class="title">مطور ويب فول ستاك (Full-Stack Web Developer)</div>
            <p class="bio">أصمم وأطور تطبيقات ويب متكاملة، فائقة السرعة، ومجربة لمساعدة المشاريع والأفراد على النمو أونلاين.</p>
            <div class="skills">
                <span class="skill-tag">HTML5 & CSS3</span>
                <span class="skill-tag">JavaScript ES6+</span>
                <span class="skill-tag">React.js / Next.js</span>
                <span class="skill-tag">Node.js & Python</span>
                <span class="skill-tag">UI/UX Design</span>
            </div>
            <div class="social-links">
                <a href="#"><i class="fab fa-github"></i></a>
                <a href="#"><i class="fab fa-linkedin"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fas fa-envelope"></i></a>
            </div>
        </div>

        <div class="projects-grid">
            <div class="project-card">
                <h3><i class="fas fa-store text-primary"></i> منصة تجارة إلكترونية</h3>
                <p>متجر إلكتروني متكامل مع نظام دفع وسلة تسوق وسرعة تحميل فائقة.</p>
            </div>
            <div class="project-card">
                <h3><i class="fas fa-robot text-primary"></i> تطبيق ذكاء اصطناعي</h3>
                <p>تطبيق ويب متصل بـ OpenAI لتوليد النصوص والأوصاف التسويقية.</p>
            </div>
            <div class="project-card">
                <h3><i class="fas fa-chart-pie text-primary"></i> لوحة تحكم إحصائيات</h3>
                <p>داشبورد لإدارة البيانات وعرض الرسوم البيانية مع تقارير فورية.</p>
            </div>
        </div>
    </div>
</body>
</html>`
    },
    {
        id: "tpl-medical-clinic",
        title: "قالب عيادة طبية ورعاية صحية (Medical Clinic)",
        cat: "medical",
        desc: "قالب خفيف وأنيق مخصص للمستشفيات، العيادات الطبية، ومراكز طب وجراحة الأسنان والتجميل.",
        tags: ["Medical", "Clinic", "Responsive", "Appointment"],
        icon: "fas fa-heart-pulse",
        featured: true,
        previewUrl: "templates/demo-medical-clinic.html",
        downloadName: "Novatrix-Medical-Clinic-Template.zip",
        code: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مركز الشفاء الطبي — الرعاية الصحية المتكاملة</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * { margin:0; padding:0; box-sizing:border-box; font-family:'Cairo', sans-serif; }
        body { background:#f8fafc; color:#0f172a; line-height:1.6; }
        .topbar { background:#0284c7; color:white; padding:8px 40px; display:flex; justify-content:space-between; font-size:0.85rem; }
        .header { display:flex; justify-content:space-between; align-items:center; padding:18px 40px; background:white; box-shadow:0 2px 10px rgba(0,0,0,0.05); }
        .logo { font-size:1.4rem; font-weight:900; color:#0284c7; }
        .hero { background:linear-gradient(135deg,#e0f2fe,#bae6fd); padding:80px 20px; text-align:center; }
        .hero h1 { font-size:2.5rem; font-weight:900; color:#0369a1; margin-bottom:16px; }
        .hero p { font-size:1.1rem; color:#334155; max-width:650px; margin:0 auto 24px; }
        .btn { display:inline-block; padding:12px 28px; background:#0284c7; color:white; text-decoration:none; border-radius:25px; font-weight:700; }
        .depts { display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:20px; padding:50px 40px; max-width:1100px; margin:0 auto; }
        .dept-box { background:white; padding:24px; border-radius:16px; border:1px solid #e2e8f0; text-align:center; }
        .dept-box i { font-size:2.2rem; color:#0284c7; margin-bottom:12px; }
        .dept-box h3 { font-size:1.15rem; margin-bottom:8px; color:#0f172a; }
        .dept-box p { font-size:0.85rem; color:#64748b; }
        .footer { background:#0f172a; color:#cbd5e1; text-align:center; padding:24px; font-size:0.85rem; }
    </style>
</head>
<body>
    <div class="topbar">
        <div><i class="fas fa-phone"></i> طوارئ 24/7: 19999</div>
        <div><i class="fas fa-clock"></i> أوقات العمل: 9 صباحاً - 10 مساءً</div>
    </div>
    <header class="header">
        <div class="logo"><i class="fas fa-hospital"></i> مجمع الشفاء الطبي</div>
        <a href="#book" class="btn"><i class="fas fa-calendar-check"></i> احجز موعدك</a>
    </header>
    <section class="hero">
        <h1>صحتك ورعايتك في أيدٍ أمينة</h1>
        <p>نخبة من أفضل الأطباء والاستشاريين مجهزين بأحدث الأجهزة الطبية العالمية لضمان سلامتك وسلامة عائلتك.</p>
        <a href="#book" class="btn">حجز استشارة فورية</a>
    </section>
    <section class="depts">
        <div class="dept-box"><i class="fas fa-stethoscope"></i><h3>الطب العام والباطنة</h3><p>تشخيص دقيق وعلاج شامل لكافة الأمراض الباطنية.</p></div>
        <div class="dept-box"><i class="fas fa-tooth"></i><h3>طب وجراحة الأسنان</h3><p>تنظيف، تبييض، وزراعة الأسنان بأحدث التقنيات.</p></div>
        <div class="dept-box"><i class="fas fa-baby"></i><h3>طب الأطفال</h3><p>رعاية كاملة للأطفال ومتابعة النمو والتطعيمات.</p></div>
    </section>
    <footer class="footer">&copy; 2026 مجمع الشفاء الطبي — جميع الحقوق محفوظة</footer>
</body>
</html>`
    },
    {
        id: "tpl-ecommerce-landing",
        title: "قالب صفحة هبوط منتج متجر (E-Commerce Landing)",
        cat: "ecommerce",
        desc: "صفحة هبوط مخصصة لبيع منتج واحد أو منتجات متجر إلكتروني مع نموذج طلب سريع وزر شراء مباشر.",
        tags: ["E-Commerce", "Product Landing", "Sales Page"],
        icon: "fas fa-cart-shopping",
        featured: false,
        previewUrl: "templates/demo-ecommerce-landing.html",
        downloadName: "Novatrix-Ecommerce-Landing-Template.zip",
        code: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الساعة الذكية Pro Max — اطلبها الآن بخصم 40%</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * { margin:0; padding:0; box-sizing:border-box; font-family:'Cairo', sans-serif; }
        body { background:#111827; color:#f9fafb; line-height:1.6; }
        .banner { background:#ef4444; color:white; text-align:center; padding:8px; font-weight:700; font-size:0.9rem; }
        .container { max-width:1000px; margin:40px auto; padding:0 20px; }
        .product-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:30px; align-items:center; }
        .img-placeholder { background:#1f2937; border:2px dashed #374151; border-radius:20px; height:320px; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#9ca3af; }
        .img-placeholder i { font-size:4rem; color:#10b981; margin-bottom:12px; }
        .title { font-size:2rem; font-weight:900; margin-bottom:10px; color:#ffffff; }
        .price { font-size:1.8rem; font-weight:900; color:#10b981; margin-bottom:16px; }
        .price del { font-size:1.2rem; color:#6b7280; margin-right:10px; }
        .features { list-style:none; margin-bottom:24px; }
        .features li { margin-bottom:8px; font-size:0.95rem; }
        .features i { color:#10b981; margin-left:8px; }
        .order-form { background:#1f2937; border:1px solid #374151; padding:24px; border-radius:16px; margin-top:20px; }
        .input-group { margin-bottom:14px; }
        .input-group label { display:block; font-size:0.85rem; font-weight:700; margin-bottom:4px; }
        .input-group input { width:100%; padding:10px; border-radius:8px; border:1px solid #4b5563; background:#111827; color:white; }
        .btn-submit { width:100%; padding:14px; background:#10b981; color:white; border:none; border-radius:10px; font-size:1.1rem; font-weight:800; cursor:pointer; }
    </style>
</head>
<body>
    <div class="banner">⚡ عرض خاص محدود: خصم 40% والشحن مجاني اليوم فقط!</div>
    <div class="container">
        <div class="product-grid">
            <div class="img-placeholder">
                <i class="fas fa-clock"></i>
                <span>صورة المنتـج</span>
            </div>
            <div>
                <h1 class="title">الساعة الذكية Pro Max الرياضية</h1>
                <div class="price">499 ج.م <del>850 ج.م</del></div>
                <ul class="features">
                    <li><i class="fas fa-check-circle"></i> قياس نبضات القلب والضغط والأكسجين</li>
                    <li><i class="fas fa-check-circle"></i> مقاومة للماء والأنشطة الرياضية</li>
                    <li><i class="fas fa-check-circle"></i> بطارية تدوم حتى 7 أيام متواصلة</li>
                </ul>
                
                <div class="order-form">
                    <h3 style="margin-bottom:14px;font-size:1.1rem;">اطلب الآن والدفع عند الاستلام:</h3>
                    <div class="input-group">
                        <label>الاسم بالكامل:</label>
                        <input type="text" placeholder="اكتب اسمك الثلاثي">
                    </div>
                    <div class="input-group">
                        <label>رقم الهاتف:</label>
                        <input type="tel" placeholder="01xxxxxxxx">
                    </div>
                    <button class="btn-submit"><i class="fas fa-shopping-cart"></i> تأكيد الطلب الآن</button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`
    },
    {
        id: "tpl-restaurant-cafe",
        title: "قالب مطعم وكافيه منيو أونلاين (Restaurant & Cafe)",
        cat: "restaurant",
        desc: "قالب جذاب للمطاعم والكافيهات لاستعراض المنيو والأطباق مع زر الحجز وتواصل واتساب الفوري.",
        tags: ["Restaurant", "Cafe", "Food Menu"],
        icon: "fas fa-utensils",
        featured: false,
        previewUrl: "templates/demo-restaurant-cafe.html",
        downloadName: "Novatrix-Restaurant-Cafe-Template.zip",
        code: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مطعم وكافيه الشرق — المذاق الأصيل</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * { margin:0; padding:0; box-sizing:border-box; font-family:'Cairo', sans-serif; }
        body { background:#0c0a09; color:#f5f5f4; line-height:1.6; }
        .hero { text-align:center; padding:90px 20px; background:linear-gradient(135deg,rgba(217,119,6,0.2),transparent); }
        .hero h1 { font-size:2.8rem; color:#f59e0b; font-weight:900; }
        .menu-grid { max-width:900px; margin:40px auto; padding:0 20px; display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:20px; }
        .item-card { background:#1c1917; border:1px solid #292524; padding:20px; border-radius:16px; }
        .item-header { display:flex; justify-content:space-between; font-weight:700; font-size:1.1rem; color:#f59e0b; margin-bottom:6px; }
        .item-desc { font-size:0.85rem; color:#a8a29e; }
    </style>
</head>
<body>
    <section class="hero">
        <h1><i class="fas fa-fire-burner"></i> مطعم وكافيه الشرق</h1>
        <p>أطيب المشويات والأطباق الشرقية والغربية المحضرة بطازج المكونات يومياً.</p>
    </section>
    <main class="menu-grid">
        <div class="item-card">
            <div class="item-header"><span>مشويات مشكلة</span><span>180 ج.م</span></div>
            <p class="item-desc">كفتة، طرب، وشيش طاووق مشوي على الفحم مع السلطات والمقبلات.</p>
        </div>
        <div class="item-card">
            <div class="item-header"><span>بيتزا بريميو</span><span>120 ج.م</span></div>
            <p class="item-desc">جبنة موزاريلا، ببروني، زيتون، وفلفل ألوان عجينة إيطالية هشة.</p>
        </div>
    </main>
</body>
</html>`
    },
    {
        id: "tpl-saas-landing",
        title: "قالب هبوط منصة برمجية SaaS (SaaS Landing)",
        cat: "agency",
        desc: "قالب تسويقي احترافي للمنصات السحابية والتطبيقات البرمجية الذكية لتنمية المبيعات.",
        tags: ["SaaS", "Startup", "Software"],
        icon: "fas fa-cloud",
        featured: false,
        previewUrl: "templates/demo-saas-landing.html",
        downloadName: "Novatrix-SaaS-Landing-Template.zip",
        code: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>منصة أوتوماتيك — أتمتة أعمالك بذكاء</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * { margin:0; padding:0; box-sizing:border-box; font-family:'Cairo', sans-serif; }
        body { background:#030712; color:#f9fafb; line-height:1.6; }
        .hero { text-align:center; padding:100px 20px; max-width:800px; margin:0 auto; }
        .hero h1 { font-size:2.8rem; font-weight:900; background:linear-gradient(90deg,#6366f1,#a855f7); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
        .btn { display:inline-block; padding:14px 36px; background:#6366f1; color:white; text-decoration:none; border-radius:30px; font-weight:800; margin-top:20px; }
    </style>
</head>
<body>
    <section class="hero">
        <h1>أتمتة كافة مهام عملك بضغطة زر</h1>
        <p>ربط تطبيقاتك، إدارة عملائك، وتوفير ساعات من العمل اليومي باستخدام الذكاء الاصطناعي.</p>
        <a href="#" class="btn">تجربة مجانية لمدة 14 يوم</a>
    </section>
</body>
</html>`
    }
];

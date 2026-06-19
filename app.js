// DATABASE FOR APPS & TUTORIALS (Techs4Arab Theme)
const APPS_DATABASE = [
    {
        id: "screen-share",
        title: "تطبيق مشاركة الهاتف مع أي هاتف آخر والتحكم الكامل",
        category: "apps",
        icon: "fa-solid fa-mobile-screen-button",
        desc: "يتيح لك مشاركة شاشة هاتفك مع هاتف آخر والتحكم به عن بعد لتقديم الدعم الفني لأصدقائك أو نقل الملفات بسرعة فائقة.",
        size: "18 MB",
        compat: "Android 8.0+",
        link: "https://example.com/download/screen-share",
        alternative: "TeamViewer (المدفوع باشتراك)",
        saves: "$15/شهرياً",
        features: [
            "مشاركة شاشة الهاتف بصورة مباشرة ودقة عالية",
            "إمكانية التحكم الكامل باللمس في الهاتف البعيد بعد إعطاء الصلاحية",
            "دردشة صوتية مدمجة للتوجيه أثناء الشرح",
            "آمن بالكامل ويتطلب رقماً سرياً للاتصال في كل مرة"
        ]
    },
    {
        id: "secret-camera",
        title: "تطبيق تصوير فيديو وشاشة الهاتف مغلقة تماماً",
        category: "tricks",
        icon: "fa-solid fa-camera-rotate",
        desc: "سجل لقطات الفيديو والتوثيقات الهامة في الخلفية لحمايتك الشخصية دون أن تضيء الشاشة أو يعرف أحد أن الهاتف يسجل.",
        size: "8.5 MB",
        compat: "Android 9.0+",
        link: "https://example.com/download/secret-camera",
        alternative: "برامج كاميرات المراقبة الخاصة",
        saves: "$9/مرة واحدة",
        features: [
            "التسجيل في الخلفية أثناء تصفح تطبيقات أخرى أو إيقاف الشاشة",
            "جدولة وقت التسجيل ليبدأ في ساعة معينة تلقائياً",
            "إمكانية كتم صوت التقاط الصورة أو بدء التسجيل نهائياً",
            "حفظ الفيديوهات في استوديو خاص مشفر بكلمة سر"
        ]
    },
    {
        id: "game-boost",
        title: "أداة Game Boost Pro لتحسين أداء الألعاب وزيادة الفريمات",
        category: "games",
        icon: "fa-solid fa-gauge-high",
        desc: "احصل على أعلى أداء لهاتفك في الألعاب! تقوم الأداة بتنظيف الذاكرة العشوائية وإيقاف التطبيقات التي تبطئ المعالج أثناء اللعب.",
        size: "12 MB",
        compat: "Android 7.0+",
        link: "https://example.com/download/game-boost",
        alternative: "برامج تحسين الألعاب المدفوعة",
        saves: "$5/شهرياً",
        features: [
            "زيادة استقرار الفريمات وتخفيض البينج (Ping) في الألعاب أونلاين",
            "تنظيف تلقائي للرام قبل بدء اللعبة بضغطة زر واحدة",
            "وضع عدم الإزعاج لمنع المكالمات والإشعارات أثناء اللعب",
            "مراقبة حرارة الهاتف وسرعة المعالج في الوقت الفعلي"
        ]
    },
    {
        id: "fake-number",
        title: "الحصول على رقم أمريكي وهمي لتفعيل واتساب مجاناً",
        category: "tricks",
        icon: "fa-solid fa-square-phone",
        desc: "تفعيل واتساب وتليجرام وحساباتك برقم ثانٍ لحماية خصوصيتك ورقمك الحقيقي من التسريب. دليل متكامل ومجرب.",
        size: "14 MB",
        compat: "متصفح الويب / تطبيق",
        link: "https://example.com/download/fake-number",
        alternative: "شراء شريحة SIM ثانية أو خدمات التحقق",
        saves: "$10/سنوياً",
        features: [
            "استقبال رسائل التفعيل وأكواد OTP فوراً وبشكل مجاني",
            "أرقام أمريكية وكندية صالحة للاستخدام الدائم",
            "طريقة حماية الرقم من السحب عبر تفعيل التحقق بخطوتين",
            "واجهة بسيطة لا تحتاج إلى خبرة لاستخراج الأرقام"
        ]
    },
    {
        id: "ai-video-creator",
        title: "منصة إنشاء فيديوهات احترافية بالذكاء الاصطناعي من النص",
        category: "ai",
        icon: "fa-solid fa-video",
        desc: "اكتب قصتك أو فكرتك ودع الذكاء الاصطناعي يقوم بتوليد المشاهد الحركية، دمج الأصوات الطبيعية وتصدير فيديو جاهز للنشر.",
        size: "أداة ويب",
        compat: "جميع المتصفحات (أندرويد/آيفون/كمبيوتر)",
        link: "https://example.com/download/ai-video",
        alternative: "Runway Gen-2 & Sora (مدفوع باشتراكات مكلفة)",
        saves: "$30/شهرياً",
        features: [
            "توليد مشاهد فيديو واقعية وثلاثية الأبعاد بدقة ممتازة",
            "دعم توليد تعليق صوتي باللغة العربية بلكنات طبيعية متعددة",
            "مكتبة موسيقى ومؤثرات صوتية مرخصة مجانية للاستخدام",
            "تعديل المقاطع والترجمة التلقائية بنقرة زر"
        ]
    },
    {
        id: "ps2-emulator",
        title: "محاكي بلاي ستيشن 2 (PS2) لتشغيل ألعاب الطفولة بدقة عالية",
        category: "games",
        icon: "fa-solid fa-gamepad",
        desc: "استرجع ذكرياتك وشغل ألعاب PlayStation 2 الشهيرة على هاتفك مباشرة مع دعم توصيل يد التحكم وسلاسة لعب فائقة.",
        size: "38 MB",
        compat: "Android 8.0+ (معالج متوسط فما فوق)",
        link: "https://example.com/download/ps2-emulator",
        alternative: "DamonPS2 Pro (النسخة المدفوعة المليئة بالإعلانات)",
        saves: "$12/مرة واحدة",
        features: [
            "تشغيل 99% من ألعاب PS2 بصيغة ISO بسلاسة كاملة",
            "دعم حفظ مرحلة اللعب في أي وقت واستعادتها فوراً (Save States)",
            "إمكانية مضاعفة جودة الرسوميات الأصلية حتى 4K لشاشات الهواتف",
            "توافق تام مع أذرع التحكم الخارجية عبر البلوتوث"
        ]
    },
    {
        id: "anti-spy",
        title: "تطبيق كشف برامج التجسس وحماية خصوصية الكاميرا والميكروفون",
        category: "tricks",
        icon: "fa-solid fa-user-shield",
        desc: "أداة أمنية قوية تفحص هاتفك بالكامل وتكشف التطبيقات التي تتجسس عليك وتستخدم الأذونات الحساسة في الخلفية دون علمك.",
        size: "9 MB",
        compat: "Android 6.0+",
        link: "https://example.com/download/anti-spy",
        alternative: "برامج الحماية السنوية المكلفة",
        saves: "$25/سنوياً",
        features: [
            "تنبيه فوري بنقطة ملونة عند استخدام الكاميرا أو الميكروفون من أي تطبيق",
            "فحص شامل لملفات الهاتف لكشف برمجيات التجسس وأحصنة طروادة",
            "لوحة تحكم توضح أوقات استخدام التطبيقات للموقع الجغرافي والأذونات",
            "حظر استخدام الكاميرا والميكروفون بنقرة واحدة لحماية الخصوصية المطلقة"
        ]
    },
    {
        id: "ai-prompt-app",
        title: "أداة الذكاء الاصطناعي الشاملة (4000+ نموذج مجاني)",
        category: "ai",
        icon: "fa-solid fa-brain",
        desc: "أداة خرافية تدمج أقوى نماذج الذكاء الاصطناعي للرسم والكتابة والبرمجة في مكان واحد مجاني بالكامل وبدون قيود استخدام.",
        size: "أداة ويب",
        compat: "جميع الأجهزة والمنصات",
        link: "https://example.com/download/ai-tools",
        alternative: "اشتراكات ChatGPT Plus و Claude Pro المجمعة",
        saves: "$40/شهرياً",
        features: [
            "تضمين نماذج متطورة مثل GPT-4o و Claude 3.5 Sonnet مجاناً",
            "توليد صور احترافية وتصميمات تريند بجودة فائقة بنقرة زر",
            "بدون الحاجة لإنشاء حساب أو امتلاك رقم أجنبي للتفعيل",
            "أدوات مساعدة لبرمجة الأكواد وتصحيح الأخطاء البرمجية تلقائياً"
        ]
    },
    {
        id: "magic-eraser",
        title: "تطبيق إزالة الأشخاص والخلفيات من الصور بالذكاء الاصطناعي",
        category: "apps",
        icon: "fa-solid fa-wand-magic-sparkles",
        desc: "امسح أي عنصر غير مرغوب فيه من صورك (أشخاص، كتابة، سيارات) في ثانية واحدة. يقوم الذكاء الاصطناعي بإعادة بناء الخلفية بدقة مذهلة.",
        size: "15 MB",
        compat: "Android 8.0+ / iOS",
        link: "https://example.com/download/magic-eraser",
        alternative: "Photoshop Elements / Canva Pro (أدوات مدفوعة)",
        saves: "$10/شهرياً",
        features: [
            "تحديد ذكي وتلقائي للعناصر بمجرد تمرير الإصبع فوقها",
            "تصدير الصور بجودتها الأصلية الكاملة HD دون تقليل الدقة",
            "أدوات تجميل الوجوه وإزالة الشوائب وتعديل إضاءة بورتريه تلقائياً",
            "يعمل بالكامل على الهاتف دون الحاجة لرفع صورك لخوادم خارجية"
        ]
    }
];

// ALTERNATIVES DATABASE (Alternative Finder Tool)
const ALTERNATIVES_DATABASE = {
    "photoshop": {
        name: "Photoshop (فوتوشوب)",
        price: "$22/شهرياً",
        options: [
            { name: "GIMP", desc: "بديل برمجيات مفتوحة المصدر، قوي جداً ومناسب للكمبيوتر.", link: "https://www.gimp.org/" },
            { name: "Photopea", desc: "موقع ويب يطابق واجهة فوتوشوب بالكامل ويعمل بدون تحميل على الهاتف والكمبيوتر.", link: "https://www.photopea.com/" }
        ]
    },
    "canva": {
        name: "Canva Pro (كانفا برو)",
        price: "$13/شهرياً",
        options: [
            { name: "Microsoft Designer", desc: "أداة تصميم مجانية بالكامل مدعومة بالذكاء الاصطناعي لتصميم البوسترات.", link: "https://designer.microsoft.com/" },
            { name: "Polotno Studio", desc: "أداة ويب مجانية رائعة شبيهة بـ Canva بدون إعلانات أو قيود.", link: "https://studio.polotno.com/" }
        ]
    },
    "idm": {
        name: "Internet Download Manager (IDM)",
        price: "$25/رخصة دائمية",
        options: [
            { name: "FDM (Free Download Manager)", desc: "بديل مجاني تماماً وسريع، يدعم التحميل العادي والتورنت ومتوفر للهاتف والكمبيوتر.", link: "https://www.freedownloadmanager.org/" },
            { name: "Xtreme Download Manager", desc: "أداة قوية تزيد سرعة التحميل إلى 500% وتلتقط الفيديوهات من المتصفح تلقائياً.", link: "https://subhra74.github.io/xdm/" }
        ]
    },
    "office": {
        name: "Microsoft Office (أوفيس وورد وبوربوينت)",
        price: "$70/سنوياً",
        options: [
            { name: "LibreOffice", desc: "الحزمة المكتبية الأقوى مفتوحة المصدر، مجانية بالكامل وتدعم ملفات وورد وإكسل.", link: "https://www.libreoffice.org/" },
            { name: "Google Docs / Slides", desc: "أدوات جوجل السحابية، تتيح لك الكتابة والتصميم أونلاين ومشاركة الملفات بسهولة.", link: "https://docs.google.com/" }
        ]
    },
    "premiere": {
        name: "Adobe Premiere Pro (بريمير للمونتاج)",
        price: "$22/شهرياً",
        options: [
            { name: "DaVinci Resolve", desc: "برنامج مونتاج وتعديل ألوان سينمائي مجاني للمحترفين على أجهزة الكمبيوتر.", link: "https://www.blackmagicdesign.com/products/davinciresolve" },
            { name: "CapCut", desc: "أقوى تطبيق مونتاج وتعديل فيديو للهاتف والكمبيوتر، مجاني وسهل الاستخدام جداً.", link: "https://www.capcut.com/" }
        ]
    },
    "windows": {
        name: "Windows License (تفعيل ويندوز)",
        price: "$130+",
        options: [
            { name: "Linux Mint", desc: "نظام تشغيل مجاني خفيف وآمن تماماً، يعيد الحياة للأجهزة القديمة ويشبه واجهة ويندوز.", link: "https://linuxmint.com/" },
            { name: "MAS Github script", desc: "تفعيل ويندوز وأوفيس عبر كود أداة مفتوح المصدر وآمن 100% دون برامج خبيثة.", link: "https://massgrave.dev/" }
        ]
    },
    "spotify": {
        name: "Spotify Premium (سبوتيفاي)",
        price: "$10/شهرياً",
        options: [
            { name: "ViMusic", desc: "تطبيق أندرويد مفتوح المصدر لتشغيل كل أغاني يوتيوب ميوزك مجاناً وبدون إعلانات وفي الخلفية.", link: "https://github.com/vireyt/vimusic" },
            { name: "BlackHole Music", desc: "تطبيق موسيقى رائع مفتوح المصدر يتيح تحميل وتنزيل الأغاني بجودة عالية مجاناً.", link: "https://github.com/Sangwan5688/BlackHole" }
        ]
    },
    "netflix": {
        name: "Netflix (نتفليكس)",
        price: "$15/شهرياً",
        options: [
            { name: "Stremio", desc: "برنامج مشغل وسائط مجاني للكمبيوتر والهاتف يجمع كل الأفلام والمسلسلات بترجمة عربية عبر إضافات التورنت.", link: "https://www.stremio.com/" },
            { name: "Kodi", desc: "مركز ترفيهي مفتوح المصدر لبث وتصفح القنوات ومقاطع الفيديو مجاناً.", link: "https://kodi.tv/" }
        ]
    }
};

// SECURITY ADVISOR QUESTIONS
const SECURITY_QUESTIONS = [
    {
        id: 1,
        question: "هل تقوم بتحميل تطبيقات أو ألعاب بصيغة APK من خارج متجر Google Play أو App Store؟",
        answers: [
            { text: "نعم، أحياناً", score: 0 },
            { text: "لا، أبداً من مصادر رسمية فقط", score: 25 }
        ]
    },
    {
        id: 2,
        question: "هل نظام تشغيل هاتفك (Android/iOS) وتحديثات الأمان الحالية محدثة لأحدث إصدار؟",
        answers: [
            { text: "نعم، أحدثها فور وصولها", score: 25 },
            { text: "لا، لم أقم بالتحديث منذ فترة طويلة", score: 5 }
        ]
    },
    {
        id: 3,
        question: "هل قمت بتفعيل ميزة 'التحقق بخطوتين (2FA)' في حساباتك الأساسية (جوجل، تليجرام، واتساب)؟",
        answers: [
            { text: "نعم، مفعلة في كل حساباتي", score: 25 },
            { text: "لا، أو لا أعرف ما هي", score: 0 }
        ]
    },
    {
        id: 4,
        question: "هل تستخدم نفس كلمة المرور لأكثر من حساب أو تطبيق على هاتفك؟",
        answers: [
            { text: "لا، أستخدم كلمات مرور مختلفة وقوية", score: 25 },
            { text: "نعم، أكرر نفس كلمة المرور ليسهل حفظها", score: 5 }
        ]
    }
];

// AI PROMPTS HUB DATA
const AI_PROMPTS = {
    images: [
        {
            title: "توليد صورة سايبربانك (Midjourney/DALL-E)",
            text: "A futuristic cyberpunk hacker sitting in front of multi-monitors showing glowing tech codes, hologram interface, cybernetic enhancements, hyper realistic 8k, neon cyan and purple glowing colors, cinematic lighting, shot on 85mm lens --ar 16:9"
        },
        {
            title: "تصميم غلاف يوتيوب تقني احترافي",
            text: "Minimalist modern 3D abstract render background for a technology YouTube channel, featuring floating circuit elements, glowing futuristic lines, dark grey slate texture, metallic accents, soft cinematic studio light, extremely clean, high detail --ar 16:9"
        }
    ],
    content: [
        {
            title: "كتابة سكريبت فيديو قصير (TikTok/Reels)",
            text: "اكتب لي سكريبت فيديو قصير ومحفز مدته 50 ثانية عن 'أهمية الخصوصية وتغيير إعدادات الأمان في الهاتف لحماية الصور والبيانات الشخصية'. يجب أن يبدأ بخطاف (Hook) قوي يجذب الانتباه في أول 3 ثوانٍ، وينتهي بدعوة واضحة للاشتراك والتفاعل (CTA)."
        },
        {
            title: "صياغة منشور مقارنة برامج للمنصات",
            text: "أريد منشوراً تفاعلياً للمنصات يقارن بين برنامج Photoshop المدفوع والبديل المجاني Photopea. قم بإيضاح الفروقات الجوهرية، لمن يصلح كل منهما، وكيف يوفر المستخدم 220 دولار سنوياً بالاعتماد على البديل المجاني بأسلوب مبسط ومقنع للشباب."
        }
    ],
    coding: [
        {
            title: "إنشاء كود لتأثير الزجاج (Glassmorphism CSS)",
            text: "قم بإنشاء كود CSS مخصص ومثالي لتأثير الزجاج (Glassmorphic card design) يشتمل على تباين عالي وخلفية مشوشة (Backdrop blur) وتأثير ظل ناعم وحواف مضيئة تناسب التصميمات الداكنة والمواقع الفاخرة."
        },
        {
            title: "كود دالة جافاسكريبت لنسخ النصوص",
            text: "اكتب دالة JavaScript نظيفة وحديثة لنسخ نص معين إلى الحافظة (Clipboard) مع معالجة الأخطاء (Promise handling) وعرض رسالة تأكيدية مؤقتة للمستخدم متوافقة مع كل المتصفحات الحديثة."
        }
    ]
};

// INITIALIZATION AND STATE VARIABLES
let activeCategory = "all";
let searchTerms = "";
let currentSecurityQuestion = 0;
let securityScore = 0;
let downloadTimerInterval = null;

// DOM ELEMENTS SELECTORS
const appsGrid = document.getElementById("appsGrid");
const appSearchInput = document.getElementById("appSearchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const categoryFilters = document.getElementById("categoryFilters");

// Alternative Finder DOM Elements
const finderSearchInput = document.getElementById("finderSearchInput");
const finderBtn = document.getElementById("finderBtn");
const finderResults = document.getElementById("finderResults");

// Security Checker DOM Elements
const securityFlow = document.getElementById("securityFlow");
const startSecurityCheckBtn = document.getElementById("startSecurityCheck");

// AI Prompts DOM Elements
const promptContentBox = document.getElementById("promptContentBox");
const promptTabs = document.querySelectorAll(".prompt-tab-btn");

// Modal DOM Elements
const detailsModal = document.getElementById("detailsModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalItemIcon = document.getElementById("modalItemIcon");
const modalItemTitle = document.getElementById("modalItemTitle");
const modalItemBadge = document.getElementById("modalItemBadge");
const modalItemDescription = document.getElementById("modalItemDescription");
const modalFeaturesList = document.getElementById("modalFeaturesList");
const modalItemSize = document.getElementById("modalItemSize");
const modalItemCompat = document.getElementById("modalItemCompat");
const modalComparisonCard = document.getElementById("modalComparisonCard");
const modalPaidOrig = document.getElementById("modalPaidOrig");
const modalFreeAlt = document.getElementById("modalFreeAlt");

const startDownloadBtn = document.getElementById("startDownloadBtn");
const timerContainer = document.getElementById("timerContainer");
const countdownNumber = document.getElementById("countdownNumber");
const timerCircle = document.getElementById("timerCircle");
const finalDownloadBtn = document.getElementById("finalDownloadBtn");

// Toast Notification DOM Elements
const toastNotification = document.getElementById("toastNotification");
const toastMessage = document.getElementById("toastMessage");

// APP CARDS RENDERING LOGIC
function renderApps() {
    appsGrid.innerHTML = "";
    
    const filteredApps = APPS_DATABASE.filter(app => {
        const matchesCategory = activeCategory === "all" || app.category === activeCategory;
        const matchesSearch = searchTerms === "" || 
            app.title.toLowerCase().includes(searchTerms.toLowerCase()) || 
            app.desc.toLowerCase().includes(searchTerms.toLowerCase()) || 
            (app.alternative && app.alternative.toLowerCase().includes(searchTerms.toLowerCase()));
        
        return matchesCategory && matchesSearch;
    });

    if (filteredApps.length === 0) {
        appsGrid.innerHTML = `
            <div class="no-result-card" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
                <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; margin-bottom: 12px; color: var(--primary);"></i>
                <p>عذراً، لم نجد أي تطبيقات تطابق بحثك حالياً.</p>
            </div>
        `;
        return;
    }

    filteredApps.forEach(app => {
        const card = document.createElement("div");
        card.className = "app-card";
        
        // Map category keys to Arabic names
        const categoryNames = {
            apps: "تطبيق مميز",
            games: "ألعاب وتسلية",
            ai: "ذكاء اصطناعي",
            tricks: "شرح ثغرة"
        };
        
        card.innerHTML = `
            <div class="card-top">
                <span class="card-tag ${app.category}">${categoryNames[app.category]}</span>
                <div class="card-title-wrapper">
                    <div class="card-app-icon">
                        <i class="${app.icon}"></i>
                    </div>
                    <h3>${app.title}</h3>
                </div>
                <p class="card-desc">${app.desc}</p>
            </div>
            <div class="card-bottom">
                <span class="card-meta-info">${app.size}</span>
                <button class="card-btn" data-id="${app.id}">
                    <i class="fa-solid fa-circle-info"></i> تفاصيل وتحميل
                </button>
            </div>
        `;
        appsGrid.appendChild(card);
    });

    // Add event listeners to detail buttons
    document.querySelectorAll(".card-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const appId = btn.getAttribute("data-id");
            openAppModal(appId);
        });
    });
}

// SEARCH INPUT HANDLERS
appSearchInput.addEventListener("input", (e) => {
    searchTerms = e.target.value.trim();
    if (searchTerms.length > 0) {
        clearSearchBtn.style.display = "block";
    } else {
        clearSearchBtn.style.display = "none";
    }
    renderApps();
});

clearSearchBtn.addEventListener("click", () => {
    appSearchInput.value = "";
    searchTerms = "";
    clearSearchBtn.style.display = "none";
    renderApps();
});

// CATEGORY PILLS FILTER LOGIC
categoryFilters.addEventListener("click", (e) => {
    const filterBtn = e.target.closest(".filter-pill");
    if (!filterBtn) return;
    
    document.querySelectorAll(".filter-pill").forEach(pill => pill.classList.remove("active"));
    filterBtn.classList.add("active");
    
    activeCategory = filterBtn.getAttribute("data-category");
    renderApps();
});

// MODAL CONTROLLERS & SECURE TIMER
function openAppModal(id) {
    const app = APPS_DATABASE.find(item => item.id === id);
    if (!app) return;

    // Reset Modal elements
    resetDownloadSection();

    // Populate metadata
    modalItemIcon.innerHTML = `<i class="${app.icon}"></i>`;
    modalItemTitle.textContent = app.title;
    modalItemSize.textContent = app.size;
    modalItemCompat.textContent = app.compat;
    modalItemDescription.textContent = app.desc;
    
    // Set Badge Name
    const categoryNames = {
        apps: "تطبيق",
        games: "لعبة",
        ai: "أداة ذكاء اصطناعي",
        tricks: "شرح ثغرة"
    };
    modalItemBadge.textContent = categoryNames[app.category];
    modalItemBadge.className = `modal-item-badge ${app.category}`;

    // Populating savings/comparison details
    if (app.alternative && app.saves) {
        modalComparisonCard.style.display = "block";
        modalPaidOrig.textContent = `${app.alternative}`;
        modalFreeAlt.textContent = `نسخة مجانية بالكامل (توفير ${app.saves})`;
    } else {
        modalComparisonCard.style.display = "none";
    }

    // Features Checklist
    modalFeaturesList.innerHTML = "";
    app.features.forEach(feat => {
        const li = document.createElement("li");
        li.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${feat}</span>`;
        modalFeaturesList.appendChild(li);
    });

    // Final direct link
    finalDownloadBtn.href = app.link;

    // Trigger timer button click listener
    startDownloadBtn.onclick = () => {
        triggerSecureDownloadTimer();
    };

    // Open backdrop
    detailsModal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scroll
}

function closeModal() {
    detailsModal.classList.remove("active");
    document.body.style.overflow = "auto";
    resetDownloadSection();
}

closeModalBtn.addEventListener("click", closeModal);
detailsModal.addEventListener("click", (e) => {
    if (e.target === detailsModal) closeModal();
});

function resetDownloadSection() {
    clearInterval(downloadTimerInterval);
    startDownloadBtn.style.display = "flex";
    timerContainer.style.display = "none";
    finalDownloadBtn.style.display = "none";
}

function triggerSecureDownloadTimer() {
    startDownloadBtn.style.display = "none";
    timerContainer.style.display = "flex";
    
    let countdown = 10;
    countdownNumber.textContent = countdown;
    
    const circle = timerCircle;
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = 0;
    
    downloadTimerInterval = setInterval(() => {
        countdown--;
        countdownNumber.textContent = countdown;
        
        const offset = circumference - ((10 - countdown) / 10) * circumference;
        circle.style.strokeDashoffset = offset;
        
        if (countdown <= 0) {
            clearInterval(downloadTimerInterval);
            timerContainer.style.display = "none";
            finalDownloadBtn.style.display = "flex";
            showToast("تم تحضير الرابط الآمن بنجاح! جاهز للتحميل.");
        }
    }, 1000);
}

// TOAST NOTIFICATIONS SYSTEM
function showToast(message) {
    toastMessage.textContent = message;
    toastNotification.classList.add("active");
    setTimeout(() => {
        toastNotification.classList.remove("active");
    }, 3500);
}

// INTERACTIVE TOOL 1: ALTERNATIVE FINDER
finderBtn.addEventListener("click", performAlternativeLookup);
finderSearchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") performAlternativeLookup();
});

function performAlternativeLookup() {
    const query = finderSearchInput.value.trim().toLowerCase();
    
    if (query.length === 0) {
        finderResults.innerHTML = `
            <div class="no-result-placeholder">
                <i class="fa-solid fa-triangle-exclamation" style="color: var(--accent);"></i>
                <span>يرجى كتابة اسم برنامج للبحث عن بدائله.</span>
            </div>
        `;
        return;
    }

    // Try finding direct matches in database keys
    let foundKey = Object.keys(ALTERNATIVES_DATABASE).find(key => {
        return key === query || query.includes(key) || key.includes(query);
    });

    if (foundKey) {
        const entry = ALTERNATIVES_DATABASE[foundKey];
        
        let optionsHTML = "";
        entry.options.forEach(opt => {
            optionsHTML += `
                <div class="alt-option-card">
                    <div class="alt-option-info">
                        <h4>${opt.name}</h4>
                        <p>${opt.desc}</p>
                    </div>
                    <a href="${opt.link}" target="_blank" class="mini-btn-download">تحميل البديل</a>
                </div>
            `;
        });

        finderResults.innerHTML = `
            <div class="alt-finder-result">
                <div class="alt-result-item-header">
                    <span class="paid-title">${entry.name} (${entry.price})</span>
                    <span class="comparison-badge"><i class="fa-solid fa-sparkles"></i> بديل مجاني 100%</span>
                </div>
                <div class="alt-options">
                    ${optionsHTML}
                </div>
            </div>
        `;
        showToast(`تم العثور على بدائل لـ ${entry.name}`);
    } else {
        finderResults.innerHTML = `
            <div class="no-result-placeholder">
                <i class="fa-solid fa-face-sad-tear" style="color: var(--accent); font-size: 1.8rem;"></i>
                <span>لم نعثر على هذا البرنامج تحديداً، ابحث عن: Photoshop, Canva, Office أو IDM.</span>
            </div>
        `;
    }
}

// INTERACTIVE TOOL 2: PHONE SECURITY CHECKUP
startSecurityCheckBtn.addEventListener("click", startSecurityFlow);

function startSecurityFlow() {
    currentSecurityQuestion = 0;
    securityScore = 0;
    loadSecurityQuestion();
}

function loadSecurityQuestion() {
    const qData = SECURITY_QUESTIONS[currentSecurityQuestion];
    
    securityFlow.innerHTML = `
        <div class="security-question-card">
            <span class="question-progress">السؤال ${currentSecurityQuestion + 1} من ${SECURITY_QUESTIONS.length}</span>
            <h4>${qData.question}</h4>
            <div class="security-answers">
                <button class="answer-btn" data-score="${qData.answers[0].score}">${qData.answers[0].text}</button>
                <button class="answer-btn" data-score="${qData.answers[1].score}">${qData.answers[1].text}</button>
            </div>
        </div>
    `;

    // Attach click triggers to answers
    document.querySelectorAll(".answer-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const scoreVal = parseInt(btn.getAttribute("data-score"));
            securityScore += scoreVal;
            
            currentSecurityQuestion++;
            if (currentSecurityQuestion < SECURITY_QUESTIONS.length) {
                loadSecurityQuestion();
            } else {
                showSecurityResults();
            }
        });
    });
}

function showSecurityResults() {
    let healthClass = "gauge-glow-green";
    let statusText = "درع أمان ممتاز 🔒";
    let descriptionText = "جوالك محمي ومحصن بشكل رائع! اتبع دائماً تحديثات صانع المحتوى لتظل في أمان.";
    let suggestionsHTML = `
        <li><i class="fa-solid fa-circle-check"></i> كلمات مرور قوية ومحدثة.</li>
        <li><i class="fa-solid fa-circle-check"></i> التحقق بخطوتين مفعل ونشط.</li>
    `;

    if (securityScore < 50) {
        healthClass = "gauge-glow-red";
        statusText = "خطر شديد! ثغرات مفتوحة ⚠️";
        descriptionText = "هاتفك معرض للاختراق وتسريب البيانات بسبب ممارسات تحميل غير آمنة وعدم تفعيل أدوات الحماية.";
        suggestionsHTML = `
            <li class="warn"><i class="fa-solid fa-triangle-exclamation"></i> توقف فوراً عن تحميل تطبيقات APK مجهولة المصدر.</li>
            <li class="warn"><i class="fa-solid fa-triangle-exclamation"></i> قم بتحديث نظام هاتفك للأمان فوراً.</li>
            <li class="warn"><i class="fa-solid fa-triangle-exclamation"></i> فعل ميزة التحقق بخطوتين وتغيير الباسورد.</li>
        `;
    } else if (securityScore < 85) {
        healthClass = "gauge-glow-yellow";
        statusText = "أمان متوسط ومقبول 🛡️";
        descriptionText = "أنت تتخذ بعض تدابير الحماية ولكن هناك بعض الثغرات البسيطة التي تتطلب إغلاقها فوراً.";
        suggestionsHTML = `
            <li class="warn"><i class="fa-solid fa-triangle-exclamation"></i> تأكد من استخدام كلمات مرور مختلفة لكل المواقع.</li>
            <li class="warn"><i class="fa-solid fa-triangle-exclamation"></i> فعل خاصية التحديث التلقائي لحزمة الأمان.</li>
        `;
    }

    securityFlow.innerHTML = `
        <div class="security-result">
            <div class="security-gauge ${healthClass}">
                <span>${securityScore}%</span>
            </div>
            <h4>${statusText}</h4>
            <p class="tool-desc" style="text-align: center;">${descriptionText}</p>
            <ul class="security-advice-list">
                ${suggestionsHTML}
            </ul>
            <button class="primary-btn wide-btn" id="retrySecurityCheckBtn" style="margin-top: 10px;">إعادة الفحص الأمني</button>
        </div>
    `;

    document.getElementById("retrySecurityCheckBtn").addEventListener("click", startSecurityFlow);
}

// INTERACTIVE TOOL 3: AI PROMPTS COPIER
function loadPrompts(tabId) {
    promptContentBox.innerHTML = "";
    const list = AI_PROMPTS[tabId] || [];
    
    list.forEach((prompt, idx) => {
        const block = document.createElement("div");
        block.className = "prompt-item";
        block.style.marginBottom = idx === list.length - 1 ? "0px" : "16px";
        block.style.borderBottom = idx === list.length - 1 ? "none" : "1px solid rgba(255,255,255,0.06)";
        block.style.paddingBottom = idx === list.length - 1 ? "0px" : "12px";

        block.innerHTML = `
            <p class="prompt-text" id="promptText-${tabId}-${idx}">${prompt.text}</p>
            <div class="prompt-copy-footer">
                <span style="font-size: 0.78rem; font-weight: 700; color: var(--primary);">${prompt.title}</span>
                <button class="prompt-copy-btn" data-text-id="promptText-${tabId}-${idx}">
                    <i class="fa-regular fa-copy"></i> نسخ الأمر
                </button>
            </div>
        `;
        promptContentBox.appendChild(block);
    });

    // Attach copy clipboard trigger
    promptContentBox.querySelectorAll(".prompt-copy-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const textId = btn.getAttribute("data-text-id");
            const textContent = document.getElementById(textId).textContent;
            
            navigator.clipboard.writeText(textContent).then(() => {
                showToast("تم نسخ أمر الذكاء الاصطناعي بنجاح! جاهز للصق.");
            }).catch(err => {
                showToast("فشل في نسخ النص، يرجى المحاولة يدوياً.");
            });
        });
    });
}

// Prompts Tab Selection Trigger
promptTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        promptTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        
        const category = tab.getAttribute("data-tab");
        loadPrompts(category);
    });
});

// CHATBOT STATE AND RESPONSES DATABASE
const CHATBOT_RESPONSES = {
    "واتساب": "لحماية حسابك على واتساب، افتح التطبيق -> الإعدادات -> الحساب -> التحقق بخطوتين -> تمكين. وضع كود OTP سري ولا تشاركه مع أحد أبداً! كما يمكنك تفعيل قفل الشاشة بالبصمة.",
    "واتس": "لحماية حسابك على واتساب، افتح التطبيق -> الإعدادات -> الحساب -> التحقق بخطوتين -> تمكين. وضع كود OTP سري ولا تشاركه مع أحد أبداً! كما يمكنك تفعيل قفل الشاشة بالبصمة.",
    "تليجرام": "لحماية حسابك على تليجرام، اذهب للإعدادات -> الخصوصية والأمان -> التحقق بخطوتين وتعيين كلمة مرور إضافية. تليجرام يتيح أيضاً قفل التطبيق برقم سري داخلي لمنع المتطفلين.",
    "مخترق": "أهم علامات اختراق هاتفك هي: 1. نفاد البطارية بشكل مفاجئ وسريع. 2. سخونة الهاتف الشديدة دون استخدام. 3. ظهور تطبيقات غريبة لم تقم بتثبيتها. 4. استهلاك بيانات الإنترنت بشكل جنوني في الخلفية.",
    "اختراق": "أهم علامات اختراق هاتفك هي: 1. نفاد البطارية بشكل مفاجئ وسريع. 2. سخونة الهاتف الشديدة دون استخدام. 3. ظهور تطبيقات غريبة لم تقم بتثبيتها. 4. استهلاك بيانات الإنترنت بشكل جنوني في الخلفية.",
    "تجسس": "أهم علامات اختراق هاتفك هي: 1. نفاد البطارية بشكل مفاجئ وسريع. 2. سخونة الهاتف الشديدة دون استخدام. 3. ظهور تطبيقات غريبة لم تقم بتثبيتها. 4. استهلاك بيانات الإنترنت بشكل جنوني في الخلفية.",
    "صور": "لاسترجاع الصور المحذوفة: للأندرويد استخدم تطبيق DiskDigger Pro وقم بعمل فحص كامل. للكمبيوتر استخدم برنامج Recuva المجاني والموثوق. وتأكد دائماً من فحص مجلد 'المحذوف مؤخراً' في معرض صورك.",
    "صورة": "لاسترجاع الصور المحذوفة: للأندرويد استخدم تطبيق DiskDigger Pro وقم بعمل فحص كامل. للكمبيوتر استخدم برنامج Recuva المجاني والموثوق. وتأكد دائماً من فحص مجلد 'المحذوف مؤخراً' في معرض صورك.",
    "استرجاع": "لاسترجاع الصور المحذوفة: للأندرويد استخدم تطبيق DiskDigger Pro وقم بعمل فحص كامل. للكمبيوتر استخدم برنامج Recuva المجاني والموثوق. وتأكد دائماً من فحص مجلد 'المحذوف مؤخراً' في معرض صورك.",
    "بديل": "يمكنك البحث عن بدائل البرامج المدفوعة بكتابة اسم البرنامج (مثل Photoshop أو Office) في أداة 'مستكشف البدائل' في أعلى الصفحة وسنعرض لك أفضل التطبيقات المجانية فوراً!",
    "برنامج": "يمكنك البحث عن بدائل البرامج المدفوعة بكتابة اسم البرنامج (مثل Photoshop أو Office) في أداة 'مستكشف البدائل' في أعلى الصفحة وسنعرض لك أفضل التطبيقات المجانية فوراً!",
    "برامج": "يمكنك البحث عن بدائل البرامج المدفوعة بكتابة اسم البرنامج (مثل Photoshop أو Office) في أداة 'مستكشف البدائل' في أعلى الصفحة وسنعرض لك أفضل التطبيقات المجانية فوراً!"
};

const DEFAULT_BOT_RESPONSE = "سؤال تقني رائع! لمناقشة هذا الشأن بالتفصيل والحصول على أفضل الحلول والشروحات المصورة، يرجى متابعة قناتنا على يوتيوب وتليجرام حيث ننشر دروساً يومية تغطي كافة الثغرات والحلول الذكية.";

// CHATBOT INTERACTIVE CONTROLLERS
const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const sendChatBtn = document.getElementById("sendChatBtn");
const chatQuickHints = document.getElementById("chatQuickHints");

function appendChatMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `chat-message ${sender}-msg`;
    msgDiv.innerHTML = `<span>${text}</span>`;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleUserMessageSubmit() {
    const text = chatInput.value.trim();
    if (text.length === 0) return;
    
    appendChatMessage("user", text);
    chatInput.value = "";
    
    triggerBotReply(text);
}

function triggerBotReply(userMsg) {
    // Show typing loader message
    const loaderId = "loader-" + Date.now();
    const loaderDiv = document.createElement("div");
    loaderDiv.className = "chat-message bot-msg";
    loaderDiv.id = loaderId;
    loaderDiv.innerHTML = `<span>جاري التفكير والكتابة <i class="fas fa-ellipsis fa-bounce"></i></span>`;
    chatBox.appendChild(loaderDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    
    setTimeout(() => {
        // Remove loader
        const loader = document.getElementById(loaderId);
        if (loader) loader.remove();
        
        // Find match response
        let matchedResponse = DEFAULT_BOT_RESPONSE;
        const cleanMsg = userMsg.toLowerCase();
        
        for (const key in CHATBOT_RESPONSES) {
            if (cleanMsg.includes(key)) {
                matchedResponse = CHATBOT_RESPONSES[key];
                break;
            }
        }
        
        appendChatMessage("bot", matchedResponse);
    }, 1200);
}

// Chat quick hints button trigger
chatQuickHints.addEventListener("click", (e) => {
    const hintBtn = e.target.closest(".hint-btn");
    if (!hintBtn) return;
    
    const queryText = hintBtn.textContent.trim();
    appendChatMessage("user", queryText);
    triggerBotReply(queryText);
});

sendChatBtn.addEventListener("click", handleUserMessageSubmit);
chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleUserMessageSubmit();
});

// CONTACT FORM SUBMISSION SIMULATOR
const contactForm = document.getElementById("contactForm");
const submitContactBtn = document.getElementById("submitContactBtn");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Disable submit button and show loading text
    const originalText = submitContactBtn.innerHTML;
    submitContactBtn.disabled = true;
    submitContactBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> جاري إرسال رسالتك بأمان...`;
    
    setTimeout(() => {
        // Show success toast
        showToast("تم إرسال رسالتك واقتراحك بنجاح! شكراً لتواصلك.");
        
        // Reset form
        contactForm.reset();
        submitContactBtn.disabled = false;
        submitContactBtn.innerHTML = originalText;
    }, 1500);
});

// THEME SWITCHER LOGIC
const themeToggleBtn = document.getElementById("themeToggleBtn");

function updateThemeIcon(theme) {
    const icon = themeToggleBtn.querySelector("i");
    if (theme === "light") {
        icon.className = "fas fa-moon";
    } else {
        icon.className = "fas fa-sun";
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem("theme") || "dark";
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        updateThemeIcon("light");
    } else {
        updateThemeIcon("dark");
    }
    
    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        const theme = document.body.classList.contains("light-theme") ? "light" : "dark";
        localStorage.setItem("theme", theme);
        updateThemeIcon(theme);
        showToast(theme === "light" ? "تم تفعيل الوضع المضيء ☀️" : "تم تفعيل الوضع الداكن 🌙");
    });
}

// STARTUP TASKS
window.addEventListener("DOMContentLoaded", () => {
    renderApps();
    loadPrompts("images"); // Default active AI tab
    initTheme();
});

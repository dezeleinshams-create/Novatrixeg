// CORE DATABASES FOR STATIC PROMPTS
const PROMPTS_DATABASE = [
    // --- IMAGES / DESIGN (images) ---
    {
        title: "تصميم غلاف يوتيوب تقني متطور",
        category: "images",
        explanation: "يولد خلفية مخصصة لسطح مكتب أو غلاف قناة تقنية تركز على الدوائر والنيون.",
        promptText: "Futuristic technology YouTube banner background, floating neon glowing circuit board layers, hyper detailed 8k, cyber blue and magenta colors, dark premium obsidian steel background, octane render --ar 16:9",
        tags: ["banner", "youtube", "neon"]
    },
    {
        title: "لوحة ألعاب فيديو خيالية (Fantasy Gaming Landscape)",
        category: "images",
        explanation: "تصميم بيئة خيالية ومثيرة تناسب خلفيات الألعاب أو القصص.",
        promptText: "Epic mythical landscape, giant ancient tree glowing with ethereal blue light, towering waterfalls flowing into a mystical river beneath, starry night sky, hyper-detailed, fantasy art style, cinematic lighting --ar 16:9",
        tags: ["fantasy", "landscape", "gaming"]
    },
    {
        title: "صورة بورتريه واقعية للغاية لشخصية سايبربانك",
        category: "images",
        explanation: "توليد صورة وجه قريبة لشخصية سايبربانك بتفاصيل رهيبة وإضاءة استوديو.",
        promptText: "Close-up portrait of a futuristic cybernetic hacker, glowing cybernetic implants on face, neon lights reflection in eyes, cyberpunk theme, shot on 85mm lens, hyper-realistic, photorealistic 8k --ar 4:5",
        tags: ["cyberpunk", "portrait", "realistic"]
    },
    {
        title: "تصميم أيقونة تطبيق موبايل ثلاثية الأبعاد (3D Icon)",
        category: "images",
        explanation: "توليد أيقونة تطبيق (مثل حماية أو موسيقى) بتأثيرات الزجاج والمعدن.",
        promptText: "3D icon for a mobile security app, shield shape glowing with neon cyan lines, frosted glass texture, metallic borders, solid dark grey background, isometric, high detail, rendering in Blender --ar 1:1",
        tags: ["icon", "3d", "blender"]
    },
    {
        title: "رسم توضيحي مسطح لرواد الفضاء (Flat Vector Art)",
        category: "images",
        explanation: "تصميم رسمة فيكتور مسطحة وعصرية تصلح لتصاميم واجهات المستخدم والبوسترات.",
        promptText: "Minimalist flat vector illustration of an astronaut floating in deep space next to a tiny planet, warm cosmic color palette, clean paths, vector art style, aesthetic background --ar 16:9",
        tags: ["vector", "flat", "space"]
    },
    {
        title: "تصميم داخلي لغرفة ألعاب تقنية (Gaming Setup)",
        category: "images",
        explanation: "غرفة ألعاب أحلام مجهزة بأحدث الشاشات وإضاءة RGB متناسقة.",
        promptText: "Ultra modern gaming room setup, triple monitor curves showing neon wallpapers, custom mechanical keyboard glowing, cozy RGB LED strip lights, dark aesthetics, warm cinematic atmosphere, hyper-detailed --ar 16:9",
        tags: ["setup", "gaming", "rgb"]
    },
    {
        title: "شعار بخطوط بسيطة (Minimalist Line Art Logo)",
        category: "images",
        explanation: "لتوليد شعارات تجارية راقية وبأقل عدد خطوط ممكن.",
        promptText: "Minimal line art logo of a flying phoenix, geometric lines, vector style, white background, extremely simple, elegant branding --ar 1:1",
        tags: ["logo", "minimalist", "vector"]
    },
    {
        title: "تصميم سيارة رياضية مستقبلية (Concept Car)",
        category: "images",
        explanation: "سيارة اختبارية مستقبلية بتصميم جذاب يعكس القوة والتطور التقني.",
        promptText: "Futuristic concept hypercar driving through a wet cyber city street at night, neon lights reflections on the car body, volumetric fog, Unreal Engine 5 render style, cinematic shot --ar 16:9",
        tags: ["car", "futuristic", "neon"]
    },

    // --- CONTENT WRITING / VIDEOS (content) ---
    {
        title: "سكريبت كامل لفيديو قصير (TikTok/Reels) عن تطبيقات أندرويد",
        category: "content",
        explanation: "يولد نص فيديو سريع ومثير يجذب انتباه المشاهد ليعرف 3 تطبيقات سرية لهاتفه.",
        promptText: "اكتب لي سكريبت فيديو تيك توك مدته 45 ثانية بلهجة عربية عامية ومحفزة. الفكرة: '3 تطبيقات أندرويد سرية وغريبة ستغير طريقة استخدامك للهاتف'. يجب أن يبدأ بخطاف (Hook) يجذب المشاهد في أول ثانيتين، ويتضمن شرحاً سريعاً لكل تطبيق، وينتهي بطلب التعليق والاشتراك.",
        tags: ["script", "tiktok", "reels"]
    },
    {
        title: "مقالة حصرية متوافقة مع السيو (SEO) لمقارنة الهواتف",
        category: "content",
        explanation: "كتابة مقارنة عميقة بين هاتفين رائدين مع مراعاة شروط السيو وكتابة جداول المقارنة.",
        promptText: "اكتب مقالة تقنية حصرية بطول 1000 كلمة تقارن فيها بين هاتفي iPhone 15 Pro Max و Samsung Galaxy S24 Ultra باللغة العربية. ركّز على مقارنة الكاميرات والبطارية والسعر مع إضافة جدول للمواصفات. استخدم عناوين رئيسية H2 و H3 واجعل المقال متوافقاً مع قواعد السيو (SEO).",
        tags: ["seo", "article", "iphone", "samsung"]
    },
    {
        title: "منشور فيسبوك تسويقي وتفاعلي لزيادة التعليقات",
        category: "content",
        explanation: "لصياغة منشور فيسبوك يثير حماس المتابعين ويدفعهم للمشاركة والإجابة.",
        promptText: "اكتب منشوراً تفاعلياً لصفحة فيسبوك تقنية تسأل فيها الجمهور: 'لو معاك 500 دولار تشتري هاتف أندرويد ولا آيفون ولماذا؟'. اجعل الأسلوب ودياً وتفاعلياً واستخدم الرموز التعبيرية لزيادة الوصول والمشاركة والتعليقات.",
        tags: ["facebook", "marketing", "post"]
    },
    {
        title: "سيناريو فيديو يوتيوب كامل (شرح حماية الهاتف من التجسس)",
        category: "content",
        explanation: "توليد هيكل سيناريو كامل مع الإرشادات البصرية والمؤثرات الصوتية للشرح.",
        promptText: "قم بصياغة سيناريو فيديو يوتيوب مدته 8 دقائق حول موضوع 'كيف تحمي هاتفك من الاختراق وتطبيقات التجسس المخفية'. قم بتقسيم الفيديو إلى: مقدمة جذابة، 5 نصائح وتدابير عملية، شرح تطبيقي، وخاتمة. اذكر توجيهات للمونتاج (مثل: لقطة مقربة، مؤثر صوتي، إظهار نص على الشاشة).",
        tags: ["youtube", "script", "security"]
    },
    {
        title: "توليد أفكار عناوين جذابة لليوتيوب (Clickbait-free hooks)",
        category: "content",
        explanation: "يقترح عناوين ملفتة للنظر ولكن دون تضليل المشاهد لزيادة نسبة النقر CTR.",
        promptText: "اقترح لي 10 عناوين جذابة ومثيرة لفيديو يوتيوب يشرح طريقة 'تشغيل ألعاب البلاي ستيشن على الأندرويد'. يجب أن تثير العناوين الفضول وتكون قصيرة ومثيرة للاهتمام وتخاطب رغبة المتابع دون كذب أو خداع.",
        tags: ["youtube", "titles", "hook"]
    },
    {
        title: "صياغة بريد إلكتروني ترويجي للمنتجات الرقمية",
        category: "content",
        explanation: "رسالة بريد إلكتروني مقنعة لجذب المشتركين لشراء دورة تدريبية أو كتاب تقني.",
        promptText: "اكتب بريداً إلكترونياً تسويقياً جذاباً ومقنعاً باللغة العربية للإعلان عن إطلاق كتاب إلكتروني جديد بعنوان 'دليلك للربح من الذكاء الاصطناعي'. ركز على القيمة التي سيحصل عليها المشتري، وقدم كود خصم 30% لفترة محدودة، وضع دعوة واضحة ومغرية للشراء (Call to Action).",
        tags: ["email", "marketing", "sales"]
    },

    // --- CODING / DEVELOPMENT (coding) ---
    {
        title: "بناء دالة جافاسكريبت لفلترة البيانات والبحث الفوري",
        category: "coding",
        explanation: "كتابة دالة JavaScript نظيفة تبحث في مصفوفة كائنات وتدعم البحث غير الحساس لحالة الأحرف.",
        promptText: "Write a clean and optimized ES6 JavaScript function to filter an array of objects representing apps. The function should take the array and a search term string as inputs, performing case-insensitive search on 'title' and 'tags' fields, and return the filtered list.",
        tags: ["javascript", "es6", "filter"]
    },
    {
        title: "تصميم واجهة بطاقة Glassmorphism فاخرة بالـ CSS",
        category: "coding",
        explanation: "توليد كود CSS متكامل لتأثير الزجاج المشوش للمواقع الحديثة والبطاقات.",
        promptText: "Create a modern CSS-only stylesheet for a Glassmorphism card container. It must feature a semi-transparent dark background, blur effect (backdrop-filter), glowing borders with custom variables, responsive padding, border-radius, and smooth transition hover scale effect.",
        tags: ["css", "glassmorphism", "card"]
    },
    {
        title: "نموذج قاعدة بيانات لخدمة تسجيل المستخدمين (MongoDB/Mongoose Schema)",
        category: "coding",
        explanation: "إنشاء مخطط بيانات لتسجيل المستخدمين يتضمن التحقق من صحة المدخلات وتشفير الباسورد.",
        promptText: "Create a Mongoose schema for a User model in Node.js. It should include fields for username, email (validated & unique), hashed password, profile image URL, and verification status. Implement a pre-save hook to automatically hash the password using bcrypt before saving.",
        tags: ["mongoose", "mongodb", "nodejs"]
    },
    {
        title: "كتابة سيناريو فحص أمان المدخلات في لغة Python",
        category: "coding",
        explanation: "دالة بايثون لتنظيف وتأمين البيانات المدخلة من هجمات حقن الأكواد SQL / XSS.",
        promptText: "Write a Python helper function to sanitize user text input. The function should escape HTML tags to prevent Cross-Site Scripting (XSS) attacks and remove potential SQL injection patterns, returning the safe text. Comment the code thoroughly.",
        tags: ["python", "security", "sanitizer"]
    },
    {
        title: "دالة API لإرسال رسائل بريد إلكتروني (Node.js/Nodemailer)",
        category: "coding",
        explanation: "كتابة مسار API في Node/Express يقوم بإرسال بريد إلكتروني عبر خدمة SMTP.",
        promptText: "Write an Express.js POST API route endpoint in Node.js that uses Nodemailer to send a contact form email. The endpoint should receive name, email, and message from the request body, validate inputs, send the email using configured SMTP settings, and return a JSON status response.",
        tags: ["express", "nodejs", "nodemailer"]
    },
    {
        title: "كود التحقق من قوة كلمة المرور بالـ Regex",
        category: "coding",
        explanation: "كود Regex ودالة JavaScript للتحقق من أن الباسورد يحتوي على حروف وأرقام ورموز.",
        promptText: "Write a JavaScript function that uses a Regular Expression (Regex) to validate password strength. The password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character. Return boolean and feedback messages.",
        tags: ["regex", "validation", "javascript"]
    },
    {
        title: "تصميم مخطط متجاوب (Flexbox Layout) للمنتجات",
        category: "coding",
        explanation: "كود HTML/CSS لعرض كروت المنتجات بشكل مرن ومتجاوب دون استخدام bootstrap.",
        promptText: "Create a responsive pure CSS Flexbox layout for a products catalog grid. Each product card should align content vertically, support automatic wrapping, center items on small mobile screens, and transition dynamically on hover. Avoid external CSS frameworks.",
        tags: ["css", "flexbox", "responsive"]
    }
];

// DATA DICTIONARIES FOR THE INTERACTIVE GENERATOR (+1000 PROMPTS COMBINATIONS)
const CUSTOMIZER_DATABASE = {
    midjourney: {
        badge: "MIDJOURNEY PROMPT",
        labelTopic: "نمط الصورة وموضوعها",
        labelStyle: "نوع الإضاءة والتصيير (Render)",
        topics: [
            { id: "cyber_hack", name: "هاكر في غرفة سايبربانك مستقبلي", text: "A futuristic hacker in a dark room full of holographic terminal screens showing glowing code and cybernetic graphics" },
            { id: "gamer_setup", name: "غرفة قيمنق أحلام RGB متكاملة", text: "Cozy gaming setup setup with triple monitors glowing, custom mechanical keyboard, RGB light strips, dark theme room" },
            { id: "space_explore", name: "رائد فضاء يطفو قرب كوكب عملاق", text: "An astronaut floating in deep cosmos space next to a giant glowing neon planet, majestic stars background" },
            { id: "cyber_car", name: "سيارة سوبر كار في شوارع طوكيو ممطرة", text: "Concept futuristic supercar speeding down a rainy neon-lit street in Tokyo at night, water reflections" },
            { id: "phoenix_logo", name: "شعار طائر الفينيق بخطوط هندسية", text: "Geometric line art logo of a flying phoenix, clean paths, vector style branding, isolated on white background" },
            { id: "avatar_3d", name: "أيقونة مجسمة ثلاثية الأبعاد لدرع حماية", text: "3D icon of a cyber security shield glowing, matte metal and frosted glass textures, dark clean background" }
        ],
        styles: [
            { id: "cinematic", name: "إضاءة سينمائية واقعية (Cinematic 8K)", text: "shot on 85mm lens, hyper-realistic, volumetric studio lighting, photorealistic 8k render, depth of field" },
            { id: "octane", name: "تصيير ثلاثي الأبعاد مجسم (Octane Render)", text: "3D stylized render in Blender, octane rendering engine, smooth textures, vibrant colorful light glow" },
            { id: "anime", name: "رسم أنمي عصري (Modern Anime Art)", text: "Japanese anime art style, key visual, hand-drawn textures, highly detailed character design, cell shaded" },
            { id: "minimalist", name: "رسم فيكتور مسطح (Minimal Vector)", text: "minimalist flat vector illustration, clean lines, restricted aesthetic color palette, isolated background" },
            { id: "cyber_neon", name: "توهج نيون ناصع (Vibrant Neon Glow)", text: "cyberpunk aesthetics, intense neon cyan and hot pink glowing accents, retro futuristic vibe, rich contrast" }
        ],
        template: "[TOPIC], [STYLE] --ar 16:9"
    },
    script: {
        badge: "VIDEO SCRIPT PROMPT",
        labelTopic: "فكرة وموضوع الفيديو",
        labelStyle: "نبرة الصوت وأسلوب التقديم",
        topics: [
            { id: "hidden_apps", name: "3 تطبيقات سرية للهواتف", text: "سكريبت فيديو قصير يشرح 3 تطبيقات سرية وغريبة تسهل حياة المستخدم على هواتف الأندرويد والآيفون" },
            { id: "phone_hack", name: "علامات تدل أن جوالك مخترق", text: "سكريبت فيديو تقني يشرح للناس 4 علامات واضحة وبسيطة تكشف لهم إذا كانت هواتفهم مخترقة أو بها تجسس" },
            { id: "saves_money", name: "بديل مجاني لبرامج فوتوشوب وكانفا", text: "سكريبت إرشادي يوضح للمتابعين كيف يستغنون عن برامج فوتوشوب وكانفا ويستخدمون بدائل مجانية توفر لهم مئات الدولارات" },
            { id: "ai_tricks", name: "أداة ذكاء اصطناعي تفعل أشياء لا تصدق", text: "سكريبت تفاعلي يعرف الجمهور بأداة ذكاء اصطناعي جديدة تصنع فيديوهات كاملة من النصوص مجاناً وبسهولة" },
            { id: "speed_wifi", name: "تسريع الإنترنت وتخفيض البينج للالعاب", text: "سكريبت فيديو قصير يقدم خطوات سريعة ومجربة لتسريع الإنترنت وتخبيت البينج داخل الألعاب على الهاتف" }
        ],
        styles: [
            { id: "hyper", name: "حماسي وسريع جداً (TikTok/Reels)", text: "الأسلوب: حماسي وسريع، بلغة عربية عامية بسيطة ومفهومة، يبدأ بخطاف قوي جداً (Hook) لجذب الانتباه في أول ثانيتين، ويتضمن تقطيعاً سريعاً للمشاهد ودعوة صريحة للتفاعل في النهاية." },
            { id: "expert", name: "خبير تقني هادئ وموثوق (YouTube)", text: "الأسلوب: هادئ ومقنع، بلغة عربية فصحى مبسطة، يركز على شرح الفكرة بدقة علمية وتقديم الدلائل وتوجيه المشاهد لحماية نفسه بخطوات مرتبة." },
            { id: "funny", name: "كوميدي وتفاعلي خفيف للشباب", text: "الأسلوب: كوميدي خفيف وساخر، يناسب فئة الشباب، يطرح المشكلة التقنية بشكل طريف ويقدم الحل بلمسات فكاهية لضمان تفاعل ومشاركة واسعة." },
            { id: "brief", name: "مباشر ودقيق بدون مقدمات طويلة", text: "الأسلوب: مباشر وعملي جداً، خالي من الثرثرة، يستعرض الحل فوراً ويوضح الخطوات في نقاط 1، 2، 3 بشكل موجز." }
        ],
        template: "اكتب لي: [TOPIC]. متماشياً مع شروط التقديم التالية:\n[STYLE]"
    },
    code: {
        badge: "CODING / API PROMPT",
        labelTopic: "الوظيفة البرمجية المطلوبة",
        labelStyle: "لغة البرمجة أو الإطار المستخدم",
        topics: [
            { id: "filter_js", name: "دالة فلترة وبحث غير حساسة للمخازن", text: "an optimized function to search and filter an array of objects based on multiple fields, handling case-insensitive queries and returning matching elements" },
            { id: "glass_css", name: "واجهة بطاقة زجاجية كاملة التأثيرات", text: "a beautiful stylesheet code for a Glassmorphism card container featuring backdrop blur, glowing neon borders, drop shadow, and clean responsive layout properties" },
            { id: "hash_pw", name: "مخطط نموذج مستخدم وتشفير الباسورد", text: "a database Schema model for users registration that includes fields validation (email, password, status) and automatically hashes passwords using bcrypt pre-save" },
            { id: "secure_input", name: "تنظيف المدخلات ضد XSS و SQL Injection", text: "a backend helper function to sanitize user text inputs, escaping HTML special characters to prevent scripts execution and filter malicious commands" },
            { id: "smtp_mail", name: "إرسال رسائل بريد إلكتروني API route", text: "a POST API route function endpoint that receives contact form data, validates the inputs, and sends an email via SMTP client" }
        ],
        styles: [
            { id: "js", name: "JavaScript / ES6 Modern", text: "using clean JavaScript ES6+ syntax, modern array methods, promise handling, and exporting the modules properly" },
            { id: "python", name: "Python 3 Standard", text: "written in Python 3, using standard library modules, type hinting, secure libraries, and clean PEP8 style guidelines" },
            { id: "react", name: "React Components (JSX)", text: "as a reusable React functional component utilizing Hooks (useState, useEffect), inline styled Tailwind tags or CSS Modules, and handling states cleanly" },
            { id: "css", name: "Pure CSS3 Variables", text: "written in pure CSS3, utilizing CSS variables (custom properties) for theming, responsive media queries, and flexbox/grid layout systems" }
        ],
        template: "Write [TOPIC] in [STYLE]. The code must be well-optimized, secure against vulnerabilities, and thoroughly commented to explain the logic of each line."
    }
};

// INITIALIZATION AND PAGES STATE
let currentCategory = "all";
let promptSearchTerms = "";
let currentPage = 1;
const promptsPerPage = 6; // Display 6 prompts per page

// DOM ELEMENTS SELECTORS (Prompts Page)
const promptsGrid = document.getElementById("promptsGrid");
const promptSearchInput = document.getElementById("promptSearchInput");
const clearPromptSearchBtn = document.getElementById("clearPromptSearchBtn");
const promptFilters = document.getElementById("promptFilters");

// Pagination selectors
const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");
const pageNumbers = document.getElementById("pageNumbers");

// Customizer DOM Selectors
const custCategory = document.getElementById("custCategory");
const custTopic = document.getElementById("custTopic");
const custStyle = document.getElementById("custStyle");
const custOutputText = document.getElementById("custOutputText");
const custCopyBtn = document.getElementById("custCopyBtn");
const outputBadge = document.getElementById("outputBadge");
const topicLabel = document.getElementById("topicLabel");
const styleLabel = document.getElementById("styleLabel");

// Toast System Selector
const toastNotification = document.getElementById("toastNotification");
const toastMessage = document.getElementById("toastMessage");

// STATIC PROMPTS RENDER SYSTEM
function renderPromptCards() {
    promptsGrid.innerHTML = "";

    // Filter prompts array
    const filteredPrompts = PROMPTS_DATABASE.filter(prompt => {
        const matchesCategory = currentCategory === "all" || prompt.category === currentCategory;
        const matchesSearch = promptSearchTerms === "" ||
            prompt.title.toLowerCase().includes(promptSearchTerms.toLowerCase()) ||
            prompt.explanation.toLowerCase().includes(promptSearchTerms.toLowerCase()) ||
            prompt.promptText.toLowerCase().includes(promptSearchTerms.toLowerCase()) ||
            prompt.tags.some(tag => tag.toLowerCase().includes(promptSearchTerms.toLowerCase()));

        return matchesCategory && matchesSearch;
    });

    // Calculate pagination values
    const totalPrompts = filteredPrompts.length;
    const totalPages = Math.ceil(totalPrompts / promptsPerPage) || 1;

    // Boundary corrections
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    // Slice array for the current page
    const startIndex = (currentPage - 1) * promptsPerPage;
    const endIndex = Math.min(startIndex + promptsPerPage, totalPrompts);
    const paginatedPrompts = filteredPrompts.slice(startIndex, endIndex);

    if (paginatedPrompts.length === 0) {
        promptsGrid.innerHTML = `
            <div class="no-result-card" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
                <i class="fa-solid fa-brain" style="font-size: 2.5rem; margin-bottom: 12px; color: var(--primary);"></i>
                <p>عذراً، لم نجد أي أوامر ذكاء اصطناعي تطابق هذا البحث حالياً.</p>
            </div>
        `;
        updatePaginationUI(1, 1);
        return;
    }

    // Render cards
    paginatedPrompts.forEach((prompt, idx) => {
        const categoryLabels = {
            images: "تصميم صور",
            content: "صناعة محتوى",
            coding: "برمجة وتطوير"
        };

        const card = document.createElement("div");
        card.className = "prompt-card";
        card.innerHTML = `
            <div class="prompt-card-top">
                <div class="prompt-card-header">
                    <h3 class="prompt-card-title">${prompt.title}</h3>
                    <span class="prompt-card-tag ${prompt.category}">${categoryLabels[prompt.category]}</span>
                </div>
                <div class="prompt-explanation">
                    <strong>شرح الاستخدام:</strong> ${prompt.explanation}
                </div>
                <pre class="prompt-card-text" id="promptText-${startIndex}-${idx}">${prompt.promptText}</pre>
            </div>
            <div class="prompt-card-bottom">
                <button class="prompt-copy-btn" data-text-id="promptText-${startIndex}-${idx}">
                    <i class="fa-regular fa-copy"></i> نسخ الأمر
                </button>
            </div>
        `;
        promptsGrid.appendChild(card);
    });

    // Attach clipboard click triggers to cards
    promptsGrid.querySelectorAll(".prompt-copy-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const textId = btn.getAttribute("data-text-id");
            const text = document.getElementById(textId).textContent;
            copyTextToClipboard(text);
        });
    });

    updatePaginationUI(currentPage, totalPages);
}

// PAGINATION CONTROLLER LOGIC
function updatePaginationUI(current, total) {
    // Disable previous/next buttons if boundary
    prevPageBtn.disabled = current === 1;
    nextPageBtn.disabled = current === total;

    pageNumbers.innerHTML = "";
    
    // Draw page buttons
    for (let i = 1; i <= total; i++) {
        const btn = document.createElement("button");
        btn.className = `num-btn ${i === current ? 'active' : ''}`;
        btn.textContent = i;
        btn.addEventListener("click", () => {
            currentPage = i;
            renderPromptCards();
            // Scroll smoothly to grid top
            document.querySelector(".search-filter-wrapper").scrollIntoView({ behavior: "smooth" });
        });
        pageNumbers.appendChild(btn);
    }
}

prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderPromptCards();
    }
});

nextPageBtn.addEventListener("click", () => {
    currentPage++;
    renderPromptCards();
});

// SEARCH BAR EVENT LISTENERS
promptSearchInput.addEventListener("input", (e) => {
    promptSearchTerms = e.target.value.trim();
    currentPage = 1; // Reset to page 1 on search
    if (promptSearchTerms.length > 0) {
        clearPromptSearchBtn.style.display = "block";
    } else {
        clearPromptSearchBtn.style.display = "none";
    }
    renderPromptCards();
});

clearPromptSearchBtn.addEventListener("click", () => {
    promptSearchInput.value = "";
    promptSearchTerms = "";
    clearPromptSearchBtn.style.display = "none";
    currentPage = 1;
    renderPromptCards();
});

// CATEGORY PILLS EVENT LISTENERS
promptFilters.addEventListener("click", (e) => {
    const filterBtn = e.target.closest(".filter-pill");
    if (!filterBtn) return;

    document.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
    filterBtn.classList.add("active");

    currentCategory = filterBtn.getAttribute("data-category");
    currentPage = 1; // Reset page
    renderPromptCards();
});

// CLIPBOARD & TOAST NOTIFIER HANDLER
function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast("تم نسخ أمر الذكاء الاصطناعي بنجاح! جاهز للصق والاستخدام.");
    }).catch(err => {
        showToast("فشل النسخ التلقائي، يرجى نسخه يدوياً.");
    });
}

function showToast(message) {
    toastMessage.textContent = message;
    toastNotification.classList.add("active");
    setTimeout(() => {
        toastNotification.classList.remove("active");
    }, 3500);
}

// INTERACTIVE PROMPT CUSTOMIZER / MATH GENERATOR WIDGET
function initCustomizer() {
    // Listen for category selection change
    custCategory.addEventListener("change", populateCustomizerFields);
    custTopic.addEventListener("change", generateCustomPrompt);
    custStyle.addEventListener("change", generateCustomPrompt);

    // Initial load
    populateCustomizerFields();

    // Copy action
    custCopyBtn.addEventListener("click", () => {
        const text = custOutputText.textContent;
        copyTextToClipboard(text);
    });
}

function populateCustomizerFields() {
    const cat = custCategory.value;
    const schema = CUSTOMIZER_DATABASE[cat];

    if (!schema) return;

    // Set labels
    topicLabel.textContent = schema.labelTopic;
    styleLabel.textContent = schema.labelStyle;
    outputBadge.textContent = schema.badge;

    // Populate Topics Select dropdown
    custTopic.innerHTML = "";
    schema.topics.forEach(t => {
        const opt = document.createElement("option");
        opt.value = t.id;
        opt.textContent = t.name;
        custTopic.appendChild(opt);
    });

    // Populate Styles Select dropdown
    custStyle.innerHTML = "";
    schema.styles.forEach(s => {
        const opt = document.createElement("option");
        opt.value = s.id;
        opt.textContent = s.name;
        custStyle.appendChild(opt);
    });

    // Fire generation
    generateCustomPrompt();
}

function generateCustomPrompt() {
    const cat = custCategory.value;
    const schema = CUSTOMIZER_DATABASE[cat];
    if (!schema) return;

    const topicId = custTopic.value;
    const styleId = custStyle.value;

    const topicObj = schema.topics.find(t => t.id === topicId);
    const styleObj = schema.styles.find(s => s.id === styleId);

    if (!topicObj || !styleObj) return;

    // Apply template replacement
    let outputPrompt = schema.template
        .replace("[TOPIC]", topicObj.text)
        .replace("[STYLE]", styleObj.text);

    custOutputText.textContent = outputPrompt;
}

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

// ONLOAD LIFECYCLE
window.addEventListener("DOMContentLoaded", () => {
    renderPromptCards();
    initCustomizer();
    initTheme();
});

// DATABASE FOR APPS & TUTORIALS (Dynamic Fetch)
let APPS_DATABASE = [];
let ALTERNATIVES_DATABASE = {};
let AI_PROMPTS = {};

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
AI_PROMPTS = {
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
let currentModalAppId = null; // Track current app in details modal

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

    filteredApps.forEach((app, idx) => {
        // Insert Ad unit card after the 3rd and 7th items
        if (idx === 3 || idx === 7) {
            const adCard = document.createElement("div");
            adCard.className = "ad-card-item";
            const slotId = idx === 3 ? "2222222222" : "4444444444";
            adCard.innerHTML = `
                <span class="ad-label">مساحة إعلانية</span>
                <ins class="adsbygoogle"
                     style="display:block; width:100%;"
                     data-ad-format="fluid"
                     data-ad-layout-key="-fb+5w+4e-db+86"
                     data-ad-client="ca-pub-0000000000000000"
                     data-ad-slot="${slotId}"></ins>
            `;
            appsGrid.appendChild(adCard);
            
            // Programmatically trigger AdSense push
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.warn("Dynamic grid ad push failed:", e);
            }
        }

        const card = document.createElement("div");
        card.className = "app-card";
        
        // Map category keys to Arabic names
        const categoryNames = {
            apps: "تطبيق مميز",
            games: "ألعاب وتسلية",
            ai: "ذكاء اصطناعي",
            tricks: "شرح ثغرة",
            webtools: "أداة ويب"
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

    currentModalAppId = id; // Track for download analytics

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
        tricks: "شرح ثغرة",
        webtools: "أداة ويب"
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
    
    // Dynamically push AdSense ad when the container is displayed
    try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
        console.warn("AdSense push failed or already pushed:", e);
    }
    
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

    // Increment alternative finder searches counter
    fetch("https://countapi.mileshilliard.com/api/v1/hit/novatrixeg_alternatives").catch(err => console.warn(err));
    if (window.ViralEngine) window.ViralEngine.onToolUsed();

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
    // Increment security check completions counter
    fetch("https://countapi.mileshilliard.com/api/v1/hit/novatrixeg_security").catch(err => console.warn(err));
    if (window.ViralEngine) window.ViralEngine.onToolUsed();

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
                if (window.ViralEngine) window.ViralEngine.onPromptCopied();
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
    
    // Increment chatbot interactions counter
    fetch("https://countapi.mileshilliard.com/api/v1/hit/novatrixeg_chatbot").catch(err => console.warn(err));
    if (window.ViralEngine) window.ViralEngine.onToolUsed();
    
    appendChatMessage("user", text);
    chatInput.value = "";
    
    triggerBotReply(text);
}

function normalizeText(text) {
    return text.toLowerCase()
        .replace(/[أإآ]/g, "ا")
        .replace(/ة/g, "ه")
        .replace(/ى/g, "ي")
        .trim();
}

function triggerAltSearch(query) {
    const searchInput = document.getElementById("finderSearchInput");
    const finderCard = document.getElementById("altFinderCard");
    
    if (searchInput) {
        searchInput.value = query;
        performAlternativeLookup();
        if (finderCard) {
            finderCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            finderCard.classList.add("glow-highlight");
            setTimeout(() => finderCard.classList.remove("glow-highlight"), 2000);
        }
    }
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add("glow-highlight");
        setTimeout(() => el.classList.remove("glow-highlight"), 2000);
    }
}

// Publish to window context for onclick inline triggers
window.openAppModal = openAppModal;
window.triggerAltSearch = triggerAltSearch;
window.scrollToSection = scrollToSection;

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
        
        const normMsg = normalizeText(userMsg);
        let botResponse = "";
        
        // 1. Check if user is asking for photoshop/canva/netflix alternatives
        let foundAltKey = Object.keys(ALTERNATIVES_DATABASE).find(key => {
            return normMsg.includes(key) || normMsg.includes(normalizeText(ALTERNATIVES_DATABASE[key].name));
        });
        
        if (foundAltKey) {
            const entry = ALTERNATIVES_DATABASE[foundAltKey];
            let listStr = entry.options.map(o => `• <strong>${o.name}</strong>: ${o.desc}`).join("<br>");
            botResponse = `لدينا بدائل ممتازة لبرنامج <strong>${entry.name}</strong> الذي يكلف ${entry.price}:<br>${listStr}<br>يمكنك تجربة البحث بنفسك في مستكشف البدائل:<br><a href="javascript:triggerAltSearch('${foundAltKey}')" class="chat-action-link"><i class="fas fa-arrows-spin"></i> تشغيل البحث التلقائي عن البديل</a>`;
        }
        
        // 2. Check if user is asking about a specific app in our database
        if (!botResponse) {
            let matchedApp = APPS_DATABASE.find(app => {
                const normTitle = normalizeText(app.title);
                const normDesc = normalizeText(app.desc);
                const normId = normalizeText(app.id);
                return normMsg.includes(normId) || normTitle.includes(normMsg) || normMsg.includes(normId.replace("-", " ")) || (app.alternative && normMsg.includes(normalizeText(app.alternative)));
            });
            
            if (matchedApp) {
                botResponse = `لقد وجدت تطبيقاً يطابق سؤالك في موقعنا:<br><strong>${matchedApp.title}</strong> (${matchedApp.size})<br>${matchedApp.desc}<br><a href="javascript:openAppModal('${matchedApp.id}')" class="chat-action-link"><i class="fas fa-download"></i> فتح نافذة التحميل والخصائص</a>`;
            }
        }
        
        // 3. Check for general keywords like "لعبة" or "ألعاب"
        if (!botResponse && (normMsg.includes("لعب") || normMsg.includes("العاب") || normMsg.includes("جيم"))) {
            const games = APPS_DATABASE.filter(app => app.category === "games");
            if (games.length > 0) {
                let gamesList = games.map(g => `• <a href="javascript:openAppModal('${g.id}')" style="color:var(--primary); font-weight:700;">${g.title}</a>`).join("<br>");
                botResponse = `إليك الألعاب المتوفرة للتحميل المباشر والآمن على موقعنا:<br>${gamesList}<br>اضغط على اسم اللعبة لفتح صفحة التحميل فوراً!`;
            }
        }

        // 4. Check for general keywords like "برنامج" or "تطبيقات"
        if (!botResponse && (normMsg.includes("برنامج") || normMsg.includes("تطبيق") || normMsg.includes("تطبيقات"))) {
            const apps = APPS_DATABASE.filter(app => app.category === "apps");
            if (apps.length > 0) {
                let appsList = apps.map(a => `• <a href="javascript:openAppModal('${a.id}')" style="color:var(--primary); font-weight:700;">${a.title}</a>`).join("<br>");
                botResponse = `إليك التطبيقات المميزة المتوفرة على موقعنا:<br>${appsList}<br>اضغط على اسم التطبيق لفتح تفاصيله وتحميله.`;
            }
        }

        // 5. Check if asking for security / lock / protection
        if (!botResponse && (normMsg.includes("حماي") || normMsg.includes("امان") || normMsg.includes("تجسس") || normMsg.includes("اختراق") || normMsg.includes("مخترق") || normMsg.includes("فحص"))) {
            botResponse = `لحماية جوالك وكشف التجسس، يمكنك استخدام أداتنا التفاعلية <strong>مستشار الأمان</strong> لفحص جهازك الآن:<br><a href="javascript:scrollToSection('securityCard')" class="chat-action-link"><i class="fas fa-shield-halved"></i> بدء الفحص الأمني للجوال</a><br>كما ننصحك بتحميل تطبيق كشف التجسس المتوفر لدينا:<br><a href="javascript:openAppModal('anti-spy')" class="chat-action-link"><i class="fas fa-download"></i> تحميل تطبيق كاشف التجسس</a>`;
        }

        // 6. Check if asking about AI prompts, ChatGPT, Midjourney
        if (!botResponse && (normMsg.includes("برومت") || normMsg.includes("ذكاء اصطناعي") || normMsg.includes("اوامر") || normMsg.includes("مطالب") || normMsg.includes("تصميم") || normMsg.includes("رسم") || normMsg.includes("midjourney") || normMsg.includes("chatgpt"))) {
            botResponse = `لدينا مكتبة أوامر ذكاء اصطناعي جاهزة للنسخ والاستخدام!<br>إليك نموذجاً لأمر تصميم صور سايبربانك:<br><pre class="prompt-code" id="chatCyberPrompt" style="margin: 8px 0; max-height: 80px;">A futuristic cyberpunk hacker sitting in front of multi-monitors showing glowing tech codes, hologram interface, cybernetic enhancements, hyper realistic 8k, neon cyan and purple glowing colors, cinematic lighting, shot on 85mm lens --ar 16:9</pre><button onclick="copyTextDirectly('chatCyberPrompt', 'تم نسخ أمر السايبربانك!')" class="copy-prompt-btn" style="padding: 2px 8px; font-size:0.7rem;"><i class="fas fa-copy"></i> نسخ الأمر</button><br>يمكنك الانتقال لصفحة البرومبتات الكاملة لتعديل وتوليد آلاف المطالبات المشروحة بالعربي:<br><a href="prompts.html" class="chat-action-link"><i class="fas fa-arrow-up-right-from-square"></i> دخول مكتبة الـ +1000 برومت</a>`;
        }

        // 7. Check if asking about making money / profit / calculator
        if (!botResponse && (normMsg.includes("ربح") || normMsg.includes("فلوس") || normMsg.includes("دولار") || normMsg.includes("تسعير") || normMsg.includes("بيع") || normMsg.includes("عملاء") || normMsg.includes("اقناع"))) {
            botResponse = `لقد أضفنا <strong>بوابة الربح من تصميمات السوشيال ميديا</strong> لمساعدة المتابعين على كسب المال عبر تقديم خدمات التصميم للعيادات والمصانع!<br>تشمل البوابة:<br>1. حاسبة الأرباح والتسعير التفاعلية.<br>2. مولد رسائل الإقناع وجلب العملاء.<br><a href="javascript:scrollToSection('profitHubSection')" class="chat-action-link"><i class="fas fa-hand-holding-dollar"></i> الذهاب لبوابة الربح والتسعير</a>`;
        }
        
        // 8. Default responses mapping fallback
        if (!botResponse) {
            for (const key in CHATBOT_RESPONSES) {
                if (normMsg.includes(normalizeText(key))) {
                    botResponse = CHATBOT_RESPONSES[key];
                    break;
                }
            }
        }
        
        // Fallback default
        if (!botResponse) {
            botResponse = `سؤال تقني رائع! لمناقشة هذا الشأن بالتفصيل والحصول على أفضل الحلول والشروحات المصورة، يرجى متابعة قناتنا على يوتيوب وتليجرام حيث ننشر دروساً يومية تغطي كافة الثغرات والبدائل، أو تصفح الأقسام والأدوات المتاحة في الصفحة الرئيسية.`;
        }
        
        appendChatMessage("bot", botResponse);
    }, 1200);
}

// Chat quick hints button trigger
chatQuickHints.addEventListener("click", (e) => {
    const hintBtn = e.target.closest(".hint-btn");
    if (!hintBtn) return;
    
    const queryText = hintBtn.textContent.trim();
    appendChatMessage("user", queryText);
    triggerBotReply(queryText);
    if (window.ViralEngine) window.ViralEngine.onToolUsed();
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

function updateLogoTheme(theme) {
    const darkSrc  = "assets/logo-dark.svg";
    const lightSrc = "assets/logo-light.svg";

    // Navbar + hero banner logos (all img.logo-svg)
    document.querySelectorAll("img.logo-svg").forEach(img => {
        // Hero logo banner always shows dark SVG for dark mode, light SVG for light mode
        img.src = theme === "light" ? lightSrc : darkSrc;
    });
}

function initTheme() {
    // Always default to light theme on initial page load
    document.body.classList.add("light-theme");
    updateThemeIcon("light");
    updateLogoTheme("light");
    
    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        const theme = document.body.classList.contains("light-theme") ? "light" : "dark";
        localStorage.setItem("theme", theme);
        updateThemeIcon(theme);
        updateLogoTheme(theme);
        showToast(theme === "light" ? "تم تفعيل الوضع المضيء ☀️" : "تم تفعيل الوضع الداكن 🌙");
    });
}


// ==========================================
// DESIGN MONETIZATION HUB (PITCH & CALCULATOR)
// ==========================================

// Global clipboard text copier helper
function copyTextDirectly(elementId, successMsg) {
    const textEl = document.getElementById(elementId);
    let textToCopy = "";
    if (textEl.tagName === "TEXTAREA" || textEl.tagName === "INPUT") {
        textToCopy = textEl.value;
    } else {
        textToCopy = textEl.textContent;
    }
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(successMsg || "تم نسخ النص بنجاح!");
        if (window.ViralEngine) window.ViralEngine.onPromptCopied();
    }).catch(err => {
        showToast("فشل في نسخ النص، يرجى نسخه يدوياً.");
    });
}

// Lightbox controller functions
function openGalleryLightbox(imgSrc, title) {
    const lightbox = document.getElementById("galleryLightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxTitle = document.getElementById("lightboxTitle");
    const lightboxDownloadBtn = document.getElementById("lightboxDownloadBtn");
    
    lightboxImg.src = imgSrc;
    lightboxTitle.textContent = title;
    lightboxDownloadBtn.href = imgSrc;
    
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent background scroll
}

function closeGalleryLightbox() {
    const lightbox = document.getElementById("galleryLightbox");
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
}

// Profit Calculator logic
const PRICING_DATABASE = {
    dental: {
        basePricePerDesign: { beginner: 20, intermediate: 35, pro: 60 },
        tip: "المجال الطبي مربح جداً. العيادات تبحث عن مظهر فخم وموثوق. اعرض باقة شهرية كاملة واقترح زيادة الزيارات عبر إبراز شهادات المرضى ومقارنات قبل وبعد."
    },
    food: {
        basePricePerDesign: { beginner: 15, intermediate: 25, pro: 45 },
        tip: "مجال الأغذية يعتمد 100% على فتح الشهية والألوان النضرة الجذابة. اعرض عليهم عروض نهاية الأسبوع ووجبات التجميع، وقم بالتصوير بالتعاون مع مصور محلي."
    },
    corporate: {
        basePricePerDesign: { beginner: 25, intermediate: 40, pro: 70 },
        tip: "الشركات تبحث عن الهوية المؤسساتية والالتزام بالألوان الرسمية. ركز على تصميم الإنفوجرافيك وبطاقات التهنئة بالأعياد والمناسبات الرسمية."
    },
    stores: {
        basePricePerDesign: { beginner: 12, intermediate: 20, pro: 35 },
        tip: "المتاجر تحتاج إلى تصميمات عروض الخصومات وتصاميم المنتجات المنعزلة (PNG). اعرض عليهم باقات كبيرة وسعر أقل للتصميم الواحد لزيادة إنتاجيتهم."
    }
};

function calculateProjectProfit() {
    const field = document.getElementById("calcField").value;
    const count = parseInt(document.getElementById("calcDesignsCount").value);
    const exp = document.getElementById("calcExpLevel").value;
    
    const pricing = PRICING_DATABASE[field];
    const pricePerDesign = pricing.basePricePerDesign[exp];
    const totalPrice = pricePerDesign * count;
    
    // Monthly estimated (assuming 4 active clients/projects per month)
    const monthlyTotal = totalPrice * 4;
    
    document.getElementById("calcPriceResult").textContent = `${totalPrice} دولار`;
    document.getElementById("calcMonthlyProfit").textContent = `${monthlyTotal} دولار`;
    document.getElementById("calcTipText").textContent = pricing.tip;
}

// Pitch message generator database
const PITCH_TEMPLATES = {
    dentist: {
        professional: `السلام عليكم ورحمة الله وبركاته دكتور/ة،
أتمنى أن تكون بأفضل حال.

معك [اسمك]، مصمم سوشيال ميديا متخصص في الهوية البصرية للعيادات الطبية وتجميل الأسنان. لقد كنت أتابع صفحة عيادتكم الموقرة على منصات التواصل، ولاحظت أنه يمكننا الارتقاء بجمالية التصاميم وزيادة تفاعل المرضى عبر اعتماد أسلوب بصري نيون ثلاثي الأبعاد وعالي التباين (مثل حملة: "خلي اسنانك تنور" الفاخرة).

لقد قمت بإعداد باقة تصاميم متكاملة (6 تصاميم أولية) مخصصة لطب وتجميل الفم، تشمل عروض تبييض الأسنان والمتابعة الدورية، مجهزة بهوية عصرية وإضاءة سينمائية تجذب الانتباه.

هل يمكنني مشاركة النماذج معك للاطلاع عليها ومناقشة كيف يمكن لهذه التصاميم جذب المزيد من المراجعين للعيادة هذا الشهر؟

أطيب التحيات،
[اسمك]
هاتف: [رقم جوالك]`,
        friendly: `أهلاً دكتور/ة، عساك بخير وصحة يا رب!

أنا [اسمك]، مصمم وصانع محتوى بصري. من خلال متابعتي لصفحتكم الجميلة، حبيت أساعدكم في جعل شكل الحساب أرقى وأكثر حيوية ليناسب جودة الخدمات الطبية الرائعة اللي تقدموها لمرضاكم.

جهّزت باقة تصاميم مميزة جداً ومبهجة تحت شعار "خلي اسنانك تنور" بألوان تفتح النفس وتخلي المراجعين يحبوا يتواصلوا معكم ويحجزوا استشاراتهم فوراً.

حبيت أعرض عليك نموذج مجاني تماماً باللوجو الخاص بكم لتشوف النتيجة بنفسك. إذا كنت مهتم، يسعدني جداً ننسق سوا!

يومك سعيد،
[اسمك]`,
        direct: `مرحباً دكتور،
هل ترغب في زيادة حجوزات عيادتك هذا الشهر عبر تصاميم سوشيال ميديا احترافية؟

أنا [اسمك]، مصمم تسويقي. قمت بإنشاء باقة تصاميم إعلانية مبتكرة (6 تصاميم متنوعة) لطب وزراعة وتجميل الأسنان، تركز مباشرة على إبراز نظافة العيادة وجمال الابتسامة وعروض الحجز المباشر تحت عنوان "خلي اسنانك تنور".

التصاميم مصممة لتصنع هوية موحدة وذات تباين عالي تجعل المستخدم يقف عندها أثناء تصفح حسابه.

إذا كنت ترغب في الحصول على عينات مخصصة لعيادتك مجاناً لمعاينتها، يرجى الرد على هذه الرسالة.

شكرًا لوقتك،
[اسمك]
واتساب: [رقم جوالك]`
    },
    restaurant: {
        professional: `السلام عليكم ورحمة الله وبركاته،
إلى إدارة التسويق الموقرة في مصنع النور / إدارة منتجات الأغذية،

معكم المصمم [اسمك] المتخصص في التصميم التجاري والإعلاني للمنتجات الاستهلاكية. لقد قمت بتطوير نموذج حملة إعلانية مبتكرة لمنتج التونة المفرومة والكاملة تحت شعار "طعم التونه الاصلي" و"معاك بكل تشكيلة".

تركز الحملة على إبراز المنتج كبطل للتصميم (Hero Shot) في بيئة بحرية نضرة بالكامل مع مياه متطايرة وإضاءة سينمائية واقعية تبرز جودة التغليف والمكونات. الباقة تتكون من 6 تصاميم متنوعة وجاهزة للنشر المباشر.

يسعدني مشاركة تفاصيل هذا المشروع التسويقي معكم وبحث إمكانية التعاون لتطوير الهوية البصرية لحساباتكم.

مع فائق الاحترام والتقدير،
[اسمك]
اتصال: [رقم جوالك]`,
        friendly: `أهلاً بالشباب في مصنع النور / إدارة المطعم والمنتجات،

أنا [اسمك]، مصمم سوشيال ميديا ومحب لمنتجاتكم اللذيذة! حبيت أشارككم فكرة تصميم مبتكرة لمنتج التونة تحت عنوان "طعم التونة الأصلي" - "معاك بكل تشكيلة".

الفكرة قائمة على وضع العلبة في بيئة بحرية منعشة مليئة بقطرات المياه والليمون والأعشاب الطازجة اللي تفتح نفس الزبائن وتخليهم يطلبوا المنتج فوراً من المتجر أو الهايبر ماركت القريب.

شغلكم يستاهل واجهة بصرية تليق بجودته. حابب أرسل لكم التصاميم مفتوحة المصدر باللوجو الخاص بكم للتجربة. إيش رأيكم؟

كل التوفيق،
[اسمك]`,
        direct: `مرحباً أصحاب المشاريع،
تصميم المنتج الجذاب هو نصف عملية البيع!

أنا [اسمك]، مصمم إعلانات تجارية. قمت بتصميم حملة سوشيال ميديا مبتكرة (6 تصاميم ممتازة في لوحة واحدة) لعلب التونة والأغذية البحرية تحت شعار "طعم التونه الاصلي".

الحملة تركز بالكامل على إبراز علبة المنتج وإظهارها بشكل ثلاثي الأبعاد سينمائي مع خلفية معزولة لضمان لفت انتباه العميل على فيسبوك وإنستغرام وزيادة الطلبات المباشرة.

إذا كنت تبحث عن تنشيط مبيعاتك وتصميم باقة احترافية لمنتجاتك، تواصل معي الآن لرؤية النماذج.

تحياتي،
[اسمك]
واتساب: [رقم جوالك]`
    },
    store: {
        professional: `السلام عليكم ورحمة الله،
أخي الفاضل مدير متجر [اسم المتجر]،

أتمنى لك تجارة رابحة وموفقة. معكم المصمم [اسمك]. لقد قمت بإعداد باقة تصاميم عروض وتخفيضات تجارية لمتجركم تهدف لزيادة النقر والتحويل (CTR) لمنتجاتكم الأكثر مبيعاً.

الباقة تتضمن تصاميم إعلانية جذابة وموزعة بدقة بصرية تمنع التداخل وتبرز المنتج بلمسات نيونية زجاجية تتماشى مع اتجاهات التصميم العالمية لعام 2026.

يسعدني تقديم هذه الباقة لمتجركم لمساعدتكم في تعزيز مبيعات الحملات الإعلانية القادمة.

خالص الود،
[اسمك]`,
        friendly: `أهلاً يا صديقي، عساك بخير وتجارتك في ازدهار!

أنا [اسمك]، مصمم ومسوق رقمي. كنت أتصفح متجركم الرائع وحبيت شكل المنتجات جداً، لكن شعرت أن تصاميم السوشيال ميديا الحالية تحتاج لمسة إبداعية تبرز قيمتها الحقيقية وتنافس المتاجر الكبرى.

لذلك قمت بتجهيز عينات مميزة لإعلانات التخفيضات والمنتجات البطلة بشكل زجاجي فخم مع إضاءة نيون ملفتة.

يسعدني أن أرسل لك نموذجاً مخصصاً لواحد من منتجاتك بالكامل مجاناً لترى كيف سيغير من شكل حسابك ويزيد اهتمام زبائنك. بانتظار ردك!

صديقك،
[اسمك]`,
        direct: `مرحباً مدير المتجر،
هل تعلم أن 80% من قرارات الشراء أونلاين تتم بناءً على جاذبية صورة المنتج؟

أنا [اسمك]، مصمم سوشيال ميديا إعلاني. صممت باقة إعلانية مخصصة للمتاجر تركز على عرض المنتجات كبطل للتصميم مع توضيح سعر العرض وصافي التوفير بوضوح تام، وخلفية معزولة باحترافية.

هذه الباقة ستضمن لك تكلفة نقرة أقل وعائد إعلاني أعلى لحملاتك الممولة.

راسلني الآن للحصول على عينات مجانية لمتجرك والبدء بالتعاون فوراً.

تحياتي،
[اسمك]
رقم الهاتف:`
    }
};

function generatePitchText() {
    const client = document.getElementById("pitchClient").value;
    const tone = document.getElementById("pitchTone").value;
    
    const template = PITCH_TEMPLATES[client][tone];
    document.getElementById("pitchOutput").value = template;
}

function initProfitHub() {
    const calcField = document.getElementById("calcField");
    const calcDesignsCount = document.getElementById("calcDesignsCount");
    const calcExpLevel = document.getElementById("calcExpLevel");
    const pitchClient = document.getElementById("pitchClient");
    const pitchTone = document.getElementById("pitchTone");
    const copyPitchTextBtn = document.getElementById("copyPitchTextBtn");
    const closeLightboxBtn = document.getElementById("closeLightboxBtn");
    const galleryLightbox = document.getElementById("galleryLightbox");

    if (calcField) calcField.addEventListener("change", calculateProjectProfit);
    if (calcDesignsCount) calcDesignsCount.addEventListener("change", calculateProjectProfit);
    if (calcExpLevel) calcExpLevel.addEventListener("change", calculateProjectProfit);
    
    if (pitchClient) pitchClient.addEventListener("change", generatePitchText);
    if (pitchTone) pitchTone.addEventListener("change", generatePitchText);
    
    if (copyPitchTextBtn) {
        copyPitchTextBtn.addEventListener("click", () => {
            copyTextDirectly("pitchOutput", "تم نسخ الرسالة التسويقية بنجاح!");
        });
    }

    if (closeLightboxBtn) {
        closeLightboxBtn.addEventListener("click", closeGalleryLightbox);
    }

    if (galleryLightbox) {
        galleryLightbox.addEventListener("click", (e) => {
            if (e.target === galleryLightbox) closeGalleryLightbox();
        });
    }

    // Initial calculations
    calculateProjectProfit();
    generatePitchText();
}

// Dynamic database fetch loader
function loadDatabase(callback) {
    fetch("database.json")
        .then(res => res.json())
        .then(data => {
            APPS_DATABASE = data.apps || [];
            ALTERNATIVES_DATABASE = data.alternatives || {};
            
            // Map web tools to fit APPS_DATABASE structure
            const webTools = data.web_tools || [];
            webTools.forEach(wt => {
                APPS_DATABASE.push({
                    id: wt.id,
                    title: wt.title,
                    category: "webtools",
                    desc: wt.desc,
                    icon: "fas fa-globe",
                    size: "أونلاين (ويب)",
                    compat: "جميع الأجهزة (متصفح)",
                    link: wt.url,
                    features: wt.tags.map(t => "دعم: " + t),
                    alternative: null
                });
            });
            
            // Re-group and map database prompts correctly into categories
            const promptsArray = data.prompts || [];
            AI_PROMPTS = { images: [], content: [], coding: [] };
            promptsArray.forEach(p => {
                if (AI_PROMPTS[p.category]) {
                    AI_PROMPTS[p.category].push({
                        title: p.title,
                        text: p.promptText
                    });
                }
            });
            
            if (callback) callback();
        })
        .catch(err => {
            console.error("Failed to load database.json:", err);
            // Local fallbacks are already in AI_PROMPTS from the initialization block
            if (callback) callback();
        });
}

// HIDDEN ADMIN ENTRANCE CONTROLLER
function initHiddenEntrance() {
    // 1. Avatar Click Listener (5 clicks in 3 seconds)
    const avatar = document.querySelector(".profile-avatar-container");
    if (avatar) {
        let clickCount = 0;
        let lastClickTime = 0;
        
        avatar.addEventListener("click", () => {
            const currentTime = Date.now();
            if (currentTime - lastClickTime < 3000) {
                clickCount++;
            } else {
                clickCount = 1;
            }
            lastClickTime = currentTime;
            
            if (clickCount === 5) {
                clickCount = 0; // reset
                showToast("جاري الانتقال لبوابة الإدارة... 🔒");
                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 1000);
            }
        });
    }

    // 2. Keyboard shortcut Listener (Ctrl + Shift + D)
    window.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.shiftKey && (e.key === "D" || e.key === "d")) {
            e.preventDefault();
            showToast("جاري الانتقال لبوابة الإدارة... 🔒");
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);
        }
    });
}

// World-Class Preloader Handler
function initPreloader() {
    const preloader = document.getElementById("preloader");
    const progressFill = document.getElementById("preloaderProgress");
    
    if (preloader) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            if (progressFill) progressFill.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                preloader.style.opacity = "0";
                preloader.style.visibility = "hidden";
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }
        }, 80);
    }
}



// STARTUP TASKS
window.addEventListener("DOMContentLoaded", () => {
    initPreloader();
    
    loadDatabase(() => {
        renderApps();
        
        // Find active AI tab
        const activeTab = document.querySelector(".prompt-tab-btn.active");
        const category = activeTab ? activeTab.getAttribute("data-tab") : "images";
        loadPrompts(category);
        
        initTheme();
        initProfitHub();
        initHiddenEntrance();

        // Intercept prompts library entrance button to require 3 shares
        const promptsBtn = document.getElementById("promptsLibraryBtn");
        if (promptsBtn) {
            promptsBtn.addEventListener("click", (e) => {
                const requiredShares = 3;
                const currentShares = window.ViralEngine.getShareCount();
                
                if (currentShares < requiredShares) {
                    e.preventDefault(); // Stop navigation
                    window.ViralEngine.share("prompts_unlock");
                }
            });
        }

        // Track Visits Analytics (if not localhost)
        if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
            fetch("https://countapi.mileshilliard.com/api/v1/hit/novatrixeg_visits").catch(err => console.warn(err));
        }

        // Track App Download Analytics when final download button is clicked
        const finalDownloadBtn = document.getElementById("finalDownloadBtn");
        if (finalDownloadBtn) {
            finalDownloadBtn.addEventListener("click", () => {
                fetch("https://countapi.mileshilliard.com/api/v1/hit/novatrixeg_downloads").catch(err => console.warn(err));
                if (currentModalAppId) {
                    fetch(`https://countapi.mileshilliard.com/api/v1/hit/novatrixeg_app_${currentModalAppId}`).catch(err => console.warn(err));
                }
            });
        }
    });
});


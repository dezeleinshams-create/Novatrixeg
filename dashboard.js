// ==========================================================================
// DASHBOARD CONTROLLERS & GITHUB API INTEGRATION
// ==========================================================================

// Global state variables
let localDatabase = { apps: [], alternatives: {}, prompts: [], customizer: {} };
let isModified = false;
let gitConfig = { token: "", owner: "", repo: "", branch: "" };

// Credentials Hash (SHA-256 for bodanow6@gmail.com:bn918912bn918912bn)
const CREDENTIALS_HASH = "4bcb38a270dc1bdc34662608a1295f89f4c87429bd3018b6d362d59896b9aa4c";

// === Admin Authentication Gate enabled for all hosts via SHA-256 login ===

// DOM Selectors
const githubTokenInput = document.getElementById("githubToken");
const githubOwnerInput = document.getElementById("githubOwner");
const githubRepoInput = document.getElementById("githubRepo");
const githubBranchInput = document.getElementById("githubBranch");
const saveAuthConfigBtn = document.getElementById("saveAuthConfigBtn");

const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

const appsListContainer = document.getElementById("appsListContainer");
const altsListContainer = document.getElementById("altsListContainer");
const promptsListContainer = document.getElementById("promptsListContainer");

const publishStatus = document.getElementById("publishStatus");
const publishBtn = document.getElementById("publishBtn");

const toastNotification = document.getElementById("toastNotification");
const toastMessage = document.getElementById("toastMessage");

// Login Gateway DOM Selectors
const loginOverlay = document.getElementById("loginOverlay");
const dashboardContainer = document.getElementById("dashboardContainer");
const loginForm = document.getElementById("loginForm");
const loginUser = document.getElementById("loginUser");
const loginPassword = document.getElementById("loginPassword");
const loginErrorMsg = document.getElementById("loginErrorMsg");
const logoutBtn = document.getElementById("logoutBtn");

// Theme Manager
const themeToggleBtn = document.getElementById("themeToggleBtn");

function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector("i");
    if (!icon) return;
    if (theme === "light") {
        icon.className = "fas fa-moon";
    } else {
        icon.className = "fas fa-sun";
    }
}

function initTheme() {
    if (!themeToggleBtn) return;
    
    // Read from localStorage to persist theme, default to light
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        updateThemeIcon("light");
    } else {
        document.body.classList.remove("light-theme");
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

// On Load initialization
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    checkAdminAuthentication();
});

// SHA-256 Hashing helper using native Web Crypto API
async function hashCredentials(username, password) {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();
    const msgBuffer = new TextEncoder().encode(`${cleanUser}:${cleanPass}`);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Check if user is logged in
function checkAdminAuthentication() {
    const isAuthenticated = sessionStorage.getItem("admin_authenticated") === "true";
    
    if (isAuthenticated) {
        // Hide login gate and show dashboard
        loginOverlay.classList.add("hidden");
        dashboardContainer.style.display = "block";
        
        // Initialize dashboard controllers
        initTabs();
        initAuthConfig();
        fetchLocalDatabase();
        initLogout();
        initAnalyticsControls(); // Initialize analytics controls
    } else {
        // Show login gate and keep dashboard hidden
        loginOverlay.classList.remove("hidden");
        dashboardContainer.style.display = "none";
        initLoginGate();
    }
}

// === Security: Failed attempts lockout ===
const MAX_ATTEMPTS = 3;
const LOCKOUT_MS = 5 * 60 * 1000; // 5 minutes

function isLockedOut() {
    const lockUntil = parseInt(localStorage.getItem('login_lock_until') || '0');
    return Date.now() < lockUntil;
}

function getLockTimeLeft() {
    const lockUntil = parseInt(localStorage.getItem('login_lock_until') || '0');
    return Math.ceil((lockUntil - Date.now()) / 1000);
}

function recordFailedAttempt() {
    let attempts = parseInt(localStorage.getItem('login_attempts') || '0') + 1;
    localStorage.setItem('login_attempts', attempts);
    if (attempts >= MAX_ATTEMPTS) {
        localStorage.setItem('login_lock_until', Date.now() + LOCKOUT_MS);
        localStorage.setItem('login_attempts', '0');
    }
    return attempts;
}

function clearAttempts() {
    localStorage.removeItem('login_attempts');
    localStorage.removeItem('login_lock_until');
}

// Initialize Login form triggers
function initLoginGate() {
    // Security: clear any stale session auth to prevent bypass
    sessionStorage.removeItem('admin_authenticated');

    // Check lockout on load
    if (isLockedOut()) {
        const secs = getLockTimeLeft();
        loginErrorMsg.innerHTML = `<i class="fas fa-lock"></i> تم تجاوز عدد المحاولات — المحاولة مرة أخرى بعد ${Math.ceil(secs/60)} دقيقة`;
        loginErrorMsg.style.display = 'flex';
        document.getElementById('loginSubmitBtn').disabled = true;
        const interval = setInterval(() => {
            if (!isLockedOut()) {
                clearInterval(interval);
                loginErrorMsg.style.display = 'none';
                document.getElementById('loginSubmitBtn').disabled = false;
            } else {
                const s = getLockTimeLeft();
                loginErrorMsg.innerHTML = `<i class="fas fa-lock"></i> تم تجاوز عدد المحاولات — المحاولة مرة أخرى بعد ${Math.ceil(s/60)} دقيقة`;
            }
        }, 5000);
    }

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (isLockedOut()) return;

        const username = loginUser.value.trim();
        const password = loginPassword.value.trim();

        if (!username || !password) return;

        const computedHash = await hashCredentials(username, password);

        if (computedHash === CREDENTIALS_HASH) {
            // Success
            clearAttempts();
            sessionStorage.setItem("admin_authenticated", "true");
            loginErrorMsg.style.display = "none";
            loginUser.value = "";
            loginPassword.value = "";
            loginOverlay.classList.add("hidden");
            setTimeout(() => { checkAdminAuthentication(); }, 300);
        } else {
            // Failure
            const attempts = recordFailedAttempt();
            const card = document.querySelector(".login-card");
            card.style.animation = 'none';
            card.offsetHeight;
            card.style.animation = null;

            if (isLockedOut()) {
                loginErrorMsg.innerHTML = `<i class="fas fa-ban"></i> تم قفل الحساب لمدة 5 دقائق بسبب المحاولات المتكررة`;
                document.getElementById('loginSubmitBtn').disabled = true;
            } else {
                const remaining = MAX_ATTEMPTS - attempts;
                loginErrorMsg.innerHTML = `<i class="fas fa-circle-exclamation"></i> خطأ في البيانات — تبقى ${remaining} محاولة`;
            }
            loginErrorMsg.style.display = "flex";
        }
    });
}

// Initialize Logout button trigger
function initLogout() {
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            if (confirm("هل أنت متأكد من رغبتك في تسجيل الخروج؟")) {
                sessionStorage.removeItem("admin_authenticated");
                window.location.reload();
            }
        });
    }
}

// 1. Tab Switching Controller
function initTabs() {
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            tabPanes.forEach(p => p.classList.remove("active"));
            
            btn.classList.add("active");
            const targetTab = btn.getAttribute("data-tab");
            document.getElementById(`pane-${targetTab}`).classList.add("active");
            
            if (targetTab === "analytics") {
                fetchAnalyticsData();
            }
        });
    });
}

// 2. Auth Configuration Panel
function initAuthConfig() {
    // Load config from LocalStorage if exists
    gitConfig.token = localStorage.getItem("git_token") || "";
    gitConfig.owner = localStorage.getItem("git_owner") || "dezeleinshams-create";
    gitConfig.repo = localStorage.getItem("git_repo") || "abdallah-tech";
    gitConfig.branch = localStorage.getItem("git_branch") || "main";

    githubTokenInput.value = gitConfig.token;
    githubOwnerInput.value = gitConfig.owner;
    githubRepoInput.value = gitConfig.repo;
    githubBranchInput.value = gitConfig.branch;

    saveAuthConfigBtn.addEventListener("click", () => {
        gitConfig.token = githubTokenInput.value.trim();
        gitConfig.owner = githubOwnerInput.value.trim();
        gitConfig.repo = githubRepoInput.value.trim();
        gitConfig.branch = githubBranchInput.value.trim();

        localStorage.setItem("git_token", gitConfig.token);
        localStorage.setItem("git_owner", gitConfig.owner);
        localStorage.setItem("git_repo", gitConfig.repo);
        localStorage.setItem("git_branch", gitConfig.branch);

        showToast("تم حفظ إعدادات GitHub بنجاح!");
        checkPublishAbility();
    });
}

// 3. Fetch current database.json file
function fetchLocalDatabase() {
    fetch("database.json")
        .then(res => res.json())
        .then(data => {
            localDatabase = data;
            renderAllLists();
        })
        .catch(err => {
            showToast("فشل في تحميل قاعدة البيانات المحلية، تأكد من ملف database.json");
        });
}

// Render GUI Lists
function renderAllLists() {
    renderAppsList();
    renderAltsList();
    renderPromptsList();
}

function updateModificationState(state) {
    isModified = state;
    const dot = publishStatus.querySelector(".indicator-dot");
    const text = publishStatus.querySelector(".status-text");

    if (isModified) {
        dot.className = "indicator-dot modified";
        text.textContent = "تعديلات محلية غير محفوظة على GitHub";
    } else {
        dot.className = "indicator-dot success";
        text.textContent = "قاعدة البيانات متزامنة بالكامل مع GitHub";
    }
    checkPublishAbility();
}

function checkPublishAbility() {
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    publishBtn.disabled = !isModified || (!gitConfig.token && !isLocalhost);
}

// ==========================================
// APPS SECTION CONTROLLERS
// ==========================================
function renderAppsList() {
    appsListContainer.innerHTML = "";
    
    if (!localDatabase.apps || localDatabase.apps.length === 0) {
        appsListContainer.innerHTML = `<p class="text-muted text-center">لا توجد تطبيقات لعرضها.</p>`;
        return;
    }

    localDatabase.apps.forEach((app, idx) => {
        const row = document.createElement("div");
        row.className = "item-row-card";
        row.innerHTML = `
            <div class="item-meta">
                <div class="item-icon-box"><i class="${app.icon}"></i></div>
                <div class="item-title-wrapper">
                    <h4>${app.title}</h4>
                    <p>معرف: ${app.id} | القسم: ${app.category} | الحجم: ${app.size}</p>
                </div>
            </div>
            <div class="item-actions">
                <button class="primary-btn mini-btn" onclick="openEditAppModal(${idx})"><i class="fas fa-edit"></i> تعديل</button>
                <button class="primary-btn mini-btn danger-btn" onclick="deleteApp(${idx})"><i class="fas fa-trash"></i> حذف</button>
            </div>
        `;
        appsListContainer.appendChild(row);
    });
}

const appModal = document.getElementById("appModal");
const appForm = document.getElementById("appForm");
document.getElementById("addNewAppBtn").addEventListener("click", () => {
    appForm.reset();
    document.getElementById("editAppIndex").value = "";
    document.getElementById("appModalTitle").textContent = "إضافة تطبيق جديد";
    document.getElementById("appId").disabled = false;
    openModal("appModal");
});

function openEditAppModal(idx) {
    const app = localDatabase.apps[idx];
    document.getElementById("editAppIndex").value = idx;
    document.getElementById("appModalTitle").textContent = "تعديل التطبيق";
    
    document.getElementById("appId").value = app.id;
    document.getElementById("appId").disabled = true;
    document.getElementById("appTitle").value = app.title;
    document.getElementById("appCategory").value = app.category;
    document.getElementById("appIcon").value = app.icon;
    document.getElementById("appSize").value = app.size;
    document.getElementById("appCompat").value = app.compat;
    document.getElementById("appDesc").value = app.desc;
    document.getElementById("appAlternative").value = app.alternative || "";
    document.getElementById("appSaves").value = app.saves || "";
    document.getElementById("appLink").value = app.link;
    document.getElementById("appFeatures").value = app.features.join("\n");

    openModal("appModal");
}

appForm.addEventListener("submit", () => {
    const idx = document.getElementById("editAppIndex").value;
    const features = document.getElementById("appFeatures").value.split("\n").map(f => f.trim()).filter(f => f.length > 0);

    const appObj = {
        id: document.getElementById("appId").value.trim(),
        title: document.getElementById("appTitle").value.trim(),
        category: document.getElementById("appCategory").value,
        icon: document.getElementById("appIcon").value.trim(),
        size: document.getElementById("appSize").value.trim(),
        compat: document.getElementById("appCompat").value.trim(),
        desc: document.getElementById("appDesc").value.trim(),
        alternative: document.getElementById("appAlternative").value.trim(),
        saves: document.getElementById("appSaves").value.trim(),
        link: document.getElementById("appLink").value.trim(),
        features: features
    };

    if (idx === "") {
        // Add new
        // Check if ID duplicate
        const exists = localDatabase.apps.some(a => a.id === appObj.id);
        if (exists) {
            alert("معرف التطبيق الفريد موجود بالفعل! يرجى استخدام معرف مختلف.");
            return;
        }
        localDatabase.apps.push(appObj);
        showToast("تم إضافة التطبيق محلياً!");
    } else {
        // Edit existing
        localDatabase.apps[parseInt(idx)] = appObj;
        showToast("تم تعديل التطبيق محلياً!");
    }

    closeModal("appModal");
    renderAppsList();
    updateModificationState(true);
});

function deleteApp(idx) {
    if (!confirm("هل أنت متأكد من حذف هذا التطبيق نهائياً؟")) return;
    localDatabase.apps.splice(idx, 1);
    renderAppsList();
    updateModificationState(true);
    showToast("تم إزالة التطبيق بنجاح!");
}


// ==========================================
// ALTERNATIVES SECTION CONTROLLERS
// ==========================================
function renderAltsList() {
    altsListContainer.innerHTML = "";
    
    const altsKeys = Object.keys(localDatabase.alternatives || {});
    if (altsKeys.length === 0) {
        altsListContainer.innerHTML = `<p class="text-muted text-center">لا توجد بدائل برامج لعرضها.</p>`;
        return;
    }

    altsKeys.forEach(key => {
        const entry = localDatabase.alternatives[key];
        const row = document.createElement("div");
        row.className = "item-row-card";
        row.innerHTML = `
            <div class="item-meta">
                <div class="item-icon-box"><i class="fas fa-arrows-spin"></i></div>
                <div class="item-title-wrapper">
                    <h4>${entry.name} (${entry.price})</h4>
                    <p>المفتاح: ${key} | البدائل المتوفرة: ${entry.options.map(o => o.name).join(" - ")}</p>
                </div>
            </div>
            <div class="item-actions">
                <button class="primary-btn mini-btn" onclick="openEditAltModal('${key}')"><i class="fas fa-edit"></i> تعديل</button>
                <button class="primary-btn mini-btn danger-btn" onclick="deleteAlt('${key}')"><i class="fas fa-trash"></i> حذف</button>
            </div>
        `;
        altsListContainer.appendChild(row);
    });
}

const altModal = document.getElementById("altModal");
const altForm = document.getElementById("altForm");
document.getElementById("addNewAltBtn").addEventListener("click", () => {
    altForm.reset();
    document.getElementById("editAltKey").value = "";
    document.getElementById("altKey").disabled = false;
    document.getElementById("altModalTitle").textContent = "إضافة بديل جديد";
    openModal("altModal");
});

function openEditAltModal(key) {
    const entry = localDatabase.alternatives[key];
    document.getElementById("editAltKey").value = key;
    document.getElementById("altKey").value = key;
    document.getElementById("altKey").disabled = true;
    document.getElementById("altModalTitle").textContent = "تعديل البديل";

    document.getElementById("altName").value = entry.name;
    document.getElementById("altPrice").value = entry.price;

    // Fill options
    if (entry.options[0]) {
        document.getElementById("altOptName1").value = entry.options[0].name;
        document.getElementById("altOptDesc1").value = entry.options[0].desc;
        document.getElementById("altOptLink1").value = entry.options[0].link;
    }
    if (entry.options[1]) {
        document.getElementById("altOptName2").value = entry.options[1].name;
        document.getElementById("altOptDesc2").value = entry.options[1].desc;
        document.getElementById("altOptLink2").value = entry.options[1].link;
    } else {
        document.getElementById("altOptName2").value = "";
        document.getElementById("altOptDesc2").value = "";
        document.getElementById("altOptLink2").value = "";
    }

    openModal("altModal");
}

altForm.addEventListener("submit", () => {
    const editKey = document.getElementById("editAltKey").value;
    const newKey = document.getElementById("altKey").value.trim().toLowerCase();

    const options = [];
    const name1 = document.getElementById("altOptName1").value.trim();
    if (name1) {
        options.push({
            name: name1,
            desc: document.getElementById("altOptDesc1").value.trim(),
            link: document.getElementById("altOptLink1").value.trim()
        });
    }

    const name2 = document.getElementById("altOptName2").value.trim();
    if (name2) {
        options.push({
            name: name2,
            desc: document.getElementById("altOptDesc2").value.trim(),
            link: document.getElementById("altOptLink2").value.trim()
        });
    }

    const altObj = {
        name: document.getElementById("altName").value.trim(),
        price: document.getElementById("altPrice").value.trim(),
        options: options
    };

    if (editKey === "") {
        // Add new
        if (localDatabase.alternatives[newKey]) {
            alert("المفتاح مدخل بالفعل! يرجى استخدام مفتاح مختلف للبحث.");
            return;
        }
        localDatabase.alternatives[newKey] = altObj;
        showToast("تم إضافة البديل بنجاح!");
    } else {
        // Edit existing
        localDatabase.alternatives[editKey] = altObj;
        showToast("تم تعديل البديل بنجاح!");
    }

    closeModal("altModal");
    renderAltsList();
    updateModificationState(true);
});

function deleteAlt(key) {
    if (!confirm(`هل أنت متأكد من إزالة بدائل ${key} بالكامل؟`)) return;
    delete localDatabase.alternatives[key];
    renderAltsList();
    updateModificationState(true);
    showToast("تم حذف البديل بنجاح!");
}


// ==========================================
// PROMPTS SECTION CONTROLLERS
// ==========================================
function renderPromptsList() {
    promptsListContainer.innerHTML = "";
    
    if (!localDatabase.prompts || localDatabase.prompts.length === 0) {
        promptsListContainer.innerHTML = `<p class="text-muted text-center">لا توجد أوامر ذكاء اصطناعي لعرضها.</p>`;
        return;
    }

    localDatabase.prompts.forEach((prompt, idx) => {
        const row = document.createElement("div");
        row.className = "item-row-card";
        row.innerHTML = `
            <div class="item-meta">
                <div class="item-icon-box"><i class="fas fa-brain"></i></div>
                <div class="item-title-wrapper">
                    <h4>${prompt.title}</h4>
                    <p>القسم: ${prompt.category} | الوسوم: ${prompt.tags.join(", ")}</p>
                </div>
            </div>
            <div class="item-actions">
                <button class="primary-btn mini-btn" onclick="openEditPromptModal(${idx})"><i class="fas fa-edit"></i> تعديل</button>
                <button class="primary-btn mini-btn danger-btn" onclick="deletePrompt(${idx})"><i class="fas fa-trash"></i> حذف</button>
            </div>
        `;
        promptsListContainer.appendChild(row);
    });
}

const promptModal = document.getElementById("promptModal");
const promptForm = document.getElementById("promptForm");
document.getElementById("addNewPromptBtn").addEventListener("click", () => {
    promptForm.reset();
    document.getElementById("editPromptIndex").value = "";
    document.getElementById("promptModalTitle").textContent = "إضافة برومت جديد";
    openModal("promptModal");
});

function openEditPromptModal(idx) {
    const prompt = localDatabase.prompts[idx];
    document.getElementById("editPromptIndex").value = idx;
    document.getElementById("promptModalTitle").textContent = "تعديل البرومت";

    document.getElementById("promptTitle").value = prompt.title;
    document.getElementById("promptCategory").value = prompt.category;
    document.getElementById("promptTags").value = prompt.tags.join(", ");
    document.getElementById("promptExplanation").value = prompt.explanation;
    document.getElementById("promptText").value = prompt.promptText;

    openModal("promptModal");
}

promptForm.addEventListener("submit", () => {
    const idx = document.getElementById("editPromptIndex").value;
    const tags = document.getElementById("promptTags").value.split(",").map(t => t.trim()).filter(t => t.length > 0);

    const promptObj = {
        title: document.getElementById("promptTitle").value.trim(),
        category: document.getElementById("promptCategory").value,
        explanation: document.getElementById("promptExplanation").value.trim(),
        promptText: document.getElementById("promptText").value.trim(),
        tags: tags
    };

    if (idx === "") {
        // Add new
        localDatabase.prompts.push(promptObj);
        showToast("تم إضافة البرومت محلياً!");
    } else {
        // Edit existing
        localDatabase.prompts[parseInt(idx)] = promptObj;
        showToast("تم تعديل البرومت محلياً!");
    }

    closeModal("promptModal");
    renderPromptsList();
    updateModificationState(true);
});

function deletePrompt(idx) {
    if (!confirm("هل أنت متأكد من حذف هذا البرومبت؟")) return;
    localDatabase.prompts.splice(idx, 1);
    renderPromptsList();
    updateModificationState(true);
    showToast("تم إزالة البرومت بنجاح!");
}


// ==========================================
// GENERAL GUI MODAL HELPERS
// ==========================================
function openModal(modalId) {
    document.getElementById(modalId).classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove("active");
    document.body.style.overflow = "auto";
}

window.closeModal = closeModal;

// Clipboard / Toast Notifier
function showToast(message) {
    toastMessage.textContent = message;
    toastNotification.classList.add("active");
    setTimeout(() => {
        toastNotification.classList.remove("active");
    }, 3500);
}


// ==========================================
// COMMIT DEPLOYMENT TO GITHUB (GITHUB API)
// ==========================================
const downloadDbBtn = document.getElementById("downloadDbBtn");
if (downloadDbBtn) {
    downloadDbBtn.addEventListener("click", () => {
        const jsonString = JSON.stringify(localDatabase, null, 2);
        const blob = new Blob([jsonString], { type: "application/json;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "database.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast("تم تحميل database.json المعدّل! استبدله في مجلد المشروع.");
    });
}

publishBtn.addEventListener("click", publishToGitHub);

function publishToGitHub() {
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    
    // Update status UI
    const dot = publishStatus.querySelector(".indicator-dot");
    const text = publishStatus.querySelector(".status-text");
    dot.className = "indicator-dot loading";
    publishBtn.disabled = true;

    if (isLocalhost) {
        text.textContent = "جاري الحفظ المحلي والمزامنة تلقائياً مع GitHub...";
        
        fetch("/api/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(localDatabase)
        })
        .then(res => {
            if (!res.ok) throw new Error("فشل الحفظ عبر خادم الأتمتة المحلي.");
            return res.json();
        })
        .then(data => {
            if (data.status === "success") {
                updateModificationState(false);
                showToast("تم الحفظ محلياً وبدء المزامنة التلقائية مع GitHub! 🎉");
            } else {
                throw new Error(data.message);
            }
        })
        .catch(err => {
            console.error(err);
            dot.className = "indicator-dot idle";
            text.textContent = "فشل الحفظ التلقائي";
            alert(`حدث خطأ أثناء المزامنة المحلية:\n${err.message}`);
            checkPublishAbility();
        });
        return;
    }

    if (!gitConfig.token) {
        showToast("يرجى إدخال Access Token لحفظ التعديلات!");
        dot.className = "indicator-dot idle";
        text.textContent = "تعديلات غير محفوظة محلياً";
        checkPublishAbility();
        return;
    }

    text.textContent = "جاري الاتصال بـ GitHub وجلب الـ SHA...";

    const path = "database.json";
    const url = `https://api.github.com/repos/${gitConfig.owner}/${gitConfig.repo}/contents/${path}`;

    // Step 1: Fetch Current SHA of database.json on GitHub
    fetch(url, {
        headers: {
            "Authorization": `Bearer ${gitConfig.token}`,
            "Accept": "application/vnd.github+json"
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("فشل الاتصال بـ GitHub. تحقق من صحة الـ Token واسم المستودع.");
        }
        return res.json();
    })
    .then(fileMeta => {
        const fileSha = fileMeta.sha;
        
        // Prepare base64 text payload correctly handling Arabic characters
        const updatedDbString = JSON.stringify(localDatabase, null, 2);
        const encodedContent = btoa(unescape(encodeURIComponent(updatedDbString)));

        // Step 2: PUT updated JSON to GitHub
        text.textContent = "جاري رفع البيانات وتحديث ملف database.json...";
        
        return fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${gitConfig.token}`,
                "Accept": "application/vnd.github+json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Update database.json from Admin Dashboard",
                content: encodedContent,
                sha: fileSha,
                branch: gitConfig.branch
            })
        });
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("فشل كتابة وحفظ الملف على المستودع. تأكد من صلاحيات الـ Token.");
        }
        return res.json();
    })
    .then(data => {
        updateModificationState(false);
        showToast("تم نشر التعديلات بنجاح! الموقع قيد التحديث الآن.");
    })
    .catch(err => {
        console.error(err);
        dot.className = "indicator-dot idle";
        text.textContent = "فشل النشر والاتصال بـ GitHub";
        alert(`حدث خطأ أثناء عملية النشر:\n${err.message}`);
        checkPublishAbility();
    });
}

// ==========================================
// ANALYTICS PANEL LOGIC (COUNTAPI INTEGRATION)
// ==========================================

async function fetchAnalyticsData() {
    const refreshBtn = document.getElementById("refreshAnalyticsBtn");
    const refreshIcon = refreshBtn ? refreshBtn.querySelector("i") : null;
    
    // Add spinning loader class and disable button
    if (refreshBtn) refreshBtn.disabled = true;
    if (refreshIcon) refreshIcon.classList.add("spin-anim");
    
    // Select elements
    const statVisits = document.getElementById("statVisits");
    const statDownloads = document.getElementById("statDownloads");
    const statChatbot = document.getElementById("statChatbot");
    const statAlternatives = document.getElementById("statAlternatives");
    const statSecurity = document.getElementById("statSecurity");
    const topAppsListContainer = document.getElementById("topAppsListContainer");

    // Show loading text
    if (statVisits) statVisits.textContent = "...";
    if (statDownloads) statDownloads.textContent = "...";
    if (statChatbot) statChatbot.textContent = "...";
    if (statAlternatives) statAlternatives.textContent = "...";
    if (statSecurity) statSecurity.textContent = "...";
    
    const baseApiUrl = "https://countapi.mileshilliard.com/api/v1/get";
    const keys = ["novatrixeg_visits", "novatrixeg_downloads", "novatrixeg_chatbot", "novatrixeg_alternatives", "novatrixeg_security"];
    
    // 1. Fetch main stats
    const statsPromises = keys.map(key => 
        fetch(`${baseApiUrl}/${key}`)
            .then(res => {
                if (!res.ok) return { value: 0 };
                return res.json();
            })
            .catch(() => ({ value: 0 }))
    );
    
    try {
        const results = await Promise.all(statsPromises);
        
        // Update main stats UI with animation effect
        animateCountValue("statVisits", 0, results[0].value, 800);
        animateCountValue("statDownloads", 0, results[1].value, 800);
        animateCountValue("statChatbot", 0, results[2].value, 800);
        animateCountValue("statAlternatives", 0, results[3].value, 800);
        animateCountValue("statSecurity", 0, results[4].value, 800);
    } catch (err) {
        console.error("Failed to load analytics counters:", err);
    }
    
    // 2. Fetch specific app downloads
    if (localDatabase.apps && localDatabase.apps.length > 0) {
        const appPromises = localDatabase.apps.map(app => 
            fetch(`${baseApiUrl}/novatrixeg_app_${app.id}`)
                .then(res => {
                    if (!res.ok) return { value: 0 };
                    return res.json();
                })
                .then(data => ({
                    id: app.id,
                    title: app.title,
                    icon: app.icon,
                    category: app.category,
                    count: data.value || 0
                }))
                .catch(() => ({
                    id: app.id,
                    title: app.title,
                    icon: app.icon,
                    category: app.category,
                    count: 0
                }))
        );
        
        try {
            const appsStats = await Promise.all(appPromises);
            
            // Sort by count descending
            appsStats.sort((a, b) => b.count - a.count);
            
            // Render list
            topAppsListContainer.innerHTML = "";
            const maxDownloads = Math.max(...appsStats.map(a => a.count), 0);
            
            appsStats.forEach(app => {
                const percentage = maxDownloads > 0 ? (app.count / maxDownloads) * 100 : 0;
                
                const row = document.createElement("div");
                row.className = "top-app-row";
                row.innerHTML = `
                    <div class="app-row-meta">
                        <div class="app-row-title">
                            <div class="app-row-icon"><i class="${app.icon}"></i></div>
                            <span class="app-row-name">${app.title}</span>
                        </div>
                        <span class="app-row-count">${app.count} تحميل</span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" style="width: 0%"></div>
                    </div>
                `;
                topAppsListContainer.appendChild(row);
                
                // Animate progress bar fill in next tick
                setTimeout(() => {
                    const fill = row.querySelector(".progress-bar-fill");
                    if (fill) fill.style.width = `${percentage}%`;
                }, 100);
            });
        } catch (err) {
            console.error("Failed to render top apps downloads:", err);
            topAppsListContainer.innerHTML = `<p class="text-muted text-center py-4">فشل جلب إحصائيات التنزيلات للتطبيقات.</p>`;
        }
    } else {
        topAppsListContainer.innerHTML = `<p class="text-muted text-center py-4">لا توجد تطبيقات لعرض إحصائياتها.</p>`;
    }
    
    // Remove spinner and enable button
    if (refreshBtn) refreshBtn.disabled = false;
    if (refreshIcon) refreshIcon.classList.remove("spin-anim");
}

// Stats number counter animation helper
function animateCountValue(elementId, start, end, duration) {
    const obj = document.getElementById(elementId);
    if (!obj) return;
    
    if (end === 0) {
        obj.textContent = "0";
        return;
    }
    
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.textContent = Math.floor(progress * (end - start) + start).toLocaleString("ar-EG");
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.textContent = end.toLocaleString("ar-EG");
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize reset buttons
function initAnalyticsControls() {
    const refreshBtn = document.getElementById("refreshAnalyticsBtn");
    const resetVisitsBtn = document.getElementById("resetVisitsBtn");
    const resetDownloadsBtn = document.getElementById("resetDownloadsBtn");
    
    if (refreshBtn) {
        refreshBtn.addEventListener("click", fetchAnalyticsData);
    }
    
    const setApiUrl = "https://countapi.mileshilliard.com/api/v1/set";
    
    if (resetVisitsBtn) {
        resetVisitsBtn.addEventListener("click", async () => {
            if (!confirm("هل أنت متأكد من رغبتك في تصفير عداد زيارات الموقع؟")) return;
            if (!confirm("تنبيه أخير: سيتم مسح جميع الزيارات السابقة والبدء من الصفر. هل تريد الاستمرار؟")) return;
            
            resetVisitsBtn.disabled = true;
            try {
                const res = await fetch(`${setApiUrl}/novatrixeg_visits?value=0`);
                if (res.ok) {
                    showToast("تم تصفير عداد الزيارات بنجاح!");
                    fetchAnalyticsData();
                } else {
                    throw new Error("API error");
                }
            } catch (err) {
                alert("حدث خطأ أثناء محاولة تصفير عداد الزيارات.");
            }
            resetVisitsBtn.disabled = false;
        });
    }
    
    if (resetDownloadsBtn) {
        resetDownloadsBtn.addEventListener("click", async () => {
            if (!confirm("هل أنت متأكد من تصفير العدادات التفاعلية (تحميلات، بوت، بدائل، أمان)؟")) return;
            if (!confirm("سيتم تصفير كافة العدادات التفاعلية باستثناء الزيارات الإجمالية. هل أنت متأكد؟")) return;
            
            resetDownloadsBtn.disabled = true;
            
            const keysToReset = [
                "novatrixeg_downloads",
                "novatrixeg_chatbot",
                "novatrixeg_alternatives",
                "novatrixeg_security"
            ];
            
            // Also reset app download stats in localDatabase.apps
            if (localDatabase.apps) {
                localDatabase.apps.forEach(app => {
                    keysToReset.push(`novatrixeg_app_${app.id}`);
                });
            }
            
            const resetPromises = keysToReset.map(key => 
                fetch(`${setApiUrl}/${key}?value=0`).catch(() => null)
            );
            
            try {
                await Promise.all(resetPromises);
                showToast("تم تصفير جميع العدادات التفاعلية بنجاح!");
                fetchAnalyticsData();
            } catch (err) {
                alert("حدث خطأ أثناء محاولة تصفير العدادات.");
            }
            resetDownloadsBtn.disabled = false;
        });
    }
}

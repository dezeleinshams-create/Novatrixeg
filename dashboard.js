// ==========================================================================
// DASHBOARD CONTROLLERS & GITHUB API INTEGRATION
// ==========================================================================

// Global state variables
let localDatabase = { apps: [], alternatives: {}, prompts: [], customizer: {} };
let isModified = false;
let gitConfig = { token: "", owner: "", repo: "", branch: "" };

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

// On Load initialization
document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    initAuthConfig();
    fetchLocalDatabase();
});

// 1. Tab Switching Controller
function initTabs() {
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            tabPanes.forEach(p => p.classList.remove("active"));
            
            btn.classList.add("active");
            const targetTab = btn.getAttribute("data-tab");
            document.getElementById(`pane-${targetTab}`).classList.add("active");
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
    publishBtn.disabled = !isModified || !gitConfig.token;
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
publishBtn.addEventListener("click", publishToGitHub);

function publishToGitHub() {
    if (!gitConfig.token) {
        showToast("يرجى إدخال Access Token لحفظ التعديلات!");
        return;
    }

    // Update status UI
    const dot = publishStatus.querySelector(".indicator-dot");
    const text = publishStatus.querySelector(".status-text");
    dot.className = "indicator-dot loading";
    text.textContent = "جاري الاتصال بـ GitHub وجلب الـ SHA...";
    publishBtn.disabled = true;

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

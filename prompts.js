// DATABASE FOR PROMPTS & CUSTOMIZER (Dynamic Fetch)
let PROMPTS_DATABASE = [];
let CUSTOMIZER_DATABASE = {};

function loadDatabase(callback) {
    fetch("database.json")
        .then(res => res.json())
        .then(data => {
            PROMPTS_DATABASE = data.prompts || [];
            CUSTOMIZER_DATABASE = data.customizer || {};
            if (callback) callback();
        })
        .catch(err => {
            console.error("Error loading database:", err);
        });
}

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

        const isLocked = (startIndex + idx) % 3 === 0;
        const card = document.createElement("div");
        card.className = "prompt-card";
        if (isLocked) {
            card.setAttribute("data-viral-lock", "true");
        }
        card.innerHTML = `
            <div class="prompt-card-top">
                <div class="prompt-card-header">
                    <h3 class="prompt-card-title">
                        ${isLocked ? '<span class="vip-badge"><i class="fas fa-crown"></i> VIP</span> ' : ''}
                        ${prompt.title}
                    </h3>
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

        // Insert Ad unit card after the 3rd item
        if (idx === 2) {
            const adCard = document.createElement("div");
            adCard.className = "prompt-card ad-card-item";
            adCard.style.minHeight = "150px";
            adCard.style.display = "flex";
            adCard.style.alignItems = "center";
            adCard.style.justifyContent = "center";
            adCard.innerHTML = `
                <span class="ad-label" style="position: absolute; top: 4px; left: 10px; font-size: 0.62rem; font-weight: 700; color: var(--text-muted);">إعلان ممول / Sponsored Ad</span>
                <ins class="adsbygoogle"
                     style="display:block; width:100%; height:90px;"
                     data-ad-client="ca-pub-0000000000000000"
                     data-ad-slot="8888888888"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
            `;
            promptsGrid.appendChild(adCard);
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.warn("Dynamic prompts ad push failed:", e);
            }
        }
    });

    // Attach clipboard click triggers to cards
    promptsGrid.querySelectorAll(".prompt-copy-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const textId = btn.getAttribute("data-text-id");
            const text = document.getElementById(textId).textContent;
            copyTextToClipboard(text);
        });
    });

    // Lock elements via ViralEngine
    if (window.ViralEngine) {
        window.ViralEngine.lockContent('[data-viral-lock]');
    }

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
        if (window.ViralEngine) window.ViralEngine.onPromptCopied();
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




// ONLOAD LIFECYCLE
window.addEventListener("DOMContentLoaded", () => {
    loadDatabase(() => {
        renderPromptCards();
        initCustomizer();
        // Theme is handled globally by viral.js
    });
});

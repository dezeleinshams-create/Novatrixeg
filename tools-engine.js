/* ============================================================
   Codexsors — Tools Engine v2.0
   Dynamic Tool Loader, Category Filter, Search
   ============================================================ */

const ToolsEngine = (() => {
    let allTools = [];
    let activeToolId = null;
    const categories = {
        all: { name: "الكل", icon: "fas fa-border-all" },
        text: { name: "النصوص", icon: "fas fa-font" },
        dev: { name: "المطورين", icon: "fas fa-code" },
        design: { name: "التصميم", icon: "fas fa-palette" },
        calc: { name: "الحسابات", icon: "fas fa-calculator" },
        convert: { name: "المحولات", icon: "fas fa-right-left" },
        seo: { name: "السيو", icon: "fas fa-magnifying-glass-chart" },
        social: { name: "السوشيال", icon: "fas fa-share-nodes" },
        security: { name: "الأمان", icon: "fas fa-shield-halved" },
        image: { name: "الصور", icon: "fas fa-image" }
    };

    // ── Helpers ──
    function showToast(msg) {
        const t = document.getElementById("toastNotification");
        const m = document.getElementById("toastMessage");
        if (t && m) { m.textContent = msg; t.classList.add("show"); setTimeout(() => t.classList.remove("show"), 2200); }
    }

    function copyText(text, msg) {
        navigator.clipboard.writeText(text).then(() => showToast(msg || "تم النسخ بنجاح!"));
    }

    function awardPoints(pts, reason) {
        if (window.ViralEngine && window.ViralEngine.addPoints) window.ViralEngine.addPoints(pts, reason);
    }

    function formatBytes(b) {
        if (b === 0) return "0 B";
        const k = 1024, s = ["B", "KB", "MB"];
        const i = Math.floor(Math.log(b) / Math.log(k));
        return parseFloat((b / Math.pow(k, i)).toFixed(2)) + " " + s[i];
    }

    // ── Common UI templates ──
    function textToolUI(id, title, desc, placeholder, btnLabel, hasOptions) {
        return `
        <div class="tool-header-row"><h3><i class="fas fa-font text-primary"></i> ${title}</h3><p>${desc}</p></div>
        <div style="display:flex;flex-direction:column;gap:14px;">
            ${hasOptions || ""}
            <textarea id="${id}_input" class="form-textarea" placeholder="${placeholder}" style="height:160px;font-family:monospace;font-size:0.82rem;resize:vertical;"></textarea>
            <div style="display:flex;gap:10px;">
                <button id="${id}_run" class="primary-btn" style="flex:1;background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-magic"></i> ${btnLabel}</button>
                <button id="${id}_clear" class="secondary-btn" style="padding:10px 20px;"><i class="fas fa-trash-can"></i> مسح</button>
            </div>
            <div id="${id}_result" style="display:none;background:#121319;border:1px solid var(--border-color);border-radius:16px;padding:16px;position:relative;">
                <h4 style="font-size:0.8rem;color:white;margin-bottom:8px;">النتيجة:</h4>
                <pre id="${id}_output" style="margin:0;padding:12px;background:rgba(0,0,0,0.3);border-radius:8px;font-family:monospace;font-size:0.8rem;color:var(--green-success);overflow-x:auto;white-space:pre-wrap;max-height:250px;overflow-y:auto;direction:ltr;text-align:left;"></pre>
                <button id="${id}_copy" class="primary-btn" style="position:absolute;top:16px;left:16px;padding:6px 12px;font-size:0.75rem;"><i class="far fa-copy"></i> نسخ</button>
            </div>
        </div>`;
    }

    function bindTextTool(id, processFn) {
        const inp = document.getElementById(id + "_input");
        const btn = document.getElementById(id + "_run");
        const clr = document.getElementById(id + "_clear");
        const res = document.getElementById(id + "_result");
        const out = document.getElementById(id + "_output");
        const cpy = document.getElementById(id + "_copy");
        if (!btn) return;
        btn.addEventListener("click", () => {
            const v = inp.value;
            if (!v.trim()) { alert("يرجى إدخال نص أولاً!"); return; }
            const r = processFn(v);
            if (typeof r === "object" && r.html) { out.innerHTML = r.html; } else { out.textContent = r; }
            res.style.display = "block";
            awardPoints(5, "استخدام أداة " + id);
        });
        clr.addEventListener("click", () => { inp.value = ""; out.textContent = ""; res.style.display = "none"; });
        cpy.addEventListener("click", () => copyText(out.textContent || out.innerText, "تم النسخ بنجاح!"));
    }

    function calcToolUI(id, title, desc, fieldsHTML) {
        return `
        <div class="tool-header-row"><h3><i class="fas fa-calculator text-primary"></i> ${title}</h3><p>${desc}</p></div>
        <div style="display:flex;flex-direction:column;gap:14px;">
            ${fieldsHTML}
            <button id="${id}_run" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-calculator"></i> احسب الآن</button>
            <div id="${id}_result" style="display:none;background:#121319;border:1px solid var(--border-color);border-radius:16px;padding:20px;text-align:center;">
                <div id="${id}_output" style="font-size:1.5rem;font-weight:800;color:var(--green-success);"></div>
                <div id="${id}_detail" style="font-size:0.8rem;color:var(--text-secondary);margin-top:8px;"></div>
            </div>
        </div>`;
    }

    function convertToolUI(id, title, desc, units) {
        let opts = units.map(u => `<option value="${u.val}">${u.label}</option>`).join("");
        return `
        <div class="tool-header-row"><h3><i class="fas fa-right-left text-primary"></i> ${title}</h3><p>${desc}</p></div>
        <div style="display:flex;flex-direction:column;gap:14px;">
            <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:end;">
                <div>
                    <label style="font-size:0.78rem;font-weight:700;color:var(--text-secondary);">القيمة:</label>
                    <input type="number" id="${id}_val" class="form-input" value="1" style="background:rgba(0,0,0,0.15);border:1px solid var(--border-color);border-radius:12px;padding:10px;color:var(--text-primary);width:100%;margin-top:4px;">
                </div>
                <div style="padding-bottom:4px;"><i class="fas fa-arrow-left" style="color:var(--primary);font-size:1.2rem;"></i></div>
                <div>
                    <label style="font-size:0.78rem;font-weight:700;color:var(--text-secondary);">النتيجة:</label>
                    <div id="${id}_result" style="background:rgba(0,0,0,0.15);border:1px solid var(--border-color);border-radius:12px;padding:10px;color:var(--green-success);font-weight:800;font-size:1rem;margin-top:4px;min-height:42px;display:flex;align-items:center;">0</div>
                </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                <div>
                    <label style="font-size:0.78rem;font-weight:700;color:var(--text-secondary);">من:</label>
                    <select id="${id}_from" style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:14px;padding:10px;color:var(--text-primary);width:100%;margin-top:4px;cursor:pointer;">${opts}</select>
                </div>
                <div>
                    <label style="font-size:0.78rem;font-weight:700;color:var(--text-secondary);">إلى:</label>
                    <select id="${id}_to" style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:14px;padding:10px;color:var(--text-primary);width:100%;margin-top:4px;cursor:pointer;">${opts}</select>
                </div>
            </div>
        </div>`;
    }

    function bindConverter(id, convertFn) {
        const val = document.getElementById(id + "_val");
        const from = document.getElementById(id + "_from");
        const to = document.getElementById(id + "_to");
        const res = document.getElementById(id + "_result");
        if (!val) return;
        function update() { res.textContent = convertFn(parseFloat(val.value) || 0, from.value, to.value); }
        val.addEventListener("input", update);
        from.addEventListener("change", update);
        to.addEventListener("change", update);
        if (to.options.length > 1) to.selectedIndex = 1;
        update();
    }

    function inputField(id, label, type, placeholder, extra) {
        return `<div ${extra || ""}>
            <label style="font-size:0.78rem;font-weight:700;color:var(--text-secondary);">${label}</label>
            <input type="${type === 'password' ? 'text' : type}" id="${id}" class="form-input" placeholder="${placeholder || ""}" autocomplete="off" spellcheck="false" data-lpignore="true" data-form-type="other" style="background:rgba(0,0,0,0.15);border:1px solid var(--border-color);border-radius:12px;padding:10px;color:var(--text-primary);width:100%;margin-top:4px;">
        </div>`;
    }

    function selectField(id, label, options) {
        let opts = options.map(o => `<option value="${o.val}">${o.label}</option>`).join("");
        return `<div>
            <label style="font-size:0.78rem;font-weight:700;color:var(--text-secondary);">${label}</label>
            <select id="${id}" style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:14px;padding:10px;color:var(--text-primary);width:100%;margin-top:4px;cursor:pointer;">${opts}</select>
        </div>`;
    }

    // ── Core Rendering ──
    function init(toolsData) {
        allTools = toolsData;
        renderCategories();
        
        // Read URL query parameter (?tool=...) or hash (#tool=...)
        const urlParams = new URLSearchParams(window.location.search);
        const toolParam = urlParams.get('tool');
        const hashParam = window.location.hash.replace(/^#/, '').replace(/^tool=/, '');

        const targetId = toolParam || hashParam;
        let foundTool = null;
        if (targetId) {
            foundTool = allTools.find(t => t.id === targetId || t.id.includes(targetId) || targetId.includes(t.id));
        }

        if (foundTool) {
            if (foundTool.cat) {
                const catTab = document.querySelector(`.cat-tab[data-cat="${foundTool.cat}"]`);
                if (catTab) {
                    document.querySelectorAll(".cat-tab").forEach(t => t.classList.remove("active"));
                    catTab.classList.add("active");
                }
                renderSidebar(foundTool.cat);
            } else {
                renderSidebar("all");
            }
            loadTool(foundTool.id);
        } else {
            renderSidebar("all");
            if (allTools.length > 0) loadTool(allTools[0].id);
        }

        bindSearch();
    }

    function renderCategories() {
        const cont = document.getElementById("toolsCategoryTabs");
        if (!cont) return;
        let html = "";
        for (const key in categories) {
            const c = categories[key];
            html += `<button class="cat-tab ${key === 'all' ? 'active' : ''}" data-cat="${key}"><i class="${c.icon}"></i> ${c.name}</button>`;
        }
        cont.innerHTML = html;
        cont.querySelectorAll(".cat-tab").forEach(tab => {
            tab.addEventListener("click", () => {
                cont.querySelectorAll(".cat-tab").forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
                renderSidebar(tab.dataset.cat);
            });
        });
    }

    function renderSidebar(cat, searchQuery) {
        const cont = document.getElementById("toolsSidebar");
        if (!cont) return;
        let filtered = cat === "all" ? allTools : allTools.filter(t => t.cat === cat);
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(t => t.name.includes(q) || t.desc.includes(q) || (t.keywords && t.keywords.some(k => k.includes(q))));
        }
        
        // Update tools count
        const countEl = document.getElementById("toolsCount");
        if (countEl) countEl.textContent = filtered.length;

        let html = "";
        filtered.forEach(t => {
            html += `<button class="tool-menu-btn ${t.id === activeToolId ? 'active' : ''}" data-tool-id="${t.id}">
                <div class="tool-menu-icon"><i class="${t.icon}"></i></div>
                <div class="tool-menu-info"><h4>${t.name}</h4><p>${t.desc}</p></div>
            </button>`;
        });
        if (!html) html = `<div style="padding:30px;text-align:center;color:var(--text-muted);font-size:0.85rem;"><i class="fas fa-search" style="font-size:2rem;margin-bottom:10px;display:block;"></i>لا توجد نتائج مطابقة</div>`;
        cont.innerHTML = html;
        cont.querySelectorAll(".tool-menu-btn").forEach(btn => {
            btn.addEventListener("click", () => loadTool(btn.dataset.toolId));
        });
    }

    function loadTool(id) {
        const tool = allTools.find(t => t.id === id);
        if (!tool) return;
        activeToolId = id;
        
        // Update URL query without reloading
        if (window.history && window.history.replaceState) {
            const newUrl = window.location.pathname + '?tool=' + id;
            window.history.replaceState(null, '', newUrl);
        }

        // Update sidebar selection
        document.querySelectorAll(".tool-menu-btn").forEach(b => b.classList.toggle("active", b.dataset.toolId === id));
        
        const workspace = document.getElementById("toolWorkspace");
        if (!workspace) return;
        workspace.innerHTML = `<div class="tool-view active">${tool.render()}</div>`;
        
        // Run tool init logic after DOM update
        requestAnimationFrame(() => { if (tool.init) tool.init(); });

        // Scroll workspace into view smoothly
        workspace.scrollTop = 0;
        workspace.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function bindSearch() {
        const inp = document.getElementById("toolSearchInput");
        if (!inp) return;
        inp.addEventListener("input", () => {
            const activeCat = document.querySelector(".cat-tab.active");
            renderSidebar(activeCat ? activeCat.dataset.cat : "all", inp.value.trim());
        });
    }

    return { init, loadTool, showToast, copyText, awardPoints, formatBytes, textToolUI, bindTextTool, calcToolUI, convertToolUI, bindConverter, inputField, selectField };
})();

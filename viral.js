/* ==========================================================================
   Novatrix EG - VIRAL GROWTH ENGINE
   Temu-Inspired Viral Mechanics System
   ========================================================================== */

/* --- Global Theme Manager (runs on all pages) --- */
(function initTheme() {
    // Default = light. Only go dark if user explicitly chose dark.
    const saved = localStorage.getItem('novatrix-theme');
    const isDark = saved === 'dark';

    document.addEventListener('DOMContentLoaded', () => {
        if (!isDark) {
            document.body.classList.add('light-theme');
        }
        _syncThemeIcon(!isDark);

        const btn = document.getElementById('themeToggleBtn');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            localStorage.setItem('novatrix-theme', isLight ? 'light' : 'dark');
            _syncThemeIcon(isLight);
        });
    });

    function _syncThemeIcon(isLight) {
        const icon = document.querySelector('#themeToggleBtn i');
        if (icon) icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
    }
})();

/* --- Secret Global Admin Gateway (5 logo clicks or Ctrl+Shift+D on ANY page) --- */
document.addEventListener("DOMContentLoaded", () => {
    let clickCount = 0;
    let lastClickTime = 0;

    document.querySelectorAll(".nav-logo, .hero-logo-banner, #heroLogoImg, .logo-svg, .logo-img").forEach(logo => {
        logo.addEventListener("click", (e) => {
            const now = Date.now();
            if (now - lastClickTime < 3000) {
                clickCount++;
            } else {
                clickCount = 1;
            }
            lastClickTime = now;

            if (clickCount === 5) {
                clickCount = 0;
                const isSub = window.location.pathname.includes('/blog/');
                const targetUrl = (isSub ? '../' : '') + 'admin-portal.html';
                if (typeof showPointsToast === "function") showPointsToast("🔒 بوابة الإدارة", "جاري الانتقال لصفحة التحكم...");
                setTimeout(() => { window.location.href = targetUrl; }, 600);
            }
        });
    });

    window.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.shiftKey && (e.key === "D" || e.key === "d")) {
            e.preventDefault();
            const isSub = window.location.pathname.includes('/blog/');
            const targetUrl = (isSub ? '../' : '') + 'admin-portal.html';
            if (typeof showPointsToast === "function") showPointsToast("🔒 بوابة الإدارة", "جاري الانتقال لصفحة التحكم...");
            setTimeout(() => { window.location.href = targetUrl; }, 600);
        }
    });
});

(function() {
    'use strict';


    // ==========================================
    // CONFIGURATION
    // ==========================================
    const CONFIG = {
        SITE_URL: 'https://techs4arab.com/public/',
        SITE_NAME: 'Novatrix EG',
        SITE_DESC: 'أقوى منصة عربية للبدائل المجانية وأدوات الذكاء الاصطناعي 🚀',
        STORAGE_PREFIX: 'novatrix_viral_',
        POINTS: {
            DAILY_VISIT: 5,
            SHARE: 20,
            COPY_PROMPT: 2,
            USE_TOOL: 10,
            STREAK_BONUS_7: 50,
            REFERRAL: 30
        },
        LEVELS: [
            { name: 'مبتدئ', min: 0, icon: '⭐' },
            { name: 'نشيط', min: 50, icon: '🔥' },
            { name: 'ذهبي', min: 100, icon: '🏅' },
            { name: 'ماسي', min: 200, icon: '💎' },
            { name: 'أسطوري', min: 500, icon: '👑' }
        ],
        WHEEL_SEGMENTS: [
            { label: 'برومبت VIP', emoji: '🎁', color: '#2563eb', reward: 'vip_prompt', points: 0 },
            { label: '50 نقطة', emoji: '💎', color: '#7c3aed', reward: 'points', points: 50 },
            { label: 'أدوات مخفية', emoji: '🔓', color: '#059669', reward: 'hidden_tools', points: 0 },
            { label: 'شارة محظوظ', emoji: '🏅', color: '#d97706', reward: 'badge', points: 0 },
            { label: '20 نقطة', emoji: '⭐', color: '#0ea5e9', reward: 'points', points: 20 },
            { label: 'حظ أوفر!', emoji: '😢', color: '#64748b', reward: 'nothing', points: 0 },
            { label: '100 نقطة', emoji: '🎊', color: '#dc2626', reward: 'points', points: 100 },
            { label: 'نقاط مضاعفة', emoji: '🔥', color: '#ea580c', reward: 'double_points', points: 0 }
        ],
        FLASH_DEAL_DURATION_MS: 30 * 60 * 1000, // 30 minutes
        FLASH_DEAL_COOLDOWN_MS: 3 * 60 * 60 * 1000 // 3 hours
    };

    // ==========================================
    // STORAGE MANAGER
    // ==========================================
    const Storage = {
        get(key, defaultValue) {
            try {
                const val = localStorage.getItem(CONFIG.STORAGE_PREFIX + key);
                return val !== null ? JSON.parse(val) : defaultValue;
            } catch { return defaultValue; }
        },
        set(key, value) {
            try { localStorage.setItem(CONFIG.STORAGE_PREFIX + key, JSON.stringify(value)); }
            catch {}
        }
    };

    // ==========================================
    // POINTS SYSTEM
    // ==========================================
    const PointsSystem = {
        getPoints() { return Storage.get('points', 0); },
        addPoints(amount, reason) {
            if (Storage.get('double_points_until', 0) > Date.now()) {
                amount *= 2;
            }
            const current = this.getPoints();
            Storage.set('points', current + amount);
            this.updateUI();
            showPointsToast(`+${amount} نقطة${amount > 20 ? ' 🎉' : ''}`, reason);
            return current + amount;
        },
        subtractPoints(amount) {
            const current = this.getPoints();
            if (current >= amount) {
                Storage.set('points', current - amount);
                this.updateUI();
                return true;
            }
            return false;
        },
        getLevel() {
            const pts = this.getPoints();
            let level = CONFIG.LEVELS[0];
            for (const l of CONFIG.LEVELS) {
                if (pts >= l.min) level = l;
            }
            return level;
        },
        getStreak() { return Storage.get('streak', 0); },
        checkDailyVisit() {
            const today = new Date().toDateString();
            const lastVisit = Storage.get('last_visit_date', '');
            if (lastVisit === today) return;

            const yesterday = new Date(Date.now() - 86400000).toDateString();
            let streak = this.getStreak();

            if (lastVisit === yesterday) {
                streak++;
            } else if (lastVisit !== today) {
                streak = 1;
            }

            Storage.set('streak', streak);
            Storage.set('last_visit_date', today);
            this.addPoints(CONFIG.POINTS.DAILY_VISIT, 'زيارة يومية');

            if (streak === 7) {
                this.addPoints(CONFIG.POINTS.STREAK_BONUS_7, 'مكافأة 7 أيام متتالية! 🔥');
                Storage.set('streak', 0); // Reset streak after bonus
            }
        },
        getShareCount() { return Storage.get('share_count', 0); },
        recordShare() {
            const count = this.getShareCount() + 1;
            Storage.set('share_count', count);
            Storage.set('has_shared', true);
            this.addPoints(CONFIG.POINTS.SHARE, 'مشاركة الموقع');
            this.updateUI();
        },
        hasShared() { return Storage.get('has_shared', false); },
        getReferralCount() { return Storage.get('referral_count', 0); },
        addReferral() {
            const count = this.getReferralCount() + 1;
            Storage.set('referral_count', count);
            this.addPoints(CONFIG.POINTS.REFERRAL, 'إحالة صديق جديد!');
        },
        getReferralCode() {
            let code = Storage.get('referral_code', null);
            if (!code) {
                code = 'NX' + Math.random().toString(36).substring(2, 8).toUpperCase();
                Storage.set('referral_code', code);
            }
            return code;
        },
        updateUI() {
            const ptsEl = document.getElementById('viralPointsValue');
            const streakEl = document.getElementById('viralStreakValue');
            const levelEl = document.getElementById('viralLevelBadge');
            if (ptsEl) ptsEl.textContent = this.getPoints();
            if (streakEl) streakEl.textContent = this.getStreak();
            if (levelEl) {
                const level = this.getLevel();
                levelEl.textContent = level.icon + ' ' + level.name;
            }
        }
    };

    // ==========================================
    // SPIN WHEEL
    // ==========================================
    const SpinWheel = {
        canvas: null,
        ctx: null,
        currentRotation: 0,
        isSpinning: false,

        init() {
            this.canvas = document.getElementById('wheelCanvas');
            if (!this.canvas) return;
            this.ctx = this.canvas.getContext('2d');
            this.canvas.width = 280;
            this.canvas.height = 280;
            this.draw();
        },

        draw() {
            if (!this.ctx) return;
            const ctx = this.ctx;
            const cx = 140, cy = 140, r = 130;
            const segments = CONFIG.WHEEL_SEGMENTS;
            const segAngle = (2 * Math.PI) / segments.length;

            ctx.clearRect(0, 0, 280, 280);

            segments.forEach((seg, i) => {
                const startAngle = i * segAngle - Math.PI / 2;
                const endAngle = startAngle + segAngle;

                // Draw segment
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.arc(cx, cy, r, startAngle, endAngle);
                ctx.closePath();
                ctx.fillStyle = seg.color;
                ctx.fill();
                ctx.strokeStyle = 'rgba(255,255,255,0.15)';
                ctx.lineWidth = 1.5;
                ctx.stroke();

                // Draw text
                ctx.save();
                ctx.translate(cx, cy);
                ctx.rotate(startAngle + segAngle / 2);
                ctx.textAlign = 'center';
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 20px sans-serif';
                ctx.fillText(seg.emoji, r * 0.62, 6);
                ctx.font = '600 10px Cairo, sans-serif';
                ctx.fillText(seg.label, r * 0.62, 22);
                ctx.restore();
            });
        },

        spin() {
            if (this.isSpinning) return;

            // Check if user has shared
            if (!PointsSystem.hasShared()) {
                ShareManager.open('spin');
                return;
            }

            // Check daily spin limit
            const today = new Date().toDateString();
            const lastSpinDate = Storage.get('last_spin_date', '');
            const spinsToday = lastSpinDate === today ? Storage.get('spins_today', 0) : 0;

            if (spinsToday >= 2) {
                showPointsToast('⏰ استنفذت محاولاتك اليوم!', 'ارجع بكرة لدورة جديدة');
                return;
            }

            this.isSpinning = true;
            const btn = document.getElementById('spinActionBtn');
            if (btn) {
                btn.disabled = true;
                btn.classList.add('spinning');
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الدوران...';
            }

            // Determine winning segment
            const segmentIndex = Math.floor(Math.random() * CONFIG.WHEEL_SEGMENTS.length);
            const segAngle = 360 / CONFIG.WHEEL_SEGMENTS.length;
            const targetAngle = 360 - (segmentIndex * segAngle + segAngle / 2);
            const totalRotation = 360 * 5 + targetAngle; // 5 full rotations + target

            // Animate wheel
            const canvasEl = document.querySelector('.wheel-canvas');
            if (canvasEl) {
                this.currentRotation += totalRotation;
                canvasEl.style.transform = `rotate(${this.currentRotation}deg)`;
            }

            // Record spin
            Storage.set('last_spin_date', today);
            localStorage.setItem("novatrix_daily_spin_done", "1");
            let badges = JSON.parse(localStorage.getItem("novatrix_unlocked_badges") || "[]");
            if (!badges.includes("lucky_spinner")) {
                badges.push("lucky_spinner");
                localStorage.setItem("novatrix_unlocked_badges", JSON.stringify(badges));
            }
            Storage.set('spins_today', spinsToday + 1);

            // Show result after animation
            setTimeout(() => {
                this.isSpinning = false;
                const segment = CONFIG.WHEEL_SEGMENTS[segmentIndex];
                this.showResult(segment);

                if (btn) {
                    btn.disabled = false;
                    btn.classList.remove('spinning');
                    btn.innerHTML = '<i class="fas fa-rotate"></i> لف مرة تانية!';
                }
            }, 4200);
        },

        showResult(segment) {
            const resultEl = document.getElementById('spinResult');
            if (!resultEl) return;

            const emojiEl = resultEl.querySelector('.result-emoji');
            const titleEl = resultEl.querySelector('.result-title');
            const descEl = resultEl.querySelector('.result-desc');

            let title = '', desc = '';

            switch (segment.reward) {
                case 'vip_prompt':
                    title = 'مبروك! فتحت برومبت VIP حصري! 🎉';
                    desc = 'تم فتح برومبت مميز في مكتبة البرومبتات. روح شوفه دلوقتي!';
                    Storage.set('vip_unlocked', true);
                    ContentLocker.unlockAll();
                    break;
                case 'points':
                    title = `مبروك! كسبت ${segment.points} نقطة!`;
                    desc = 'تم إضافة النقاط لرصيدك';
                    PointsSystem.addPoints(segment.points, 'جائزة عجلة الحظ');
                    break;
                case 'hidden_tools':
                    title = 'مبروك! فتحت أدوات مخفية لمدة 24 ساعة!';
                    desc = 'استمتع بالأدوات الحصرية المتاحة الآن';
                    Storage.set('hidden_tools_until', Date.now() + 86400000);
                    break;
                case 'badge':
                    title = 'مبروك! حصلت على شارة "مستخدم محظوظ"! 🏅';
                    desc = 'الشارة ظاهرة الآن في بروفايلك';
                    Storage.set('lucky_badge', true);
                    break;
                case 'nothing':
                    title = 'حظ أوفر المرة الجاية! 😅';
                    desc = 'جرب تاني أو شارك الموقع لمحاولة إضافية';
                    break;
                case 'double_points':
                    title = 'مبروك! نقاط مضاعفة لمدة 3 ساعات! 🔥';
                    desc = 'كل النقاط اللي هتكسبها خلال 3 ساعات هتتضاعف!';
                    Storage.set('double_points_until', Date.now() + 10800000);
                    break;
            }

            if (emojiEl) emojiEl.textContent = segment.emoji;
            if (titleEl) titleEl.textContent = title;
            if (descEl) descEl.textContent = desc;

            resultEl.classList.add('show');

            // Confetti on win
            if (segment.reward !== 'nothing') {
                ConfettiEffect.launch();
            }
        },

        open() {
            const overlay = document.getElementById('spinOverlay');
            if (overlay) {
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        },

        close() {
            const overlay = document.getElementById('spinOverlay');
            if (overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                const resultEl = document.getElementById('spinResult');
                if (resultEl) resultEl.classList.remove('show');
            }
        }
    };

    // ==========================================
    // SHARE MANAGER
    // ==========================================
    const ShareManager = {
        pendingAction: null,

        open(action) {
            this.pendingAction = action || null;
            const overlay = document.getElementById('shareOverlay');
            if (overlay) {
                const title = overlay.querySelector('h3');
                const subtitle = overlay.querySelector('.share-subtitle');
                if (action === 'prompts_unlock') {
                    const currentShares = PointsSystem.getShareCount();
                    if (title) title.innerHTML = `<i class="fas fa-lock"></i> افتح مكتبة الـ +1000 برومت`;
                    if (subtitle) subtitle.innerHTML = `متبقي لك ${Math.max(0, 3 - currentShares)} مشاركات لفتح المكتبة بالكامل! (تمت المشاركة ${currentShares} من 3)`;
                } else {
                    if (title) title.innerHTML = `<i class="fas fa-share-nodes"></i> شارك Novatrix EG`;
                    if (subtitle) subtitle.innerHTML = `شارك الموقع مع أصحابك واكسب 20 نقطة لكل مشاركة!`;
                }
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        },

        close() {
            const overlay = document.getElementById('shareOverlay');
            if (overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        },

        getShareURL() {
            const refCode = PointsSystem.getReferralCode();
            return CONFIG.SITE_URL + '?ref=' + refCode;
        },

        getShareText() {
            return `${CONFIG.SITE_DESC}\n🔗 جربها الآن: ${this.getShareURL()}`;
        },

        shareWhatsApp() {
            const text = encodeURIComponent(this.getShareText());
            window.open(`https://wa.me/?text=${text}`, '_blank');
            this._onShared();
        },

        shareFacebook() {
            const url = encodeURIComponent(this.getShareURL());
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
            this._onShared();
        },

        shareTelegram() {
            const url = encodeURIComponent(this.getShareURL());
            const text = encodeURIComponent(CONFIG.SITE_DESC);
            window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
            this._onShared();
        },

        shareTwitter() {
            const text = encodeURIComponent(CONFIG.SITE_DESC);
            const url = encodeURIComponent(this.getShareURL());
            window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
            this._onShared();
        },

        copyLink() {
            const url = this.getShareURL();
            navigator.clipboard.writeText(url).then(() => {
                showPointsToast('✅ تم نسخ الرابط!', '');
                this._onShared();
            }).catch(() => {
                // Fallback
                const input = document.createElement('input');
                input.value = url;
                document.body.appendChild(input);
                input.select();
                document.execCommand('copy');
                document.body.removeChild(input);
                showPointsToast('✅ تم نسخ الرابط!', '');
                this._onShared();
            });
        },

        shareMessenger() {
            const url = encodeURIComponent(this.getShareURL());
            window.open(`https://www.facebook.com/dialog/send?link=${url}&app_id=184484190795&redirect_uri=${url}`, '_blank');
            this._onShared();
        },

        shareLinkedIn() {
            const url = encodeURIComponent(this.getShareURL());
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
            this._onShared();
        },

        shareReddit() {
            const url = encodeURIComponent(this.getShareURL());
            const title = encodeURIComponent(this.getShareText());
            window.open(`https://reddit.com/submit?url=${url}&title=${title}`, '_blank');
            this._onShared();
        },

        sharePinterest() {
            const url = encodeURIComponent(this.getShareURL());
            const desc = encodeURIComponent(this.getShareText());
            window.open(`https://pinterest.com/pin/create/button/?url=${url}&description=${desc}`, '_blank');
            this._onShared();
        },

        nativeShare() {
            if (navigator.share) {
                navigator.share({
                    title: CONFIG.SITE_NAME,
                    text: this.getShareText(),
                    url: this.getShareURL()
                }).then(() => {
                    this._onShared();
                }).catch(err => {
                    console.log('Share failed or cancelled', err);
                });
            } else {
                this.copyLink();
            }
        },

        _onShared() {
            PointsSystem.recordShare();
            this.close();

            if (this.pendingAction === 'spin') {
                setTimeout(() => SpinWheel.open(), 500);
            } else if (this.pendingAction === 'unlock') {
                ContentLocker.unlockAll();
            } else if (this.pendingAction === 'prompts_unlock') {
                const currentShares = PointsSystem.getShareCount();
                if (currentShares >= 3) {
                    showPointsToast('🎉 مبروك! تم فتح مكتبة البرومتات بالكامل!', 'جاري تحويلك الآن...');
                    setTimeout(() => {
                        window.location.href = 'prompts.html';
                    }, 1500);
                } else {
                    setTimeout(() => {
                        this.open('prompts_unlock');
                    }, 800);
                }
            }
            this.pendingAction = null;
        }
    };

    // ==========================================
    // REFERRAL TRACKER
    // ==========================================
    const ReferralTracker = {
        init() {
            const urlParams = new URLSearchParams(window.location.search);
            const refCode = urlParams.get('ref');
            if (refCode && refCode !== PointsSystem.getReferralCode()) {
                const processed = Storage.get('processed_refs', []);
                if (!processed.includes(refCode)) {
                    processed.push(refCode);
                    Storage.set('processed_refs', processed);
                    // The referrer gets points (simulated since no backend)
                    showPointsToast('🎉 أهلاً بيك!', 'تم دعوتك من صديق');
                }
            }
            this.updateUI();
        },

        updateUI() {
            const linkInput = document.getElementById('referralLinkInput');
            const countEl = document.getElementById('referralCountValue');
            const ptsEl = document.getElementById('referralPointsValue');

            if (linkInput) linkInput.value = ShareManager.getShareURL();
            if (countEl) countEl.textContent = PointsSystem.getReferralCount();
            if (ptsEl) ptsEl.textContent = PointsSystem.getPoints();
        }
    };

    // ==========================================
    // COUNTDOWN DEALS
    // ==========================================
    const CountdownDeals = {
        timer: null,

        init() {
            const banner = document.getElementById('flashDealBanner');
            if (!banner) return;

            const lastDeal = Storage.get('last_deal_time', 0);
            const now = Date.now();

            // Check cooldown
            if (now - lastDeal < CONFIG.FLASH_DEAL_COOLDOWN_MS) {
                const remaining = CONFIG.FLASH_DEAL_COOLDOWN_MS - (now - lastDeal);
                banner.classList.add('hidden');
                setTimeout(() => this.startDeal(), remaining);
                return;
            }

            this.startDeal();
        },

        startDeal() {
            const banner = document.getElementById('flashDealBanner');
            if (!banner) return;

            Storage.set('last_deal_time', Date.now());
            const endTime = Date.now() + CONFIG.FLASH_DEAL_DURATION_MS;
            Storage.set('deal_end_time', endTime);

            banner.classList.remove('hidden');
            document.body.classList.add('has-flash-deal');

            this.updateTimer();
            this.timer = setInterval(() => this.updateTimer(), 1000);
        },

        updateTimer() {
            const endTime = Storage.get('deal_end_time', 0);
            const remaining = endTime - Date.now();

            if (remaining <= 0) {
                this.endDeal();
                return;
            }

            const minutes = Math.floor(remaining / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);
            const timerEl = document.getElementById('flashDealTimer');
            if (timerEl) {
                timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            }
        },

        endDeal() {
            clearInterval(this.timer);
            const banner = document.getElementById('flashDealBanner');
            if (banner) banner.classList.add('hidden');
            document.body.classList.remove('has-flash-deal');
        },

        closeBanner() {
            this.endDeal();
        }
    };

    // ==========================================
    // CONTENT LOCKER
    // ==========================================
    const ContentLocker = {
        init() {
            if (PointsSystem.hasShared() || Storage.get('vip_unlocked', false)) {
                this.unlockAll();
                return;
            }
            // Lock specific elements
            document.querySelectorAll('[data-viral-lock]').forEach(el => {
                if (!el.classList.contains('content-unlocked')) {
                    this.lockElement(el);
                }
            });
        },

        lockElement(el) {
            el.classList.add('content-locked');
            // Check if lock overlay already exists
            if (el.querySelector('.lock-overlay')) return;

            const overlay = document.createElement('div');
            overlay.className = 'lock-overlay';
            overlay.innerHTML = `
                <div class="lock-icon"><i class="fas fa-lock"></i></div>
                <span class="lock-text">محتوى حصري 🔒</span>
                <button class="unlock-btn" onclick="window.ViralEngine.share('unlock')">
                    <i class="fas fa-share-nodes"></i> شارك لفتح المحتوى
                </button>
            `;
            el.appendChild(overlay);
        },

        unlockAll() {
            document.querySelectorAll('.content-locked').forEach(el => {
                el.classList.add('content-unlocking');
                setTimeout(() => {
                    el.classList.remove('content-locked', 'content-unlocking');
                    el.classList.add('content-unlocked');
                    const overlay = el.querySelector('.lock-overlay');
                    if (overlay) overlay.remove();
                }, 600);
            });
        }
    };

    // ==========================================
    // CONFETTI EFFECT
    // ==========================================
    const ConfettiEffect = {
        colors: ['#fbbf24', '#ef4444', '#2563eb', '#10b981', '#f97316', '#8b5cf6', '#ec4899', '#0ea5e9'],

        launch() {
            const container = document.createElement('div');
            container.className = 'confetti-container';
            document.body.appendChild(container);

            for (let i = 0; i < 60; i++) {
                const piece = document.createElement('div');
                piece.className = 'confetti-piece';
                piece.style.left = Math.random() * 100 + '%';
                piece.style.backgroundColor = this.colors[Math.floor(Math.random() * this.colors.length)];
                piece.style.animationDelay = Math.random() * 1.5 + 's';
                piece.style.animationDuration = (2 + Math.random() * 2) + 's';
                const shapes = ['50%', '0', '2px'];
                piece.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)];
                piece.style.width = (6 + Math.random() * 8) + 'px';
                piece.style.height = (6 + Math.random() * 8) + 'px';
                container.appendChild(piece);
            }

            setTimeout(() => container.remove(), 4000);
        }
    };

    // ==========================================
    // WELCOME POPUP
    // ==========================================
    const WelcomePopup = {
        show() {
            if (Storage.get('welcomed', false)) return;
            Storage.set('welcomed', true);

            // Delay the welcome popup to let page load
            setTimeout(() => {
                const overlay = document.getElementById('welcomeOverlay');
                if (overlay) {
                    overlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }, 2000);
        },

        close() {
            const overlay = document.getElementById('welcomeOverlay');
            if (overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    };

    // ==========================================
    // POINTS TOAST
    // ==========================================
    let toastTimeout;
    function showPointsToast(message, subtitle) {
        let toast = document.getElementById('viralPointsToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'viralPointsToast';
            toast.className = 'points-toast';
            document.body.appendChild(toast);
        }

        toast.innerHTML = `<i class="fas fa-coins"></i> ${message}`;
        toast.classList.add('show');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    // ==========================================
    // HTML INJECTOR (Builds all viral HTML)
    // ==========================================
    function injectViralHTML() {
        const body = document.body;

        // 1. Points Bar
        const pointsBar = document.createElement('div');
        pointsBar.className = 'viral-points-bar';
        pointsBar.id = 'viralPointsBar';
        pointsBar.innerHTML = `
            <div class="points-item">
                <i class="fas fa-coins" style="color: #fbbf24;"></i>
                <span>النقاط:</span>
                <span class="pts-value" id="viralPointsValue">${PointsSystem.getPoints()}</span>
            </div>
            <div class="points-item">
                <i class="fas fa-fire" style="color: #f97316;"></i>
                <span>Streak:</span>
                <span class="streak-value" id="viralStreakValue">${PointsSystem.getStreak()}</span>
            </div>
            <div class="points-item">
                <span class="level-badge" id="viralLevelBadge">${PointsSystem.getLevel().icon} ${PointsSystem.getLevel().name}</span>
            </div>
            <button class="points-bar-cta" onclick="window.ViralEngine.openSpin()">
                <i class="fas fa-gift"></i> اربح هدية!
            </button>
        `;
        body.prepend(pointsBar);
        body.classList.add('has-viral-bar');

        // 2. Flash Deal Banner
        const flashBanner = document.createElement('div');
        flashBanner.className = 'flash-deal-banner hidden';
        flashBanner.id = 'flashDealBanner';
        flashBanner.innerHTML = `
            <span class="flash-deal-text">
                <i class="fas fa-bolt"></i>
                🔥 عرض محدود! شارك الموقع الآن واحصل على نقاط مضاعفة!
            </span>
            <span class="flash-deal-timer" id="flashDealTimer">30:00</span>
            <button class="flash-deal-close" onclick="window.ViralEngine.closeFlashDeal()" title="إغلاق">
                <i class="fas fa-times"></i>
            </button>
        `;
        pointsBar.after(flashBanner);

        // 3. FAB Button
        const fab = document.createElement('button');
        fab.className = 'viral-fab';
        fab.id = 'viralFab';
        fab.title = 'اربح هدية!';
        fab.onclick = () => window.ViralEngine.openSpin();
        fab.innerHTML = `🎁<span class="fab-badge">!</span>`;
        body.appendChild(fab);

        // 4. Spin Wheel Modal
        const spinHTML = `
            <div class="spin-overlay" id="spinOverlay">
                <div class="spin-modal">
                    <button class="spin-close-btn" onclick="window.ViralEngine.closeSpin()">
                        <i class="fas fa-times"></i>
                    </button>
                    <h2>🎡 عجلة الحظ</h2>
                    <p class="spin-subtitle">لف العجلة واكسب جوائز حصرية!</p>

                    <div class="wheel-container">
                        <div class="wheel-pointer">📍</div>
                        <canvas class="wheel-canvas" id="wheelCanvas"></canvas>
                        <div class="wheel-center"><i class="fas fa-star"></i></div>
                    </div>

                    <button class="spin-action-btn" id="spinActionBtn" onclick="window.ViralEngine.spin()">
                        <i class="fas fa-rotate"></i> لف العجلة!
                    </button>
                    <div class="spin-ad-btn-wrapper" style="margin-top: 8px; width: 100%;">
                        <button class="spin-ad-btn" onclick="window.ViralEngine.watchRewardedAd()" style="background: linear-gradient(135deg, #a855f7, #7c3aed); color: white; border: none; padding: 10px 20px; border-radius: 20px; font-weight: 700; font-size: 0.8rem; font-family: 'Cairo'; cursor: pointer; transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 6px; width: 100%; justify-content: center; box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);">
                            <i class="fas fa-video"></i> شاهد إعلان لتفعيل الدوران فورا (+50 نقطة)
                        </button>
                    </div>
                    <p class="spin-share-note">💡 شارك الموقع أو شاهد إعلاناً مرة واحدة لتفعيل الدوران</p>

                    <div class="spin-result" id="spinResult">
                        <div class="result-emoji"></div>
                        <div class="result-title"></div>
                        <div class="result-desc"></div>
                    </div>
                </div>
            </div>
        `;
        body.insertAdjacentHTML('beforeend', spinHTML);

        // 5. Share Modal
        const shareHTML = `
            <div class="share-overlay" id="shareOverlay">
                <div class="share-modal">
                    <h3><i class="fas fa-share-nodes"></i> شارك Novatrix EG</h3>
                    <p class="share-subtitle">شارك الموقع مع أصحابك واكسب 20 نقطة لكل مشاركة!</p>
                    <div class="share-buttons-grid">
                        <button class="share-btn whatsapp" onclick="window.ViralEngine.shareWhatsApp()">
                            <i class="fab fa-whatsapp"></i> واتساب
                        </button>
                        <button class="share-btn facebook" onclick="window.ViralEngine.shareFacebook()">
                            <i class="fab fa-facebook-f"></i> فيسبوك
                        </button>
                        <button class="share-btn telegram" onclick="window.ViralEngine.shareTelegram()">
                            <i class="fab fa-telegram-plane"></i> تليجرام
                        </button>
                        <button class="share-btn messenger" onclick="window.ViralEngine.shareMessenger()">
                            <i class="fab fa-facebook-messenger"></i> ماسنجر
                        </button>
                        <button class="share-btn twitter" onclick="window.ViralEngine.shareTwitter()">
                            <i class="fab fa-x-twitter"></i> تويتر
                        </button>
                        <button class="share-btn linkedin" onclick="window.ViralEngine.shareLinkedIn()">
                            <i class="fab fa-linkedin-in"></i> لينكد إن
                        </button>
                        <button class="share-btn reddit" onclick="window.ViralEngine.shareReddit()">
                            <i class="fab fa-reddit-alien"></i> ريديت
                        </button>
                        <button class="share-btn pinterest" onclick="window.ViralEngine.sharePinterest()">
                            <i class="fab fa-pinterest-p"></i> بنترست
                        </button>
                        <button class="share-btn native-share" onclick="window.ViralEngine.nativeShare()">
                            <i class="fas fa-share-nodes"></i> مشاركة سريعة
                        </button>
                        <button class="share-btn copy-link" onclick="window.ViralEngine.copyLink()">
                            <i class="fas fa-link"></i> نسخ الرابط
                        </button>
                    </div>
                    <button class="share-close-btn" onclick="window.ViralEngine.closeShare()">
                        إغلاق
                    </button>
                </div>
            </div>
        `;
        body.insertAdjacentHTML('beforeend', shareHTML);

        // 6. Welcome Popup
        const welcomeHTML = `
            <div class="welcome-overlay" id="welcomeOverlay">
                <div class="welcome-modal">
                    <div class="welcome-emoji">🎉</div>
                    <h2>أهلاً بيك في Novatrix EG!</h2>
                    <p>أقوى منصة عربية للبدائل المجانية وأدوات الذكاء الاصطناعي. اكسب نقاط ومكافآت مع كل تفاعل!</p>
                    <div class="welcome-rewards">
                        <div class="welcome-reward-item">
                            <div class="reward-icon">🎡</div>
                            <div class="reward-label">عجلة حظ</div>
                        </div>
                        <div class="welcome-reward-item">
                            <div class="reward-icon">💰</div>
                            <div class="reward-label">نقاط يومية</div>
                        </div>
                        <div class="welcome-reward-item">
                            <div class="reward-icon">🎁</div>
                            <div class="reward-label">هدايا حصرية</div>
                        </div>
                    </div>
                    <button class="welcome-start-btn" onclick="window.ViralEngine.closeWelcome()">
                        <i class="fas fa-rocket"></i> يلا نبدأ!
                    </button>
                </div>
            </div>
        `;
        body.insertAdjacentHTML('beforeend', welcomeHTML);

        // 7. Inject referral card into page (if section exists)
        const refSection = document.getElementById('profitHubSection');
        if (refSection) {
            const refCard = document.createElement('div');
            refCard.className = 'referral-card';
            refCard.style.marginTop = '24px';
            refCard.innerHTML = `
                <h3><i class="fas fa-user-plus"></i> ادعي أصحابك واكسب!</h3>
                <p class="referral-desc">شارك رابطك الخاص مع أصحابك. كل ما حد يفتح الموقع من رابطك، هتكسب 30 نقطة!</p>
                <div class="referral-stats">
                    <div class="referral-stat">
                        <div class="stat-num" id="referralCountValue">${PointsSystem.getReferralCount()}</div>
                        <div class="stat-label">دعوات ناجحة</div>
                    </div>
                    <div class="referral-stat">
                        <div class="stat-num" id="referralPointsValue">${PointsSystem.getPoints()}</div>
                        <div class="stat-label">إجمالي النقاط</div>
                    </div>
                </div>
                <div class="referral-link-box">
                    <input type="text" id="referralLinkInput" value="${ShareManager.getShareURL()}" readonly>
                    <button class="referral-copy-btn" onclick="window.ViralEngine.copyReferralLink()">
                        <i class="fas fa-copy"></i> نسخ
                    </button>
                </div>
            `;
            refSection.after(refCard);
        }
    }

    // ==========================================
    // REWARDED AD MANAGER
    // ==========================================
    const RewardedAdManager = {
        overlay: null,
        timer: null,
        secondsLeft: 5,

        init() {
            if (document.getElementById('rewardedAdOverlay')) return;
            const overlayHTML = `
                <div class="rewarded-ad-overlay" id="rewardedAdOverlay">
                    <div class="rewarded-ad-modal">
                        <div class="ad-header-row">
                            <span class="ad-tag"><i class="fas fa-video"></i> إعلان ممول (AdMob Sponsored)</span>
                            <span class="ad-timer-countdown" id="adTimerCountdown">5 ثوانٍ متبقية</span>
                        </div>
                        <div class="ad-video-container">
                            <div class="simulated-video">
                                <div class="video-loader">
                                    <i class="fas fa-spinner fa-spin"></i>
                                    <span>جاري تحميل الإعلان الممول...</span>
                                </div>
                                <div class="video-ui">
                                    <div class="progress-bar-fill" id="adProgressFill"></div>
                                </div>
                            </div>
                        </div>
                        <div class="ad-footer-row">
                            <button class="ad-close-btn" id="adCloseBtn" disabled onclick="window.ViralEngine.closeRewardedAd()">
                                <i class="fas fa-lock"></i> انتظر للحصول على الجائزة
                            </button>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', overlayHTML);
        },

        show() {
            this.init();
            this.overlay = document.getElementById('rewardedAdOverlay');
            if (!this.overlay) return;

            this.overlay.classList.add('active');
            document.body.style.overflow = 'hidden';

            this.secondsLeft = 5;
            const countdownEl = document.getElementById('adTimerCountdown');
            const progressFill = document.getElementById('adProgressFill');
            const closeBtn = document.getElementById('adCloseBtn');

            if (countdownEl) countdownEl.textContent = `${this.secondsLeft} ثوانٍ متبقية`;
            if (progressFill) progressFill.style.width = '0%';
            if (closeBtn) {
                closeBtn.disabled = true;
                closeBtn.innerHTML = '<i class="fas fa-lock"></i> انتظر للحصول على الجائزة';
            }

            let currentProgress = 0;
            this.timer = setInterval(() => {
                this.secondsLeft--;
                currentProgress += 20;
                if (progressFill) progressFill.style.width = `${currentProgress}%`;

                if (this.secondsLeft <= 0) {
                    clearInterval(this.timer);
                    if (countdownEl) countdownEl.textContent = 'تم اكتمال الإعلان! 🎉';
                    if (closeBtn) {
                        closeBtn.disabled = false;
                        closeBtn.innerHTML = '<i class="fas fa-check-circle"></i> الحصول على المكافأة وإغلاق';
                    }
                } else {
                    if (countdownEl) countdownEl.textContent = `${this.secondsLeft} ثوانٍ متبقية`;
                }
            }, 1000);
        },

        closeAndReward() {
            if (this.secondsLeft > 0) return;

            if (this.overlay) {
                this.overlay.classList.remove('active');
                document.body.style.overflow = '';
            }

            // Reward
            PointsSystem.addPoints(50, 'مشاهدة إعلان فيديو ممول');
            PointsSystem.recordShare(); // Automatically unlock wheel/content

            // Close result if shown
            const spinResult = document.getElementById('spinResult');
            if (spinResult) spinResult.classList.remove('show');

            showPointsToast('✅ تم تفعيل عجلة الحظ!', 'يمكنك دوران العجلة الآن');
        }
    };

    function initGlobalTheme() {
        const themeToggleBtn = document.getElementById("themeToggleBtn");
        
        function updateLogoTheme(theme) {
            const isSubfolder = window.location.pathname.includes('/blog/');
            const basePath = isSubfolder ? '../' : '';
            const darkSrc  = basePath + "assets/logo-dark.svg";
            const lightSrc = basePath + "assets/logo-light.svg";

            document.querySelectorAll("img.logo-svg").forEach(img => {
                img.src = theme === "light" ? lightSrc : darkSrc;
            });
        }

        function updateThemeIcon(theme) {
            if (!themeToggleBtn) return;
            const icon = themeToggleBtn.querySelector("i");
            if (icon) {
                icon.className = theme === "light" ? "fas fa-sun" : "fas fa-moon";
            }
        }

        // Apply theme from localStorage on page load (default to light)
        const savedTheme = localStorage.getItem("theme") || "light";
        if (savedTheme === "light") {
            document.body.classList.add("light-theme");
        } else {
            document.body.classList.remove("light-theme");
        }
        
        // Wait briefly for DOM to fully settle before updating images
        setTimeout(() => {
            updateThemeIcon(savedTheme);
            updateLogoTheme(savedTheme);
        }, 50);

        if (themeToggleBtn) {
            const newBtn = themeToggleBtn.cloneNode(true);
            themeToggleBtn.parentNode.replaceChild(newBtn, themeToggleBtn);
            
            newBtn.addEventListener("click", () => {
                document.body.classList.toggle("light-theme");
                const currentTheme = document.body.classList.contains("light-theme") ? "light" : "dark";
                localStorage.setItem("theme", currentTheme);
                updateThemeIcon(currentTheme);
                updateLogoTheme(currentTheme);
                
                const toastMsg = currentTheme === "light" ? "تم تفعيل الوضع المضيء ☀️" : "تم تفعيل الوضع الداكن 🌙";
                if (typeof window.showToast === "function") {
                    window.showToast(toastMsg);
                } else if (typeof showPointsToast === "function") {
                    showPointsToast(toastMsg, "");
                }
            });
        }
    }

    // ==========================================
    // VIRAL ENGINE (Main Controller)
    // ==========================================

    // ═══ BOOKMARKS / FAVORITES SYSTEM ═══
    const BookmarksSystem = {
        getAll() {
            return JSON.parse(localStorage.getItem('novatrix_bookmarks') || '[]');
        },
        toggle(itemId, itemName) {
            let bm = this.getAll();
            if (bm.find(b => b.id === itemId)) {
                bm = bm.filter(b => b.id !== itemId);
                showPointsToast('تم الإزالة من المفضلة', itemName);
            } else {
                bm.push({ id: itemId, name: itemName, date: Date.now() });
                showPointsToast('⭐ تمت الإضافة للمفضلة!', itemName);
            }
            localStorage.setItem('novatrix_bookmarks', JSON.stringify(bm));
            this.updateAllButtons();
        },
        isBookmarked(itemId) {
            return this.getAll().some(b => b.id === itemId);
        },
        updateAllButtons() {
            document.querySelectorAll('[data-bookmark-id]').forEach(btn => {
                const id = btn.getAttribute('data-bookmark-id');
                const active = this.isBookmarked(id);
                btn.innerHTML = active ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
                btn.style.color = active ? '#fbbf24' : 'var(--text-secondary)';
            });
        },
        injectButtons() {
            // Inject bookmark buttons into tool cards
            document.querySelectorAll('.tool-card').forEach(card => {
                const toolId = card.getAttribute('data-tool-id') || card.querySelector('[data-tool]')?.getAttribute('data-tool');
                if (!toolId || card.querySelector('[data-bookmark-id]')) return;
                const toolName = card.querySelector('.tool-card-title')?.textContent || toolId;
                const btn = document.createElement('button');
                btn.setAttribute('data-bookmark-id', toolId);
                btn.title = 'إضافة للمفضلة';
                btn.style.cssText = 'position:absolute;top:10px;left:10px;background:none;border:none;font-size:1.1rem;cursor:pointer;z-index:10;transition:all 0.2s;padding:4px;';
                btn.onclick = (e) => { e.stopPropagation(); BookmarksSystem.toggle(toolId, toolName); };
                card.style.position = 'relative';
                card.appendChild(btn);
            });
            this.updateAllButtons();
        }
    };


        // ═══ UNIFIED SEARCH CHATBOT WIDGET (AI-Style) ═══
    const ChatbotWidget = {
        isOpen: false,
        db: null,
        tools: [
            { id: "alt-finder", name: "مستكشف البدائل المجانية", desc: "البحث عن بدائل مجانية ومفتوحة المصدر للبرامج المدفوعة", url: "index.html#altFinderCard", icon: "fas fa-arrows-spin", keys: ["بديل", "بدائل", "برنامج", "تطبيق", "فوتوشوب", "office", "photoshop", "كانفا", "canva"] },
            { id: "phone-security", name: "مستشار أمان الهاتف", desc: "اختبار مستوى أمان الجوال وكشف تطبيقات التجسس", url: "index.html#securityCard", icon: "fas fa-shield-halved", keys: ["امان", "حمايه", "تجسس", "اختراق", "هاتف", "جوال", "مخترق"] },
            { id: "ai-prompts", name: "مكتبة أوامر الذكاء الاصطناعي (Prompts)", desc: "أوامر ومطالبات جاهزة للنسخ والاستخدام لـ ChatGPT و Midjourney", url: "prompts.html", icon: "fas fa-brain", keys: ["برومت", "اوامر", "مطالبات", "رسم", "كتابه", "تصميم", "chatgpt", "midjourney"] },
            { id: "typing-test", name: "اختبار سرعة الكتابة المطور", desc: "قياس سرعة ودقة كتابتك على الكيبورد باللغة العربية والإنجليزية", url: "tools.html?tool=dev-typing-speed", icon: "fas fa-keyboard", keys: ["كتابه", "كيبورد", "سرعه", "سرعة", "سرعة الكتابة", "طباعة", "طباعه"] },
            { id: "phone-comparer", name: "مقارنة مواصفات الهواتف", desc: "قارن بين مواصفات وأسعار الهواتف الذكية لاختيار الأفضل لك", url: "tools.html?tool=phone-comparer", icon: "fas fa-mobile-screen-button", keys: ["مقارنه", "مقارنة", "تلفون", "موبايل", "هاتف", "شاومي", "سامسونج", "ايفون"] },
            { id: "seo-auditor", name: "محلل سيو المواقع", desc: "افحص سيو موقعك واحصل على نصائح تصدر نتائج البحث في جوجل", url: "tools.html?tool=seo-auditor", icon: "fas fa-magnifying-glass-chart", keys: ["سيو", "seo", "موقع", "مواقع", "ارشفه", "ارشفة"] },
            { id: "tech-quiz", name: "اختبار المعلومات التقنية", desc: "تحدي الأسئلة التقنية لزيادة معلوماتك وربح نقاط إضافية", url: "tools.html?tool=tech-quiz", icon: "fas fa-trophy", keys: ["كويز", "اختبار", "اسئله", "اسئلة", "تحدي", "لعبة", "مسابقة"] },
            { id: "deep-link", name: "مولد الروابط العميقة (Deep Links)", desc: "توجيه الزوار مباشرة لتطبيق يوتيوب لزيادة المشاهدات والمشتركين", url: "tools.html?tool=deep-link-gen", icon: "fas fa-link", keys: ["رابط", "روابط", "يوتيوب", "عميق", "لينك", "مشتركين"] },
            { id: "tts", name: "تحويل النص إلى صوت بالذكاء الاصطناعي", desc: "اكتب نصوصك وحولها لتعليق صوتي احترافي بأصوات واقعية", url: "tools.html?tool=text-to-speech", icon: "fas fa-volume-high", keys: ["صوت", "تعليق", "تحويل النص", "tts", "نطق"] },
            { id: "qr-gen", name: "مولد أكواد الـ QR المطور", desc: "إنشاء باركود مخصص لأي رابط أو نص وتحميله بجودة عالية", url: "tools.html?tool=qr-generator", icon: "fas fa-qrcode", keys: ["باركود", "qr", "كود", "رمز"] },
            { id: "speed-test", name: "قياس سرعة الإنترنت", desc: "فحص سرعة الرفع والتحميل وزمن الاستجابة (Ping) للإنترنت لديك", url: "tools.html?tool=speed-test", icon: "fas fa-gauge-high", keys: ["نت", "انترنت", "سرعه", "سرعة", "بينج", "ping"] },
            { id: "password-check", name: "فاحص قوة كلمة المرور", desc: "احسب الوقت اللازم لتخمين كلمة مرورك لتأمين حساباتك", url: "tools.html?tool=password-checker", icon: "fas fa-key", keys: ["رقم سري", "باسورد", "كلمة مرور", "كلمة سر", "امان"] }
        ],
        faq: [
            { q: ["كيف","نقاط","اربح","احصل","points"], a: "تربح نقاط عبر: زيارة الموقع يومياً (+5)، استخدام الأدوات (+10)، نسخ البرومبتات (+2)، مشاركة الموقع (+20)، وعجلة الحظ اليومية! 🎯" },
            { q: ["شارة","شارات","إنجاز","badge","انجاز"], a: "تحصل على شارات بإتمام أنشطة معينة مثل: فحص الأمان، نسخ 3 برومبتات، إتمام الكويز بنجاح، واستخدام عجلة الحظ. تابع تقدمك في <a href='rewards.html' style='color:var(--primary)'>صفحة المكافآت</a>! 🏅" },
            { q: ["مكافأة","مكافآت","جوائز","هدية","استبدل"], a: "يمكنك استبدال نقاطك بمكافآت حقيقية مثل اشتراكات Canva Pro و ChatGPT Plus! اذهب إلى <a href='rewards.html' style='color:var(--primary)'>صفحة المكافآت</a> الآن 🎁" },
            { q: ["مدونة","مقال","شرح","شروحات","مقالات"], a: "لدينا مدونة غنية بأكثر من 100 مقال عن الأمن السيبراني والبدائل المجانية والذكاء الاصطناعي. <a href='blog.html' style='color:var(--primary)'>تصفح المدونة الآن</a> 📚" },
            { q: ["تواصل","اتصل","مشكلة","دعم","contact"], a: "يمكنك التواصل معنا عبر <a href='contact.html' style='color:var(--primary)'>صفحة الاتصال</a>. نسعد دائماً بمساعدتك! 💬" },
            { q: ["مواقع ai","مواقع ذكاء","ai sites","مواقع"], a: "لدينا دليل يضم أفضل 100 موقع ذكاء اصطناعي لصناع المحتوى! <a href='ai-sites.html' style='color:var(--primary)'>تصفح الدليل الآن</a> 🤖" },
            { q: ["برومت","prompt","اوامر","مطالبات"], a: "مكتبتنا تضم أكثر من 1000 برومت جاهز! <a href='prompts.html' style='color:var(--primary)'>استعرض مكتبة البرومبتات</a> ✨" },
            { q: ["اداة","أداة","ادوات","أدوات","tools"], a: "لدينا أكثر من 100 أداة تقنية مجانية! <a href='tools.html' style='color:var(--primary)'>استكشف جميع الأدوات</a> 🛠️" },
            { q: ["بديل","بدائل","مجاني","مجانا","مجانيه","رخيص","free","alternative"], a: "اكتب اسم البرنامج الذي تريد بديلاً له مثل: Photoshop أو Canva أو IDM وسأجد لك أفضل البدائل المجانية! 🔍" },
        ],
        normalize(text) {
            return text.toLowerCase()
                .replace(/[أإآ]/g, "ا")
                .replace(/ة/g, "ه")
                .replace(/ى/g, "ي")
                .trim();
        },
        async loadDB() {
            if (this.db) return;
            try {
                const isSubfolder = window.location.pathname.includes('/blog/');
                const path = isSubfolder ? '../database.json' : 'database.json';
                const res = await fetch(path);
                const data = await res.json();
                this.db = data;
            } catch(e) { this.db = { apps: [], alternatives: {} }; }
        },
        async answer(userMsg) {
            await this.loadDB();
            const normQ = this.normalize(userMsg);
            const words = normQ.split(' ').filter(w => w.length > 1);

            let matchedTools = [];
            let matchedAlts = [];
            let matchedApps = [];
            let matchedFaqs = [];

            // 1. Search tools
            matchedTools = this.tools.filter(t => {
                const name = this.normalize(t.name);
                const desc = this.normalize(t.desc);
                return name.includes(normQ) || desc.includes(normQ) || 
                       t.keys.some(k => normQ.includes(this.normalize(k))) ||
                       words.some(w => name.includes(w) || t.keys.some(k => this.normalize(k).includes(w)));
            });

            // 2. Search alternatives
            if (this.db && this.db.alternatives) {
                const alts = this.db.alternatives;
                Object.keys(alts).forEach(key => {
                    const entry = alts[key];
                    const normKey = this.normalize(key);
                    const normName = this.normalize(entry.name || '');
                    const isMatch = normQ.includes(normKey) || normQ.includes(normName) || normKey.includes(normQ) || normName.includes(normQ) ||
                                    words.some(w => normKey.includes(w) || normName.includes(w));
                    if (isMatch) matchedAlts.push(entry);
                });
            }

            // 3. Search apps & AI sites
            if (this.db && this.db.apps) {
                matchedApps = this.db.apps.filter(app => {
                    const title = this.normalize(app.title || '');
                    const desc = this.normalize(app.desc || '');
                    const id = this.normalize(app.id || '');
                    return title.includes(normQ) || desc.includes(normQ) || id.includes(normQ.replace(/ /g,'')) ||
                           words.some(w => title.includes(w) || desc.includes(w));
                });
            }

            // 4. Search FAQs
            matchedFaqs = this.faq.filter(item => {
                return item.q.some(kw => normQ.includes(this.normalize(kw)) || words.some(w => this.normalize(kw).includes(w)));
            });

            let htmlResult = '';

            // Format tools
            if (matchedTools.length > 0) {
                const list = matchedTools.slice(0, 3).map(t => {
                    return `• <a href="${t.url}" style="color:var(--primary);font-weight:700;text-decoration:none;"><i class="${t.icon}"></i> ${t.name}</a>`;
                }).join("<br>");
                htmlResult += `<div style="margin-bottom:10px;background:rgba(255,255,255,0.02);padding:8px 12px;border-radius:10px;border:1px solid rgba(255,255,255,0.05);">
<strong style="color:white;font-size:0.76rem;"><i class="fas fa-screwdriver-wrench" style="color:var(--primary);"></i> أدوات تفاعلية مقترحة:</strong><br>${list}</div>`;
            }

            // Format alternatives
            if (matchedAlts.length > 0) {
                const list = matchedAlts.slice(0, 2).map(entry => {
                    const optList = entry.options.map(o => `<strong>${o.name}</strong>`).join(" - ");
                    return `• بدائل لـ <strong>${entry.name}</strong>: ${optList} <a href="index.html#altFinderCard" style="color:var(--primary);font-size:0.65rem;text-decoration:none;">(تصفح البدائل)</a>`;
                }).join("<br>");
                htmlResult += `<div style="margin-bottom:10px;background:rgba(255,255,255,0.02);padding:8px 12px;border-radius:10px;border:1px solid rgba(255,255,255,0.05);">
<strong style="color:white;font-size:0.76rem;"><i class="fas fa-arrows-spin" style="color:var(--primary);"></i> البدائل المجانية للبرامج:</strong><br>${list}</div>`;
            }

            // Format apps / AI sites
            if (matchedApps.length > 0) {
                const list = matchedApps.slice(0, 3).map(app => {
                    const icon = app.icon || 'fa-solid fa-cube';
                    const isAISite = app.id && app.id.startsWith('ai-site');
                    const link = isAISite ? app.link : `index.html?app=${app.id}`;
                    return `• <a href="${link}" target="${isAISite ? '_blank' : '_self'}" style="color:var(--primary);font-weight:700;text-decoration:none;"><i class="${icon}"></i> ${app.title}</a>`;
                }).join("<br>");
                htmlResult += `<div style="margin-bottom:10px;background:rgba(255,255,255,0.02);padding:8px 12px;border-radius:10px;border:1px solid rgba(255,255,255,0.05);">
<strong style="color:white;font-size:0.76rem;"><i class="fas fa-cube" style="color:var(--primary);"></i> تطبيقات ومواقع مقترحة:</strong><br>${list}</div>`;
            }

            // FAQ fallback if no matches in DB
            if (htmlResult === '' && matchedFaqs.length > 0) {
                htmlResult += `<div style="background:rgba(255,255,255,0.02);padding:8px 12px;border-radius:10px;border:1px solid rgba(255,255,255,0.05);">
<strong style="color:white;font-size:0.76rem;"><i class="fas fa-lightbulb" style="color:var(--primary);"></i> إجابة سريعة:</strong><br>${matchedFaqs[0].a}</div>`;
            }

            if (htmlResult !== '') {
                return `🔍 وجدت لك النتائج التالية لـ <strong>"${userMsg}"</strong>:<br><br>${htmlResult}`;
            }

            return `عذراً، لم أجد نتائج مباشرة لـ <strong>"${userMsg}"</strong>.<br>جرب البحث بكلمات أبسط مثل: **Photoshop**، **أمان**، **تحميل**، **ChatGPT**، أو **نقاط**.`;
        },
        init() {
            const html = `
                <div id="chatbotWidget" style="position:fixed;bottom:90px;right:20px;z-index:7500;display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
                    <div id="chatbotPanel" style="display:none;width:330px;max-height:460px;background:#0f1219;border:1px solid rgba(37,99,235,0.3);border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,0.5);overflow:hidden;direction:rtl;font-family:'Cairo',sans-serif;flex-direction:column;">
                        <div style="background:linear-gradient(135deg,var(--primary),var(--accent));padding:14px 16px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
                            <span style="font-size:0.85rem;font-weight:800;color:white;"><i class="fas fa-robot"></i> المساعد الذكي الموحد</span>
                            <button onclick="window.ViralEngine.toggleChat()" style="background:none;border:none;color:white;font-size:1rem;cursor:pointer;"><i class="fas fa-xmark"></i></button>
                        </div>
                        <div id="chatMessages" style="padding:12px;overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:8px;max-height:330px;">
                            <div style="background:rgba(37,99,235,0.1);border-radius:12px;padding:10px 12px;font-size:0.74rem;color:var(--text-secondary);line-height:1.6;">
                                👋 مرحباً! أنا المساعد الذكي لـ Novatrix EG.<br>
                                اكتب اسم أي <strong>تطبيق</strong>، <strong>أداة</strong>، <strong>بديل</strong>، أو أي سؤال تقني وسأبحث لك فوراً في جميع أقسام الموقع!
                            </div>
                            <div style="display:flex;flex-wrap:wrap;gap:5px;">
                                <button onclick="window.ViralEngine.quickAsk('ChatGPT')" style="background:rgba(255,255,255,0.04);border:1px solid var(--border-color);border-radius:20px;padding:4px 10px;font-size:0.63rem;color:var(--text-secondary);cursor:pointer;font-family:Cairo;">🤖 ChatGPT</button>
                                <button onclick="window.ViralEngine.quickAsk('بديل Photoshop')" style="background:rgba(255,255,255,0.04);border:1px solid var(--border-color);border-radius:20px;padding:4px 10px;font-size:0.63rem;color:var(--text-secondary);cursor:pointer;font-family:Cairo;">🔄 بديل فوتوشوب</button>
                                <button onclick="window.ViralEngine.quickAsk('أمان الجوال')" style="background:rgba(255,255,255,0.04);border:1px solid var(--border-color);border-radius:20px;padding:4px 10px;font-size:0.63rem;color:var(--text-secondary);cursor:pointer;font-family:Cairo;">🛡️ أمان الهاتف</button>
                                <button onclick="window.ViralEngine.quickAsk('ربح')" style="background:rgba(255,255,255,0.04);border:1px solid var(--border-color);border-radius:20px;padding:4px 10px;font-size:0.63rem;color:var(--text-secondary);cursor:pointer;font-family:Cairo;">💰 تسعير وأرباح</button>
                            </div>
                        </div>
                        <div style="padding:8px 12px;border-top:1px solid var(--border-color);display:flex;gap:8px;flex-shrink:0;">
                            <input id="faqChatInput" type="text" placeholder="اكتب سؤالك أو اسم البرنامج..." style="flex:1;background:#181922;border:1px solid var(--border-color);border-radius:10px;padding:8px 12px;color:white;font-family:'Cairo';font-size:0.74rem;outline:none;" onkeydown="if(event.key==='Enter')window.ViralEngine.sendChat()">
                            <button onclick="window.ViralEngine.sendChat()" style="background:linear-gradient(135deg,var(--primary),var(--accent));border:none;border-radius:10px;width:36px;height:36px;color:white;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-paper-plane"></i></button>
                        </div>
                    </div>
                    <button id="chatbotFab" onclick="window.ViralEngine.toggleChat()" style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);border:none;color:white;font-size:1.2rem;cursor:pointer;box-shadow:0 4px 20px rgba(99,102,241,0.5);transition:all 0.3s;display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-headset"></i>
                    </button>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', html);
            this.loadDB();
        },
        toggle() {
            const panel = document.getElementById('chatbotPanel');
            if (!panel) return;
            this.isOpen = !this.isOpen;
            panel.style.display = this.isOpen ? 'flex' : 'none';
            if (this.isOpen) document.getElementById('faqChatInput')?.focus();
        },
        addBubble(container, text, isUser) {
            const div = document.createElement('div');
            div.style.cssText = `background:${isUser ? 'rgba(255,255,255,0.05)' : 'rgba(37,99,235,0.1)'};border-radius:12px;padding:9px 12px;font-size:0.74rem;color:${isUser ? 'white' : 'var(--text-secondary)'};line-height:1.55;max-width:90%;word-break:break-word;`;
            div.innerHTML = text;
            container.appendChild(div);
            container.scrollTop = container.scrollHeight;
        },
        async send() {
            const input = document.getElementById('faqChatInput');
            const container = document.getElementById('chatMessages');
            if (!input || !container || !input.value.trim()) return;
            const userMsg = input.value.trim();
            input.value = '';
            this.addBubble(container, userMsg, true);
            const loader = document.createElement('div');
            loader.style.cssText = 'background:rgba(37,99,235,0.1);border-radius:12px;padding:9px 12px;font-size:0.74rem;color:var(--text-secondary);';
            loader.innerHTML = '<i class="fas fa-ellipsis fa-fade"></i> جاري البحث والتحليل...';
            container.appendChild(loader);
            container.scrollTop = container.scrollHeight;
            const ans = await this.answer(userMsg);
            loader.remove();
            this.addBubble(container, ans, false);
        }
    };

    window.ViralEngine = {
        init() {
            // Inject HTML components
            injectViralHTML();

            // Initialize global theme settings
            initGlobalTheme();

            // Initialize all systems
            SpinWheel.init();
            PointsSystem.checkDailyVisit();
            ReferralTracker.init();
            CountdownDeals.init();
            ContentLocker.init();
            WelcomePopup.show();

            // Update UI
            PointsSystem.updateUI();

            // Bookmarks
            setTimeout(() => BookmarksSystem.injectButtons(), 1500);

            // Chatbot
            ChatbotWidget.init();

            console.log('🚀 Novatrix EG Viral Engine initialized!');
        },


        // Public API
        openSpin() { SpinWheel.open(); },
        closeSpin() { SpinWheel.close(); },
        spin() { SpinWheel.spin(); },
        addPoints(amount, reason) { PointsSystem.addPoints(amount, reason); },
        subtractPoints(amount) { return PointsSystem.subtractPoints(amount); },
        getPoints() { return PointsSystem.getPoints(); },
        getLevel() { return PointsSystem.getLevel(); },
        getStreak() { return PointsSystem.getStreak(); },

        share(action) { ShareManager.open(action); },
        closeShare() { ShareManager.close(); },
        shareWhatsApp() { ShareManager.shareWhatsApp(); },
        shareFacebook() { ShareManager.shareFacebook(); },
        shareTelegram() { ShareManager.shareTelegram(); },
        shareTwitter() { ShareManager.shareTwitter(); },
        shareMessenger() { ShareManager.shareMessenger(); },
        shareLinkedIn() { ShareManager.shareLinkedIn(); },
        shareReddit() { ShareManager.shareReddit(); },
        sharePinterest() { ShareManager.sharePinterest(); },
        nativeShare() { ShareManager.nativeShare(); },
        copyLink() { ShareManager.copyLink(); },

        watchRewardedAd() { RewardedAdManager.show(); },
        closeRewardedAd() { RewardedAdManager.closeAndReward(); },
        getShareCount() { return PointsSystem.getShareCount(); },

        closeWelcome() { WelcomePopup.close(); },
        closeFlashDeal() { CountdownDeals.closeBanner(); },

        copyReferralLink() {
            const input = document.getElementById('referralLinkInput');
            if (input) {
                navigator.clipboard.writeText(input.value).then(() => {
                    showPointsToast('✅ تم نسخ رابط الإحالة!', '');
                }).catch(() => {
                    input.select();
                    document.execCommand('copy');
                    showPointsToast('✅ تم نسخ رابط الإحالة!', '');
                });
            }
        },

        // Chatbot API
        toggleChat() { ChatbotWidget.toggle(); },
        sendChat() { ChatbotWidget.send(); },
        quickAsk(msg) {
            const input = document.getElementById('faqChatInput');
            if (!input) return;
            // Open panel first if closed
            if (!ChatbotWidget.isOpen) ChatbotWidget.toggle();
            setTimeout(() => { input.value = msg; ChatbotWidget.send(); }, 100);
        },

        // Bookmarks API
        toggleBookmark(id, name) { BookmarksSystem.toggle(id, name); },
        getBookmarks() { return BookmarksSystem.getAll(); },
        refreshBookmarks() { BookmarksSystem.injectButtons(); },

        // Called by app.js when user copies a prompt
        onPromptCopied() {
            PointsSystem.addPoints(CONFIG.POINTS.COPY_PROMPT, 'نسخ برومبت');
        },

        // Called by app.js when user uses a tool
        onToolUsed() {
            PointsSystem.addPoints(CONFIG.POINTS.USE_TOOL, 'استخدام أداة');
        },

        // Called by app.js to lock specific elements
        lockContent(selector) {
            document.querySelectorAll(selector).forEach(el => {
                el.setAttribute('data-viral-lock', 'true');
                ContentLocker.lockElement(el);
            });
        }
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => window.ViralEngine.init());
    } else {
        window.ViralEngine.init();
    }

})();

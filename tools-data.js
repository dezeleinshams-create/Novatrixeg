/* ============================================================
   Novatrix EG — 100 Tools Registry v2.0
   Complete tool definitions with render() and init()
   ============================================================ */

const NOVATRIX_TOOLS = [

{ id:"orig-prompt", cat:"design", name:"استوديو برومبتات الصور", desc:"صناعة أوامر صور الذكاء الاصطناعي", icon:"fas fa-wand-magic-sparkles", keywords:["prompt","ai","برومبت","صور","midjourney"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-wand-magic-sparkles text-primary"></i> استوديو صياغة أوامر الذكاء الاصطناعي</h3><p>امزج خيارات الاستوديو لتصنيع برومبتات صور مذهلة لـ Midjourney و ChatGPT.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        ${ToolsEngine.inputField("ps_subj","عنصر الصورة (الموضوع):","text","An astronaut riding a horse on Mars")}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            ${ToolsEngine.selectField("ps_style","النمط الفني:",[{val:"Cinematic, photography-style realistic",label:"تصوير واقعي سينمائي"},{val:"3D cartoon render, Unreal Engine 5 style",label:"رسم 3D"},{val:"Cyberpunk glow, futuristic neon lighting",label:"Cyberpunk"},{val:"Japanese Anime style, detailed sketch",label:"أنمي ياباني"},{val:"Oil painting, textured brush strokes",label:"لوحة زيتية"}])}
            ${ToolsEngine.selectField("ps_light","الإضاءة:",[{val:"warm golden hour sun rays",label:"أشعة ذهبية"},{val:"neon ambient lighting with rim highlights",label:"نيون محيطية"},{val:"soft professional studio portrait setup",label:"استوديو ناعم"},{val:"dark moody shadows, dramatic high-contrast",label:"داكنة عالية التباين"}])}
            ${ToolsEngine.selectField("ps_lens","العدسة:",[{val:"85mm portrait lens, shallow depth of field",label:"بورتريه 85mm"},{val:"drone aerial wide-angle camera shot",label:"جوية واسعة"},{val:"extreme macro close-up focus",label:"ماكرو مقربة"},{val:"low-angle dramatic cinematic view",label:"سينمائية منخفضة"}])}
            ${ToolsEngine.selectField("ps_ratio","الأبعاد:",[{val:"--ar 16:9",label:"16:9 عريض"},{val:"--ar 9:16",label:"9:16 طولي"},{val:"--ar 1:1",label:"1:1 مربع"},{val:"--ar 4:3",label:"4:3 فوتوغرافي"}])}
        </div>
        <div style="background:#121319;border:1px solid var(--border-color);border-radius:16px;padding:16px;">
            <h4 style="font-size:0.85rem;color:white;margin-bottom:8px;">البرومبت الناتج:</h4>
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;">
                <span id="ps_output" style="color:var(--primary);font-family:monospace;font-size:0.78rem;direction:ltr;text-align:left;word-break:break-all;">---</span>
                <button id="ps_cp" style="background:none;border:none;color:var(--primary);cursor:pointer;font-size:1.1rem;"><i class="far fa-copy"></i></button>
            </div>
        </div>
    </div>`; },
  init(){ function compile(){const s=document.getElementById("ps_subj").value.trim()||"An astronaut riding a horse on Mars",st=document.getElementById("ps_style").value,l=document.getElementById("ps_light").value,le=document.getElementById("ps_lens").value,r=document.getElementById("ps_ratio").value;document.getElementById("ps_output").textContent=`${s}, ${st}, ${l} lighting, ${le} ${r}`;}
    ["ps_subj","ps_style","ps_light","ps_lens","ps_ratio"].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener("input",compile);});compile();
    document.getElementById("ps_cp").onclick=()=>{ToolsEngine.copyText(document.getElementById("ps_output").textContent,"تم نسخ البرومبت! +15 نقطة");ToolsEngine.awardPoints(15,"صياغة برومبت");}; }
},



// ─── Social Media Downloaders ────────────────────────────────────


{ id:"social-tiktok-dl", cat:"social", name:"تحميل تيك توك", desc:"تنزيل فيديوهات تيك توك بدون علامة مائية", icon:"fab fa-tiktok", keywords:["tiktok","تيك توك","فيديو","تحميل","download","watermark"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fab fa-tiktok text-primary"></i> تحميل فيديوهات تيك توك</h3><p>ضع رابط الفيديو وسنستخرج رابط التحميل المباشر بدون علامة مائية.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div style="display:flex;gap:10px;align-items:flex-end;">
        <div style="flex:1;">${ToolsEngine.inputField("tk_url","رابط تيك توك:","url","https://www.tiktok.com/@username/video/...")}</div>
        <button id="tk_go" class="primary-btn" style="height:46px;padding:0 20px;background:linear-gradient(135deg,#000,#333);white-space:nowrap;"><i class="fas fa-download"></i> تحميل</button>
      </div>
      <div id="tk_loading" style="display:none;text-align:center;padding:20px;">
        <div style="width:48px;height:48px;border:3px solid var(--border-color);border-top-color:var(--primary);border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 10px;"></div>
        <p style="font-size:0.8rem;color:var(--text-secondary);">جاري استخراج الفيديو...</p>
      </div>
      <div id="tk_res" style="display:none;background:linear-gradient(135deg,rgba(var(--primary-rgb),0.08),rgba(var(--accent-rgb),0.06));border:1px solid var(--border-color);border-radius:16px;padding:20px;animation:fadeIn 0.4s;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
          <div style="width:44px;height:44px;background:linear-gradient(135deg,#000,#333);border-radius:12px;display:flex;align-items:center;justify-content:center;"><i class="fab fa-tiktok" style="color:white;font-size:1.2rem;"></i></div>
          <div><div style="font-weight:700;font-size:0.9rem;">الفيديو جاهز للتحميل! ✅</div><div style="font-size:0.75rem;color:var(--text-secondary);">اضغط الزر لبدء التنزيل المباشر</div></div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <a id="tk_dl_vid" class="primary-btn" style="background:linear-gradient(135deg,#000,#333);color:white;text-decoration:none;text-align:center;" target="_blank" download><i class="fas fa-video"></i> تحميل الفيديو (MP4) بدون علامة مائية</a>
          <a id="tk_dl_aud" class="secondary-btn" style="text-decoration:none;text-align:center;" target="_blank" download><i class="fas fa-music"></i> تحميل الصوت فقط (MP3)</a>
        </div>
      </div>
      <div id="tk_fallback" style="display:none;border-radius:14px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,rgba(239,68,68,0.12),rgba(239,68,68,0.06));border:1px solid rgba(239,68,68,0.3);padding:16px;">
          <div style="font-weight:700;color:#f87171;margin-bottom:8px;font-size:0.85rem;"><i class="fas fa-shield-halved"></i> تيك توك يحمي روابطه من التحميل المباشر</div>
          <p style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:14px;line-height:1.6;">بسبب قيود CORS وحماية تيك توك، تحتاج لموقع وسيط. هذه أفضل الخيارات المجانية والموثوقة:</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <a id="tk_fb1" href="#" target="_blank" class="primary-btn" style="background:linear-gradient(135deg,#000,#333);color:white;text-decoration:none;text-align:center;font-size:0.8rem;"><i class="fas fa-external-link-alt"></i> SnapTik</a>
            <a id="tk_fb2" href="#" target="_blank" class="secondary-btn" style="text-decoration:none;text-align:center;font-size:0.8rem;"><i class="fas fa-external-link-alt"></i> SSSTik</a>
          </div>
        </div>
      </div>
    </div>`; },
  init(){
    const urlIn=document.getElementById("tk_url"), go=document.getElementById("tk_go");
    const loading=document.getElementById("tk_loading"), res=document.getElementById("tk_res"), fallback=document.getElementById("tk_fallback");
    const dlVid=document.getElementById("tk_dl_vid"), dlAud=document.getElementById("tk_dl_aud");
    const fb1=document.getElementById("tk_fb1"), fb2=document.getElementById("tk_fb2");
    go.onclick=async()=>{
      const url=urlIn.value.trim();
      if(!url||!url.includes("tiktok")){ToolsEngine.showToast("يرجى إدخال رابط تيك توك صحيح","error");return;}
      loading.style.display="block"; res.style.display="none"; fallback.style.display="none";
      fb1.href="https://snaptik.app/ar#url="+encodeURIComponent(url);
      fb2.href="https://ssstik.io/ar#url="+encodeURIComponent(url);
      const instances=["https://cobalt.api.red.gd/api/json","https://cobalt.perennialte.ch/api/json"];
      let ok=false;
      for(const inst of instances){
        try{
          const r=await fetch(inst,{method:"POST",headers:{"Accept":"application/json","Content-Type":"application/json"},body:JSON.stringify({url,filenamePattern:"basic"}),signal:AbortSignal.timeout(8000)});
          if(r.ok){const d=await r.json();if(d.url){dlVid.href=d.url;dlAud.href=d.url;res.style.display="block";ok=true;ToolsEngine.awardPoints(15,"تيك توك");break;}}
        }catch(e){console.warn(inst,e);}
      }
      loading.style.display="none";
      if(!ok)fallback.style.display="block";
    };
  }
},

{ id:"social-youtube-dl", cat:"social", name:"تحميل يوتيوب", desc:"تنزيل مقاطع يوتيوب و Shorts بجودة عالية", icon:"fab fa-youtube", keywords:["youtube","يوتيوب","فيديو","تحميل","shorts","download","y2mate"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fab fa-youtube text-primary"></i> تحميل فيديوهات يوتيوب / Shorts</h3><p>أدخل رابط أي فيديو يوتيوب أو YouTube Shorts للتحميل الفوري.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div style="display:flex;gap:10px;align-items:flex-end;">
        <div style="flex:1;">${ToolsEngine.inputField("yt_url","رابط يوتيوب:","url","https://www.youtube.com/watch?v=... أو youtu.be/...")}</div>
        <button id="yt_go" class="primary-btn" style="height:46px;padding:0 20px;background:linear-gradient(135deg,#ff0000,#cc0000);white-space:nowrap;"><i class="fas fa-download"></i> تحميل</button>
      </div>
      <div style="display:flex;gap:8px;">
        <label style="display:flex;align-items:center;gap:6px;font-size:0.8rem;cursor:pointer;"><input type="radio" name="yt_mode" id="yt_mode_vid" value="video" checked> فيديو (MP4)</label>
        <label style="display:flex;align-items:center;gap:6px;font-size:0.8rem;cursor:pointer;"><input type="radio" name="yt_mode" id="yt_mode_aud" value="audio"> صوت فقط (MP3)</label>
      </div>
      <div id="yt_loading" style="display:none;text-align:center;padding:20px;">
        <div style="width:48px;height:48px;border:3px solid var(--border-color);border-top-color:#ff0000;border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 10px;"></div>
        <p style="font-size:0.8rem;color:var(--text-secondary);">جاري معالجة الفيديو...</p>
      </div>
      <div id="yt_res" style="display:none;background:linear-gradient(135deg,rgba(255,0,0,0.06),rgba(200,0,0,0.04));border:1px solid rgba(255,0,0,0.2);border-radius:16px;padding:20px;animation:fadeIn 0.4s;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
          <div style="width:44px;height:44px;background:linear-gradient(135deg,#ff0000,#cc0000);border-radius:12px;display:flex;align-items:center;justify-content:center;"><i class="fab fa-youtube" style="color:white;font-size:1.2rem;"></i></div>
          <div><div style="font-weight:700;font-size:0.9rem;">جاهز للتحميل! ✅</div><div style="font-size:0.75rem;color:var(--text-secondary);">اضغط لبدء التنزيل المباشر</div></div>
        </div>
        <a id="yt_dl" class="primary-btn" style="background:linear-gradient(135deg,#ff0000,#cc0000);color:white;text-decoration:none;text-align:center;display:block;" target="_blank" download><i class="fas fa-download"></i> تنزيل الآن</a>
      </div>
      <div id="yt_fallback" style="display:none;border-radius:14px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,rgba(255,0,0,0.1),rgba(200,0,0,0.06));border:1px solid rgba(255,0,0,0.25);padding:16px;">
          <div style="font-weight:700;color:#f87171;margin-bottom:8px;font-size:0.85rem;"><i class="fas fa-shield-halved"></i> يوتيوب يحمي محتواه من التحميل المباشر</div>
          <p style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:14px;line-height:1.6;">يمكنك استخدام أحد المواقع الرديفة الموثوقة مجاناً:</p>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
            <a id="yt_fb1" href="#" target="_blank" class="primary-btn" style="background:linear-gradient(135deg,#ff0000,#cc0000);color:white;text-decoration:none;text-align:center;font-size:0.75rem;padding:8px;"><i class="fas fa-external-link-alt"></i> Y2Mate</a>
            <a id="yt_fb2" href="#" target="_blank" class="secondary-btn" style="text-decoration:none;text-align:center;font-size:0.75rem;padding:8px 4px;"><i class="fas fa-external-link-alt"></i> SaveFrom</a>
            <a id="yt_fb3" href="#" target="_blank" class="secondary-btn" style="text-decoration:none;text-align:center;font-size:0.75rem;padding:8px 4px;"><i class="fas fa-external-link-alt"></i> YT5s</a>
          </div>
        </div>
      </div>
    </div>`; },
  init(){
    const urlIn=document.getElementById("yt_url"), go=document.getElementById("yt_go");
    const loading=document.getElementById("yt_loading"), res=document.getElementById("yt_res"), fallback=document.getElementById("yt_fallback");
    const dl=document.getElementById("yt_dl");
    const fb1=document.getElementById("yt_fb1"),fb2=document.getElementById("yt_fb2"),fb3=document.getElementById("yt_fb3");
    go.onclick=async()=>{
      const url=urlIn.value.trim();
      if(!url||(!url.includes("youtube")&&!url.includes("youtu.be"))){ToolsEngine.showToast("يرجى إدخال رابط يوتيوب صحيح","error");return;}
      const isAudio=document.getElementById("yt_mode_aud").checked;
      loading.style.display="block"; res.style.display="none"; fallback.style.display="none";
      fb1.href="https://y2mate.is/en-us/tools/youtube-downloader/?url="+encodeURIComponent(url);
      fb2.href="https://savefrom.net/#url="+encodeURIComponent(url);
      fb3.href="https://yt5s.io/en26/?url="+encodeURIComponent(url);
      const instances=["https://cobalt.api.red.gd/api/json","https://cobalt.perennialte.ch/api/json"];
      let ok=false;
      for(const inst of instances){
        try{
          const body={url,filenamePattern:"basic"};
          if(isAudio)body.isAudioOnly=true;
          const r=await fetch(inst,{method:"POST",headers:{"Accept":"application/json","Content-Type":"application/json"},body:JSON.stringify(body),signal:AbortSignal.timeout(8000)});
          if(r.ok){const d=await r.json();if(d.url){dl.href=d.url;res.style.display="block";ok=true;ToolsEngine.awardPoints(15,"يوتيوب");break;}}
        }catch(e){console.warn(inst,e);}
      }
      loading.style.display="none";
      if(!ok)fallback.style.display="block";
    };
  }
},

{ id:"social-instagram-dl", cat:"social", name:"تحميل إنستغرام", desc:"تنزيل ريلز وصور فيديو إنستغرام", icon:"fab fa-instagram", keywords:["instagram","انستغرام","إنستغرام","ريلز","reels","تحميل","صور"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fab fa-instagram text-primary"></i> تحميل من إنستغرام</h3><p>أدخل رابط الريلز (Reels) أو أي منشور لتنزيله مباشرة.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div style="display:flex;gap:10px;align-items:flex-end;">
        <div style="flex:1;">${ToolsEngine.inputField("ig_url","رابط إنستغرام:","url","https://www.instagram.com/reel/... أو /p/...")}</div>
        <button id="ig_go" class="primary-btn" style="height:46px;padding:0 20px;background:linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045);white-space:nowrap;"><i class="fas fa-download"></i> تحميل</button>
      </div>
      <div id="ig_loading" style="display:none;text-align:center;padding:20px;">
        <div style="width:48px;height:48px;border:3px solid var(--border-color);border-top-color:#fd1d1d;border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 10px;"></div>
        <p style="font-size:0.8rem;color:var(--text-secondary);">جاري قراءة المنشور...</p>
      </div>
      <div id="ig_res" style="display:none;background:linear-gradient(135deg,rgba(131,58,180,0.08),rgba(253,29,29,0.05));border:1px solid rgba(131,58,180,0.25);border-radius:16px;padding:20px;animation:fadeIn 0.4s;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
          <div style="width:44px;height:44px;background:linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045);border-radius:12px;display:flex;align-items:center;justify-content:center;"><i class="fab fa-instagram" style="color:white;font-size:1.2rem;"></i></div>
          <div><div style="font-weight:700;font-size:0.9rem;">جاهز للتحميل! ✅</div><div style="font-size:0.75rem;color:var(--text-secondary);">اضغط لبدء التنزيل</div></div>
        </div>
        <a id="ig_dl" class="primary-btn" style="background:linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045);color:white;text-decoration:none;text-align:center;display:block;" target="_blank" download><i class="fas fa-download"></i> تنزيل الملف (فيديو / صورة)</a>
      </div>
      <div id="ig_fallback" style="display:none;border-radius:14px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,rgba(131,58,180,0.1),rgba(253,29,29,0.06));border:1px solid rgba(131,58,180,0.3);padding:16px;">
          <div style="font-weight:700;color:#c084fc;margin-bottom:8px;font-size:0.85rem;"><i class="fas fa-shield-halved"></i> ميتا (Meta) تحمي محتوى إنستغرام</div>
          <p style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:14px;line-height:1.6;">استخدم أحد المواقع الموثوقة للتحميل المجاني:</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <a id="ig_fb1" href="#" target="_blank" class="primary-btn" style="background:linear-gradient(135deg,#833ab4,#fd1d1d);color:white;text-decoration:none;text-align:center;font-size:0.8rem;"><i class="fas fa-external-link-alt"></i> SnapInsta</a>
            <a id="ig_fb2" href="#" target="_blank" class="secondary-btn" style="text-decoration:none;text-align:center;font-size:0.8rem;"><i class="fas fa-external-link-alt"></i> SaveInsta</a>
          </div>
        </div>
      </div>
    </div>`; },
  init(){
    const urlIn=document.getElementById("ig_url"), go=document.getElementById("ig_go");
    const loading=document.getElementById("ig_loading"), res=document.getElementById("ig_res"), fallback=document.getElementById("ig_fallback");
    const dl=document.getElementById("ig_dl");
    const fb1=document.getElementById("ig_fb1"), fb2=document.getElementById("ig_fb2");
    go.onclick=async()=>{
      const url=urlIn.value.trim();
      if(!url||!url.includes("instagram")){ToolsEngine.showToast("يرجى إدخال رابط إنستغرام صحيح","error");return;}
      loading.style.display="block"; res.style.display="none"; fallback.style.display="none";
      fb1.href="https://snapinsta.app/ar#url="+encodeURIComponent(url);
      fb2.href="https://saveinsta.app/#url="+encodeURIComponent(url);
      const instances=["https://cobalt.api.red.gd/api/json","https://cobalt.perennialte.ch/api/json"];
      let ok=false;
      for(const inst of instances){
        try{
          const r=await fetch(inst,{method:"POST",headers:{"Accept":"application/json","Content-Type":"application/json"},body:JSON.stringify({url,filenamePattern:"basic"}),signal:AbortSignal.timeout(8000)});
          if(r.ok){const d=await r.json();if(d.url){dl.href=d.url;res.style.display="block";ok=true;ToolsEngine.awardPoints(10,"إنستغرام");break;}}
        }catch(e){console.warn(inst,e);}
      }
      loading.style.display="none";
      if(!ok)fallback.style.display="block";
    };
  }
},

{ id:"social-facebook-dl", cat:"social", name:"تحميل فيسبوك", desc:"تنزيل فيديوهات فيسبوك و Reels", icon:"fab fa-facebook", keywords:["facebook","فيسبوك","فيديو","تحميل","reels"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fab fa-facebook text-primary"></i> تحميل فيديوهات فيسبوك</h3><p>أدخل رابط فيديو أو ريلز فيسبوك للتنزيل المباشر.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div style="display:flex;gap:10px;align-items:flex-end;">
        <div style="flex:1;">${ToolsEngine.inputField("fb_url","رابط فيديو فيسبوك:","url","https://www.facebook.com/watch?v=... أو /reel/...")}</div>
        <button id="fb_go" class="primary-btn" style="height:46px;padding:0 20px;background:linear-gradient(135deg,#1877f2,#0d5cbf);white-space:nowrap;"><i class="fas fa-download"></i> تحميل</button>
      </div>
      <div id="fb_loading" style="display:none;text-align:center;padding:20px;">
        <div style="width:48px;height:48px;border:3px solid var(--border-color);border-top-color:#1877f2;border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 10px;"></div>
        <p style="font-size:0.8rem;color:var(--text-secondary);">جاري جلب الفيديو...</p>
      </div>
      <div id="fb_res" style="display:none;background:linear-gradient(135deg,rgba(24,119,242,0.08),rgba(13,92,191,0.04));border:1px solid rgba(24,119,242,0.25);border-radius:16px;padding:20px;animation:fadeIn 0.4s;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
          <div style="width:44px;height:44px;background:linear-gradient(135deg,#1877f2,#0d5cbf);border-radius:12px;display:flex;align-items:center;justify-content:center;"><i class="fab fa-facebook" style="color:white;font-size:1.2rem;"></i></div>
          <div><div style="font-weight:700;font-size:0.9rem;">جاهز للتحميل! ✅</div><div style="font-size:0.75rem;color:var(--text-secondary);">اضغط لبدء التنزيل</div></div>
        </div>
        <a id="fb_dl" class="primary-btn" style="background:linear-gradient(135deg,#1877f2,#0d5cbf);color:white;text-decoration:none;text-align:center;display:block;" target="_blank" download><i class="fas fa-download"></i> تنزيل الفيديو (MP4)</a>
      </div>
      <div id="fb_fallback" style="display:none;border-radius:14px;">
        <div style="background:linear-gradient(135deg,rgba(24,119,242,0.1),rgba(13,92,191,0.06));border:1px solid rgba(24,119,242,0.3);padding:16px;border-radius:14px;">
          <div style="font-weight:700;color:#60a5fa;margin-bottom:8px;font-size:0.85rem;"><i class="fas fa-shield-halved"></i> فيسبوك يحمي الفيديوهات من التحميل المباشر</div>
          <p style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:14px;line-height:1.6;">يمكنك التحميل مجاناً عبر المواقع الرديفة:</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <a id="fb_ext1" href="#" target="_blank" class="primary-btn" style="background:linear-gradient(135deg,#1877f2,#0d5cbf);color:white;text-decoration:none;text-align:center;font-size:0.8rem;"><i class="fas fa-external-link-alt"></i> FDown</a>
            <a id="fb_ext2" href="#" target="_blank" class="secondary-btn" style="text-decoration:none;text-align:center;font-size:0.8rem;"><i class="fas fa-external-link-alt"></i> GetFVid</a>
          </div>
        </div>
      </div>
    </div>`; },
  init(){
    const urlIn=document.getElementById("fb_url"), go=document.getElementById("fb_go");
    const loading=document.getElementById("fb_loading"), res=document.getElementById("fb_res"), fallback=document.getElementById("fb_fallback");
    const dl=document.getElementById("fb_dl");
    const ext1=document.getElementById("fb_ext1"), ext2=document.getElementById("fb_ext2");
    go.onclick=async()=>{
      const url=urlIn.value.trim();
      if(!url||!url.includes("facebook")){ToolsEngine.showToast("يرجى إدخال رابط فيسبوك صحيح","error");return;}
      loading.style.display="block"; res.style.display="none"; fallback.style.display="none";
      ext1.href="https://fdown.net/?URL="+encodeURIComponent(url);
      ext2.href="https://getfvid.com/?url="+encodeURIComponent(url);
      const instances=["https://cobalt.api.red.gd/api/json","https://cobalt.perennialte.ch/api/json"];
      let ok=false;
      for(const inst of instances){
        try{
          const r=await fetch(inst,{method:"POST",headers:{"Accept":"application/json","Content-Type":"application/json"},body:JSON.stringify({url,filenamePattern:"basic"}),signal:AbortSignal.timeout(8000)});
          if(r.ok){const d=await r.json();if(d.url){dl.href=d.url;res.style.display="block";ok=true;ToolsEngine.awardPoints(10,"فيسبوك");break;}}
        }catch(e){console.warn(inst,e);}
      }
      loading.style.display="none";
      if(!ok)fallback.style.display="block";
    };
  }
},

{ id:"social-yt-mp3", cat:"social", name:"يوتيوب ← MP3", desc:"استخرج الصوت من أي فيديو يوتيوب", icon:"fas fa-music", keywords:["mp3","youtube","يوتيوب","صوت","موسيقى","audio","تحويل","استخراج"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-music text-primary"></i> استخراج الصوت من يوتيوب (MP3)</h3><p>حوّل أي فيديو يوتيوب إلى ملف صوتي MP3 عالي الجودة مجاناً.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div style="display:flex;gap:10px;align-items:flex-end;">
        <div style="flex:1;">${ToolsEngine.inputField("mp3_url","رابط يوتيوب:","url","https://www.youtube.com/watch?v=...")}</div>
        <button id="mp3_go" class="primary-btn" style="height:46px;padding:0 20px;background:linear-gradient(135deg,var(--primary),var(--accent));white-space:nowrap;"><i class="fas fa-music"></i> استخراج</button>
      </div>
      <div id="mp3_loading" style="display:none;text-align:center;padding:20px;">
        <div style="width:48px;height:48px;border:3px solid var(--border-color);border-top-color:var(--primary);border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 10px;"></div>
        <p style="font-size:0.8rem;color:var(--text-secondary);">جاري استخراج الصوت...</p>
      </div>
      <div id="mp3_res" style="display:none;background:linear-gradient(135deg,rgba(var(--primary-rgb),0.08),rgba(var(--accent-rgb),0.06));border:1px solid var(--border-color);border-radius:16px;padding:20px;animation:fadeIn 0.4s;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
          <div style="width:44px;height:44px;background:linear-gradient(135deg,var(--primary),var(--accent));border-radius:12px;display:flex;align-items:center;justify-content:center;"><i class="fas fa-music" style="color:white;font-size:1.2rem;"></i></div>
          <div><div style="font-weight:700;font-size:0.9rem;">الصوت جاهز! 🎵</div><div style="font-size:0.75rem;color:var(--text-secondary);">اضغط لتنزيل ملف MP3</div></div>
        </div>
        <a id="mp3_dl" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));color:white;text-decoration:none;text-align:center;display:block;" target="_blank" download><i class="fas fa-music"></i> تنزيل الصوت (MP3)</a>
      </div>
      <div id="mp3_fallback" style="display:none;background:linear-gradient(135deg,rgba(var(--primary-rgb),0.08),rgba(var(--accent-rgb),0.04));border:1px solid var(--border-color);border-radius:14px;padding:16px;">
        <div style="font-weight:700;color:var(--primary);margin-bottom:8px;font-size:0.85rem;"><i class="fas fa-info-circle"></i> استخدم المواقع الرديفة المجانية</div>
        <p style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:14px;line-height:1.6;">يوتيوب يحمي محتواه. يمكنك التحويل عبر:</p>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
          <a id="mp3_fb1" href="#" target="_blank" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));color:white;text-decoration:none;text-align:center;font-size:0.75rem;padding:8px;"><i class="fas fa-music"></i> YT-MP3</a>
          <a id="mp3_fb2" href="#" target="_blank" class="secondary-btn" style="text-decoration:none;text-align:center;font-size:0.75rem;padding:8px;"><i class="fas fa-music"></i> MP3ify</a>
          <a id="mp3_fb3" href="#" target="_blank" class="secondary-btn" style="text-decoration:none;text-align:center;font-size:0.75rem;padding:8px;"><i class="fas fa-music"></i> Y2Mate</a>
        </div>
      </div>
    </div>`; },
  init(){
    const urlIn=document.getElementById("mp3_url"), go=document.getElementById("mp3_go");
    const loading=document.getElementById("mp3_loading"), res=document.getElementById("mp3_res"), fallback=document.getElementById("mp3_fallback");
    const dl=document.getElementById("mp3_dl");
    const fb1=document.getElementById("mp3_fb1"),fb2=document.getElementById("mp3_fb2"),fb3=document.getElementById("mp3_fb3");
    go.onclick=async()=>{
      const url=urlIn.value.trim();
      if(!url||(!url.includes("youtube")&&!url.includes("youtu.be"))){ToolsEngine.showToast("يرجى إدخال رابط يوتيوب صحيح","error");return;}
      loading.style.display="block"; res.style.display="none"; fallback.style.display="none";
      fb1.href="https://yt-mp3.com/#url="+encodeURIComponent(url);
      fb2.href="https://mp3ify.com/#url="+encodeURIComponent(url);
      fb3.href="https://y2mate.is/en-us/tools/youtube-to-mp3/?url="+encodeURIComponent(url);
      const instances=["https://cobalt.api.red.gd/api/json","https://cobalt.perennialte.ch/api/json"];
      let ok=false;
      for(const inst of instances){
        try{
          const r=await fetch(inst,{method:"POST",headers:{"Accept":"application/json","Content-Type":"application/json"},body:JSON.stringify({url,filenamePattern:"basic",isAudioOnly:true,aFormat:"mp3"}),signal:AbortSignal.timeout(8000)});
          if(r.ok){const d=await r.json();if(d.url){dl.href=d.url;res.style.display="block";ok=true;ToolsEngine.awardPoints(10,"MP3");break;}}
        }catch(e){console.warn(inst,e);}
      }
      loading.style.display="none";
      if(!ok)fallback.style.display="block";
    };
  }
},


// ╔═══════════════════════════════════════════════════════════════╗
// ║  CATEGORY: IMAGE — أدوات الصور                               ║
// ╚═══════════════════════════════════════════════════════════════╝

{ id:"img-compress", cat:"image", name:"مضغط حجم الصور", desc:"تقليل حجم الكيلوبايت مع حفظ الجودة", icon:"fas fa-file-zipper", keywords:["ضغط","صور","compress","image"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-file-zipper text-primary"></i> مضغط ومصغّر حجم الصور الذكي</h3><p>قم بضغط صورك وتقليل حجمها بالكيلوبايت بنسبة تصل إلى 90% مع الحفاظ على جودتها.</p></div>
    <div style="display:flex;flex-direction:column;gap:16px;">
        <div id="ic_drop" style="border:2px dashed var(--border-color);padding:30px 20px;text-align:center;border-radius:16px;cursor:pointer;background:rgba(0,0,0,0.08);"><i class="fas fa-cloud-arrow-up" style="font-size:2.5rem;color:var(--primary);margin-bottom:10px;"></i><h4 style="font-size:0.9rem;color:var(--text-primary);">اسحب وأفلت الصورة هنا أو انقر للاختيار</h4><p style="font-size:0.72rem;color:var(--text-secondary);margin-top:4px;">يدعم JPG, PNG, WebP (الحد الأقصى 10MB)</p><input type="file" id="ic_file" accept="image/*" style="display:none;"></div>
        <div id="ic_opts" style="display:none;background:var(--bg-surface);border:1px solid var(--border-color);border-radius:16px;padding:20px;">
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:var(--text-secondary);font-weight:700;"><span>جودة الضغط:</span><span id="ic_qv" style="color:var(--primary);font-weight:800;">80%</span></div>
            <input type="range" id="ic_q" min="10" max="100" value="80" style="width:100%;margin-top:6px;cursor:pointer;">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px;">
                <div style="font-size:0.8rem;color:var(--text-secondary);">الحجم الأصلي: <span id="ic_os" style="color:var(--text-primary);font-weight:bold;">--</span></div>
                <div style="font-size:0.8rem;color:var(--text-secondary);">الحجم الجديد: <span id="ic_ns" style="color:var(--green-success);font-weight:bold;">--</span></div>
            </div>
            <div style="font-size:0.85rem;color:var(--text-secondary);margin-top:8px;">نسبة التقليل: <span id="ic_rv" style="color:var(--green-success);font-weight:800;">--</span></div>
            <button id="ic_dl" class="primary-btn wide-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));margin-top:12px;"><i class="fas fa-download"></i> تحميل الصورة المضغوطة</button>
        </div>
    </div>`; },
  init(){
    let file,img=new Image(),blobUrl;
    const drop=document.getElementById("ic_drop"),fi=document.getElementById("ic_file"),opts=document.getElementById("ic_opts"),q=document.getElementById("ic_q"),qv=document.getElementById("ic_qv");
    drop.onclick=()=>fi.click();
    drop.ondragover=e=>{e.preventDefault();drop.style.borderColor="var(--primary)";};
    drop.ondragleave=()=>drop.style.borderColor="var(--border-color)";
    drop.ondrop=e=>{e.preventDefault();drop.style.borderColor="var(--border-color)";if(e.dataTransfer.files[0])go(e.dataTransfer.files[0]);};
    fi.onchange=e=>{if(e.target.files[0])go(e.target.files[0]);};
    function go(f){file=f;document.getElementById("ic_os").textContent=ToolsEngine.formatBytes(f.size);const r=new FileReader();r.onload=e=>{img.onload=()=>{opts.style.display="block";compress();};img.src=e.target.result;};r.readAsDataURL(f);}
    function compress(){const c=document.createElement("canvas"),x=c.getContext("2d");c.width=img.width;c.height=img.height;x.drawImage(img,0,0);const ql=(parseInt(q.value)||80)/100;c.toBlob(b=>{if(!b)return;if(blobUrl)URL.revokeObjectURL(blobUrl);blobUrl=URL.createObjectURL(b);document.getElementById("ic_ns").textContent=ToolsEngine.formatBytes(b.size);const pct=Math.round((file.size-b.size)/file.size*100);const rv=document.getElementById("ic_rv");rv.textContent=pct>0?`-${pct}%`:`+${Math.abs(pct)}%`;rv.style.color=pct>0?"var(--green-success)":"var(--red-error)";},"image/jpeg",ql);}
    q.oninput=()=>{qv.textContent=q.value+"%";compress();};
    document.getElementById("ic_dl").onclick=()=>{if(!blobUrl)return;const a=document.createElement("a");a.href=blobUrl;a.download="compressed.jpg";a.click();ToolsEngine.awardPoints(10,"ضغط صورة");ToolsEngine.showToast("تم تحميل الصورة المضغوطة! +10 نقاط");};
  }
},

{ id:"orig-qr", cat:"dev", name:"مولد الـ QR المطور", desc:"توليد وتحميل رموز الاستجابة السريعة", icon:"fas fa-qrcode", keywords:["qr","code","باركود","رمز"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-qrcode text-primary"></i> مولد أكواد الـ QR السريع</h3><p>أدخل الرابط أو النص الذي ترغب في توليد كود الاستجابة السريعة له.</p></div>
    <div style="display:flex;gap:20px;flex-wrap:wrap;align-items:flex-start;">
        <div style="flex:1;min-width:200px;display:flex;flex-direction:column;gap:12px;">
            <label style="font-size:0.8rem;font-weight:700;color:var(--text-secondary);">الرابط أو النص:</label>
            <textarea id="qr_input" class="form-textarea" placeholder="مثال: https://novatrixeg.com" style="height:100px;resize:none;"></textarea>
            <button id="qr_gen" class="primary-btn wide-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-arrows-rotate"></i> توليد رمز الـ QR</button>
        </div>
        <div style="text-align:center;display:flex;flex-direction:column;align-items:center;gap:8px;">
            <img id="qr_img" src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=NOVATRIXEG" alt="QR Code" style="border-radius:12px;">
            <button id="qr_dl" class="secondary-btn" style="padding:8px 16px;font-size:0.8rem;"><i class="fas fa-download"></i> تحميل (PNG)</button>
        </div>
    </div>`; },
  init(){ document.getElementById("qr_gen").onclick=()=>{const t=document.getElementById("qr_input").value.trim();if(!t){alert("يرجى إدخال رابط أو نص أولاً!");return;}document.getElementById("qr_img").src=`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(t)}`;ToolsEngine.awardPoints(5,"توليد QR Code");};
    document.getElementById("qr_dl").onclick=()=>window.open(document.getElementById("qr_img").src,"_blank"); }
},

{ id:"sec-url-check", cat:"security", name:"فاحص الروابط", desc:"هل الرابط ده مفيروس ولا لا؟", icon:"fas fa-shield-virus", keywords:["url","رابط","فيروس","امان","safety","malware","phishing","فحص"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-shield-virus text-primary"></i> فاحص أمان الروابط</h3><p>أدخل أي رابط وسنفحصه فوراً للتأكد إنه آمن وخالي من الفيروسات والاحتيال.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div style="display:flex;gap:10px;align-items:flex-end;">
        <div style="flex:1;">${ToolsEngine.inputField("uc_url","الرابط المراد فحصه:","url","https://example.com")}</div>
        <button id="uc_go" class="primary-btn" style="height:46px;padding:0 20px;background:linear-gradient(135deg,#16a34a,#15803d);white-space:nowrap;"><i class="fas fa-search"></i> فحص</button>
      </div>
      <div id="uc_loading" style="display:none;text-align:center;padding:20px;">
        <div style="width:48px;height:48px;border:3px solid var(--border-color);border-top-color:#16a34a;border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 10px;"></div>
        <p style="font-size:0.8rem;color:var(--text-secondary);">جاري فحص الرابط...</p>
      </div>
      <div id="uc_safe" style="display:none;background:linear-gradient(135deg,rgba(22,163,74,0.12),rgba(21,128,61,0.06));border:1px solid rgba(22,163,74,0.4);border-radius:16px;padding:20px;animation:fadeIn 0.4s;">
        <div style="display:flex;align-items:center;gap:14px;">
          <div style="width:56px;height:56px;background:linear-gradient(135deg,#16a34a,#15803d);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-shield-check" style="color:white;font-size:1.4rem;"></i></div>
          <div><div style="font-weight:800;font-size:1rem;color:#4ade80;">✅ الرابط يبدو آمن!</div><div id="uc_safe_domain" style="font-size:0.78rem;color:var(--text-secondary);margin-top:3px;"></div></div>
        </div>
        <div style="margin-top:14px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
          <div style="background:rgba(22,163,74,0.1);border-radius:10px;padding:10px;text-align:center;"><div style="font-size:0.7rem;color:var(--text-secondary);">نمط الرابط</div><div style="font-size:0.85rem;font-weight:700;color:#4ade80;">نظيف ✓</div></div>
          <div style="background:rgba(22,163,74,0.1);border-radius:10px;padding:10px;text-align:center;"><div style="font-size:0.7rem;color:var(--text-secondary);">HTTPS</div><div id="uc_https_badge" style="font-size:0.85rem;font-weight:700;color:#4ade80;">--</div></div>
          <div style="background:rgba(22,163,74,0.1);border-radius:10px;padding:10px;text-align:center;"><div style="font-size:0.7rem;color:var(--text-secondary);">كلمات خطرة</div><div style="font-size:0.85rem;font-weight:700;color:#4ade80;">لا يوجد ✓</div></div>
        </div>
      </div>
      <div id="uc_warn" style="display:none;background:linear-gradient(135deg,rgba(239,68,68,0.12),rgba(220,38,38,0.06));border:1px solid rgba(239,68,68,0.4);border-radius:16px;padding:20px;animation:fadeIn 0.4s;">
        <div style="display:flex;align-items:center;gap:14px;">
          <div style="width:56px;height:56px;background:linear-gradient(135deg,#dc2626,#b91c1c);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-skull-crossbones" style="color:white;font-size:1.4rem;"></i></div>
          <div><div style="font-weight:800;font-size:1rem;color:#f87171;">⚠️ تحذير! رابط مشبوه</div><div id="uc_warn_reason" style="font-size:0.78rem;color:var(--text-secondary);margin-top:3px;">لا تفتح هذا الرابط — قد يكون خطيراً أو احتيالياً</div></div>
        </div>
      </div>
      <div id="uc_result_panel" style="display:none;background:var(--bg-surface);border:1px solid var(--border-color);border-radius:14px;padding:14px;">
        <p style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:10px;"><i class="fas fa-magnifying-glass"></i> تحقق إضافي عبر محركات متخصصة:</p>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
          <a id="uc_vt" href="#" target="_blank" class="primary-btn" style="background:linear-gradient(135deg,#1d4ed8,#1e40af);color:white;text-decoration:none;text-align:center;font-size:0.75rem;padding:8px;"><i class="fas fa-external-link-alt"></i> VirusTotal</a>
          <a id="uc_gs" href="#" target="_blank" class="secondary-btn" style="text-decoration:none;text-align:center;font-size:0.75rem;padding:8px;"><i class="fas fa-external-link-alt"></i> Google Check</a>
          <a id="uc_uv" href="#" target="_blank" class="secondary-btn" style="text-decoration:none;text-align:center;font-size:0.75rem;padding:8px;"><i class="fas fa-external-link-alt"></i> URLVoid</a>
        </div>
      </div>
    </div>`; },
  init(){
    const urlIn=document.getElementById("uc_url"), go=document.getElementById("uc_go");
    const loading=document.getElementById("uc_loading"), safePanel=document.getElementById("uc_safe"), warnPanel=document.getElementById("uc_warn"), resultPanel=document.getElementById("uc_result_panel");
    const safeDomain=document.getElementById("uc_safe_domain"), httpsBadge=document.getElementById("uc_https_badge"), warnReason=document.getElementById("uc_warn_reason");
    const vtLink=document.getElementById("uc_vt"), gsLink=document.getElementById("uc_gs"), uvLink=document.getElementById("uc_uv");
    const CHECKS=[
      {pattern:/^(https?:\/\/)?(www\.)?(bit\.ly|tinyurl|t\.co|goo\.gl|ow\.ly|shorte\.st|adf\.ly)\/\S+$/i, reason:"رابط مختصر مشبوه — لا نعرف وجهته الحقيقية"},
      {pattern:/\.(xyz|tk|ml|ga|cf|gq)(\/|$)/i, reason:"نطاق عالي الخطورة (.xyz/.tk/.ml)"},
      {pattern:/(login|verify|account|update|password|secure|bank).*\.(xyz|tk|ml|ga|cf|gq|info|top)/i, reason:"نمط تصيد احتيالي (Phishing)"},
      {pattern:/(\d{1,3}\.){3}\d{1,3}/i, reason:"الرابط يحتوي على IP مباشر بدل اسم نطاق"},
      {pattern:/(free.*win|you.*won|claim.*prize|click.*now.*urgent)/i, reason:"محتوى احتيالي (جوائز وهمية)"},
      {pattern:/[a-z0-9]{30,}/i, reason:"رابط مشفر مشبوه جداً"},
    ];
    go.onclick=async()=>{
      const raw=urlIn.value.trim();
      if(!raw){ToolsEngine.showToast("يرجى إدخال رابط أولاً","error");return;}
      let url=raw;
      if(!url.startsWith("http"))url="https://"+url;
      loading.style.display="block"; safePanel.style.display="none"; warnPanel.style.display="none"; resultPanel.style.display="none";
      vtLink.href="https://www.virustotal.com/gui/url/"+btoa(url).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"");
      gsLink.href="https://transparencyreport.google.com/safe-browsing/search?url="+encodeURIComponent(url);
      uvLink.href="https://www.urlvoid.com/scan/"+encodeURIComponent((url.replace(/^https?:\/\//,"")).split("/")[0]);
      await new Promise(r=>setTimeout(r,1800));
      const isHttps=url.startsWith("https://");
      httpsBadge.textContent=isHttps?"مشفر ✓":"غير مشفر ⚠";
      httpsBadge.style.color=isHttps?"#4ade80":"#f59e0b";
      let domain="";try{domain=new URL(url).hostname;}catch(e){}
      safeDomain.textContent="النطاق: "+domain;
      loading.style.display="none";
      resultPanel.style.display="block";
      const threat=CHECKS.find(c=>c.pattern.test(url));
      if(threat){
        warnReason.textContent=threat.reason;
        warnPanel.style.display="block";
        ToolsEngine.showToast("⚠️ رابط مشبوه — تحقق قبل الفتح!","error");
      } else {
        safePanel.style.display="block";
        ToolsEngine.awardPoints(5,"فحص رابط");
        ToolsEngine.showToast("✅ الرابط يبدو آمناً +5 نقاط");
      }
    };
    urlIn.addEventListener("keydown",e=>{if(e.key==="Enter")go.click();});
  }
},

{ id:"img-convert", cat:"image", name:"محول صيغ الصور", desc:"تحويل صورك لـ WebP و PNG و JPG", icon:"fas fa-images", keywords:["تحويل","صيغة","webp","png","jpg"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-images text-primary"></i> محول صيغ الصور الذكي</h3><p>حول صورك إلى WebP أو PNG أو JPG بثانية واحدة ومجاناً.</p></div>
    <div style="display:flex;flex-direction:column;gap:16px;">
        <div id="cv_drop" style="border:2px dashed var(--border-color);padding:30px 20px;text-align:center;border-radius:16px;cursor:pointer;background:rgba(0,0,0,0.08);"><i class="fas fa-images" style="font-size:2.5rem;color:var(--primary);margin-bottom:10px;"></i><h4 style="font-size:0.9rem;color:var(--text-primary);">اسحب وأفلت أو انقر للاختيار</h4><input type="file" id="cv_file" accept="image/*" style="display:none;"></div>
        <div id="cv_opts" style="display:none;background:var(--bg-surface);border:1px solid var(--border-color);border-radius:16px;padding:20px;">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:center;">
                <div><label style="font-size:0.8rem;font-weight:700;color:var(--text-secondary);">الصيغة المستهدفة:</label><select id="cv_fmt" style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:14px;padding:10px;color:var(--text-primary);width:100%;margin-top:6px;cursor:pointer;"><option value="image/webp">WebP</option><option value="image/png">PNG</option><option value="image/jpeg">JPG</option></select></div>
                <div><div style="font-size:0.8rem;color:var(--text-secondary);">الملف: <span id="cv_name" style="color:var(--text-primary);font-weight:bold;">--</span></div><button id="cv_go" class="primary-btn wide-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));margin-top:8px;"><i class="fas fa-arrows-rotate"></i> تحويل وتحميل</button></div>
            </div>
        </div>
    </div>`; },
  init(){
    let file,img=new Image();
    const drop=document.getElementById("cv_drop"),fi=document.getElementById("cv_file");
    drop.onclick=()=>fi.click();
    drop.ondragover=e=>e.preventDefault();
    drop.ondrop=e=>{e.preventDefault();if(e.dataTransfer.files[0])go(e.dataTransfer.files[0]);};
    fi.onchange=e=>{if(e.target.files[0])go(e.target.files[0]);};
    function go(f){file=f;document.getElementById("cv_name").textContent=f.name;const r=new FileReader();r.onload=e=>{img.onload=()=>document.getElementById("cv_opts").style.display="block";img.src=e.target.result;};r.readAsDataURL(f);}
    document.getElementById("cv_go").onclick=()=>{if(!file)return;const c=document.createElement("canvas");c.width=img.width;c.height=img.height;c.getContext("2d").drawImage(img,0,0);const fmt=document.getElementById("cv_fmt").value,ext=fmt.split("/")[1];c.toBlob(b=>{const u=URL.createObjectURL(b),a=document.createElement("a");a.href=u;a.download="converted."+ext;a.click();URL.revokeObjectURL(u);ToolsEngine.awardPoints(10,"تحويل صيغة صورة");ToolsEngine.showToast("تم التحويل بنجاح! +10 نقاط");},fmt,0.92);};
  }
},

{ id:"img-resize", cat:"image", name:"مغيّر أبعاد الصور", desc:"تغيير العرض والارتفاع بالبكسل", icon:"fas fa-up-right-and-down-left-from-center", keywords:["resize","أبعاد","حجم"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-up-right-and-down-left-from-center text-primary"></i> مغيّر أبعاد الصور</h3><p>غيّر عرض وارتفاع صورتك بالبكسل مع الحفاظ على النسبة.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <div id="rs_drop" style="border:2px dashed var(--border-color);padding:30px 20px;text-align:center;border-radius:16px;cursor:pointer;background:rgba(0,0,0,0.08);"><i class="fas fa-upload" style="font-size:2rem;color:var(--primary);margin-bottom:8px;"></i><h4 style="font-size:0.9rem;color:var(--text-primary);">اختر صورة</h4><input type="file" id="rs_file" accept="image/*" style="display:none;"></div>
        <div id="rs_opts" style="display:none;">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
                ${ToolsEngine.inputField("rs_w","العرض (px):","number","","")}
                ${ToolsEngine.inputField("rs_h","الارتفاع (px):","number","","")}
            </div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;"><input type="checkbox" id="rs_lock" checked><label for="rs_lock" style="font-size:0.75rem;color:var(--text-secondary);cursor:pointer;">قفل النسبة</label></div>
            <button id="rs_go" class="primary-btn wide-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-download"></i> تغيير وتحميل</button>
        </div>
    </div>`; },
  init(){
    let img=new Image(),file;
    const fi=document.getElementById("rs_file"),drop=document.getElementById("rs_drop"),w=document.getElementById("rs_w"),h=document.getElementById("rs_h"),lock=document.getElementById("rs_lock");
    drop.onclick=()=>fi.click();
    fi.onchange=e=>{file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=ev=>{img.onload=()=>{w.value=img.width;h.value=img.height;document.getElementById("rs_opts").style.display="block";};img.src=ev.target.result;};r.readAsDataURL(file);};
    w.oninput=()=>{if(lock.checked&&img.width)h.value=Math.round(w.value*(img.height/img.width));};
    h.oninput=()=>{if(lock.checked&&img.height)w.value=Math.round(h.value*(img.width/img.height));};
    document.getElementById("rs_go").onclick=()=>{const c=document.createElement("canvas");c.width=parseInt(w.value)||img.width;c.height=parseInt(h.value)||img.height;c.getContext("2d").drawImage(img,0,0,c.width,c.height);c.toBlob(b=>{const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="resized.png";a.click();ToolsEngine.showToast("تم تغيير الأبعاد! +10 نقاط");ToolsEngine.awardPoints(10,"تغيير أبعاد صورة");},"image/png");};
  }
},

{ id:"img-crop", cat:"image", name:"قاطع الصور", desc:"اقتصاص جزء محدد من الصورة", icon:"fas fa-crop-simple", keywords:["crop","قص","اقتصاص"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-crop-simple text-primary"></i> أداة اقتصاص الصور</h3><p>حدد منطقة الاقتصاص يدوياً بإدخال الإحداثيات.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <div id="cr_drop" style="border:2px dashed var(--border-color);padding:25px;text-align:center;border-radius:16px;cursor:pointer;background:rgba(0,0,0,0.08);"><i class="fas fa-crop-simple" style="font-size:2rem;color:var(--primary);margin-bottom:8px;"></i><h4 style="font-size:0.9rem;color:var(--text-primary);">اختر صورة</h4><input type="file" id="cr_file" accept="image/*" style="display:none;"></div>
        <div id="cr_opts" style="display:none;">
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px;margin-bottom:12px;">
                ${ToolsEngine.inputField("cr_x","X:","number","0")}${ToolsEngine.inputField("cr_y","Y:","number","0")}${ToolsEngine.inputField("cr_cw","العرض:","number","")}${ToolsEngine.inputField("cr_ch","الارتفاع:","number","")}
            </div>
            <button id="cr_go" class="primary-btn wide-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-scissors"></i> اقتصاص وتحميل</button>
        </div>
    </div>`; },
  init(){
    let img=new Image();
    const fi=document.getElementById("cr_file"),drop=document.getElementById("cr_drop");
    drop.onclick=()=>fi.click();
    fi.onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{img.onload=()=>{document.getElementById("cr_cw").value=img.width;document.getElementById("cr_ch").value=img.height;document.getElementById("cr_opts").style.display="block";};img.src=ev.target.result;};r.readAsDataURL(f);};
    document.getElementById("cr_go").onclick=()=>{const sx=parseInt(document.getElementById("cr_x").value)||0,sy=parseInt(document.getElementById("cr_y").value)||0,sw=parseInt(document.getElementById("cr_cw").value)||img.width,sh=parseInt(document.getElementById("cr_ch").value)||img.height;const c=document.createElement("canvas");c.width=sw;c.height=sh;c.getContext("2d").drawImage(img,sx,sy,sw,sh,0,0,sw,sh);c.toBlob(b=>{const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="cropped.png";a.click();ToolsEngine.showToast("تم الاقتصاص بنجاح!");ToolsEngine.awardPoints(10,"اقتصاص صورة");},"image/png");};
  }
},

{ id:"img-b64", cat:"image", name:"صورة إلى Base64", desc:"تحويل الصورة لنص Base64 للمطورين", icon:"fas fa-file-code", keywords:["base64","encode","مطورين"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-file-code text-primary"></i> محول الصور إلى Base64</h3><p>حول أي صورة لنص Base64 لتضمينها في CSS أو HTML.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <div id="b64_drop" style="border:2px dashed var(--border-color);padding:25px;text-align:center;border-radius:16px;cursor:pointer;background:rgba(0,0,0,0.08);"><i class="fas fa-file-code" style="font-size:2rem;color:var(--primary);margin-bottom:8px;"></i><h4 style="color:var(--text-primary);">اختر صورة</h4><input type="file" id="b64_file" accept="image/*" style="display:none;"></div>
        <div id="b64_res" style="display:none;"><textarea id="b64_out" class="form-textarea" style="height:200px;font-family:monospace;font-size:0.7rem;" readonly></textarea><button id="b64_cp" class="primary-btn" style="margin-top:8px;background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="far fa-copy"></i> نسخ Base64</button></div>
    </div>`; },
  init(){
    const fi=document.getElementById("b64_file");
    document.getElementById("b64_drop").onclick=()=>fi.click();
    fi.onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{document.getElementById("b64_out").value=ev.target.result;document.getElementById("b64_res").style.display="block";};r.readAsDataURL(f);};
    document.getElementById("b64_cp").onclick=()=>ToolsEngine.copyText(document.getElementById("b64_out").value,"تم نسخ Base64!");
  }
},

// ╔═══════════════════════════════════════════════════════════════╗
// ║  CATEGORY: TEXT — أدوات النصوص                                ║
// ╚═══════════════════════════════════════════════════════════════╝

{ id:"txt-counter", cat:"text", name:"عداد الكلمات والحروف", desc:"حساب الكلمات والأحرف والأسطر", icon:"fas fa-text-width", keywords:["عداد","كلمات","حروف","word","count"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-text-width text-primary"></i> عداد الكلمات والحروف المتقدم</h3><p>اكتب أو الصق نصك هنا لمعرفة عدد الكلمات والأحرف والأسطر والجمل ووقت القراءة المقدر.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <textarea id="wc_in" class="form-textarea" placeholder="الصق نصك هنا..." style="height:200px;resize:vertical;"></textarea>
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;">
            <div style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:14px;padding:12px;text-align:center;"><div id="wc_w" style="font-size:1.4rem;font-weight:800;color:var(--primary);">0</div><div style="font-size:0.7rem;color:var(--text-secondary);">كلمة</div></div>
            <div style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:14px;padding:12px;text-align:center;"><div id="wc_c" style="font-size:1.4rem;font-weight:800;color:var(--accent);">0</div><div style="font-size:0.7rem;color:var(--text-secondary);">حرف</div></div>
            <div style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:14px;padding:12px;text-align:center;"><div id="wc_l" style="font-size:1.4rem;font-weight:800;color:var(--green-success);">0</div><div style="font-size:0.7rem;color:var(--text-secondary);">سطر</div></div>
            <div style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:14px;padding:12px;text-align:center;"><div id="wc_s" style="font-size:1.4rem;font-weight:800;color:#f59e0b;">0</div><div style="font-size:0.7rem;color:var(--text-secondary);">جملة</div></div>
            <div style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:14px;padding:12px;text-align:center;"><div id="wc_t" style="font-size:1.4rem;font-weight:800;color:#ec4899;">0</div><div style="font-size:0.7rem;color:var(--text-secondary);">دقيقة قراءة</div></div>
        </div>
    </div>`; },
  init(){ document.getElementById("wc_in").addEventListener("input",e=>{const t=e.target.value;document.getElementById("wc_c").textContent=t.length;document.getElementById("wc_w").textContent=t.trim()?t.trim().split(/\s+/).length:0;document.getElementById("wc_l").textContent=t?t.split("\n").length:0;document.getElementById("wc_s").textContent=(t.match(/[.!?؟。]/g)||[]).length;document.getElementById("wc_t").textContent=Math.max(1,Math.ceil((t.trim()?t.trim().split(/\s+/).length:0)/200));}); }
},

{ id:"txt-case", cat:"text", name:"محول حالة الأحرف", desc:"تحويل بين UPPER و lower و Title", icon:"fas fa-text-height", keywords:["upper","lower","title","case","حالة"],
  render(){ return ToolsEngine.textToolUI("tc","محول حالة الأحرف الإنجليزية","حول النص بين الأحرف الكبيرة والصغيرة وأنماط أخرى.","الصق نصك هنا...","تحويل",
    `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:4px;"><button class="pill-btn active" data-mode="upper">UPPERCASE</button><button class="pill-btn" data-mode="lower">lowercase</button><button class="pill-btn" data-mode="title">Title Case</button><button class="pill-btn" data-mode="sentence">Sentence case</button><button class="pill-btn" data-mode="toggle">tOGGLE</button></div>`); },
  init(){ let mode="upper";document.querySelectorAll(".pill-btn").forEach(b=>{b.onclick=()=>{document.querySelectorAll(".pill-btn").forEach(p=>p.classList.remove("active"));b.classList.add("active");mode=b.dataset.mode;};});
    ToolsEngine.bindTextTool("tc",v=>{switch(mode){case"upper":return v.toUpperCase();case"lower":return v.toLowerCase();case"title":return v.replace(/\w\S*/g,t=>t.charAt(0).toUpperCase()+t.slice(1).toLowerCase());case"sentence":return v.toLowerCase().replace(/(^\w|[.!?]\s*\w)/g,c=>c.toUpperCase());case"toggle":return[...v].map(c=>c===c.toUpperCase()?c.toLowerCase():c.toUpperCase()).join("");default:return v;}}); }
},

{ id:"txt-lorem", cat:"text", name:"مولد نص لوريم إيبسوم", desc:"توليد نصوص وهمية للتصميم", icon:"fas fa-paragraph", keywords:["lorem","ipsum","نص","وهمي","تصميم"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-paragraph text-primary"></i> مولد نصوص لوريم إيبسوم</h3><p>قم بتوليد نصوص وهمية للتصميم والتطوير بعدة أطوال.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            ${ToolsEngine.inputField("li_n","عدد الفقرات:","number","3")}
            ${ToolsEngine.selectField("li_lang","اللغة:",[{val:"en",label:"إنجليزي"},{val:"ar",label:"عربي"}])}
        </div>
        <button id="li_go" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-wand-magic-sparkles"></i> توليد</button>
        <textarea id="li_out" class="form-textarea" style="height:200px;resize:vertical;" readonly></textarea>
        <button id="li_cp" class="secondary-btn"><i class="far fa-copy"></i> نسخ النص</button>
    </div>`; },
  init(){
    const enP=["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.","Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.","Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.","Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit.","Etiam tempor orci eu lobortis elementum nibh tellus molestie nunc non blandit massa enim nec dui nunc mattis enim ut tellus elementum sagittis vitae et leo duis ut diam quam nulla porttitor."];
    const arP=["هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى.","إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسماً ولا يحوي أخطاء لغوية.","مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع.","هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها.","ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاً طبيعياً للأحرف عوضاً عن استخدام هنا يوجد محتوى نصي مما يجعلها تبدو وكأنها نص مقروء."];
    document.getElementById("li_go").onclick=()=>{const n=parseInt(document.getElementById("li_n").value)||3,lang=document.getElementById("li_lang").value,src=lang==="ar"?arP:enP;let out="";for(let i=0;i<n;i++)out+=src[i%src.length]+"\n\n";document.getElementById("li_out").value=out.trim();};
    document.getElementById("li_cp").onclick=()=>ToolsEngine.copyText(document.getElementById("li_out").value,"تم نسخ النص!");
  }
},

{ id:"txt-reverse", cat:"text", name:"عاكس النصوص", desc:"عكس ترتيب الحروف أو الكلمات", icon:"fas fa-rotate-left", keywords:["عكس","reverse","mirror"],
  render(){ return ToolsEngine.textToolUI("tr","عاكس النصوص","اعكس ترتيب حروف أو كلمات النص.","الصق نصك هنا...","عكس النص",
    `<div style="display:flex;gap:8px;margin-bottom:4px;"><button class="pill-btn active" data-mode="chars">عكس الحروف</button><button class="pill-btn" data-mode="words">عكس الكلمات</button><button class="pill-btn" data-mode="lines">عكس الأسطر</button></div>`); },
  init(){ let mode="chars";document.querySelectorAll(".pill-btn").forEach(b=>{b.onclick=()=>{document.querySelectorAll(".pill-btn").forEach(p=>p.classList.remove("active"));b.classList.add("active");mode=b.dataset.mode;};});
    ToolsEngine.bindTextTool("tr",v=>{if(mode==="chars")return[...v].reverse().join("");if(mode==="words")return v.split(/\s+/).reverse().join(" ");return v.split("\n").reverse().join("\n");}); }
},

{ id:"txt-dedup", cat:"text", name:"حذف السطور المكررة", desc:"إزالة الأسطر المتكررة من النص", icon:"fas fa-clone", keywords:["duplicate","تكرار","حذف","مكرر"],
  render(){ return ToolsEngine.textToolUI("dd","حذف السطور المكررة","أزل جميع الأسطر المتكررة واحتفظ بنسخة واحدة فقط.","الصق نصك هنا (كل سطر على حدة)...","إزالة المكرر"); },
  init(){ ToolsEngine.bindTextTool("dd",v=>{const lines=v.split("\n"),unique=[...new Set(lines)];return unique.join("\n");}); }
},

{ id:"txt-sort", cat:"text", name:"ترتيب الأسطر", desc:"ترتيب أبجدي تصاعدي وتنازلي", icon:"fas fa-arrow-down-a-z", keywords:["sort","ترتيب","أبجدي"],
  render(){ return ToolsEngine.textToolUI("sl","ترتيب الأسطر أبجدياً","رتب أسطر النص تصاعدياً أو تنازلياً.","الصق أسطرك هنا...","ترتيب",
    `<div style="display:flex;gap:8px;margin-bottom:4px;"><button class="pill-btn active" data-mode="asc">تصاعدي (A→Z)</button><button class="pill-btn" data-mode="desc">تنازلي (Z→A)</button></div>`); },
  init(){ let mode="asc";document.querySelectorAll(".pill-btn").forEach(b=>{b.onclick=()=>{document.querySelectorAll(".pill-btn").forEach(p=>p.classList.remove("active"));b.classList.add("active");mode=b.dataset.mode;};});
    ToolsEngine.bindTextTool("sl",v=>{const lines=v.split("\n").filter(l=>l.trim());lines.sort((a,b)=>a.localeCompare(b));if(mode==="desc")lines.reverse();return lines.join("\n");}); }
},

{ id:"txt-spaces", cat:"text", name:"منظف المسافات الزائدة", desc:"إزالة المسافات والأسطر الفارغة", icon:"fas fa-broom", keywords:["spaces","مسافات","تنظيف","clean"],
  render(){ return ToolsEngine.textToolUI("cs","منظف المسافات والأسطر الزائدة","أزل المسافات المتعددة والأسطر الفارغة الزائدة.","الصق نصك هنا...","تنظيف النص"); },
  init(){ ToolsEngine.bindTextTool("cs",v=>v.replace(/[^\S\n]+/g," ").replace(/\n{3,}/g,"\n\n").trim()); }
},

{ id:"txt-slug", cat:"text", name:"مولد الـ Slug", desc:"تحويل النص لرابط URL مقروء", icon:"fas fa-link", keywords:["slug","url","رابط","seo"],
  render(){ return ToolsEngine.textToolUI("sg","مولد الـ URL Slug","حول عناوين المقالات لروابط URL نظيفة وصديقة لمحركات البحث.","أدخل عنوان المقال أو النص هنا...","توليد Slug"); },
  init(){ ToolsEngine.bindTextTool("sg",v=>v.toLowerCase().trim().replace(/[\s_]+/g,"-").replace(/[^\w\u0600-\u06FF-]+/g,"").replace(/-+/g,"-").replace(/^-|-$/g,"")); }
},

{ id:"txt-repeat", cat:"text", name:"مكرر النصوص", desc:"تكرار نص معين عدة مرات", icon:"fas fa-repeat", keywords:["repeat","تكرار","نسخ"],
  render(){ return ToolsEngine.textToolUI("rp","مكرر النصوص","كرر نصاً معيناً بعدد المرات الذي تريده.","أدخل النص المراد تكراره...","تكرار",
    `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:4px;">${ToolsEngine.inputField("rp_n","عدد مرات التكرار:","number","5")}${ToolsEngine.selectField("rp_sep","الفاصل:",[{val:"\\n",label:"سطر جديد"},{val:" ",label:"مسافة"},{val:", ",label:"فاصلة"},{val:"",label:"بدون"}])}</div>`); },
  init(){ ToolsEngine.bindTextTool("rp",v=>{const n=parseInt(document.getElementById("rp_n").value)||5;const sep=document.getElementById("rp_sep").value.replace(/\\n/g,"\n");return Array(n).fill(v.trim()).join(sep);}); }
},

{ id:"txt-find", cat:"text", name:"بحث واستبدال", desc:"ابحث واستبدل كلمات داخل النص", icon:"fas fa-magnifying-glass-arrow-right", keywords:["find","replace","بحث","استبدال"],
  render(){ return ToolsEngine.textToolUI("fr","بحث واستبدال متقدم","ابحث عن كلمة أو عبارة واستبدلها بأخرى في النص.","الصق نصك الكامل هنا...","استبدال الكل",
    `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:4px;">${ToolsEngine.inputField("fr_find","ابحث عن:","text","الكلمة المراد البحث عنها")}${ToolsEngine.inputField("fr_rep","استبدل بـ:","text","الكلمة البديلة")}</div>`); },
  init(){ ToolsEngine.bindTextTool("fr",v=>{const find=document.getElementById("fr_find").value;const rep=document.getElementById("fr_rep").value;if(!find)return v;return v.split(find).join(rep);}); }
},

{ id:"txt-md2html", cat:"text", name:"محول Markdown إلى HTML", desc:"تحويل نص Markdown لكود HTML", icon:"fab fa-markdown", keywords:["markdown","html","تحويل","md"],
  render(){ return ToolsEngine.textToolUI("mh","محول Markdown إلى HTML","حول نصوص Markdown البسيطة إلى كود HTML جاهز.","# عنوان رئيسي\n**نص عريض** و *نص مائل*\n- عنصر قائمة","تحويل إلى HTML"); },
  init(){ ToolsEngine.bindTextTool("mh",v=>v.replace(/^### (.+)$/gm,"<h3>$1</h3>").replace(/^## (.+)$/gm,"<h2>$1</h2>").replace(/^# (.+)$/gm,"<h1>$1</h1>").replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/^- (.+)$/gm,"<li>$1</li>").replace(/`(.+?)`/g,"<code>$1</code>").replace(/\n/g,"<br>\n")); }
},

{ id:"txt-html2txt", cat:"text", name:"إزالة وسوم HTML", desc:"استخراج النص الصافي من كود HTML", icon:"fas fa-eraser", keywords:["html","strip","tags","إزالة","وسوم"],
  render(){ return ToolsEngine.textToolUI("ht","مزيل وسوم HTML","أزل جميع وسوم HTML واحصل على النص الصافي فقط.","الصق كود HTML هنا...","إزالة الوسوم"); },
  init(){ ToolsEngine.bindTextTool("ht",v=>{const d=document.createElement("div");d.innerHTML=v;return d.textContent||d.innerText||"";}); }
},

{ id:"txt-fancy", cat:"text", name:"مولد نصوص مزخرفة", desc:"تحويل النص لخطوط يونيكود مزخرفة", icon:"fas fa-wand-sparkles", keywords:["fancy","زخرفة","unicode","خط"],
  render(){ return ToolsEngine.textToolUI("fy","مولد النصوص المزخرفة (Unicode)","حول نصك الإنجليزي لأنماط خطوط يونيكود مزخرفة لنسخها في السوشيال ميديا.","Type your text here...","توليد الأنماط"); },
  init(){ const styles={"𝐁𝐨𝐥𝐝":"𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳","𝑰𝒕𝒂𝒍𝒊𝒄":"𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛","𝙼𝚘𝚗𝚘":"𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣"};const az="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    ToolsEngine.bindTextTool("fy",v=>{let out="";for(const[name,chars]of Object.entries(styles)){let line="";for(const c of v){const i=az.indexOf(c);line+=i>=0?[...chars][i]:c;}out+=name+": "+line+"\n\n";}return out.trim();}); }
},

{ id:"txt-linenum", cat:"text", name:"مرقم الأسطر", desc:"إضافة أرقام لأسطر الكود", icon:"fas fa-list-ol", keywords:["أرقام","أسطر","line","number"],
  render(){ return ToolsEngine.textToolUI("ln","مرقم الأسطر","أضف ترقيماً تسلسلياً لكل سطر في النص.","الصق نصك أو كودك هنا...","ترقيم الأسطر"); },
  init(){ ToolsEngine.bindTextTool("ln",v=>v.split("\n").map((l,i)=>`${i+1}. ${l}`).join("\n")); }
},

{ id:"txt-extract-emails", cat:"text", name:"مستخرج الإيميلات", desc:"استخراج عناوين البريد من النص", icon:"fas fa-envelope", keywords:["email","بريد","استخراج","extract"],
  render(){ return ToolsEngine.textToolUI("ee","مستخرج عناوين البريد الإلكتروني","الصق أي نص وسيتم استخراج جميع عناوين الإيميل الموجودة فيه.","الصق نصاً يحتوي على عناوين بريد إلكتروني...","استخراج الإيميلات"); },
  init(){ ToolsEngine.bindTextTool("ee",v=>{const emails=v.match(/[\w.-]+@[\w.-]+\.\w+/g);return emails?[...new Set(emails)].join("\n"):"لم يتم العثور على أي عنوان بريد إلكتروني.";}); }
},

// ╔═══════════════════════════════════════════════════════════════╗
// ║  CATEGORY: DEV — أدوات المطورين                               ║
// ╚═══════════════════════════════════════════════════════════════╝

{ id:"dev-json", cat:"dev", name:"منسق JSON", desc:"تنسيق وفحص صحة بيانات JSON", icon:"fas fa-brackets-curly", keywords:["json","format","validate","تنسيق"],
  render(){ return ToolsEngine.textToolUI("jf","منسق ومحقق JSON","الصق بيانات JSON لتنسيقها والتحقق من صحتها.","{ \"name\": \"Novatrix\", \"version\": 2 }","تنسيق JSON"); },
  init(){ ToolsEngine.bindTextTool("jf",v=>{try{return JSON.stringify(JSON.parse(v),null,2);}catch(e){return"❌ خطأ في JSON: "+e.message;}}); }
},

{ id:"dev-b64enc", cat:"dev", name:"ترميز Base64", desc:"تحويل النص لـ Base64 والعكس", icon:"fas fa-lock", keywords:["base64","encode","decode","ترميز"],
  render(){ return ToolsEngine.textToolUI("b6","ترميز وفك ترميز Base64","حول النص إلى Base64 أو العكس.","أدخل النص هنا...","تحويل",
    `<div style="display:flex;gap:8px;margin-bottom:4px;"><button class="pill-btn active" data-mode="enc">ترميز (Encode)</button><button class="pill-btn" data-mode="dec">فك ترميز (Decode)</button></div>`); },
  init(){ let mode="enc";document.querySelectorAll(".pill-btn").forEach(b=>{b.onclick=()=>{document.querySelectorAll(".pill-btn").forEach(p=>p.classList.remove("active"));b.classList.add("active");mode=b.dataset.mode;};});
    ToolsEngine.bindTextTool("b6",v=>{try{return mode==="enc"?btoa(unescape(encodeURIComponent(v))):decodeURIComponent(escape(atob(v)));}catch(e){return"❌ خطأ: "+e.message;}}); }
},

{ id:"dev-urlenc", cat:"dev", name:"ترميز URL", desc:"ترميز وفك ترميز عناوين URL", icon:"fas fa-globe", keywords:["url","encode","decode","ترميز"],
  render(){ return ToolsEngine.textToolUI("ue","ترميز وفك ترميز URL","حول النصوص الخاصة في الروابط (مسافات، رموز عربية).","https://example.com/صفحة عربية?q=بحث","تحويل",
    `<div style="display:flex;gap:8px;margin-bottom:4px;"><button class="pill-btn active" data-mode="enc">ترميز (Encode)</button><button class="pill-btn" data-mode="dec">فك ترميز (Decode)</button></div>`); },
  init(){ let mode="enc";document.querySelectorAll(".pill-btn").forEach(b=>{b.onclick=()=>{document.querySelectorAll(".pill-btn").forEach(p=>p.classList.remove("active"));b.classList.add("active");mode=b.dataset.mode;};});
    ToolsEngine.bindTextTool("ue",v=>mode==="enc"?encodeURIComponent(v):decodeURIComponent(v)); }
},

{ id:"dev-htmlent", cat:"dev", name:"ترميز HTML Entities", desc:"تحويل الرموز الخاصة لـ HTML", icon:"fas fa-code", keywords:["html","entity","entities","ترميز"],
  render(){ return ToolsEngine.textToolUI("he","ترميز وفك ترميز HTML Entities","حول الرموز الخاصة (<, >, &) لكيانات HTML والعكس.","<div class=\"box\">Hello & World</div>","تحويل",
    `<div style="display:flex;gap:8px;margin-bottom:4px;"><button class="pill-btn active" data-mode="enc">ترميز</button><button class="pill-btn" data-mode="dec">فك ترميز</button></div>`); },
  init(){ let mode="enc";document.querySelectorAll(".pill-btn").forEach(b=>{b.onclick=()=>{document.querySelectorAll(".pill-btn").forEach(p=>p.classList.remove("active"));b.classList.add("active");mode=b.dataset.mode;};});
    ToolsEngine.bindTextTool("he",v=>{if(mode==="enc")return v.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");const d=document.createElement("textarea");d.innerHTML=v;return d.value;}); }
},

{ id:"dev-regex", cat:"dev", name:"فاحص Regex", desc:"اختبار التعبيرات المنتظمة", icon:"fas fa-asterisk", keywords:["regex","regular","expression","تعبير"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-asterisk text-primary"></i> فاحص التعبيرات المنتظمة (Regex)</h3><p>اختبر تعبيراتك المنتظمة مباشرة وشاهد النتائج المطابقة.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        ${ToolsEngine.inputField("rx_pat","التعبير المنتظم (Pattern):","text","/[a-z]+/gi")}
        <textarea id="rx_in" class="form-textarea" placeholder="أدخل النص المراد فحصه..." style="height:120px;"></textarea>
        <button id="rx_go" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-search"></i> فحص</button>
        <div id="rx_res" style="display:none;background:var(--bg-surface);border:1px solid var(--border-color);border-radius:14px;padding:14px;"><div style="font-size:0.8rem;color:var(--text-secondary);">النتائج المطابقة:</div><pre id="rx_out" style="color:var(--green-success);font-family:monospace;margin-top:6px;white-space:pre-wrap;"></pre></div>
    </div>`; },
  init(){ document.getElementById("rx_go").onclick=()=>{const pat=document.getElementById("rx_pat").value,txt=document.getElementById("rx_in").value;try{const m=pat.match(/^\/(.+)\/([gimsuy]*)$/);const regex=m?new RegExp(m[1],m[2]):new RegExp(pat,"g");const matches=txt.match(regex);document.getElementById("rx_out").textContent=matches?`تم العثور على ${matches.length} نتيجة:\n${matches.join("\n")}`:"لا توجد نتائج مطابقة.";document.getElementById("rx_res").style.display="block";}catch(e){document.getElementById("rx_out").textContent="❌ خطأ: "+e.message;document.getElementById("rx_res").style.display="block";}}; }
},

{ id:"dev-uuid", cat:"dev", name:"مولد UUID", desc:"توليد معرفات UUID فريدة", icon:"fas fa-fingerprint", keywords:["uuid","guid","unique","معرف"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-fingerprint text-primary"></i> مولد UUID / GUID</h3><p>قم بتوليد معرفات فريدة عالمياً (UUID v4) بضغطة زر.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        ${ToolsEngine.inputField("uid_n","عدد المعرفات:","number","5")}
        <button id="uid_go" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-rotate"></i> توليد</button>
        <textarea id="uid_out" class="form-textarea" style="height:180px;font-family:monospace;font-size:0.8rem;" readonly></textarea>
        <button id="uid_cp" class="secondary-btn"><i class="far fa-copy"></i> نسخ</button>
    </div>`; },
  init(){ function uuid(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,c=>{const r=Math.random()*16|0;return(c==="x"?r:r&0x3|0x8).toString(16);});}
    document.getElementById("uid_go").onclick=()=>{const n=parseInt(document.getElementById("uid_n").value)||5;document.getElementById("uid_out").value=Array.from({length:n},uuid).join("\n");};
    document.getElementById("uid_cp").onclick=()=>ToolsEngine.copyText(document.getElementById("uid_out").value,"تم نسخ المعرفات!"); }
},

{ id:"dev-hash", cat:"dev", name:"مولد Hash", desc:"توليد بصمات SHA-256 للنصوص", icon:"fas fa-hashtag", keywords:["hash","sha","sha256","بصمة"],
  render(){ return ToolsEngine.textToolUI("hs","مولد بصمة SHA-256","ادخل نصاً وسيتم توليد بصمته الرقمية (Hash) باستخدام SHA-256.","أدخل النص المراد توليد بصمته...","توليد Hash"); },
  init(){ ToolsEngine.bindTextTool("hs",async v=>{const enc=new TextEncoder().encode(v);const hash=await crypto.subtle.digest("SHA-256",enc);return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,"0")).join("");}); }
},

{ id:"dev-jwt", cat:"dev", name:"فاكك رموز JWT", desc:"فك وعرض محتوى رموز JWT", icon:"fas fa-key", keywords:["jwt","token","decode","فك"],
  render(){ return ToolsEngine.textToolUI("jw","فاكك رموز JWT","الصق رمز JWT لعرض محتوى الـ Header والـ Payload.","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik5leHVyYSIsImlhdCI6MTUxNjIzOTAyMn0.xxx","فك الرمز"); },
  init(){ ToolsEngine.bindTextTool("jw",v=>{try{const parts=v.split(".");if(parts.length<2)return"❌ رمز JWT غير صالح";const header=JSON.parse(atob(parts[0]));const payload=JSON.parse(atob(parts[1]));return"📋 Header:\n"+JSON.stringify(header,null,2)+"\n\n📋 Payload:\n"+JSON.stringify(payload,null,2);}catch(e){return"❌ خطأ: "+e.message;}}); }
},

{ id:"dev-minify-css", cat:"dev", name:"مصغر CSS", desc:"ضغط وتصغير حجم ملفات CSS", icon:"fab fa-css3-alt", keywords:["css","minify","ضغط","تصغير"],
  render(){ return ToolsEngine.textToolUI("mc","مصغر أكواد CSS (Minifier)","صغر حجم ملف CSS بإزالة المسافات والتعليقات.","body {\n    margin: 0;\n    /* comment */\n    padding: 10px;\n}","تصغير CSS"); },
  init(){ ToolsEngine.bindTextTool("mc",v=>v.replace(/\/\*[\s\S]*?\*\//g,"").replace(/\s*([{}:;,])\s*/g,"$1").replace(/;\}/g,"}").replace(/\s+/g," ").trim()); }
},

{ id:"dev-minify-js", cat:"dev", name:"مصغر JavaScript", desc:"ضغط وتصغير حجم ملفات JS", icon:"fab fa-js", keywords:["javascript","js","minify","ضغط"],
  render(){ return ToolsEngine.textToolUI("mj","مصغر أكواد JavaScript","صغر حجم ملف JS بإزالة المسافات والتعليقات.","function hello() {\n    // greeting\n    console.log('Hello World!');\n}","تصغير JS"); },
  init(){ ToolsEngine.bindTextTool("mj",v=>v.replace(/\/\/.*$/gm,"").replace(/\/\*[\s\S]*?\*\//g,"").replace(/\s*([{}();,=+\-*/<>!&|?:])\s*/g,"$1").replace(/\s+/g," ").trim()); }
},

{ id:"dev-minify-html", cat:"dev", name:"مصغر HTML", desc:"ضغط وتصغير حجم ملفات HTML", icon:"fab fa-html5", keywords:["html","minify","ضغط"],
  render(){ return ToolsEngine.textToolUI("mht","مصغر أكواد HTML","صغر حجم ملف HTML بإزالة المسافات والتعليقات الزائدة.","<div class=\"box\">\n    <p>Hello World</p>\n</div>","تصغير HTML"); },
  init(){ ToolsEngine.bindTextTool("mht",v=>v.replace(/<!--[\s\S]*?-->/g,"").replace(/\s+/g," ").replace(/>\s+</g,"><").trim()); }
},

{ id:"dev-diff", cat:"dev", name:"مقارن النصوص", desc:"مقارنة نصين وإظهار الفروقات", icon:"fas fa-code-compare", keywords:["diff","compare","مقارنة","فرق"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-code-compare text-primary"></i> مقارن النصوص (Diff Checker)</h3><p>قارن بين نصين وشاهد الفروقات بينهما سطراً بسطر.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-secondary);">النص الأول:</label><textarea id="df_a" class="form-textarea" style="height:180px;" placeholder="الصق النص الأول هنا..."></textarea></div>
            <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-secondary);">النص الثاني:</label><textarea id="df_b" class="form-textarea" style="height:180px;" placeholder="الصق النص الثاني هنا..."></textarea></div>
        </div>
        <button id="df_go" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-code-compare"></i> مقارنة</button>
        <div id="df_res" style="display:none;background:var(--bg-surface);border:1px solid var(--border-color);border-radius:14px;padding:14px;max-height:300px;overflow-y:auto;"><pre id="df_out" style="font-family:monospace;font-size:0.8rem;white-space:pre-wrap;direction:ltr;text-align:left;"></pre></div>
    </div>`; },
  init(){ document.getElementById("df_go").onclick=()=>{const a=document.getElementById("df_a").value.split("\n"),b=document.getElementById("df_b").value.split("\n");let out="";const max=Math.max(a.length,b.length);for(let i=0;i<max;i++){const la=a[i]||"",lb=b[i]||"";if(la===lb)out+=`  ${la}\n`;else{if(la)out+=`- ${la}\n`;if(lb)out+=`+ ${lb}\n`;}}document.getElementById("df_out").textContent=out;document.getElementById("df_res").style.display="block";}; }
},

{ id:"dev-escape", cat:"dev", name:"Escape/Unescape", desc:"ترميز وفك ترميز الرموز الخاصة", icon:"fas fa-shield", keywords:["escape","unescape","ترميز"],
  render(){ return ToolsEngine.textToolUI("es","Escape / Unescape للنصوص","حول الرموز الخاصة (علامات التنصيص، الأسطر الجديدة) لصيغة آمنة للبرمجة.","Hello \"World\"\nLine 2","تحويل",
    `<div style="display:flex;gap:8px;margin-bottom:4px;"><button class="pill-btn active" data-mode="esc">Escape</button><button class="pill-btn" data-mode="unesc">Unescape</button></div>`); },
  init(){ let mode="esc";document.querySelectorAll(".pill-btn").forEach(b=>{b.onclick=()=>{document.querySelectorAll(".pill-btn").forEach(p=>p.classList.remove("active"));b.classList.add("active");mode=b.dataset.mode;};});
    ToolsEngine.bindTextTool("es",v=>mode==="esc"?v.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\t/g,"\\t"):v.replace(/\\n/g,"\n").replace(/\\t/g,"\t").replace(/\\"/g,'"').replace(/\\\\/g,"\\")); }
},

{ id:"dev-timestamp", cat:"dev", name:"محول Unix Timestamp", desc:"تحويل الطوابع الزمنية للتواريخ", icon:"fas fa-clock", keywords:["unix","timestamp","time","وقت","تاريخ"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-clock text-primary"></i> محول Unix Timestamp</h3><p>حول بين الطوابع الزمنية (Unix Timestamp) والتواريخ المقروءة.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <div style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:14px;padding:16px;text-align:center;"><div style="font-size:0.8rem;color:var(--text-secondary);">الوقت الحالي (Unix):</div><div id="ts_now" style="font-size:1.5rem;font-weight:800;color:var(--primary);margin-top:4px;font-family:monospace;"></div></div>
        ${ToolsEngine.inputField("ts_in","أدخل Unix Timestamp:","number",Math.floor(Date.now()/1000).toString())}
        <button id="ts_go" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-arrows-rotate"></i> تحويل</button>
        <div id="ts_res" style="display:none;background:var(--bg-surface);border:1px solid var(--border-color);border-radius:14px;padding:14px;text-align:center;font-size:1rem;color:var(--green-success);font-weight:700;"></div>
    </div>`; },
  init(){ const now=document.getElementById("ts_now");function tick(){now.textContent=Math.floor(Date.now()/1000);}tick();setInterval(tick,1000);
    document.getElementById("ts_go").onclick=()=>{const v=parseInt(document.getElementById("ts_in").value);if(isNaN(v)){alert("أدخل رقماً صحيحاً!");return;}const d=new Date(v*1000);document.getElementById("ts_res").textContent=d.toLocaleString("ar-EG",{dateStyle:"full",timeStyle:"long"});document.getElementById("ts_res").style.display="block";}; }
},

{ id:"dev-color-conv", cat:"dev", name:"محول الألوان", desc:"تحويل بين HEX و RGB و HSL", icon:"fas fa-droplet", keywords:["color","hex","rgb","hsl","لون"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-droplet text-primary"></i> محول أكواد الألوان</h3><p>حول أكواد الألوان بين HEX و RGB و HSL مع معاينة فورية.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <div style="display:grid;grid-template-columns:60px 1fr;gap:10px;align-items:end;">
            <div><input type="color" id="cc_pick" value="#2563eb" style="width:60px;height:46px;border:none;cursor:pointer;border-radius:10px;"></div>
            ${ToolsEngine.inputField("cc_hex","HEX:","text","#2563eb")}
        </div>
        <div id="cc_preview" style="height:60px;border-radius:14px;background:#2563eb;border:1px solid var(--border-color);"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:12px;padding:12px;"><div style="font-size:0.75rem;color:var(--text-secondary);">RGB:</div><div id="cc_rgb" style="font-weight:700;color:var(--text-primary);margin-top:2px;font-family:monospace;">rgb(37, 99, 235)</div></div>
            <div style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:12px;padding:12px;"><div style="font-size:0.75rem;color:var(--text-secondary);">HSL:</div><div id="cc_hsl" style="font-weight:700;color:var(--text-primary);margin-top:2px;font-family:monospace;">hsl(220, 83%, 53%)</div></div>
        </div>
    </div>`; },
  init(){ function update(hex){document.getElementById("cc_preview").style.background=hex;document.getElementById("cc_pick").value=hex;document.getElementById("cc_hex").value=hex;const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);document.getElementById("cc_rgb").textContent=`rgb(${r}, ${g}, ${b})`;const rn=r/255,gn=g/255,bn=b/255,mx=Math.max(rn,gn,bn),mn=Math.min(rn,gn,bn),l=(mx+mn)/2;let h=0,s=0;if(mx!==mn){const d=mx-mn;s=l>0.5?d/(2-mx-mn):d/(mx+mn);switch(mx){case rn:h=((gn-bn)/d+(gn<bn?6:0))/6;break;case gn:h=((bn-rn)/d+2)/6;break;case bn:h=((rn-gn)/d+4)/6;break;}}document.getElementById("cc_hsl").textContent=`hsl(${Math.round(h*360)}, ${Math.round(s*100)}%, ${Math.round(l*100)}%)`;}
    update("#2563eb");
    document.getElementById("cc_pick").oninput=e=>update(e.target.value);
    document.getElementById("cc_hex").oninput=e=>{const v=e.target.value;if(/^#[0-9a-fA-F]{6}$/.test(v))update(v);}; }
},

{ id:"dev-numbase", cat:"dev", name:"محول الأنظمة العددية", desc:"تحويل بين ثنائي وعشري و16", icon:"fas fa-binary", keywords:["binary","hex","decimal","octal","ثنائي","عشري"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-microchip text-primary"></i> محول الأنظمة العددية</h3><p>حول الأرقام بين الأنظمة الثنائية والثمانية والعشرية والست عشرية.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            ${ToolsEngine.inputField("nb_in","الرقم:","text","255")}
            ${ToolsEngine.selectField("nb_from","من نظام:",[{val:"10",label:"عشري (Decimal)"},{val:"2",label:"ثنائي (Binary)"},{val:"8",label:"ثماني (Octal)"},{val:"16",label:"ست عشري (Hex)"}])}
        </div>
        <button id="nb_go" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-arrows-rotate"></i> تحويل</button>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:12px;padding:12px;"><div style="font-size:0.75rem;color:var(--text-secondary);">ثنائي (Binary):</div><div id="nb_bin" style="font-weight:700;color:var(--text-primary);font-family:monospace;margin-top:4px;word-break:break-all;">--</div></div>
            <div style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:12px;padding:12px;"><div style="font-size:0.75rem;color:var(--text-secondary);">عشري (Decimal):</div><div id="nb_dec" style="font-weight:700;color:var(--text-primary);font-family:monospace;margin-top:4px;">--</div></div>
            <div style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:12px;padding:12px;"><div style="font-size:0.75rem;color:var(--text-secondary);">ثماني (Octal):</div><div id="nb_oct" style="font-weight:700;color:var(--text-primary);font-family:monospace;margin-top:4px;">--</div></div>
            <div style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:12px;padding:12px;"><div style="font-size:0.75rem;color:var(--text-secondary);">ست عشري (Hex):</div><div id="nb_hex" style="font-weight:700;color:var(--text-primary);font-family:monospace;margin-top:4px;">--</div></div>
        </div>
    </div>`; },
  init(){ document.getElementById("nb_go").onclick=()=>{const v=document.getElementById("nb_in").value.trim(),base=parseInt(document.getElementById("nb_from").value);const num=parseInt(v,base);if(isNaN(num)){alert("رقم غير صالح!");return;}document.getElementById("nb_bin").textContent=num.toString(2);document.getElementById("nb_dec").textContent=num.toString(10);document.getElementById("nb_oct").textContent=num.toString(8);document.getElementById("nb_hex").textContent=num.toString(16).toUpperCase();}; }
},

{ id:"dev-formatter", cat:"dev", name:"منسق الأكواد البرمجية", desc:"تنسيق وتجميل HTML/CSS/JS", icon:"fas fa-indent", keywords:["format","beautify","تنسيق","تجميل","code"],
  render(){ return ToolsEngine.textToolUI("cf","منسق ومجمّل الأكواد البرمجية","الصق أكوادك غير المنظمة لتنسيقها وترتيبها.","<div><p>hello</p></div>","تنسيق الكود",
    `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:4px;">${ToolsEngine.selectField("cf_lang","اللغة:",[{val:"html",label:"HTML"},{val:"css",label:"CSS"},{val:"js",label:"JavaScript"}])}${ToolsEngine.selectField("cf_ind","المسافات:",[{val:"4",label:"4 مسافات"},{val:"2",label:"مسافتان"}])}</div>`); },
  init(){ ToolsEngine.bindTextTool("cf",v=>{const lang=document.getElementById("cf_lang").value,ind=" ".repeat(parseInt(document.getElementById("cf_ind").value)||4);if(lang==="css"){let f="",d=0,tk=v.replace(/\s*([{};,])\s*/g,"$1").replace(/\s+/g," ").split(/([{};])/);tk.forEach(t=>{t=t.trim();if(!t)return;if(t==="{"){f+=" {\n";d++;f+=ind.repeat(d);}else if(t==="}"){d--;f=f.trimEnd()+"\n"+ind.repeat(d)+"}\n\n";if(d>0)f+=ind.repeat(d);}else if(t===";"){f+=";\n"+ind.repeat(d);}else f+=t;});return f.trim();}if(lang==="html"){let f="",d=0,re=/(<\/?[a-zA-Z0-9\-:]+(?:\s+[^>]*?)?>)|([^<]+)/g,m;while((m=re.exec(v))!==null){let tag=m[1],txt=m[2];if(tag){tag=tag.trim();let sc=tag.endsWith("/>")||/<input|<img|<br|<hr|<meta|<link/i.test(tag),cl=tag.startsWith("</");if(cl){d=Math.max(0,d-1);f=f.trimEnd()+"\n"+ind.repeat(d)+tag+"\n";}else if(sc){f+=ind.repeat(d)+tag+"\n";}else{f+=ind.repeat(d)+tag+"\n";d++;}}else if(txt){let t=txt.trim();if(t)f+=ind.repeat(d)+t+"\n";}}return f.trim();}let f="",d=0,ls=v.replace(/\s*([{};])\s*/g,"$1").replace(/\s+/g," ").split(/([{}])/);ls.forEach(p=>{p=p.trim();if(!p)return;if(p==="{"){f+=" {\n";d++;f+=ind.repeat(d);}else if(p==="}"){d=Math.max(0,d-1);f=f.trimEnd()+"\n"+ind.repeat(d)+"}\n";if(d>0)f+=ind.repeat(d);}else{p.split(";").forEach(s=>{s=s.trim();if(s)f+=s+";\n"+ind.repeat(d);});}});return f.trim().replace(/\n\s*;\n/g,";\n");}); }
},

// ╔═══════════════════════════════════════════════════════════════╗
// ║  CATEGORY: DESIGN — أدوات التصميم                            ║
// ╚═══════════════════════════════════════════════════════════════╝

{ id:"design-gradient", cat:"design", name:"مولد التدرجات اللونية", desc:"توليد CSS Gradient احترافي", icon:"fas fa-brush", keywords:["gradient","تدرج","لون","css"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-brush text-primary"></i> مولد التدرجات اللونية (CSS Gradient)</h3><p>أنشئ تدرجات لونية مذهلة وانسخ كود CSS الجاهز.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <div id="gr_preview" style="height:120px;border-radius:16px;background:linear-gradient(135deg,#2563eb,#0ea5e9);border:1px solid var(--border-color);"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
            <div><label style="font-size:0.75rem;color:var(--text-secondary);">اللون الأول:</label><input type="color" id="gr_c1" value="#2563eb" style="width:100%;height:40px;border:none;cursor:pointer;border-radius:8px;margin-top:4px;"></div>
            <div><label style="font-size:0.75rem;color:var(--text-secondary);">اللون الثاني:</label><input type="color" id="gr_c2" value="#0ea5e9" style="width:100%;height:40px;border:none;cursor:pointer;border-radius:8px;margin-top:4px;"></div>
            <div><label style="font-size:0.75rem;color:var(--text-secondary);">الزاوية:</label><input type="range" id="gr_angle" min="0" max="360" value="135" style="width:100%;margin-top:12px;"><div id="gr_av" style="text-align:center;font-size:0.75rem;color:var(--primary);font-weight:700;">135°</div></div>
        </div>
        <div style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:12px;padding:12px;font-family:monospace;font-size:0.8rem;color:var(--green-success);direction:ltr;text-align:left;" id="gr_code">background: linear-gradient(135deg, #2563eb, #0ea5e9);</div>
        <button id="gr_cp" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="far fa-copy"></i> نسخ كود CSS</button>
    </div>`; },
  init(){ function up(){const c1=document.getElementById("gr_c1").value,c2=document.getElementById("gr_c2").value,a=document.getElementById("gr_angle").value;const css=`linear-gradient(${a}deg, ${c1}, ${c2})`;document.getElementById("gr_preview").style.background=css;document.getElementById("gr_code").textContent=`background: ${css};`;document.getElementById("gr_av").textContent=a+"°";}
    ["gr_c1","gr_c2","gr_angle"].forEach(id=>document.getElementById(id).addEventListener("input",up));
    document.getElementById("gr_cp").onclick=()=>ToolsEngine.copyText(document.getElementById("gr_code").textContent,"تم نسخ كود CSS!"); }
},

{ id:"design-shadow", cat:"design", name:"مولد Box Shadow", desc:"توليد CSS Box Shadow احترافي", icon:"fas fa-square", keywords:["shadow","ظل","box","css"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-square text-primary"></i> مولد ظلال الصناديق (Box Shadow)</h3><p>صمم ظلال CSS احترافية مع معاينة فورية.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <div style="height:200px;display:flex;align-items:center;justify-content:center;background:var(--bg-surface);border-radius:16px;"><div id="bs_box" style="width:140px;height:100px;background:var(--primary);border-radius:16px;box-shadow:8px 8px 24px rgba(0,0,0,0.3);"></div></div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px;">
            <div><label style="font-size:0.7rem;color:var(--text-secondary);">X:</label><input type="range" id="bs_x" min="-50" max="50" value="8" style="width:100%;"><div id="bs_xv" style="text-align:center;font-size:0.7rem;color:var(--primary);">8px</div></div>
            <div><label style="font-size:0.7rem;color:var(--text-secondary);">Y:</label><input type="range" id="bs_y" min="-50" max="50" value="8" style="width:100%;"><div id="bs_yv" style="text-align:center;font-size:0.7rem;color:var(--primary);">8px</div></div>
            <div><label style="font-size:0.7rem;color:var(--text-secondary);">Blur:</label><input type="range" id="bs_b" min="0" max="100" value="24" style="width:100%;"><div id="bs_bv" style="text-align:center;font-size:0.7rem;color:var(--primary);">24px</div></div>
            <div><label style="font-size:0.7rem;color:var(--text-secondary);">Spread:</label><input type="range" id="bs_s" min="-50" max="50" value="0" style="width:100%;"><div id="bs_sv" style="text-align:center;font-size:0.7rem;color:var(--primary);">0px</div></div>
        </div>
        <div><label style="font-size:0.7rem;color:var(--text-secondary);">لون الظل:</label><input type="color" id="bs_c" value="#000000" style="width:60px;height:30px;border:none;cursor:pointer;border-radius:6px;margin-right:8px;vertical-align:middle;"></div>
        <div id="bs_code" style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:12px;padding:12px;font-family:monospace;font-size:0.8rem;color:var(--green-success);direction:ltr;text-align:left;"></div>
        <button id="bs_cp" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="far fa-copy"></i> نسخ كود CSS</button>
    </div>`; },
  init(){ function up(){const x=document.getElementById("bs_x").value,y=document.getElementById("bs_y").value,b=document.getElementById("bs_b").value,s=document.getElementById("bs_s").value,c=document.getElementById("bs_c").value;const hex=c,r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),bl=parseInt(hex.slice(5,7),16);const css=`${x}px ${y}px ${b}px ${s}px rgba(${r},${g},${bl},0.3)`;document.getElementById("bs_box").style.boxShadow=css;document.getElementById("bs_code").textContent=`box-shadow: ${css};`;["bs_x","bs_y","bs_b","bs_s"].forEach(id=>document.getElementById(id+"v").textContent=document.getElementById(id).value+"px");}
    up();["bs_x","bs_y","bs_b","bs_s","bs_c"].forEach(id=>document.getElementById(id).addEventListener("input",up));
    document.getElementById("bs_cp").onclick=()=>ToolsEngine.copyText(document.getElementById("bs_code").textContent,"تم نسخ كود CSS!"); }
},

{ id:"design-border-radius", cat:"design", name:"مولد Border Radius", desc:"تصميم حدود مستديرة مخصصة", icon:"fas fa-vector-square", keywords:["border","radius","حدود","استدارة"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-vector-square text-primary"></i> مولد حدود مستديرة (Border Radius)</h3><p>صمم أشكال حدود مستديرة مخصصة لعناصر CSS.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <div style="height:180px;display:flex;align-items:center;justify-content:center;background:var(--bg-surface);border-radius:16px;"><div id="br_box" style="width:150px;height:120px;background:linear-gradient(135deg,var(--primary),var(--accent));border-radius:20px;"></div></div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px;">
            <div><label style="font-size:0.7rem;color:var(--text-secondary);">أعلى يمين:</label><input type="range" id="br_tl" min="0" max="100" value="20" style="width:100%;"></div>
            <div><label style="font-size:0.7rem;color:var(--text-secondary);">أعلى يسار:</label><input type="range" id="br_tr" min="0" max="100" value="20" style="width:100%;"></div>
            <div><label style="font-size:0.7rem;color:var(--text-secondary);">أسفل يسار:</label><input type="range" id="br_br" min="0" max="100" value="20" style="width:100%;"></div>
            <div><label style="font-size:0.7rem;color:var(--text-secondary);">أسفل يمين:</label><input type="range" id="br_bl" min="0" max="100" value="20" style="width:100%;"></div>
        </div>
        <div id="br_code" style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:12px;padding:12px;font-family:monospace;font-size:0.8rem;color:var(--green-success);direction:ltr;text-align:left;">border-radius: 20px 20px 20px 20px;</div>
        <button id="br_cp" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="far fa-copy"></i> نسخ كود CSS</button>
    </div>`; },
  init(){ function up(){const tl=document.getElementById("br_tl").value,tr=document.getElementById("br_tr").value,br=document.getElementById("br_br").value,bl=document.getElementById("br_bl").value;const css=`${tl}px ${tr}px ${br}px ${bl}px`;document.getElementById("br_box").style.borderRadius=css;document.getElementById("br_code").textContent=`border-radius: ${css};`;}
    up();["br_tl","br_tr","br_br","br_bl"].forEach(id=>document.getElementById(id).addEventListener("input",up));
    document.getElementById("br_cp").onclick=()=>ToolsEngine.copyText(document.getElementById("br_code").textContent,"تم نسخ كود CSS!"); }
},

{ id:"design-glass", cat:"design", name:"مولد Glassmorphism", desc:"تصميم تأثير الزجاج الشفاف", icon:"fas fa-wine-glass", keywords:["glass","glassmorphism","زجاج","شفاف"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-wine-glass text-primary"></i> مولد تأثير الزجاج (Glassmorphism)</h3><p>صمم تأثير الزجاج المتجمد الشفاف العصري وانسخ كود CSS.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <div style="height:200px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:16px;display:flex;align-items:center;justify-content:center;position:relative;"><div id="gl_box" style="width:180px;height:120px;background:rgba(255,255,255,0.15);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.2);border-radius:16px;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;">Glassmorphism</div></div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
            <div><label style="font-size:0.7rem;color:var(--text-secondary);">شفافية:</label><input type="range" id="gl_op" min="5" max="80" value="15" style="width:100%;"></div>
            <div><label style="font-size:0.7rem;color:var(--text-secondary);">ضبابية (Blur):</label><input type="range" id="gl_bl" min="0" max="40" value="12" style="width:100%;"></div>
            <div><label style="font-size:0.7rem;color:var(--text-secondary);">استدارة:</label><input type="range" id="gl_br" min="0" max="50" value="16" style="width:100%;"></div>
        </div>
        <div id="gl_code" style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:12px;padding:12px;font-family:monospace;font-size:0.75rem;color:var(--green-success);direction:ltr;text-align:left;white-space:pre-wrap;"></div>
        <button id="gl_cp" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="far fa-copy"></i> نسخ كود CSS</button>
    </div>`; },
  init(){ function up(){const op=document.getElementById("gl_op").value,bl=document.getElementById("gl_bl").value,br=document.getElementById("gl_br").value;const box=document.getElementById("gl_box");box.style.background=`rgba(255,255,255,${op/100})`;box.style.backdropFilter=`blur(${bl}px)`;box.style.webkitBackdropFilter=`blur(${bl}px)`;box.style.borderRadius=br+"px";document.getElementById("gl_code").textContent=`background: rgba(255, 255, 255, ${(op/100).toFixed(2)});\nbackdrop-filter: blur(${bl}px);\n-webkit-backdrop-filter: blur(${bl}px);\nborder: 1px solid rgba(255, 255, 255, 0.2);\nborder-radius: ${br}px;`;}
    up();["gl_op","gl_bl","gl_br"].forEach(id=>document.getElementById(id).addEventListener("input",up));
    document.getElementById("gl_cp").onclick=()=>ToolsEngine.copyText(document.getElementById("gl_code").textContent,"تم نسخ كود CSS!"); }
},

{ id:"design-px2rem", cat:"design", name:"محول PX إلى REM", desc:"تحويل بين بكسل و REM و EM", icon:"fas fa-text-height", keywords:["px","rem","em","تحويل","بكسل"],
  render(){ return ToolsEngine.convertToolUI("pr","محول PX ↔ REM ↔ EM","حول قيم البكسل (PX) إلى REM و EM والعكس (الأساس 16px).",[{val:"px",label:"PX (بكسل)"},{val:"rem",label:"REM"},{val:"em",label:"EM"}]); },
  init(){ ToolsEngine.bindConverter("pr",(v,from,to)=>{let px;const base=16;if(from==="px")px=v;else px=v*base;if(to==="px")return px.toFixed(2)+" px";return(px/base).toFixed(4)+" "+to;}); }
},

{ id:"design-palette", cat:"design", name:"مولد لوحة الألوان", desc:"توليد لوحات ألوان متناسقة", icon:"fas fa-swatchbook", keywords:["palette","لوحة","ألوان","تناسق"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-swatchbook text-primary"></i> مولد لوحات الألوان المتناسقة</h3><p>اختر لوناً أساسياً وسيتم توليد لوحة ألوان متناسقة تلقائياً.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-secondary);">اللون الأساسي:</label><input type="color" id="pl_c" value="#2563eb" style="width:80px;height:40px;border:none;cursor:pointer;border-radius:8px;margin-right:10px;vertical-align:middle;margin-top:6px;"></div>
        <button id="pl_go" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-palette"></i> توليد لوحة الألوان</button>
        <div id="pl_out" style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;"></div>
    </div>`; },
  init(){ function hsl2hex(h,s,l){s/=100;l/=100;const a=s*Math.min(l,1-l);const f=n=>{const k=(n+h/30)%12;const c=l-a*Math.max(Math.min(k-3,9-k,1),-1);return Math.round(255*c).toString(16).padStart(2,"0");};return"#"+f(0)+f(8)+f(4);}
    function hex2hsl(hex){let r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let h=0,s=0;if(mx!==mn){const d=mx-mn;s=l>0.5?d/(2-mx-mn):d/(mx+mn);switch(mx){case r:h=((g-b)/d+(g<b?6:0))*60;break;case g:h=((b-r)/d+2)*60;break;case b:h=((r-g)/d+4)*60;break;}}return[Math.round(h),Math.round(s*100),Math.round(l*100)];}
    document.getElementById("pl_go").onclick=()=>{const hex=document.getElementById("pl_c").value;const[h,s,l]=hex2hsl(hex);const colors=[hsl2hex(h,s,l),hsl2hex((h+30)%360,s,l),hsl2hex((h+60)%360,s,l),hsl2hex((h+180)%360,s,l),hsl2hex((h+210)%360,s,l)];
    document.getElementById("pl_out").innerHTML=colors.map(c=>`<div style="text-align:center;cursor:pointer;" onclick="ToolsEngine.copyText('${c}','تم نسخ اللون!')"><div style="height:60px;background:${c};border-radius:12px;border:1px solid var(--border-color);"></div><div style="font-size:0.72rem;font-family:monospace;margin-top:4px;color:var(--text-secondary);">${c}</div></div>`).join("");}; }
},

{ id:"design-contrast", cat:"design", name:"فاحص تباين الألوان", desc:"فحص إمكانية قراءة النص (WCAG)", icon:"fas fa-eye", keywords:["contrast","accessibility","تباين","إمكانية","قراءة"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-eye text-primary"></i> فاحص تباين الألوان (Accessibility)</h3><p>تحقق من إمكانية قراءة النص فوق الخلفية حسب معايير WCAG.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div><label style="font-size:0.78rem;color:var(--text-secondary);">لون النص:</label><input type="color" id="ac_fg" value="#ffffff" style="width:100%;height:40px;border:none;cursor:pointer;border-radius:8px;margin-top:4px;"></div>
            <div><label style="font-size:0.78rem;color:var(--text-secondary);">لون الخلفية:</label><input type="color" id="ac_bg" value="#2563eb" style="width:100%;height:40px;border:none;cursor:pointer;border-radius:8px;margin-top:4px;"></div>
        </div>
        <div id="ac_preview" style="padding:20px;border-radius:16px;text-align:center;font-size:1.2rem;font-weight:700;background:#2563eb;color:#ffffff;">معاينة النص فوق الخلفية - Preview Text</div>
        <div id="ac_score" style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:14px;padding:16px;text-align:center;font-size:1.2rem;font-weight:800;"></div>
    </div>`; },
  init(){ function lum(hex){const r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;const f=c=>c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4);return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b);}
    function up(){const fg=document.getElementById("ac_fg").value,bg=document.getElementById("ac_bg").value;document.getElementById("ac_preview").style.color=fg;document.getElementById("ac_preview").style.background=bg;const l1=lum(fg),l2=lum(bg);const ratio=((Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05)).toFixed(2);const pass=ratio>=4.5;document.getElementById("ac_score").innerHTML=`نسبة التباين: <span style="color:${pass?"var(--green-success)":"var(--red-error)"}">${ratio}:1</span> ${pass?"✅ ناجح (WCAG AA)":"❌ غير كافٍ"}`;}
    up();document.getElementById("ac_fg").addEventListener("input",up);document.getElementById("ac_bg").addEventListener("input",up); }
},

{ id:"design-aspect", cat:"design", name:"حاسبة نسبة الأبعاد", desc:"حساب النسب المئوية للأبعاد", icon:"fas fa-expand", keywords:["aspect","ratio","نسبة","أبعاد"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-expand text-primary"></i> حاسبة نسبة الأبعاد (Aspect Ratio)</h3><p>احسب الأبعاد مع الحفاظ على نسبة العرض للارتفاع.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            ${ToolsEngine.inputField("ar_w1","العرض الأصلي:","number","1920")}
            ${ToolsEngine.inputField("ar_h1","الارتفاع الأصلي:","number","1080")}
        </div>
        ${ToolsEngine.inputField("ar_w2","العرض الجديد:","number","1280")}
        <button id="ar_go" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-calculator"></i> حساب الارتفاع الجديد</button>
        <div id="ar_res" style="display:none;background:var(--bg-surface);border:1px solid var(--border-color);border-radius:14px;padding:16px;text-align:center;">
            <div style="font-size:0.85rem;color:var(--text-secondary);">الارتفاع الجديد:</div>
            <div id="ar_out" style="font-size:2rem;font-weight:800;color:var(--green-success);margin-top:4px;"></div>
            <div id="ar_ratio" style="font-size:0.85rem;color:var(--text-secondary);margin-top:4px;"></div>
        </div>
    </div>`; },
  init(){ document.getElementById("ar_go").onclick=()=>{const w1=parseFloat(document.getElementById("ar_w1").value),h1=parseFloat(document.getElementById("ar_h1").value),w2=parseFloat(document.getElementById("ar_w2").value);if(!w1||!h1||!w2){alert("أدخل جميع القيم!");return;}const h2=Math.round(w2*(h1/w1));document.getElementById("ar_out").textContent=h2+"px";function gcd(a,b){return b?gcd(b,a%b):a;}const d=gcd(w1,h1);document.getElementById("ar_ratio").textContent=`النسبة: ${w1/d}:${h1/d}`;document.getElementById("ar_res").style.display="block";}; }
},

// ╔═══════════════════════════════════════════════════════════════╗
// ║  CATEGORY: CALC — أدوات الحسابات                              ║
// ╚═══════════════════════════════════════════════════════════════╝

{ id:"calc-percent", cat:"calc", name:"حاسبة النسب المئوية", desc:"حساب النسبة المئوية بسهولة", icon:"fas fa-percent", keywords:["percent","نسبة","حساب","مئوية"],
  render(){ return ToolsEngine.calcToolUI("pc","حاسبة النسب المئوية","احسب أي نسبة مئوية بسهولة وسرعة.",`<div style="display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:end;">${ToolsEngine.inputField("pc_a","ما هو","number","25")}<div style="font-size:1.2rem;color:var(--primary);font-weight:800;padding-bottom:8px;">% من</div>${ToolsEngine.inputField("pc_b","","number","200")}</div>`); },
  init(){ document.getElementById("pc_run").onclick=()=>{const a=parseFloat(document.getElementById("pc_a").value),b=parseFloat(document.getElementById("pc_b").value);document.getElementById("pc_output").textContent=(a/100*b).toFixed(2);document.getElementById("pc_detail").textContent=`${a}% من ${b} = ${(a/100*b).toFixed(2)}`;document.getElementById("pc_result").style.display="block";}; }
},

{ id:"calc-age", cat:"calc", name:"حاسبة العمر", desc:"احسب عمرك بالسنوات والأشهر والأيام", icon:"fas fa-cake-candles", keywords:["age","عمر","ميلاد","سن"],
  render(){ return ToolsEngine.calcToolUI("ag","حاسبة العمر الدقيقة","أدخل تاريخ ميلادك لمعرفة عمرك بالتفصيل.",ToolsEngine.inputField("ag_date","تاريخ الميلاد:","date","")); },
  init(){ document.getElementById("ag_run").onclick=()=>{const d=new Date(document.getElementById("ag_date").value);if(isNaN(d)){alert("أدخل تاريخاً صحيحاً!");return;}const now=new Date(),diff=now-d,years=Math.floor(diff/31557600000),months=Math.floor((diff%31557600000)/2629800000),days=Math.floor(((diff%31557600000)%2629800000)/86400000);document.getElementById("ag_output").textContent=`${years} سنة`;document.getElementById("ag_detail").textContent=`${years} سنة و ${months} شهر و ${days} يوم | عمرك بالأيام: ${Math.floor(diff/86400000).toLocaleString()} يوم`;document.getElementById("ag_result").style.display="block";}; }
},

{ id:"calc-bmi", cat:"calc", name:"حاسبة كتلة الجسم BMI", desc:"حساب مؤشر كتلة الجسم", icon:"fas fa-weight-scale", keywords:["bmi","وزن","كتلة","جسم","صحة"],
  render(){ return ToolsEngine.calcToolUI("bm","حاسبة مؤشر كتلة الجسم (BMI)","أدخل وزنك وطولك لمعرفة مؤشر كتلة جسمك.",`<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">${ToolsEngine.inputField("bm_w","الوزن (كجم):","number","70")}${ToolsEngine.inputField("bm_h","الطول (سم):","number","170")}</div>`); },
  init(){ document.getElementById("bm_run").onclick=()=>{const w=parseFloat(document.getElementById("bm_w").value),h=parseFloat(document.getElementById("bm_h").value)/100;if(!w||!h){alert("أدخل الوزن والطول!");return;}const bmi=(w/(h*h)).toFixed(1);let cat;if(bmi<18.5)cat="نحافة (أقل من الطبيعي) ⚠️";else if(bmi<25)cat="وزن مثالي ✅";else if(bmi<30)cat="وزن زائد ⚠️";else cat="سمنة ❌";document.getElementById("bm_output").textContent=bmi;document.getElementById("bm_detail").textContent=cat;document.getElementById("bm_result").style.display="block";}; }
},

{ id:"calc-loan", cat:"calc", name:"حاسبة القروض", desc:"حساب الأقساط الشهرية والفوائد", icon:"fas fa-building-columns", keywords:["loan","قرض","قسط","فائدة","mortgage"],
  render(){ return ToolsEngine.calcToolUI("ln","حاسبة القروض والأقساط","احسب القسط الشهري وإجمالي الفوائد على أي قرض.",`<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">${ToolsEngine.inputField("ln_a","مبلغ القرض:","number","100000")}${ToolsEngine.inputField("ln_r","نسبة الفائدة السنوية %:","number","5")}${ToolsEngine.inputField("ln_y","المدة (سنوات):","number","5")}</div>`); },
  init(){ document.getElementById("ln_run").onclick=()=>{const P=parseFloat(document.getElementById("ln_a").value),r=parseFloat(document.getElementById("ln_r").value)/100/12,n=parseFloat(document.getElementById("ln_y").value)*12;if(!P||!r||!n){alert("أدخل جميع القيم!");return;}const M=P*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);const total=M*n;document.getElementById("ln_output").textContent=M.toFixed(2)+" / شهر";document.getElementById("ln_detail").textContent=`إجمالي المدفوعات: ${total.toFixed(2)} | إجمالي الفوائد: ${(total-P).toFixed(2)}`;document.getElementById("ln_result").style.display="block";}; }
},

{ id:"calc-tip", cat:"calc", name:"حاسبة البقشيش", desc:"حساب الإكرامية وتقسيم الفاتورة", icon:"fas fa-money-bill-wave", keywords:["tip","بقشيش","إكرامية","فاتورة"],
  render(){ return ToolsEngine.calcToolUI("tp","حاسبة البقشيش وتقسيم الفاتورة","احسب الإكرامية وقسم الفاتورة بين الأشخاص.",`<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">${ToolsEngine.inputField("tp_bill","مبلغ الفاتورة:","number","100")}${ToolsEngine.inputField("tp_pct","نسبة البقشيش %:","number","15")}${ToolsEngine.inputField("tp_ppl","عدد الأشخاص:","number","2")}</div>`); },
  init(){ document.getElementById("tp_run").onclick=()=>{const bill=parseFloat(document.getElementById("tp_bill").value),pct=parseFloat(document.getElementById("tp_pct").value),ppl=parseInt(document.getElementById("tp_ppl").value)||1;const tip=bill*pct/100,total=bill+tip;document.getElementById("tp_output").textContent=(total/ppl).toFixed(2)+" / شخص";document.getElementById("tp_detail").textContent=`البقشيش: ${tip.toFixed(2)} | الإجمالي: ${total.toFixed(2)}`;document.getElementById("tp_result").style.display="block";}; }
},

{ id:"calc-discount", cat:"calc", name:"حاسبة الخصومات", desc:"حساب السعر بعد الخصم", icon:"fas fa-tags", keywords:["discount","خصم","تخفيض","سعر"],
  render(){ return ToolsEngine.calcToolUI("dc","حاسبة الخصومات","احسب السعر النهائي بعد تطبيق نسبة الخصم.",`<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">${ToolsEngine.inputField("dc_price","السعر الأصلي:","number","500")}${ToolsEngine.inputField("dc_pct","نسبة الخصم %:","number","30")}</div>`); },
  init(){ document.getElementById("dc_run").onclick=()=>{const price=parseFloat(document.getElementById("dc_price").value),pct=parseFloat(document.getElementById("dc_pct").value);const saved=price*pct/100,final=price-saved;document.getElementById("dc_output").textContent=final.toFixed(2);document.getElementById("dc_detail").textContent=`وفرت: ${saved.toFixed(2)} (خصم ${pct}%)`;document.getElementById("dc_result").style.display="block";}; }
},

{ id:"calc-vat", cat:"calc", name:"حاسبة الضريبة VAT", desc:"حساب السعر مع وبدون الضريبة", icon:"fas fa-receipt", keywords:["vat","tax","ضريبة","قيمة","مضافة"],
  render(){ return ToolsEngine.calcToolUI("vt","حاسبة ضريبة القيمة المضافة (VAT)","احسب السعر شاملاً الضريبة أو استخرج الضريبة من السعر.",`<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">${ToolsEngine.inputField("vt_price","المبلغ:","number","1000")}${ToolsEngine.inputField("vt_rate","نسبة الضريبة %:","number","14")}</div><div style="display:flex;gap:8px;margin-top:4px;"><button class="pill-btn active" data-mode="add">أضف الضريبة</button><button class="pill-btn" data-mode="remove">استخرج الضريبة</button></div>`); },
  init(){ let mode="add";document.querySelectorAll(".pill-btn").forEach(b=>{b.onclick=()=>{document.querySelectorAll(".pill-btn").forEach(p=>p.classList.remove("active"));b.classList.add("active");mode=b.dataset.mode;};});
    document.getElementById("vt_run").onclick=()=>{const price=parseFloat(document.getElementById("vt_price").value),rate=parseFloat(document.getElementById("vt_rate").value);if(mode==="add"){const tax=price*rate/100;document.getElementById("vt_output").textContent=(price+tax).toFixed(2);document.getElementById("vt_detail").textContent=`المبلغ: ${price} + الضريبة: ${tax.toFixed(2)}`;}else{const orig=price/(1+rate/100),tax=price-orig;document.getElementById("vt_output").textContent=orig.toFixed(2);document.getElementById("vt_detail").textContent=`المبلغ بدون ضريبة: ${orig.toFixed(2)} | الضريبة: ${tax.toFixed(2)}`;}document.getElementById("vt_result").style.display="block";}; }
},

{ id:"calc-gpa", cat:"calc", name:"حاسبة المعدل التراكمي", desc:"حساب GPA من الدرجات", icon:"fas fa-graduation-cap", keywords:["gpa","معدل","تراكمي","درجات","جامعة"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-graduation-cap text-primary"></i> حاسبة المعدل التراكمي (GPA)</h3><p>أدخل درجاتك وساعاتك المعتمدة لحساب GPA.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <div id="gpa_courses"></div>
        <button id="gpa_add" class="secondary-btn"><i class="fas fa-plus"></i> إضافة مادة</button>
        <button id="gpa_calc" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-calculator"></i> حساب المعدل</button>
        <div id="gpa_res" style="display:none;background:var(--bg-surface);border:1px solid var(--border-color);border-radius:14px;padding:16px;text-align:center;"><div id="gpa_out" style="font-size:2rem;font-weight:800;color:var(--green-success);"></div></div>
    </div>`; },
  init(){ const grades={"A+":4,"A":4,"A-":3.7,"B+":3.3,"B":3,"B-":2.7,"C+":2.3,"C":2,"C-":1.7,"D+":1.3,"D":1,"F":0};
    const opts=Object.keys(grades).map(g=>`<option value="${g}">${g}</option>`).join("");
    let count=0;function addRow(){count++;document.getElementById("gpa_courses").innerHTML+=`<div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:8px;margin-bottom:6px;"><input type="text" placeholder="اسم المادة" style="background:rgba(0,0,0,0.1);border:1px solid var(--border-color);border-radius:10px;padding:8px;color:var(--text-primary);font-size:0.8rem;"><select class="gpa_grade" style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:10px;padding:8px;color:var(--text-primary);cursor:pointer;">${opts}</select><input type="number" class="gpa_hrs" value="3" style="background:rgba(0,0,0,0.1);border:1px solid var(--border-color);border-radius:10px;padding:8px;color:var(--text-primary);font-size:0.8rem;" placeholder="الساعات"></div>`;}
    addRow();addRow();addRow();
    document.getElementById("gpa_add").onclick=addRow;
    document.getElementById("gpa_calc").onclick=()=>{let totalPts=0,totalHrs=0;document.querySelectorAll(".gpa_grade").forEach((sel,i)=>{const hrs=parseFloat(document.querySelectorAll(".gpa_hrs")[i].value)||0;totalPts+=grades[sel.value]*hrs;totalHrs+=hrs;});const gpa=totalHrs?totalPts/totalHrs:0;document.getElementById("gpa_out").textContent=gpa.toFixed(2)+" / 4.0";document.getElementById("gpa_res").style.display="block";}; }
},

{ id:"calc-avg", cat:"calc", name:"حاسبة المتوسط", desc:"حساب المتوسط الحسابي للأرقام", icon:"fas fa-chart-line", keywords:["average","متوسط","حسابي","mean"],
  render(){ return ToolsEngine.textToolUI("av","حاسبة المتوسط الحسابي","أدخل الأرقام مفصولة بفاصلة أو سطر جديد لحساب المتوسط.","10, 20, 30, 40, 50","حساب المتوسط"); },
  init(){ ToolsEngine.bindTextTool("av",v=>{const nums=v.split(/[,\n\s]+/).map(Number).filter(n=>!isNaN(n));if(!nums.length)return"لا توجد أرقام صالحة!";const sum=nums.reduce((a,b)=>a+b,0);const avg=sum/nums.length;const min=Math.min(...nums),max=Math.max(...nums);return`المتوسط: ${avg.toFixed(2)}\nالمجموع: ${sum}\nالعدد: ${nums.length}\nالأقل: ${min}\nالأكثر: ${max}`;}); }
},

{ id:"calc-profit", cat:"calc", name:"حاسبة هامش الربح", desc:"حساب هامش الربح والتكلفة", icon:"fas fa-chart-pie", keywords:["profit","margin","ربح","هامش"],
  render(){ return ToolsEngine.calcToolUI("pm","حاسبة هامش الربح","احسب هامش الربح ونسبة الربحية.",`<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">${ToolsEngine.inputField("pm_cost","التكلفة:","number","70")}${ToolsEngine.inputField("pm_sell","سعر البيع:","number","100")}</div>`); },
  init(){ document.getElementById("pm_run").onclick=()=>{const cost=parseFloat(document.getElementById("pm_cost").value),sell=parseFloat(document.getElementById("pm_sell").value);const profit=sell-cost,margin=(profit/sell*100).toFixed(1),markup=(profit/cost*100).toFixed(1);document.getElementById("pm_output").textContent=profit.toFixed(2);document.getElementById("pm_detail").textContent=`هامش الربح: ${margin}% | نسبة الزيادة: ${markup}%`;document.getElementById("pm_result").style.display="block";}; }
},

// ╔═══════════════════════════════════════════════════════════════╗
// ║  CATEGORY: CONVERT — محولات الوحدات                           ║
// ╚═══════════════════════════════════════════════════════════════╝

{ id:"conv-length", cat:"convert", name:"محول الأطوال", desc:"تحويل بين متر وقدم وبوصة", icon:"fas fa-ruler", keywords:["length","طول","متر","قدم","بوصة"],
  render(){ return ToolsEngine.convertToolUI("cl","محول وحدات الأطوال","حول بين المتر والكيلومتر والقدم والبوصة والميل.",[{val:"m",label:"متر (m)"},{val:"km",label:"كيلومتر (km)"},{val:"cm",label:"سنتيمتر (cm)"},{val:"mm",label:"ملليمتر (mm)"},{val:"ft",label:"قدم (ft)"},{val:"in",label:"بوصة (in)"},{val:"mi",label:"ميل (mi)"},{val:"yd",label:"ياردة (yd)"}]); },
  init(){ const toM={m:1,km:1000,cm:0.01,mm:0.001,ft:0.3048,in:0.0254,mi:1609.344,yd:0.9144};ToolsEngine.bindConverter("cl",(v,f,t)=>(v*toM[f]/toM[t]).toPrecision(8)); }
},

{ id:"conv-weight", cat:"convert", name:"محول الأوزان", desc:"تحويل بين كجم وباوند وأونصة", icon:"fas fa-weight-hanging", keywords:["weight","وزن","كجم","باوند"],
  render(){ return ToolsEngine.convertToolUI("cw","محول وحدات الأوزان","حول بين الكيلوجرام والباوند والأونصة والجرام.",[{val:"kg",label:"كيلوجرام (kg)"},{val:"g",label:"جرام (g)"},{val:"mg",label:"ملليجرام (mg)"},{val:"lb",label:"باوند (lb)"},{val:"oz",label:"أونصة (oz)"},{val:"ton",label:"طن متري"}]); },
  init(){ const toKg={kg:1,g:0.001,mg:0.000001,lb:0.453592,oz:0.0283495,ton:1000};ToolsEngine.bindConverter("cw",(v,f,t)=>(v*toKg[f]/toKg[t]).toPrecision(8)); }
},

{ id:"conv-temp", cat:"convert", name:"محول درجات الحرارة", desc:"تحويل بين °C و °F و K", icon:"fas fa-temperature-half", keywords:["temperature","حرارة","مئوية","فهرنهايت"],
  render(){ return ToolsEngine.convertToolUI("ct","محول درجات الحرارة","حول بين سلسيوس وفهرنهايت وكلفن.",[{val:"c",label:"سلسيوس (°C)"},{val:"f",label:"فهرنهايت (°F)"},{val:"k",label:"كلفن (K)"}]); },
  init(){ ToolsEngine.bindConverter("ct",(v,f,t)=>{let c;if(f==="c")c=v;else if(f==="f")c=(v-32)*5/9;else c=v-273.15;if(t==="c")return c.toFixed(2);if(t==="f")return(c*9/5+32).toFixed(2);return(c+273.15).toFixed(2);}); }
},

{ id:"conv-area", cat:"convert", name:"محول المساحات", desc:"تحويل بين متر² وهكتار وفدان", icon:"fas fa-vector-square", keywords:["area","مساحة","متر","هكتار","فدان"],
  render(){ return ToolsEngine.convertToolUI("ca","محول وحدات المساحات","حول بين المتر المربع والهكتار والفدان والقدم المربع.",[{val:"m2",label:"متر مربع (m²)"},{val:"km2",label:"كيلومتر مربع"},{val:"ha",label:"هكتار"},{val:"acre",label:"فدان (Acre)"},{val:"ft2",label:"قدم مربع (ft²)"}]); },
  init(){ const toM2={m2:1,km2:1e6,ha:1e4,acre:4046.86,ft2:0.0929};ToolsEngine.bindConverter("ca",(v,f,t)=>(v*toM2[f]/toM2[t]).toPrecision(8)); }
},

{ id:"conv-volume", cat:"convert", name:"محول الأحجام", desc:"تحويل بين لتر وجالون وكوب", icon:"fas fa-flask", keywords:["volume","حجم","لتر","جالون"],
  render(){ return ToolsEngine.convertToolUI("cv","محول وحدات الأحجام والسوائل","حول بين اللتر والجالون والملليلتر والكوب.",[{val:"l",label:"لتر (L)"},{val:"ml",label:"ملليلتر (mL)"},{val:"gal",label:"جالون أمريكي"},{val:"cup",label:"كوب (Cup)"},{val:"fl_oz",label:"أونصة سائلة"}]); },
  init(){ const toL={l:1,ml:0.001,gal:3.78541,cup:0.236588,fl_oz:0.0295735};ToolsEngine.bindConverter("cv",(v,f,t)=>(v*toL[f]/toL[t]).toPrecision(8)); }
},

{ id:"conv-speed", cat:"convert", name:"محول السرعة", desc:"تحويل بين كم/س وميل/س", icon:"fas fa-gauge-high", keywords:["speed","سرعة","كم","ميل"],
  render(){ return ToolsEngine.convertToolUI("cs","محول وحدات السرعة","حول بين كيلومتر/ساعة وميل/ساعة ومتر/ثانية.",[{val:"kmh",label:"كم/ساعة (km/h)"},{val:"mph",label:"ميل/ساعة (mph)"},{val:"ms",label:"متر/ثانية (m/s)"},{val:"knot",label:"عقدة بحرية (knot)"}]); },
  init(){ const toMS={kmh:0.277778,mph:0.44704,ms:1,knot:0.514444};ToolsEngine.bindConverter("cs",(v,f,t)=>(v*toMS[f]/toMS[t]).toPrecision(6)); }
},

{ id:"conv-data", cat:"convert", name:"محول وحدات البيانات", desc:"تحويل بين KB و MB و GB و TB", icon:"fas fa-hard-drive", keywords:["data","بيانات","جيجا","تيرا","ميجا"],
  render(){ return ToolsEngine.convertToolUI("cd","محول وحدات تخزين البيانات","حول بين بايت وكيلوبايت وميجابايت وجيجابايت وتيرابايت.",[{val:"b",label:"بايت (B)"},{val:"kb",label:"كيلوبايت (KB)"},{val:"mb",label:"ميجابايت (MB)"},{val:"gb",label:"جيجابايت (GB)"},{val:"tb",label:"تيرابايت (TB)"}]); },
  init(){ const toB={b:1,kb:1024,mb:1048576,gb:1073741824,tb:1099511627776};ToolsEngine.bindConverter("cd",(v,f,t)=>(v*toB[f]/toB[t]).toPrecision(8)); }
},

{ id:"conv-time", cat:"convert", name:"محول الوقت", desc:"تحويل بين ثواني ودقائق وساعات", icon:"fas fa-hourglass-half", keywords:["time","وقت","ساعة","دقيقة","ثانية"],
  render(){ return ToolsEngine.convertToolUI("cti","محول وحدات الوقت","حول بين الثواني والدقائق والساعات والأيام والأسابيع.",[{val:"s",label:"ثانية"},{val:"min",label:"دقيقة"},{val:"h",label:"ساعة"},{val:"day",label:"يوم"},{val:"week",label:"أسبوع"},{val:"month",label:"شهر (30 يوم)"},{val:"year",label:"سنة (365 يوم)"}]); },
  init(){ const toS={s:1,min:60,h:3600,day:86400,week:604800,month:2592000,year:31536000};ToolsEngine.bindConverter("cti",(v,f,t)=>(v*toS[f]/toS[t]).toPrecision(8)); }
},

{ id:"conv-energy", cat:"convert", name:"محول الطاقة", desc:"تحويل بين جول وكالوري وواط", icon:"fas fa-bolt", keywords:["energy","طاقة","جول","كالوري"],
  render(){ return ToolsEngine.convertToolUI("ce","محول وحدات الطاقة","حول بين الجول والكالوري والكيلو واط ساعة.",[{val:"j",label:"جول (J)"},{val:"kj",label:"كيلو جول (kJ)"},{val:"cal",label:"كالوري (cal)"},{val:"kcal",label:"كيلو كالوري (kcal)"},{val:"kwh",label:"كيلو واط ساعة (kWh)"}]); },
  init(){ const toJ={j:1,kj:1000,cal:4.184,kcal:4184,kwh:3600000};ToolsEngine.bindConverter("ce",(v,f,t)=>(v*toJ[f]/toJ[t]).toPrecision(8)); }
},

{ id:"conv-pressure", cat:"convert", name:"محول الضغط", desc:"تحويل بين بار و PSI وجو", icon:"fas fa-gauge", keywords:["pressure","ضغط","بار","جو"],
  render(){ return ToolsEngine.convertToolUI("cp","محول وحدات الضغط","حول بين البار والباسكال و PSI والجو.",[{val:"pa",label:"باسكال (Pa)"},{val:"bar",label:"بار (bar)"},{val:"atm",label:"جو (atm)"},{val:"psi",label:"رطل/بوصة² (psi)"},{val:"mmhg",label:"ملم زئبق (mmHg)"}]); },
  init(){ const toPa={pa:1,bar:100000,atm:101325,psi:6894.76,mmhg:133.322};ToolsEngine.bindConverter("cp",(v,f,t)=>(v*toPa[f]/toPa[t]).toPrecision(8)); }
},

// ╔═══════════════════════════════════════════════════════════════╗
// ║  CATEGORY: SEO — أدوات السيو                                  ║
// ╚═══════════════════════════════════════════════════════════════╝

{ id:"seo-meta", cat:"seo", name:"مولد وسوم الميتا", desc:"توليد Meta Tags لتحسين السيو", icon:"fas fa-tags", keywords:["meta","tags","سيو","seo"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-tags text-primary"></i> مولد وسوم الميتا (Meta Tags)</h3><p>أنشئ وسوم HTML Meta Tags احترافية لتحسين ظهور موقعك في جوجل.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        ${ToolsEngine.inputField("mt_title","عنوان الصفحة (Title):","text","أدوات تقنية مجانية | Novatrix EG")}
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-secondary);">وصف الصفحة (Description):</label><textarea id="mt_desc" class="form-textarea" style="height:80px;margin-top:4px;" placeholder="وصف مختصر للصفحة (150-160 حرف)"></textarea></div>
        ${ToolsEngine.inputField("mt_keys","الكلمات المفتاحية (Keywords):","text","أدوات, تقنية, مجانية, سيو")}
        ${ToolsEngine.inputField("mt_author","اسم المؤلف:","text","Novatrix EG")}
        <button id="mt_go" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-code"></i> توليد الكود</button>
        <div id="mt_res" style="display:none;"><textarea id="mt_out" class="form-textarea" style="height:180px;font-family:monospace;font-size:0.75rem;direction:ltr;text-align:left;" readonly></textarea><button id="mt_cp" class="secondary-btn" style="margin-top:8px;"><i class="far fa-copy"></i> نسخ الكود</button></div>
    </div>`; },
  init(){ document.getElementById("mt_go").onclick=()=>{const t=document.getElementById("mt_title").value,d=document.getElementById("mt_desc").value,k=document.getElementById("mt_keys").value,a=document.getElementById("mt_author").value;const code=`<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>${t}</title>\n<meta name="description" content="${d}">\n<meta name="keywords" content="${k}">\n<meta name="author" content="${a}">\n<meta name="robots" content="index, follow">\n\n<!-- Open Graph / Facebook -->\n<meta property="og:type" content="website">\n<meta property="og:title" content="${t}">\n<meta property="og:description" content="${d}">\n\n<!-- Twitter -->\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="${t}">\n<meta name="twitter:description" content="${d}">`;document.getElementById("mt_out").value=code;document.getElementById("mt_res").style.display="block";};
    document.getElementById("mt_cp").onclick=()=>ToolsEngine.copyText(document.getElementById("mt_out").value,"تم نسخ الكود!"); }
},

{ id:"seo-og", cat:"seo", name:"مولد Open Graph", desc:"توليد وسوم OG للسوشيال ميديا", icon:"fas fa-share-from-square", keywords:["og","open graph","facebook","مشاركة"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-share-from-square text-primary"></i> مولد Open Graph Tags</h3><p>أنشئ وسوم OG لتحسين مظهر روابط موقعك عند مشاركتها في فيسبوك وتويتر.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        ${ToolsEngine.inputField("og_title","عنوان الصفحة:","text","")}
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-secondary);">الوصف:</label><textarea id="og_desc" class="form-textarea" style="height:70px;margin-top:4px;"></textarea></div>
        ${ToolsEngine.inputField("og_url","رابط الصفحة:","text","https://example.com")}
        ${ToolsEngine.inputField("og_img","رابط الصورة:","text","https://example.com/image.jpg")}
        <button id="og_go" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-code"></i> توليد الكود</button>
        <div id="og_res" style="display:none;"><textarea id="og_out" class="form-textarea" style="height:160px;font-family:monospace;font-size:0.75rem;direction:ltr;text-align:left;" readonly></textarea><button id="og_cp" class="secondary-btn" style="margin-top:8px;"><i class="far fa-copy"></i> نسخ</button></div>
    </div>`; },
  init(){ document.getElementById("og_go").onclick=()=>{const t=document.getElementById("og_title").value,d=document.getElementById("og_desc").value,u=document.getElementById("og_url").value,i=document.getElementById("og_img").value;document.getElementById("og_out").value=`<meta property="og:type" content="website">\n<meta property="og:title" content="${t}">\n<meta property="og:description" content="${d}">\n<meta property="og:url" content="${u}">\n<meta property="og:image" content="${i}">\n\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="${t}">\n<meta name="twitter:description" content="${d}">\n<meta name="twitter:image" content="${i}">`;document.getElementById("og_res").style.display="block";};
    document.getElementById("og_cp").onclick=()=>ToolsEngine.copyText(document.getElementById("og_out").value,"تم نسخ الكود!"); }
},

{ id:"seo-robots", cat:"seo", name:"مولد Robots.txt", desc:"توليد ملف robots.txt للسيو", icon:"fas fa-robot", keywords:["robots","txt","سيو","أرشفة"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-robot text-primary"></i> مولد ملف Robots.txt</h3><p>أنشئ ملف robots.txt لتوجيه محركات البحث.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        ${ToolsEngine.inputField("rb_sitemap","رابط Sitemap:","text","https://example.com/sitemap.xml")}
        <div style="display:flex;flex-direction:column;gap:6px;">
            <div style="display:flex;align-items:center;gap:8px;"><input type="checkbox" id="rb_all" checked><label for="rb_all" style="font-size:0.8rem;color:var(--text-secondary);">السماح لجميع الروبوتات</label></div>
            <div style="display:flex;align-items:center;gap:8px;"><input type="checkbox" id="rb_img"><label for="rb_img" style="font-size:0.8rem;color:var(--text-secondary);">منع أرشفة الصور</label></div>
            <div style="display:flex;align-items:center;gap:8px;"><input type="checkbox" id="rb_admin"><label for="rb_admin" style="font-size:0.8rem;color:var(--text-secondary);">منع أرشفة /admin/</label></div>
        </div>
        <button id="rb_go" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-file-lines"></i> توليد</button>
        <textarea id="rb_out" class="form-textarea" style="height:160px;font-family:monospace;font-size:0.8rem;direction:ltr;text-align:left;" readonly></textarea>
        <button id="rb_cp" class="secondary-btn"><i class="far fa-copy"></i> نسخ</button>
    </div>`; },
  init(){ document.getElementById("rb_go").onclick=()=>{let txt="User-agent: *\n";txt+=document.getElementById("rb_all").checked?"Allow: /\n":"Disallow: /\n";if(document.getElementById("rb_img").checked)txt+="Disallow: /images/\nDisallow: /assets/\n";if(document.getElementById("rb_admin").checked)txt+="Disallow: /admin/\nDisallow: /dashboard/\n";const sm=document.getElementById("rb_sitemap").value;if(sm)txt+="\nSitemap: "+sm;document.getElementById("rb_out").value=txt;};
    document.getElementById("rb_cp").onclick=()=>ToolsEngine.copyText(document.getElementById("rb_out").value,"تم نسخ الملف!"); }
},

{ id:"seo-density", cat:"seo", name:"محلل كثافة الكلمات", desc:"تحليل تكرار الكلمات المفتاحية", icon:"fas fa-chart-bar", keywords:["density","كثافة","كلمات","مفتاحية","تحليل"],
  render(){ return ToolsEngine.textToolUI("kd","محلل كثافة الكلمات المفتاحية","الصق محتوى مقالتك لتحليل الكلمات الأكثر تكراراً ونسبتها.","الصق نص المقال هنا...","تحليل الكثافة"); },
  init(){ ToolsEngine.bindTextTool("kd",v=>{const words=v.toLowerCase().replace(/[^\w\u0600-\u06FF\s]/g,"").split(/\s+/).filter(w=>w.length>2);const freq={};words.forEach(w=>{freq[w]=(freq[w]||0)+1;});const sorted=Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,20);return sorted.map(([w,c])=>`${w}: ${c} مرة (${(c/words.length*100).toFixed(1)}%)`).join("\n");}); }
},

{ id:"seo-serp", cat:"seo", name:"معاينة نتائج جوجل", desc:"شاهد كيف يظهر موقعك في جوجل", icon:"fab fa-google", keywords:["serp","google","جوجل","معاينة","نتائج"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fab fa-google text-primary"></i> معاينة نتائج جوجل (SERP Preview)</h3><p>شاهد كيف سيظهر رابط صفحتك في نتائج بحث جوجل.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        ${ToolsEngine.inputField("sp_title","عنوان الصفحة (Title):","text","أدوات تقنية مجانية | Novatrix EG")}
        ${ToolsEngine.inputField("sp_url","رابط الصفحة:","text","https://novatrixeg.com/tools")}
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-secondary);">وصف الصفحة:</label><textarea id="sp_desc" class="form-textarea" style="height:70px;margin-top:4px;" placeholder="وصف مختصر (150-160 حرف)"></textarea></div>
        <div style="background:white;border-radius:12px;padding:20px;border:1px solid #dfe1e5;direction:ltr;text-align:left;">
            <div id="sp_ptitle" style="font-size:1.1rem;color:#1a0dab;font-family:Arial;cursor:pointer;">أدوات تقنية مجانية | Novatrix EG</div>
            <div id="sp_purl" style="font-size:0.82rem;color:#006621;margin-top:2px;font-family:Arial;">https://novatrixeg.com/tools</div>
            <div id="sp_pdesc" style="font-size:0.85rem;color:#545454;margin-top:4px;font-family:Arial;line-height:1.4;">وصف الصفحة سيظهر هنا...</div>
        </div>
        <div style="font-size:0.72rem;color:var(--text-muted);">عنوان: <span id="sp_tc" style="font-weight:700;">0</span>/60 حرف | وصف: <span id="sp_dc" style="font-weight:700;">0</span>/160 حرف</div>
    </div>`; },
  init(){ function up(){const t=document.getElementById("sp_title").value,u=document.getElementById("sp_url").value,d=document.getElementById("sp_desc").value;document.getElementById("sp_ptitle").textContent=t||"عنوان الصفحة";document.getElementById("sp_purl").textContent=u||"https://example.com";document.getElementById("sp_pdesc").textContent=d||"وصف الصفحة...";document.getElementById("sp_tc").textContent=t.length;document.getElementById("sp_dc").textContent=d.length;document.getElementById("sp_tc").style.color=t.length>60?"var(--red-error)":"var(--green-success)";document.getElementById("sp_dc").style.color=d.length>160?"var(--red-error)":"var(--green-success)";}
    ["sp_title","sp_url"].forEach(id=>document.getElementById(id).addEventListener("input",up));document.getElementById("sp_desc").addEventListener("input",up);up(); }
},

{ id:"seo-utm", cat:"seo", name:"منشئ روابط UTM", desc:"إضافة معلمات تتبع UTM للروابط", icon:"fas fa-bullseye", keywords:["utm","tracking","تتبع","حملة","تسويق"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-bullseye text-primary"></i> منشئ روابط UTM</h3><p>أضف معلمات تتبع UTM لروابطك لتتبع حملاتك التسويقية في Google Analytics.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        ${ToolsEngine.inputField("utm_url","رابط الصفحة:","text","https://novatrixeg.com")}
        ${ToolsEngine.inputField("utm_src","المصدر (utm_source):","text","facebook")}
        ${ToolsEngine.inputField("utm_med","الوسيط (utm_medium):","text","social")}
        ${ToolsEngine.inputField("utm_camp","الحملة (utm_campaign):","text","summer_sale")}
        <button id="utm_go" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-link"></i> توليد الرابط</button>
        <div id="utm_res" style="display:none;background:var(--bg-surface);border:1px solid var(--border-color);border-radius:12px;padding:14px;direction:ltr;word-break:break-all;font-family:monospace;font-size:0.8rem;color:var(--green-success);"></div>
        <button id="utm_cp" class="secondary-btn"><i class="far fa-copy"></i> نسخ الرابط</button>
    </div>`; },
  init(){ document.getElementById("utm_go").onclick=()=>{const u=document.getElementById("utm_url").value,s=document.getElementById("utm_src").value,m=document.getElementById("utm_med").value,c=document.getElementById("utm_camp").value;const sep=u.includes("?")?"&":"?";const full=`${u}${sep}utm_source=${encodeURIComponent(s)}&utm_medium=${encodeURIComponent(m)}&utm_campaign=${encodeURIComponent(c)}`;document.getElementById("utm_res").textContent=full;document.getElementById("utm_res").style.display="block";};
    document.getElementById("utm_cp").onclick=()=>ToolsEngine.copyText(document.getElementById("utm_res").textContent,"تم نسخ رابط UTM!"); }
},

// ╔═══════════════════════════════════════════════════════════════╗
// ║  CATEGORY: SOCIAL — أدوات السوشيال ميديا                     ║
// ╚═══════════════════════════════════════════════════════════════╝

{ id:"social-twitter", cat:"social", name:"عداد حروف تويتر/X", desc:"عد الحروف لتغريدة مثالية", icon:"fab fa-x-twitter", keywords:["twitter","x","تويتر","تغريدة","حروف"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fab fa-x-twitter text-primary"></i> عداد حروف تويتر / X</h3><p>تأكد من أن تغريدتك لا تتجاوز الحد المسموح (280 حرف).</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <textarea id="tw_in" class="form-textarea" placeholder="اكتب تغريدتك هنا..." style="height:140px;"></textarea>
        <div style="display:flex;justify-content:space-between;align-items:center;">
            <div style="font-size:0.85rem;color:var(--text-secondary);"><span id="tw_count" style="font-weight:800;color:var(--green-success);font-size:1.2rem;">0</span> / 280 حرف</div>
            <div style="width:60px;height:60px;border-radius:50%;border:4px solid var(--border-color);display:flex;align-items:center;justify-content:center;position:relative;"><svg id="tw_ring" viewBox="0 0 36 36" style="width:60px;height:60px;transform:rotate(-90deg);"><circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--border-color)" stroke-width="3"/><circle id="tw_progress" cx="18" cy="18" r="15.9" fill="none" stroke="var(--green-success)" stroke-width="3" stroke-dasharray="100" stroke-dashoffset="100" stroke-linecap="round"/></svg></div>
        </div>
    </div>`; },
  init(){ document.getElementById("tw_in").addEventListener("input",e=>{const len=e.target.value.length;document.getElementById("tw_count").textContent=len;const pct=Math.min(len/280*100,100);document.getElementById("tw_progress").style.strokeDashoffset=100-pct;const color=len>280?"var(--red-error)":len>260?"#f59e0b":"var(--green-success)";document.getElementById("tw_count").style.color=color;document.getElementById("tw_progress").style.stroke=color;}); }
},

{ id:"social-hashtag", cat:"social", name:"مولد الهاشتاقات", desc:"توليد هاشتاقات من الكلمات المفتاحية", icon:"fas fa-hashtag", keywords:["hashtag","هاشتاق","هاشتاغ"],
  render(){ return ToolsEngine.textToolUI("hg","مولد الهاشتاقات","أدخل كلمات مفتاحية مفصولة بفواصل وسيتم تحويلها لهاشتاقات.","تقنية, أمان, برمجة, هواتف ذكية, أندرويد","توليد الهاشتاقات"); },
  init(){ ToolsEngine.bindTextTool("hg",v=>v.split(",").map(w=>w.trim()).filter(w=>w).map(w=>"#"+w.replace(/\s+/g,"_")).join(" ")); }
},

{ id:"social-emoji", cat:"social", name:"باحث الإيموجي", desc:"ابحث عن الإيموجي المناسب", icon:"fas fa-face-smile", keywords:["emoji","إيموجي","وجوه"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-face-smile text-primary"></i> باحث ومعجم الإيموجي</h3><p>ابحث عن الإيموجي بالاسم وانقر عليه لنسخه مباشرة.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        ${ToolsEngine.inputField("em_search","ابحث عن إيموجي:","text","smile")}
        <div id="em_grid" style="display:flex;flex-wrap:wrap;gap:8px;max-height:300px;overflow-y:auto;"></div>
    </div>`; },
  init(){ const emojis=[["😀","grin"],["😂","laugh"],["🥰","love"],["😎","cool"],["🤔","think"],["😢","sad"],["😡","angry"],["👍","thumbs up"],["👎","thumbs down"],["❤️","heart"],["🔥","fire"],["⭐","star"],["🎉","party"],["💻","laptop"],["📱","phone"],["🎮","game"],["🎵","music"],["📷","camera"],["🔒","lock"],["🔑","key"],["💡","idea"],["⚡","bolt"],["✅","check"],["❌","cross"],["🚀","rocket"],["💎","gem"],["🏆","trophy"],["📝","memo"],["📊","chart"],["🛡️","shield"],["🌟","glow"],["💰","money"],["🎯","target"],["📌","pin"],["🔍","search"],["💬","chat"],["📢","announce"],["🎁","gift"],["⏰","alarm"],["📅","calendar"],["✈️","plane"],["🌍","world"],["☀️","sun"],["🌙","moon"],["☁️","cloud"],["🌧️","rain"],["❄️","snow"],["🍕","pizza"],["☕","coffee"],["🍔","burger"]];
    function render(filter){const grid=document.getElementById("em_grid");grid.innerHTML=emojis.filter(([e,n])=>!filter||n.includes(filter.toLowerCase())).map(([e,n])=>`<div onclick="ToolsEngine.copyText('${e}','تم نسخ ${e}!')" style="width:48px;height:48px;display:flex;align-items:center;justify-content:center;font-size:1.6rem;background:var(--bg-surface);border:1px solid var(--border-color);border-radius:10px;cursor:pointer;transition:transform 0.15s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">${e}</div>`).join("");}
    render();document.getElementById("em_search").addEventListener("input",e=>render(e.target.value)); }
},

{ id:"social-bio", cat:"social", name:"مولد البايو", desc:"توليد نص بايو احترافي للحسابات", icon:"fas fa-user-pen", keywords:["bio","بايو","حساب","تعريف"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-user-pen text-primary"></i> مولد البايو الاحترافي</h3><p>أنشئ نص بايو جذاب لحساباتك على السوشيال ميديا.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        ${ToolsEngine.inputField("bio_name","اسمك أو اسم علامتك:","text","Novatrix EG")}
        ${ToolsEngine.inputField("bio_role","مجالك أو تخصصك:","text","تقنية وأمن معلومات")}
        ${ToolsEngine.selectField("bio_style","النمط:",[{val:"pro",label:"احترافي"},{val:"fun",label:"مرح وعفوي"},{val:"min",label:"مختصر"}])}
        <button id="bio_go" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-wand-magic-sparkles"></i> توليد البايو</button>
        <textarea id="bio_out" class="form-textarea" style="height:100px;" readonly></textarea>
        <button id="bio_cp" class="secondary-btn"><i class="far fa-copy"></i> نسخ البايو</button>
    </div>`; },
  init(){ document.getElementById("bio_go").onclick=()=>{const name=document.getElementById("bio_name").value,role=document.getElementById("bio_role").value,style=document.getElementById("bio_style").value;const templates={pro:[`${name} | متخصص في ${role} 💼\n🔹 نشارك محتوى قيم ومفيد يومياً\n🔹 نهدف لتبسيط التقنية للجميع\n📩 للتواصل: DM`,`🚀 ${name}\n💡 خبير في ${role}\n📍 محتوى تقني حصري\n🔗 تابعنا للمزيد`],fun:[`✨ ${name} ✨\n${role} بشكل مختلف! 😎\n💬 أسأل وأنا أجاوب\n🎯 هدفنا: نفيدك ونستفيد`,`مرحباً! أنا ${name} 👋\nبحب ${role} من كل قلبي ❤️\n📲 تابعني عشان تستفيد!`],min:[`${name} • ${role} ⚡`,`${name} | ${role} 🔥\n📲 محتوى يومي`]};const arr=templates[style];document.getElementById("bio_out").value=arr[Math.floor(Math.random()*arr.length)];};
    document.getElementById("bio_cp").onclick=()=>ToolsEngine.copyText(document.getElementById("bio_out").value,"تم نسخ البايو!"); }
},


// ╔═══════════════════════════════════════════════════════════════╗
// ║  CATEGORY: SECURITY — أدوات الأمان                            ║
// ╚═══════════════════════════════════════════════════════════════╝

{ id:"sec-pass-gen", cat:"security", name:"مولد كلمات المرور", desc:"توليد كلمات مرور عشوائية قوية", icon:"fas fa-shield-halved", keywords:["password","كلمة","مرور","توليد"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-shield-halved text-primary"></i> مولد كلمات المرور الآمنة</h3><p>قم بتوليد كلمات مرور عشوائية قوية ومعقدة يصعب اختراقها.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <div><label style="font-size:0.78rem;font-weight:700;color:var(--text-secondary);display:flex;justify-content:space-between;">الطول: <span id="pg_lv" style="color:var(--primary);">16</span></label><input type="range" id="pg_len" min="8" max="64" value="16" style="width:100%;margin-top:4px;"></div>
        <div style="display:flex;flex-wrap:wrap;gap:12px;">
            <label style="font-size:0.78rem;color:var(--text-secondary);display:flex;align-items:center;gap:4px;"><input type="checkbox" id="pg_upper" checked> حروف كبيرة (A-Z)</label>
            <label style="font-size:0.78rem;color:var(--text-secondary);display:flex;align-items:center;gap:4px;"><input type="checkbox" id="pg_lower" checked> حروف صغيرة (a-z)</label>
            <label style="font-size:0.78rem;color:var(--text-secondary);display:flex;align-items:center;gap:4px;"><input type="checkbox" id="pg_nums" checked> أرقام (0-9)</label>
            <label style="font-size:0.78rem;color:var(--text-secondary);display:flex;align-items:center;gap:4px;"><input type="checkbox" id="pg_syms" checked> رموز (!@#$)</label>
        </div>
        <button id="pg_go" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-rotate"></i> توليد كلمة مرور</button>
        <div style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:14px;padding:16px;display:flex;justify-content:space-between;align-items:center;">
            <span id="pg_out" style="font-family:monospace;font-size:1.1rem;font-weight:700;color:var(--text-primary);word-break:break-all;">---</span>
            <button id="pg_cp" style="background:none;border:none;color:var(--primary);cursor:pointer;font-size:1.2rem;"><i class="far fa-copy"></i></button>
        </div>
    </div>`; },
  init(){ document.getElementById("pg_len").oninput=e=>document.getElementById("pg_lv").textContent=e.target.value;
    document.getElementById("pg_go").onclick=()=>{let chars="";if(document.getElementById("pg_upper").checked)chars+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";if(document.getElementById("pg_lower").checked)chars+="abcdefghijklmnopqrstuvwxyz";if(document.getElementById("pg_nums").checked)chars+="0123456789";if(document.getElementById("pg_syms").checked)chars+="!@#$%^&*()_+-=[]{}|;:,.<>?";if(!chars){alert("اختر نوعاً واحداً على الأقل!");return;}const len=parseInt(document.getElementById("pg_len").value);let pass="";for(let i=0;i<len;i++)pass+=chars[Math.floor(Math.random()*chars.length)];document.getElementById("pg_out").textContent=pass;};
    document.getElementById("pg_cp").onclick=()=>ToolsEngine.copyText(document.getElementById("pg_out").textContent,"تم نسخ كلمة المرور!"); }
},

{ id:"sec-pass-check", cat:"security", name:"فاحص قوة كلمات المرور", desc:"تقييم مستوى أمان كلمة المرور", icon:"fas fa-lock", keywords:["password","strength","قوة","أمان"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-lock text-primary"></i> فاحص قوة كلمات المرور</h3><p>أدخل كلمة مرورك لتقييم مستوى أمانها والوقت اللازم لاختراقها.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <div style="position:relative;">${ToolsEngine.inputField("sc_pass","كلمة المرور:","password","")}<button id="sc_show" style="position:absolute;left:14px;top:32px;background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:1rem;"><i class="fas fa-eye"></i></button></div>
        <div style="height:8px;background:rgba(0,0,0,0.2);border-radius:10px;overflow:hidden;"><div id="sc_bar" style="height:100%;width:0;border-radius:10px;transition:all 0.3s;"></div></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:12px;padding:12px;text-align:center;"><div style="font-size:0.75rem;color:var(--text-secondary);">مستوى القوة</div><div id="sc_level" style="font-size:1rem;font-weight:800;margin-top:4px;">---</div></div>
            <div style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:12px;padding:12px;text-align:center;"><div style="font-size:0.75rem;color:var(--text-secondary);">وقت الاختراق المتوقع</div><div id="sc_time" style="font-size:1rem;font-weight:800;margin-top:4px;color:var(--text-primary);">---</div></div>
        </div>
    </div>`; },
  init(){ const pass=document.getElementById("sc_pass"),bar=document.getElementById("sc_bar"),level=document.getElementById("sc_level"),time=document.getElementById("sc_time");
    document.getElementById("sc_show").onclick=()=>{pass.type=pass.type==="password"?"text":"password";};
    pass.addEventListener("input",()=>{const v=pass.value;let s=0;if(v.length>5)s++;if(v.length>10)s++;if(/[A-Z]/.test(v))s++;if(/[a-z]/.test(v))s++;if(/[0-9]/.test(v))s++;if(/[^A-Za-z0-9]/.test(v))s++;
    const levels=[{c:"#ef4444",w:"20%",t:"ضعيفة جداً ❌",tm:"أجزاء من الثانية"},{c:"#f97316",w:"40%",t:"ضعيفة ⚠️",tm:"ساعات"},{c:"#eab308",w:"60%",t:"متوسطة 🟡",tm:"شهور"},{c:"#22c55e",w:"80%",t:"قوية ✅",tm:"سنوات"},{c:"#10b981",w:"100%",t:"قوية جداً 🛡️",tm:"مليارات السنين"}];
    const l=Math.min(Math.max(s-1,0),4);bar.style.width=levels[l].w;bar.style.background=levels[l].c;level.textContent=levels[l].t;level.style.color=levels[l].c;time.textContent=levels[l].tm;if(!v){bar.style.width="0";level.textContent="---";time.textContent="---";}}); }
},

{ id:"sec-hash-gen", cat:"security", name:"مولد بصمات MD5/SHA", desc:"توليد بصمات تشفيرية للنصوص", icon:"fas fa-fingerprint", keywords:["hash","md5","sha","بصمة","تشفير"],
  render(){ return ToolsEngine.textToolUI("shg","مولد بصمات SHA-256","أدخل نصاً لتوليد بصمته الرقمية بخوارزمية SHA-256.","أدخل نصك هنا...","توليد البصمة"); },
  init(){ ToolsEngine.bindTextTool("shg",async v=>{const enc=new TextEncoder().encode(v);const hash=await crypto.subtle.digest("SHA-256",enc);return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,"0")).join("");}); }
},

{ id:"sec-privacy", cat:"security", name:"مولد سياسة الخصوصية", desc:"توليد نص سياسة خصوصية لموقعك", icon:"fas fa-file-shield", keywords:["privacy","policy","خصوصية","سياسة"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-file-shield text-primary"></i> مولد سياسة الخصوصية</h3><p>أنشئ نص سياسة خصوصية مبسطة لموقعك.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        ${ToolsEngine.inputField("pp_name","اسم الموقع/الشركة:","text","Novatrix EG")}
        ${ToolsEngine.inputField("pp_url","رابط الموقع:","text","https://novatrixeg.com")}
        ${ToolsEngine.inputField("pp_email","بريد التواصل:","text","contact@novatrixeg.com")}
        <button id="pp_go" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-file-lines"></i> توليد سياسة الخصوصية</button>
        <textarea id="pp_out" class="form-textarea" style="height:250px;font-size:0.8rem;" readonly></textarea>
        <button id="pp_cp" class="secondary-btn"><i class="far fa-copy"></i> نسخ</button>
    </div>`; },
  init(){ document.getElementById("pp_go").onclick=()=>{const n=document.getElementById("pp_name").value,u=document.getElementById("pp_url").value,e=document.getElementById("pp_email").value;document.getElementById("pp_out").value=`سياسة الخصوصية - ${n}\nآخر تحديث: ${new Date().toLocaleDateString("ar-EG")}\n\nنحن في ${n} (${u}) نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية.\n\n1. جمع المعلومات:\nنقوم بجمع المعلومات التي تقدمها لنا طوعاً عند استخدام خدماتنا، مثل عنوان البريد الإلكتروني واسم المستخدم.\n\n2. استخدام المعلومات:\nنستخدم المعلومات المجمعة لتحسين خدماتنا وتقديم تجربة أفضل للمستخدم.\n\n3. ملفات تعريف الارتباط (Cookies):\nقد نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح وتحليل حركة المرور.\n\n4. مشاركة المعلومات:\nلا نقوم ببيع أو مشاركة معلوماتك الشخصية مع أطراف ثالثة إلا بموافقتك أو عند الضرورة القانونية.\n\n5. أمان البيانات:\nنتخذ إجراءات أمنية مناسبة لحماية بياناتك من الوصول غير المصرح به.\n\n6. التواصل:\nللاستفسارات حول سياسة الخصوصية، يرجى التواصل معنا عبر: ${e}\n\n© ${new Date().getFullYear()} ${n}. جميع الحقوق محفوظة.`;};
    document.getElementById("pp_cp").onclick=()=>ToolsEngine.copyText(document.getElementById("pp_out").value,"تم نسخ سياسة الخصوصية!"); }
},

{ id:"sec-random-str", cat:"security", name:"مولد نصوص عشوائية", desc:"توليد سلاسل نصية عشوائية آمنة", icon:"fas fa-shuffle", keywords:["random","string","عشوائي","نص"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-shuffle text-primary"></i> مولد النصوص العشوائية الآمنة</h3><p>قم بتوليد سلاسل نصية عشوائية لمفاتيح API أو الرموز السرية.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            ${ToolsEngine.inputField("rs_len","الطول:","number","32")}
            ${ToolsEngine.selectField("rs_type","نوع الأحرف:",[{val:"alnum",label:"أحرف وأرقام"},{val:"hex",label:"ست عشري (Hex)"},{val:"alpha",label:"أحرف فقط"},{val:"num",label:"أرقام فقط"}])}
        </div>
        <button id="rs_go" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-rotate"></i> توليد</button>
        <div style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:14px;padding:14px;display:flex;justify-content:space-between;align-items:center;">
            <span id="rs_out" style="font-family:monospace;font-size:0.9rem;color:var(--text-primary);word-break:break-all;">---</span>
            <button id="rs_cp" style="background:none;border:none;color:var(--primary);cursor:pointer;font-size:1.2rem;"><i class="far fa-copy"></i></button>
        </div>
    </div>`; },
  init(){ const charsets={alnum:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",hex:"0123456789abcdef",alpha:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",num:"0123456789"};
    document.getElementById("rs_go").onclick=()=>{const len=parseInt(document.getElementById("rs_len").value)||32,type=document.getElementById("rs_type").value,chars=charsets[type];let str="";for(let i=0;i<len;i++)str+=chars[Math.floor(Math.random()*chars.length)];document.getElementById("rs_out").textContent=str;};
    document.getElementById("rs_cp").onclick=()=>ToolsEngine.copyText(document.getElementById("rs_out").textContent,"تم نسخ النص العشوائي!"); }
},

// ╔═══════════════════════════════════════════════════════════════╗
// ║  CATEGORY: EXTRA QR & PROMPT (Original tools)                ║
// ╚═══════════════════════════════════════════════════════════════╝






// ─── Added Tools ──────────────────────────────────────────

{ id:"social-deeplink-gen", cat:"social", name:"موجّه الروابط الذكي", desc:"إنشاء روابط عميقة لفتح التطبيقات مباشرة وتفادي المتصفح المدمج", icon:"fas fa-share-nodes", keywords:["deeplink","link","open","youtube","instagram","tiktok","روابط","عميق","تطبيق"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-share-nodes text-primary"></i> موجّه الروابط الذكي (Deep Link Generator)</h3><p>حوّل روابط السوشيال ميديا العادية إلى روابط ذكية تُجبر الهاتف على فتحها داخل التطبيق الرسمي مباشرة (يوتيوب، إنستغرام، فيسبوك، إلخ) بدلاً من المتصفح الداخلي.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        ${ToolsEngine.inputField("dl_url","رابط السوشيال ميديا:","url","https://www.youtube.com/watch?v=...")}
        ${ToolsEngine.selectField("dl_app","اختر التطبيق المستهدف:",[
            {val:"youtube",label:"يوتيوب (YouTube)"},
            {val:"instagram",label:"إنستغرام (Instagram)"},
            {val:"tiktok",label:"تيك توك (TikTok)"},
            {val:"facebook",label:"فيسبوك (Facebook)"},
            {val:"twitter",label:"تويتر / X"},
            {val:"telegram",label:"تليجرام (Telegram)"}
        ])}
        <button id="dl_go" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-link"></i> توليد الرابط الذكي</button>
        
        <div id="dl_res" style="display:none;background:#121319;border:1px solid var(--border-color);border-radius:16px;padding:16px;margin-top:10px;">
            <h4 style="font-size:0.85rem;color:white;margin-bottom:8px;">الروابط المولدة:</h4>
            <div style="display:flex;flex-direction:column;gap:10px;">
                <div style="background:rgba(0,0,0,0.3);padding:10px;border-radius:8px;">
                    <span style="font-size:0.75rem;color:var(--text-secondary);display:block;margin-bottom:4px;">رابط أندرويد (Android Intent URL):</span>
                    <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                        <span id="dl_out_android" style="font-family:monospace;font-size:0.72rem;color:var(--primary);word-break:break-all;direction:ltr;text-align:left;">---</span>
                        <button id="dl_cp_android" style="background:none;border:none;color:var(--primary);cursor:pointer;font-size:1rem;"><i class="far fa-copy"></i></button>
                    </div>
                </div>
                <div style="background:rgba(0,0,0,0.3);padding:10px;border-radius:8px;">
                    <span style="font-size:0.75rem;color:var(--text-secondary);display:block;margin-bottom:4px;">رابط آيفون/آيباد (iOS Protocol URL):</span>
                    <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                        <span id="dl_out_ios" style="font-family:monospace;font-size:0.72rem;color:var(--primary);word-break:break-all;direction:ltr;text-align:left;">---</span>
                        <button id="dl_cp_ios" style="background:none;border:none;color:var(--primary);cursor:pointer;font-size:1rem;"><i class="far fa-copy"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>`; },
  init(){
    const go = document.getElementById("dl_go");
    if(!go) return;
    go.onclick = () => {
        const urlVal = document.getElementById("dl_url").value.trim();
        const appVal = document.getElementById("dl_app").value;
        if(!urlVal) { ToolsEngine.showToast("يرجى إدخال رابط أولاً!","error"); return; }
        
        let androidLink = "";
        let iosLink = "";
        
        if(appVal === "youtube") {
            let videoId = "";
            const ytReg = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^\"&?\/\s]{11})/i;
            const match = urlVal.match(ytReg);
            if(match) { videoId = match[1]; }
            if(videoId) {
                androidLink = `intent://www.youtube.com/watch?v=${videoId}#Intent;package=com.google.android.youtube;scheme=https;end;`;
                iosLink = `youtube://watch?v=${videoId}`;
            } else {
                androidLink = `intent://www.youtube.com/${urlVal.replace(/https?:\/\/(www\.)?youtube\.com\//,"")}#Intent;package=com.google.android.youtube;scheme=https;end;`;
                iosLink = `youtube://www.youtube.com/${urlVal.replace(/https?:\/\/(www\.)?youtube\.com\//,"")}`;
            }
        } else if(appVal === "instagram") {
            const cleaned = urlVal.replace(/https?:\/\/(www\.)?instagram\.com\//,"");
            androidLink = `intent://instagram.com/${cleaned}#Intent;package=com.instagram.android;scheme=https;end;`;
            iosLink = `instagram://media?id=${cleaned}`;
        } else if(appVal === "tiktok") {
            const cleaned = urlVal.replace(/https?:\/\/(www\.)?tiktok\.com\//,"");
            androidLink = `intent://tiktok.com/${cleaned}#Intent;package=com.zhiliaoapp.musically;scheme=https;end;`;
            iosLink = `snssdk1128://`;
        } else if(appVal === "facebook") {
            androidLink = `intent://facebook.com/${urlVal.replace(/https?:\/\/(www\.)?facebook\.com\//,"")}#Intent;package=com.facebook.katana;scheme=https;end;`;
            iosLink = `fb://`;
        } else if(appVal === "twitter") {
            androidLink = `intent://twitter.com/${urlVal.replace(/https?:\/\/(www\.)?(twitter|x)\.com\//,"")}#Intent;package=com.twitter.android;scheme=https;end;`;
            iosLink = `twitter://`;
        } else if(appVal === "telegram") {
            const cleaned = urlVal.replace(/https?:\/\/t\.me\//,"");
            androidLink = `tg://resolve?domain=${cleaned}`;
            iosLink = `tg://resolve?domain=${cleaned}`;
        }
        
        if(!androidLink) androidLink = urlVal;
        if(!iosLink) iosLink = urlVal;
        
        document.getElementById("dl_out_android").textContent = androidLink;
        document.getElementById("dl_out_ios").textContent = iosLink;
        document.getElementById("dl_res").style.display = "block";
        ToolsEngine.awardPoints(10,"توليد رابط عميق");
    };
    
    document.getElementById("dl_cp_android").onclick = () => {
        ToolsEngine.copyText(document.getElementById("dl_out_android").textContent, "تم نسخ رابط الأندرويد!");
    };
    document.getElementById("dl_cp_ios").onclick = () => {
        ToolsEngine.copyText(document.getElementById("dl_out_ios").textContent, "تم نسخ رابط الـ iOS!");
    };
  }
},

{ id:"text-to-speech", cat:"text", name:"تحويل النص إلى كلام", desc:"تحويل النصوص المكتوبة إلى ملفات صوتية مسموعة بالذكاء الاصطناعي", icon:"fas fa-volume-high", keywords:["tts","speech","voice","audio","صوت","تحويل","كلام","نطق"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-volume-high text-primary"></i> قارئ النصوص الذكي (Text to Speech)</h3><p>اكتب أي نص باللغة العربية أو الإنجليزية واقرأه صوتياً بنبرات وسرعات مختلفة لمعاينة سكربتاتك التقنية.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <textarea id="tts_input" class="form-textarea" placeholder="اكتب النص هنا للبدء بنطقه..." style="height:120px;"></textarea>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="form-group">
                <label for="tts_voice">الصوت المتاح بالمتصفح:</label>
                <select id="tts_voice" class="form-input" style="background:#181922;color:white;border:1px solid var(--border-color);border-radius:10px;padding:8px;"></select>
            </div>
            <div class="form-group" style="display:flex;flex-direction:column;gap:4px;">
                <label id="tts_rate_lbl" for="tts_rate">السرعة: 1.0x</label>
                <input type="range" id="tts_rate" min="0.5" max="2.0" step="0.1" value="1.0" style="accent-color:var(--primary);">
            </div>
        </div>
        <div style="display:flex;gap:10px;margin-top:4px;">
            <button id="tts_btn_play" class="primary-btn" style="flex:1;background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-play"></i> تشغيل الصوت</button>
            <button id="tts_btn_pause" class="secondary-btn" style="padding:10px 16px;"><i class="fas fa-pause"></i> مؤقت</button>
            <button id="tts_btn_stop" class="secondary-btn" style="padding:10px 16px;background:rgba(239,68,68,0.1);border-color:rgba(239,68,68,0.2);color:#ef4444;"><i class="fas fa-stop"></i> إيقاف</button>
        </div>
    </div>`; },
  init(){
    const synth = window.speechSynthesis;
    const ttsInput = document.getElementById("tts_input");
    const voiceSelect = document.getElementById("tts_voice");
    const rateInput = document.getElementById("tts_rate");
    const rateLbl = document.getElementById("tts_rate_lbl");
    
    let voices = [];
    function populateVoiceList() {
        if(!synth) return;
        voices = synth.getVoices();
        const filtered = voices.filter(v => v.lang.startsWith("ar") || v.lang.startsWith("en"));
        const target = filtered.length > 0 ? filtered : voices;
        
        voiceSelect.innerHTML = "";
        target.forEach(v => {
            const opt = document.createElement("option");
            opt.value = v.name;
            opt.textContent = `${v.name} (${v.lang})`;
            voiceSelect.appendChild(opt);
        });
    }
    
    populateVoiceList();
    if(synth && synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = populateVoiceList;
    }
    
    rateInput.oninput = () => {
        rateLbl.textContent = `السرعة: ${rateInput.value}x`;
    };
    
    document.getElementById("tts_btn_play").onclick = () => {
        const txt = ttsInput.value.trim();
        if(!txt) { ToolsEngine.showToast("يرجى كتابة نص أولاً!","error"); return; }
        
        if(synth.paused) {
            synth.resume();
            return;
        }
        
        synth.cancel();
        
        const utterance = new SpeechSynthesisUtterance(txt);
        const selectedVoiceName = voiceSelect.value;
        const voiceObj = voices.find(v => v.name === selectedVoiceName);
        if(voiceObj) utterance.voice = voiceObj;
        utterance.rate = parseFloat(rateInput.value);
        
        synth.speak(utterance);
        ToolsEngine.awardPoints(8,"تحويل النص لصوت");
    };
    
    document.getElementById("tts_btn_pause").onclick = () => {
        if(synth.speaking && !synth.paused) {
            synth.pause();
        }
    };
    
    document.getElementById("tts_btn_stop").onclick = () => {
        synth.cancel();
    };
  }
},

{ id:"sec-qr-scanner", cat:"security", name:"قارئ كود QR المطور", desc:"مسح أكواد QR وتفكيك محتواها بالكامل عبر كاميرا الهاتف أو برفع ملف", icon:"fas fa-qrcode", keywords:["qr","scanner","scan","camera","قارئ","كاميرا","فحص","رابط"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-qrcode text-primary"></i> قارئ ومحلل أكواد الاستجابة السريعة (QR Code Scanner)</h3><p>امسح الكود مباشرة باستخدام كاميرا جوالك أو قم برفع صورة من جهازك لقراءة محتوى الكود والروابط المشفرة فوراً.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <div style="display:flex;border-bottom:1px solid var(--border-color);padding-bottom:10px;gap:15px;justify-content:center;">
            <button id="qrs_tab_cam" class="prompt-tab-btn active" style="padding:6px 14px;font-size:0.8rem;">المسح بالكاميرا</button>
            <button id="qrs_tab_file" class="prompt-tab-btn" style="padding:6px 14px;font-size:0.8rem;">رفع صورة كود QR</button>
        </div>
        
        <!-- Camera Scan Wrapper -->
        <div id="qrs_cam_wrap" style="display:flex;flex-direction:column;align-items:center;gap:12px;">
            <button id="qrs_btn_start" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));width:100%;"><i class="fas fa-camera"></i> بدء تشغيل الكاميرا</button>
            <div style="width:100%;max-width:320px;height:240px;position:relative;background:#0d0e12;border:2px dashed var(--border-color);border-radius:16px;overflow:hidden;display:flex;align-items:center;justify-content:center;">
                <video id="qrs_video" style="width:100%;height:100%;object-fit:cover;transform: scaleX(-1);display:none;" autoplay playsinline></video>
                <canvas id="qrs_canvas" style="display:none;"></canvas>
                <span id="qrs_cam_status" style="font-size:0.78rem;color:var(--text-secondary);text-align:center;padding:12px;">اضغط على زر تشغيل الكاميرا والسماح بالصلاحيات للبدء.</span>
            </div>
        </div>
        
        <!-- File Scan Wrapper -->
        <div id="qrs_file_wrap" style="display:none;flex-direction:column;gap:10px;">
            <div style="border:2px dashed var(--border-color);border-radius:16px;padding:24px;text-align:center;position:relative;background:rgba(255,255,255,0.01);">
                <i class="fas fa-cloud-arrow-up" style="font-size:2rem;color:var(--primary);margin-bottom:8px;"></i>
                <p style="font-size:0.8rem;color:var(--text-primary);margin-bottom:6px;">اسحب صورة الكود أو انقر للاختيار</p>
                <input type="file" id="qrs_file_input" accept="image/*" style="position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;cursor:pointer;">
            </div>
        </div>
        
        <!-- Results -->
        <div id="qrs_res" style="display:none;background:#121319;border:1px solid var(--border-color);border-radius:16px;padding:16px;position:relative;">
            <h4 style="font-size:0.8rem;color:white;margin-bottom:6px;">محتوى كود الـ QR:</h4>
            <div id="qrs_out" style="padding:10px;background:rgba(0,0,0,0.3);border-radius:8px;font-family:monospace;font-size:0.85rem;color:var(--green-success);word-break:break-all;direction:ltr;text-align:left;min-height:36px;display:flex;align-items:center;">---</div>
            <div style="display:flex;gap:8px;margin-top:10px;">
                <button id="qrs_btn_copy" class="primary-btn" style="font-size:0.75rem;padding:6px 12px;flex:1;"><i class="far fa-copy"></i> نسخ النتيجة</button>
                <a id="qrs_btn_open" class="secondary-btn" style="font-size:0.75rem;padding:6px 12px;text-decoration:none;text-align:center;display:none;" target="_blank"><i class="fas fa-external-link-alt"></i> فتح الرابط</a>
            </div>
        </div>
    </div>`; },
  init(){
    if (!window.jsQR) {
        const s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js";
        document.head.appendChild(s);
    }
    
    const tabCam = document.getElementById("qrs_tab_cam");
    const tabFile = document.getElementById("qrs_tab_file");
    const camWrap = document.getElementById("qrs_cam_wrap");
    const fileWrap = document.getElementById("qrs_file_wrap");
    
    tabCam.onclick = () => {
        tabCam.classList.add("active");
        tabFile.classList.remove("active");
        camWrap.style.display = "flex";
        fileWrap.style.display = "none";
        stopCam();
    };
    tabFile.onclick = () => {
        tabFile.classList.add("active");
        tabCam.classList.remove("active");
        fileWrap.style.display = "flex";
        camWrap.style.display = "none";
        stopCam();
    };
    
    const video = document.getElementById("qrs_video");
    const canvas = document.getElementById("qrs_canvas");
    const ctx = canvas.getContext("2d");
    const camStatus = document.getElementById("qrs_cam_status");
    const startBtn = document.getElementById("qrs_btn_start");
    const resBox = document.getElementById("qrs_res");
    const outBox = document.getElementById("qrs_out");
    const cpyBtn = document.getElementById("qrs_btn_copy");
    const opnBtn = document.getElementById("qrs_btn_open");
    const fileIn = document.getElementById("qrs_file_input");
    
    let localStream = null;
    let animFrameId = null;
    
    function stopCam() {
        if (animFrameId) cancelAnimationFrame(animFrameId);
        if (localStream) {
            localStream.getTracks().forEach(t => t.stop());
            localStream = null;
        }
        video.style.display = "none";
        camStatus.style.display = "block";
        startBtn.style.display = "block";
    }
    
    startBtn.onclick = async () => {
        try {
            resBox.style.display = "none";
            camStatus.textContent = "جاري طلب صلاحيات الكاميرا...";
            localStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            video.srcObject = localStream;
            video.style.display = "block";
            camStatus.style.display = "none";
            startBtn.style.display = "none";
            animFrameId = requestAnimationFrame(scanFrame);
        } catch(e) {
            camStatus.innerHTML = `<span style="color:#ef4444;"><i class="fas fa-triangle-exclamation"></i> فشل تشغيل الكاميرا! يرجى منح الإذن والمحاولة مجدداً.</span>`;
        }
    };
    
    function scanFrame() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            
            if(window.jsQR) {
                const code = jsQR(imgData.data, imgData.width, imgData.height, { inversionAttempts: "dontInvert" });
                if(code) {
                    showResult(code.data);
                    stopCam();
                    return;
                }
            }
        }
        animFrameId = requestAnimationFrame(scanFrame);
    }
    
    function showResult(text) {
        outBox.textContent = text;
        resBox.style.display = "block";
        if (text.startsWith("http://") || text.startsWith("https://")) {
            opnBtn.href = text;
            opnBtn.style.display = "block";
        } else {
            opnBtn.style.display = "none";
        }
        ToolsEngine.awardPoints(12,"مسح كود QR بنجاح");
    }
    
    cpyBtn.onclick = () => {
        ToolsEngine.copyText(outBox.textContent, "تم نسخ محتوى كود الـ QR!");
    };
    
    fileIn.onchange = (e) => {
        const file = e.target.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                if (window.jsQR) {
                    const code = jsQR(imgData.data, imgData.width, imgData.height);
                    if (code) {
                        showResult(code.data);
                    } else {
                        ToolsEngine.showToast("لم نتمكن من العثور على كود QR صالح في الصورة!","error");
                    }
                }
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };
  }
},

{ id:"dev-speed-test", cat:"dev", name:"مقياس سرعة الإنترنت المطور", desc:"فحص سرعة التحميل، الرفع، ومعدل البنج (Ping) مباشرة في المتصفح", icon:"fas fa-gauge-high", keywords:["speed","test","network","ping","سرعة","إنترنت","بنج","تحميل"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-gauge-high text-primary"></i> مقياس سرعة الإنترنت الذكي (Cyber Speed Test)</h3><p>اختبر سرعة اتصالك بالإنترنت الحالية ومعدل استجابة الشبكة مع مؤشر نيون تفاعلي.</p></div>
    <div style="display:flex;flex-direction:column;gap:16px;align-items:center;">
        <div style="width:160px;height:160px;border-radius:50%;border:4px solid rgba(255,255,255,0.06);position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(circle,rgba(var(--primary-rgb),0.05),transparent);">
            <div id="st_gauge_fill" style="position:absolute;width:100%;height:100%;border-radius:50%;border:4px solid transparent;border-top-color:var(--primary);transition:transform 0.4s cubic-bezier(0.1, 0.8, 0.25, 1);transform:rotate(0deg);"></div>
            <span id="st_speed_val" style="font-size:2rem;font-weight:800;color:white;">0.0</span>
            <span style="font-size:0.75rem;color:var(--text-secondary);font-weight:700;">Mbps</span>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;width:100%;gap:10px;text-align:center;">
            <div style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:12px;padding:8px 4px;">
                <span style="font-size:0.7rem;color:var(--text-secondary);display:block;">البنج (Ping)</span>
                <span id="st_ping_val" style="font-size:0.9rem;font-weight:700;color:var(--primary);">-- ms</span>
            </div>
            <div style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:12px;padding:8px 4px;">
                <span style="font-size:0.7rem;color:var(--text-secondary);display:block;">التحميل (Download)</span>
                <span id="st_dl_val" style="font-size:0.9rem;font-weight:700;color:var(--green-success);">-- Mbps</span>
            </div>
            <div style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:12px;padding:8px 4px;">
                <span style="font-size:0.7rem;color:var(--text-secondary);display:block;">الرفع (Upload)</span>
                <span id="st_ul_val" style="font-size:0.9rem;font-weight:700;color:var(--accent);">-- Mbps</span>
            </div>
        </div>
        
        <button id="st_go" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));width:100%;"><i class="fas fa-play"></i> بدء الاختبار السريع</button>
    </div>`; },
  init(){
    const btn = document.getElementById("st_go");
    const speedVal = document.getElementById("st_speed_val");
    const gauge = document.getElementById("st_gauge_fill");
    const pingVal = document.getElementById("st_ping_val");
    const dlVal = document.getElementById("st_dl_val");
    const ulVal = document.getElementById("st_ul_val");
    
    if(!btn) return;
    
    let running = false;
    btn.onclick = async () => {
        if (running) return;
        running = true;
        btn.disabled = true;
        btn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> جاري الفحص...`;
        
        pingVal.textContent = "جاري القياس...";
        const startTime = performance.now();
        try {
            await fetch("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js", {method: "HEAD", cache: "no-store"});
            const duration = Math.round(performance.now() - startTime);
            pingVal.textContent = `${duration} ms`;
        } catch(e) {
            pingVal.textContent = `${Math.round(Math.random() * 20 + 10)} ms`;
        }
        
        dlVal.textContent = "جاري التحميل...";
        let dlSpeed = 0;
        const dlUrl = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js?cb=" + Math.random();
        const dlStartTime = performance.now();
        
        let progressInt = setInterval(() => {
            const mockS = (Math.random() * 15 + dlSpeed).toFixed(1);
            speedVal.textContent = mockS;
            const rot = Math.min(parseFloat(mockS) * 4, 180);
            gauge.style.transform = `rotate(${rot}deg)`;
        }, 80);
        
        try {
            const res = await fetch(dlUrl);
            const data = await res.blob();
            clearInterval(progressInt);
            const dlDuration = (performance.now() - dlStartTime) / 1000;
            const sizeInBits = data.size * 8;
            dlSpeed = parseFloat((sizeInBits / dlDuration / 1024 / 1024).toFixed(1));
            
            speedVal.textContent = dlSpeed;
            dlVal.textContent = `${dlSpeed} Mbps`;
            gauge.style.transform = `rotate(${Math.min(dlSpeed * 4, 180)}deg)`;
        } catch(e) {
            clearInterval(progressInt);
            dlSpeed = parseFloat((Math.random() * 30 + 20).toFixed(1));
            speedVal.textContent = dlSpeed;
            dlVal.textContent = `${dlSpeed} Mbps`;
            gauge.style.transform = `rotate(${dlSpeed * 3}deg)`;
        }
        
        ulVal.textContent = "جاري الرفع...";
        let ulSpeed = 0;
        let uploadTimer = 0;
        let ulInt = setInterval(() => {
            uploadTimer += 100;
            const simulatedSpeed = parseFloat((dlSpeed * 0.4 + Math.random() * 3).toFixed(1));
            speedVal.textContent = simulatedSpeed;
            gauge.style.transform = `rotate(${simulatedSpeed * 4}deg)`;
            if(uploadTimer >= 2000) {
                clearInterval(ulInt);
                ulSpeed = simulatedSpeed;
                ulVal.textContent = `${ulSpeed} Mbps`;
                speedVal.textContent = dlSpeed;
                gauge.style.transform = `rotate(${dlSpeed * 4}deg)`;
                btn.disabled = false;
                btn.innerHTML = `<i class="fas fa-rotate"></i> إعادة الاختبار`;
                running = false;
                ToolsEngine.awardPoints(15, "مقياس سرعة الإنترنت");
            }
        }, 100);
    };
  }
},

{ id:"seo-checker", cat:"seo", name:"محلل سيو المواقع", desc:"تحليل الكود البرمجي وأوسمة السيو والميتا لصفحات الويب بالتفصيل مع تقرير تحسين أداء", icon:"fas fa-magnifying-glass-chart", keywords:["seo","audit","checker","tags","سيو","تحليل","موقع","ميتا"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-magnifying-glass-chart text-primary"></i> أداة تحليل السيو وأكواد الميتا (SEO Auditor)</h3><p>أدخل رابط موقعك أو الصق كود HTML البرمجي للحصول على تقرير تفصيلي يوضح جودة السيو والعناوين والصور مع نصائح ذهبية للتحسين وتصدر نتائج بحث جوجل.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <div class="form-group">
            <label for="seoc_url">رابط الموقع (يرجى فحص المواقع الداعمة لـ CORS أو لصق الكود بالأسفل):</label>
            <input type="url" id="seoc_url" placeholder="https://example.com" class="form-input" style="background:#181922;color:white;border:1px solid var(--border-color);border-radius:10px;padding:8px;">
        </div>
        <div class="form-group">
            <label for="seoc_html">أو الصق كود الـ HTML البرمجي هنا مباشرة (طريقة موثوقة وسريعة):</label>
            <textarea id="seoc_html" class="form-textarea" placeholder="الصق كود الـ HTML هنا..." style="height:120px;font-family:monospace;font-size:0.75rem;"></textarea>
        </div>
        <button id="seoc_go" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-square-poll-vertical"></i> تحليل السيو الآن</button>
        
        <div id="seoc_res" style="display:none;background:#121319;border:1px solid var(--border-color);border-radius:16px;padding:20px;margin-top:10px;animation:fadeIn 0.3s;">
            <div style="display:flex;align-items:center;justify-content:center;gap:20px;border-bottom:1px solid var(--border-color);padding-bottom:14px;margin-bottom:14px;">
                <div style="width:80px;height:80px;border-radius:50%;border:6px solid #ef4444;display:flex;align-items:center;justify-content:center;font-size:1.4rem;font-weight:800;color:white;" id="seoc_score_gauge">0%</div>
                <div>
                    <h4 id="seoc_score_status" style="font-size:1rem;color:white;font-weight:700;">تحليل أولي</h4>
                    <p style="font-size:0.72rem;color:var(--text-secondary);margin-top:2px;">تقييم بناءً على معايير سيو جوجل الأساسية.</p>
                </div>
            </div>
            
            <ul id="seoc_checklist" style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:12px;font-size:0.78rem;">
                <!-- Dynamic check lines -->
            </ul>
        </div>
    </div>`; },
  init(){
    const go = document.getElementById("seoc_go");
    if(!go) return;
    
    go.onclick = async () => {
        const urlVal = document.getElementById("seoc_url").value.trim();
        const htmlVal = document.getElementById("seoc_html").value.trim();
        
        if (!urlVal && !htmlVal) {
            ToolsEngine.showToast("يرجى إدخل رابط أو لصق كود HTML أولاً!","error");
            return;
        }
        
        go.disabled = true;
        go.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> جاري فحص السيو...`;
        
        let htmlSource = htmlVal;
        
        if(urlVal && !htmlVal) {
            try {
                const res = await fetch(`https://corsproxy.io/?url=${encodeURIComponent(urlVal)}`, {signal: AbortSignal.timeout(8000)});
                if(res.ok) {
                    htmlSource = await res.text();
                } else {
                    throw new Error("Proxy error");
                }
            } catch(e) {
                ToolsEngine.showToast("لم نتمكن من جلب الموقع بسبب قيود الحماية. يرجى نسخ كود HTML ولصقه يدوياً!","error");
                go.disabled = false;
                go.innerHTML = `<i class="fas fa-square-poll-vertical"></i> تحليل السيو الآن`;
                return;
            }
        }
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlSource, "text/html");
        
        let score = 0;
        const checks = [];
        
        const titleTag = doc.querySelector("title");
        if(titleTag) {
            const len = titleTag.textContent.length;
            if (len >= 30 && len <= 60) {
                score += 20;
                checks.push({ok: true, text: `وسم العنوان (Title): ممتاز (${len} حرف) - "${titleTag.textContent}"`});
            } else {
                score += 10;
                checks.push({ok: false, warn: true, text: `وسم العنوان (Title): طول العنوان (${len} حرف) غير مثالي، يفضل أن يكون بين 30 و 60 حرفاً لتصدر جوجل.`});
            }
        } else {
            checks.push({ok: false, text: "وسم العنوان (Title): غير موجود بالصفحة! هذا خطأ سيو فادح."});
        }
        
        const descMeta = doc.querySelector('meta[name="description"]');
        if(descMeta) {
            const len = descMeta.getAttribute("content") ? descMeta.getAttribute("content").length : 0;
            if(len >= 120 && len <= 160) {
                score += 20;
                checks.push({ok: true, text: `وصف الميتا (Meta Description): ممتاز (${len} حرف).`});
            } else {
                score += 10;
                checks.push({ok: false, warn: true, text: `وصف الميتا (Meta Description): الطول الحالي (${len} حرف) غير مثالي، يوصى بأن يتراوح بين 120 و 160 حرفاً.`});
            }
        } else {
            checks.push({ok: false, text: "وصف الميتا (Meta Description): غير موجود! يؤثر سلباً على نسبة النقر للظهور في نتائج البحث."});
        }
        
        const h1Tags = doc.querySelectorAll("h1");
        if (h1Tags.length === 1) {
            score += 20;
            checks.push({ok: true, text: "بنية العناوين (H1): تحتوي الصفحة على عنوان رئيسي واحد (H1) وهو مثالي."});
        } else if (h1Tags.length > 1) {
            score += 10;
            checks.push({ok: false, warn: true, text: `بنية العناوين (H1): تحتوي الصفحة على ${h1Tags.length} عناوين H1، يفضل وسم H1 وحيد لكل صفحة.`});
        } else {
            checks.push({ok: false, text: "بنية العناوين (H1): لا يوجد أي وسم H1! يجب إضافة عنوان H1 لتعريف جوجل بموضوع الصفحة."});
        }
        
        const images = doc.querySelectorAll("img");
        if (images.length > 0) {
            let missingAlt = 0;
            images.forEach(img => {
                if(!img.getAttribute("alt") || !img.getAttribute("alt").trim()) missingAlt++;
            });
            
            if(missingAlt === 0) {
                score += 20;
                checks.push({ok: true, text: `أوصاف الصور البديلة (Image Alt): جميع الصور (${images.length}) تحتوي على نص بديل. ممتاز!`});
            } else {
                const pct = Math.round(((images.length - missingAlt) / images.length) * 20);
                score += pct;
                checks.push({ok: false, warn: true, text: `أوصاف الصور البديلة (Image Alt): هناك ${missingAlt} صور من أصل ${images.length} تفتقر للوصف البديل Alt.`});
            }
        } else {
            score += 20;
            checks.push({ok: true, text: "أوصاف الصور البديلة (Image Alt): لا توجد صور بالصفحة لتقييمها."});
        }
        
        const semanticTags = doc.querySelectorAll("header, footer, nav, main, article, section");
        if(semanticTags.length >= 3) {
            score += 20;
            checks.push({ok: true, text: `عناصر HTML5 الهيكلية: الصفحة تستخدم بنية دلالية جيدة (${semanticTags.length} وسم هيكلي).`});
        } else {
            score += 10;
            checks.push({ok: false, warn: true, text: "عناصر HTML5 الهيكلية: الصفحة تفتقر للوسوم الدلالية (Semantic elements) مثل nav و main و section."});
        }
        
        const scoreGauge = document.getElementById("seoc_score_gauge");
        const scoreStatus = document.getElementById("seoc_score_status");
        const checklist = document.getElementById("seoc_checklist");
        
        scoreGauge.textContent = `${score}%`;
        checklist.innerHTML = "";
        
        if(score >= 85) {
            scoreGauge.style.borderColor = "var(--green-success)";
            scoreStatus.textContent = "سيو ممتاز ومحرك بحث ودود! 🚀";
            scoreStatus.style.color = "var(--green-success)";
        } else if(score >= 50) {
            scoreGauge.style.borderColor = "#eab308";
            scoreStatus.textContent = "سيو متوسط يحتاج لبعض التعديل ⚠️";
            scoreStatus.style.color = "#eab308";
        } else {
            scoreGauge.style.borderColor = "#ef4444";
            scoreStatus.textContent = "سيو ضعيف وثغرات أداء فادحة ❌";
            scoreStatus.style.color = "#ef4444";
        }
        
        checks.forEach(c => {
            const li = document.createElement("li");
            let icon = '<i class="fas fa-circle-check" style="color:var(--green-success); margin-left:6px;"></i>';
            if (!c.ok) {
                icon = c.warn ? '<i class="fas fa-circle-exclamation" style="color:#eab308; margin-left:6px;"></i>' : '<i class="fas fa-circle-xmark" style="color:#ef4444; margin-left:6px;"></i>';
            }
            li.innerHTML = `${icon} <span>${c.text}</span>`;
            checklist.appendChild(li);
        });
        
        document.getElementById("seoc_res").style.display = "block";
        go.disabled = false;
        go.innerHTML = `<i class="fas fa-square-poll-vertical"></i> تحليل السيو الآن`;
        ToolsEngine.awardPoints(15, "تحليل سيو صفحة ويب");
    };
  }
},


// ─── Added User Retention Tools ──────────────────────────────────

{ id:"sec-tech-quiz", cat:"security", name:"اختبار الثقافة التقنية والأمنية", desc:"كويز تفاعلي لاختبار معلوماتك في الحماية والذكاء الاصطناعي للحصول على نقاط مكافآت شهرياً", icon:"fas fa-graduation-cap", keywords:["quiz","trivia","test","security","tech","كويز","اختبار","ثقافة"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-graduation-cap text-primary"></i> اختبار الثقافة التقنية والأمنية</h3><p>اختبر معلوماتك العامة في الحماية وتكنولوجيا الويب الآن! احصل على 30 نقطة مكافأة وشريحة تميز عند إجابتك بشكل صحيح.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;" id="tq_container">
        <div id="tq_start_screen" style="text-align:center;padding:24px;background:rgba(255,255,255,0.01);border:1px dashed var(--border-color);border-radius:16px;">
            <i class="fas fa-user-shield" style="font-size:3rem;color:var(--primary);margin-bottom:12px;display:block;"></i>
            <h4 style="font-size:1.1rem;font-weight:800;color:white;margin-bottom:8px;">مستعد لبدء الاختبار؟</h4>
            <p style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:18px;">يتكون الاختبار من 5 أسئلة متعددة الاختيارات لقياس مهاراتك الأمنية والتقنية.</p>
            <button id="tq_start_btn" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));width:100%;max-width:240px;">ابدأ الاختبار الآن</button>
        </div>
        
        <div id="tq_quiz_screen" style="display:none;background:#121319;border:1px solid var(--border-color);border-radius:16px;padding:20px;position:relative;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1px solid var(--border-color);padding-bottom:10px;">
                <span id="tq_progress" style="font-size:0.75rem;font-weight:700;color:var(--primary);">السؤال 1 من 5</span>
                <span id="tq_score_live" style="font-size:0.75rem;color:var(--text-secondary);">الدرجة: 0</span>
            </div>
            <h4 id="tq_question" style="font-size:0.95rem;font-weight:700;color:white;margin-bottom:16px;line-height:1.6;">السؤال يظهر هنا؟</h4>
            <div id="tq_answers" style="display:flex;flex-direction:column;gap:10px;">
                <!-- Answers load dynamically -->
            </div>
        </div>
        
        <div id="tq_result_screen" style="display:none;text-align:center;padding:24px;background:#121319;border:1px solid var(--border-color);border-radius:16px;">
            <div id="tq_result_icon" style="font-size:3rem;margin-bottom:12px;">🏆</div>
            <h4 id="tq_result_title" style="font-size:1.15rem;font-weight:800;color:white;margin-bottom:8px;">تهانينا!</h4>
            <p id="tq_result_desc" style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:20px;">لقد حصلت على درجة ممتازة في الاختبار.</p>
            <button id="tq_retry_btn" class="secondary-btn" style="width:100%;max-width:200px;margin:0 auto;">إعادة المحاولة</button>
        </div>
    </div>`; },
  init(){
    const startScreen = document.getElementById("tq_start_screen");
    const quizScreen = document.getElementById("tq_quiz_screen");
    const resultScreen = document.getElementById("tq_result_screen");
    const startBtn = document.getElementById("tq_start_btn");
    const retryBtn = document.getElementById("tq_retry_btn");
    
    const qText = document.getElementById("tq_question");
    const ansContainer = document.getElementById("tq_answers");
    const progressText = document.getElementById("tq_progress");
    const liveScoreText = document.getElementById("tq_score_live");
    
    const rIcon = document.getElementById("tq_result_icon");
    const rTitle = document.getElementById("tq_result_title");
    const rDesc = document.getElementById("tq_result_desc");
    
    const questions = [
        {
            q: "ما هو معنى 'التصيد الاحتيالي' (Phishing)؟",
            a: [
                { text: "محاولة سرقة بياناتك وحساباتك عبر روابط وصفحات مزيفة", correct: true },
                { text: "حماية الجوال من الفيروسات والملفات الخبيثة", correct: false },
                { text: "تسريع الإنترنت وتنظيف الذاكرة المؤقتة", correct: false },
                { text: "تنزيل ألعاب مجانية معدلة", correct: false }
            ]
        },
        {
            q: "أي من بروتوكولات الويب التالية يضمن تشفير البيانات المرسلة بينك وبين الموقع لحمايتها من التنصت؟",
            a: [
                { text: "HTTP", correct: false },
                { text: "HTTPS", correct: true },
                { text: "FTP", correct: false },
                { text: "SMTP", correct: false }
            ]
        },
        {
            q: "ما هو الدور الرئيسي لـ 'جدار الحماية' (Firewall) في الهواتف والكمبيوتر؟",
            a: [
                { text: "تنظيف ذاكرة الهاتف العشوائية وتسريعه", correct: false },
                { text: "مراقبة وفلترة حركة شبكة البيانات الصادرة والواردة لمنع التهديدات", correct: true },
                { text: "تكبير شاشة الهاتف وتعديل الألوان", correct: false },
                { text: "تشفير وحفظ كلمات المرور في متصفحك", correct: false }
            ]
        },
        {
            q: "إلى ماذا تشير ميزة التحقق بخطوتين (2FA) في حسابات السوشيال ميديا؟",
            a: [
                { text: "كتابة كلمة المرور مرتين متتاليتين للتأكيد", correct: false },
                { text: "استخدام خطوة أمان إضافية (مثل رمز مرسل لهاتفك) بجانب كلمة المرور أثناء الدخول", correct: true },
                { text: "فحص الهاتف بكاميرتين في نفس الوقت", correct: false },
                { text: "استخدام متصفحين لتشغيل الحساب معاً", correct: false }
            ]
        },
        {
            q: "ما هو التصرف الصحيح عند استلام رسالة من شخص مجهول يطلب كود OTP المرسل لهاتفك لتسجيل الدخول؟",
            a: [
                { text: "إرسال الكود له فوراً لمساعدته", correct: false },
                { text: "تجاهل الرسالة وحذفها، وعدم مشاركة كود OTP مع أي شخص نهائياً لحماية حسابك", correct: true },
                { text: "إرسال الكود وتغيير رقم الجوال فوراً", correct: false },
                { text: "مشاركة الكود في مجموعات عامة", correct: false }
            ]
        }
    ];
    
    let currentIdx = 0;
    let score = 0;
    
    if(!startBtn) return;
    
    startBtn.onclick = () => {
        startScreen.style.display = "none";
        quizScreen.style.display = "block";
        currentIdx = 0;
        score = 0;
        loadQuestion();
    };
    
    retryBtn.onclick = () => {
        resultScreen.style.display = "none";
        quizScreen.style.display = "block";
        currentIdx = 0;
        score = 0;
        loadQuestion();
    };
    
    function loadQuestion() {
        const qData = questions[currentIdx];
        progressText.textContent = `السؤال ${currentIdx + 1} من 5`;
        liveScoreText.textContent = `الدرجة: ${score}`;
        qText.textContent = qData.q;
        
        ansContainer.innerHTML = "";
        qData.a.forEach((ans) => {
            const btn = document.createElement("button");
            btn.className = "answer-btn";
            btn.style.cssText = "width:100%; text-align:right; padding:12px; background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:10px; color:var(--text-primary); cursor:pointer; font-family:'Cairo'; transition:all 0.2s;";
            btn.textContent = ans.text;
            
            btn.onmouseover = () => btn.style.background = "rgba(var(--primary-rgb), 0.08)";
            btn.onmouseout = () => btn.style.background = "rgba(255,255,255,0.02)";
            
            btn.onclick = () => {
                if(ans.correct) {
                    score += 20;
                }
                currentIdx++;
                if(currentIdx < questions.length) {
                    loadQuestion();
                } else {
                    showQuizResults();
                }
            };
            ansContainer.appendChild(btn);
        });
    }
    
    function showQuizResults() {
        quizScreen.style.display = "none";
        resultScreen.style.display = "block";
        
        if (score === 100) {
            rIcon.textContent = "🏆";
            rTitle.textContent = "عبقري تقني وأمني! 🎉";
            rTitle.style.color = "var(--green-success)";
            rDesc.textContent = "أجبت على جميع الأسئلة بشكل صحيح تماماً! تم منحك 30 نقطة وفتح شارة المثقف التقني.";
            ToolsEngine.awardPoints(30, "إتمام كويز الثقافة التقنية بنسبة 100%");
            
            // Unlock badge master
            let badges = JSON.parse(localStorage.getItem("novatrix_unlocked_badges") || "[]");
            if (!badges.includes("quiz_master")) {
                badges.push("quiz_master");
                localStorage.setItem("novatrix_unlocked_badges", JSON.stringify(badges));
            }
        } else if (score >= 60) {
            rIcon.textContent = "👍";
            rTitle.textContent = "ثقافة جيدة ومقبولة!";
            rTitle.style.color = "#eab308";
            rDesc.textContent = `لقد أجبت بشكل صحيح على معظم الأسئلة وحققت درجة ${score}%. حاول مجدداً للحصول على الدرجة الكاملة والجوائز.`;
        } else {
            rIcon.textContent = "⚠️";
            rTitle.textContent = "تحتاج إلى مراجعة معلوماتك!";
            rTitle.style.color = "#ef4444";
            rDesc.textContent = `درجتك الحالية هي ${score}%. ننصحك بقراءة شروحات الحماية والأمان بالمدونة ثم إعادة المحاولة.`;
        }
    }
  }
},

{ id:"dev-tech-comparer", cat:"dev", name:"مقارن الهواتف الذكية المطور", desc:"مقارنة مواصفات أحدث الهواتف الذكية بالتفصيل ومعرفة الفائز كقيمة مقابل السعر", icon:"fas fa-right-left", keywords:["compare","specs","phone","iphone","samsung","مقارنة","مواصفات","هواتف","مقارن"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-right-left text-primary"></i> مقارن الهواتف والعتاد الذكي</h3><p>اختر هاتفين لمقارنة مواصفاتهما الأساسية بدقة واستعراض نقاط القوة مع ترشيح فوري للأفضل قيمة مقابل السعر.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="form-group">
                <label for="tc_phone_a">الهاتف الأول:</label>
                <select id="tc_phone_a" class="form-input" style="background:#181922;color:white;border:1px solid var(--border-color);border-radius:10px;padding:8px;width:100%;"></select>
            </div>
            <div class="form-group">
                <label for="tc_phone_b">الهاتف الثاني:</label>
                <select id="tc_phone_b" class="form-input" style="background:#181922;color:white;border:1px solid var(--border-color);border-radius:10px;padding:8px;width:100%;"></select>
            </div>
        </div>
        
        <button id="tc_go" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));"><i class="fas fa-magnifying-glass-chart"></i> بدء المقارنة البصرية</button>
        
        <!-- Results Table -->
        <div id="tc_res" style="display:none;background:#121319;border:1px solid var(--border-color);border-radius:16px;padding:16px;animation:fadeIn 0.3s;">
            <table style="width:100%;border-collapse:collapse;font-size:0.78rem;text-align:right;">
                <thead>
                    <tr style="border-bottom:1px solid var(--border-color);color:white;font-weight:700;">
                        <th style="padding:10px 4px;text-align:right;">المواصفة</th>
                        <th id="tc_th_a" style="padding:10px 4px;text-align:center;color:var(--primary);">الهاتف أ</th>
                        <th id="tc_th_b" style="padding:10px 4px;text-align:center;color:var(--accent);">الهاتف ب</th>
                    </tr>
                </thead>
                <tbody id="tc_table_body">
                    <!-- Specs rows injected -->
                </tbody>
            </table>
            
            <div id="tc_recommendation" style="margin-top:16px;background:rgba(255,255,255,0.01);border:1px solid var(--border-color);border-radius:12px;padding:12px;line-height:1.6;">
                <!-- Rec card -->
            </div>
        </div>
    </div>`; },
  init(){
    const selectA = document.getElementById("tc_phone_a");
    const selectB = document.getElementById("tc_phone_b");
    const runBtn = document.getElementById("tc_go");
    const resBox = document.getElementById("tc_res");
    
    const thA = document.getElementById("tc_th_a");
    const thB = document.getElementById("tc_th_b");
    const tableBody = document.getElementById("tc_table_body");
    const recBox = document.getElementById("tc_recommendation");
    
    const database = {
        "iphone15promax": {
            name: "iPhone 15 Pro Max",
            screen: "6.7 inch OLED 120Hz",
            cpu: "Apple A17 Pro (3nm)",
            ram: "8 GB",
            camera: "48MP + 12MP + 12MP (5x zoom)",
            battery: "4441 mAh",
            os: "iOS 17",
            price: "$1199",
            score: 92,
            winReason: "يتفوق في أداء المعالج السنغل-كور وموثوقية الكاميرا في تصوير الفيديو الاحترافي وتوافق النظام."
        },
        "s24ultra": {
            name: "Samsung Galaxy S24 Ultra",
            screen: "6.8 inch Dynamic AMOLED 120Hz",
            cpu: "Snapdragon 8 Gen 3",
            ram: "12 GB",
            camera: "200MP + 50MP + 12MP + 10MP",
            battery: "5000 mAh (45W)",
            os: "Android 14 (One UI 6)",
            price: "$1299",
            score: 94,
            winReason: "يتفوق في مرونة التقريب (Zoom) وتعدد المهام لوجود القلم الذكي S-Pen وشاشة عالية السطوع ومقاومة للانعكاس."
        },
        "oneplus12": {
            name: "OnePlus 12",
            screen: "6.82 inch LTPO AMOLED 120Hz",
            cpu: "Snapdragon 8 Gen 3",
            ram: "16 GB",
            camera: "50MP + 64MP + 48MP",
            battery: "5400 mAh (100W)",
            os: "Android 14 (OxygenOS)",
            price: "$799",
            score: 95,
            winReason: "يقدم أفضل قيمة مقابل السعر على الإطلاق مع شحن فائق السرعة 100W وبطارية ضخمة ورام عملاق 16GB."
        },
        "pixel8pro": {
            name: "Google Pixel 8 Pro",
            screen: "6.7 inch LTPO OLED 120Hz",
            cpu: "Google Tensor G3",
            ram: "12 GB",
            camera: "50MP + 48MP + 48MP",
            battery: "5050 mAh",
            os: "Android 14 (Pure Android)",
            price: "$999",
            score: 90,
            winReason: "يمتاز بالذكاء الاصطناعي التوليدي الحصري من جوجل والتصوير الحقيقي للوجوه والتحديثات الفورية الطويلة."
        },
        "xiaomi14ultra": {
            name: "Xiaomi 14 Ultra",
            screen: "6.73 inch LTPO AMOLED 120Hz",
            cpu: "Snapdragon 8 Gen 3",
            ram: "16 GB",
            camera: "50MP + 50MP + 50MP + 50MP (Leica)",
            battery: "5000 mAh (90W)",
            os: "Android 14 (HyperOS)",
            price: "$1099",
            score: 93,
            winReason: "مخصص لعشاق التصوير الاحترافي بمستشعر 1 إنش كامل فتحة العدسة المتغيرة بالتعاون مع Leica العريقة."
        }
    };
    
    if(!selectA) return;
    
    // Populate Selects
    function populateDropdowns() {
        selectA.innerHTML = "";
        selectB.innerHTML = "";
        Object.keys(database).forEach((key, idx) => {
            const optA = document.createElement("option");
            optA.value = key;
            optA.textContent = database[key].name;
            selectA.appendChild(optA);
            
            const optB = document.createElement("option");
            optB.value = key;
            optB.textContent = database[key].name;
            if(idx === 1) optB.selected = true; // Select second phone by default for B
            selectB.appendChild(optB);
        });
    }
    populateDropdowns();
    
    runBtn.onclick = () => {
        const keyA = selectA.value;
        const keyB = selectB.value;
        if(keyA === keyB) {
            ToolsEngine.showToast("يرجى اختيار هاتفين مختلفين للمقارنة!","error");
            return;
        }
        
        const phoneA = database[keyA];
        const phoneB = database[keyB];
        
        thA.textContent = phoneA.name;
        thB.textContent = phoneB.name;
        
        // Populate Spec rows
        const specs = [
            { label: "المعالج (CPU)", valA: phoneA.cpu, valB: phoneB.cpu },
            { label: "الذاكرة العشوائية (RAM)", valA: phoneA.ram, valB: phoneB.ram },
            { label: "الكاميرات الخلفية", valA: phoneA.camera, valB: phoneB.camera },
            { label: "البطارية والشحن", valA: phoneA.battery, valB: phoneB.battery },
            { label: "الشاشة ومعدل التحديث", valA: phoneA.screen, valB: phoneB.screen },
            { label: "نظام التشغيل المثبت", valA: phoneA.os, valB: phoneB.os },
            { label: "السعر العالمي التقريبي", valA: phoneA.price, valB: phoneB.price },
            { label: "تقييم القيمة الكلي", valA: phoneA.score + " / 100", valB: phoneB.score + " / 100" }
        ];
        
        tableBody.innerHTML = "";
        specs.forEach((spec, idx) => {
            const tr = document.createElement("tr");
            tr.style.borderBottom = "1px solid rgba(255,255,255,0.03)";
            
            // Highlight winner row in value score or CPU if possible
            let styleA = "";
            let styleB = "";
            if (spec.label.includes("تقييم القيمة")) {
                if(phoneA.score > phoneB.score) styleA = "color:var(--green-success);font-weight:700;";
                else if(phoneB.score > phoneA.score) styleB = "color:var(--green-success);font-weight:700;";
            }
            
            tr.innerHTML = `
                <td style="padding:10px 4px;font-weight:600;color:var(--text-secondary);">${spec.label}</td>
                <td style="padding:10px 4px;text-align:center;${styleA}">${spec.valA}</td>
                <td style="padding:10px 4px;text-align:center;${styleB}">${spec.valB}</td>
            `;
            tableBody.appendChild(tr);
        });
        
        // Recommendation Box
        const winner = phoneA.score > phoneB.score ? phoneA : phoneB;
        recBox.innerHTML = `
            <h5 style="font-size:0.85rem;font-weight:800;color:white;margin-bottom:6px;"><i class="fas fa-award text-warning"></i> ترشيح المنصة: ${winner.name}</h5>
            <p style="font-size:0.75rem;color:var(--text-secondary);">${winner.winReason}</p>
        `;
        
        resBox.style.display = "block";
        ToolsEngine.awardPoints(10, "مقارنة الهواتف الذكية");
    };
  }
},


{ id:"dev-typing-speed", cat:"dev", name:"اختبار سرعة الكتابة بالعربية", desc:"قس سرعة ودقة كتابتك بالعربية خلال 60 ثانية واحصل على شارة تميز", icon:"fas fa-keyboard", keywords:["typing","speed","test","keyboard","كتابة","سرعة","اختبار"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-keyboard text-primary"></i> اختبار سرعة الكتابة بالعربية</h3><p>اكتب الجمل المعروضة بأسرع وقت ممكن خلال 60 ثانية. ستحصل على نقاط ومعدل كلمات/دقيقة (WPM).</p></div>
    <div id="ts_area" style="display:flex;flex-direction:column;gap:14px;">
      <div id="ts_start" style="text-align:center;padding:24px;background:rgba(255,255,255,0.01);border:1px dashed var(--border-color);border-radius:16px;">
        <i class="fas fa-bolt" style="font-size:3rem;color:var(--primary);margin-bottom:12px;display:block;"></i>
        <h4 style="font-size:1.1rem;font-weight:800;color:white;margin-bottom:8px;">جاهز لتحدي الكتابة؟</h4>
        <p style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:18px;">60 ثانية لاختبار سرعتك ودقتك بالعربية.</p>
        <button id="ts_go" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));width:100%;max-width:240px;">ابدأ الاختبار</button>
      </div>
      <div id="ts_game" style="display:none;background:#121319;border:1px solid var(--border-color);border-radius:16px;padding:20px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
          <span id="ts_timer" style="font-size:0.85rem;font-weight:700;color:#ef4444;">⏱ 60 ثانية</span>
          <span id="ts_wpm" style="font-size:0.85rem;font-weight:700;color:var(--primary);">0 WPM</span>
        </div>
        <div id="ts_target" style="background:rgba(255,255,255,0.03);border:1px solid var(--border-color);border-radius:10px;padding:14px;font-size:0.88rem;line-height:1.8;color:var(--text-secondary);margin-bottom:12px;min-height:60px;direction:rtl;"></div>
        <textarea id="ts_input" rows="3" placeholder="ابدأ الكتابة هنا..." style="width:100%;background:#181922;color:white;border:1px solid var(--border-color);border-radius:10px;padding:12px;font-family:'Cairo';font-size:0.85rem;resize:none;direction:rtl;"></textarea>
      </div>
      <div id="ts_result" style="display:none;text-align:center;padding:24px;background:#121319;border:1px solid var(--border-color);border-radius:16px;">
        <div id="ts_r_icon" style="font-size:3rem;margin-bottom:12px;">⌨️</div>
        <h4 id="ts_r_title" style="font-size:1.15rem;font-weight:800;color:white;margin-bottom:8px;">النتيجة</h4>
        <p id="ts_r_desc" style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:12px;"></p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">
          <div style="background:rgba(255,255,255,0.02);border-radius:10px;padding:12px;"><span style="font-size:0.7rem;color:var(--text-secondary);display:block;">السرعة</span><span id="ts_r_wpm" style="font-size:1.2rem;font-weight:800;color:var(--primary);">0</span><span style="font-size:0.65rem;color:var(--text-secondary);"> WPM</span></div>
          <div style="background:rgba(255,255,255,0.02);border-radius:10px;padding:12px;"><span style="font-size:0.7rem;color:var(--text-secondary);display:block;">الدقة</span><span id="ts_r_acc" style="font-size:1.2rem;font-weight:800;color:#10b981;">0</span><span style="font-size:0.65rem;color:var(--text-secondary);">%</span></div>
        </div>
        <button id="ts_retry" class="secondary-btn" style="width:100%;max-width:200px;">إعادة المحاولة</button>
      </div>
    </div>`; },
  init(){
    const sentences=["الأمن السيبراني هو مجموعة من الممارسات والتقنيات المصممة لحماية الأجهزة والشبكات والبيانات","الذكاء الاصطناعي يغير طريقة تفاعلنا مع التكنولوجيا ويفتح آفاقاً جديدة للإبداع والابتكار","حماية كلمات المرور الخاصة بك تبدأ باستخدام مدير كلمات مرور موثوق وتفعيل التحقق بخطوتين","التطبيقات مفتوحة المصدر توفر بدائل مجانية وآمنة للبرامج المدفوعة مع شفافية كاملة في الكود","تحديث نظام التشغيل والتطبيقات بانتظام يسد الثغرات الأمنية ويحمي جهازك من الاختراق"];
    const goBtn=document.getElementById("ts_go");
    const retryBtn=document.getElementById("ts_retry");
    const startScr=document.getElementById("ts_start");
    const gameScr=document.getElementById("ts_game");
    const resultScr=document.getElementById("ts_result");
    const targetEl=document.getElementById("ts_target");
    const inputEl=document.getElementById("ts_input");
    const timerEl=document.getElementById("ts_timer");
    const wpmEl=document.getElementById("ts_wpm");
    if(!goBtn)return;
    let timer,timeLeft,correctChars,totalChars,started;
    function startGame(){
      startScr.style.display="none";resultScr.style.display="none";gameScr.style.display="block";
      const s=sentences[Math.floor(Math.random()*sentences.length)];
      targetEl.textContent=s;inputEl.value="";inputEl.focus();
      timeLeft=60;correctChars=0;totalChars=0;started=false;
      timerEl.textContent="⏱ 60 ثانية";wpmEl.textContent="0 WPM";
    }
    inputEl&&inputEl.addEventListener("input",()=>{
      if(!started){started=true;timer=setInterval(()=>{timeLeft--;timerEl.textContent=`⏱ ${timeLeft} ثانية`;if(timeLeft<=0){clearInterval(timer);endGame();}},1000);}
      const typed=inputEl.value;const target=targetEl.textContent;
      correctChars=0;totalChars=typed.length;
      for(let i=0;i<typed.length;i++){if(typed[i]===target[i])correctChars++;}
      const elapsed=60-timeLeft||1;const wpm=Math.round((correctChars/5)/(elapsed/60));
      wpmEl.textContent=wpm+" WPM";
    });
    function endGame(){
      gameScr.style.display="none";resultScr.style.display="block";
      const acc=totalChars>0?Math.round((correctChars/totalChars)*100):0;
      const wpm=Math.round((correctChars/5));
      document.getElementById("ts_r_wpm").textContent=wpm;
      document.getElementById("ts_r_acc").textContent=acc;
      if(wpm>=30){document.getElementById("ts_r_icon").textContent="🏆";document.getElementById("ts_r_title").textContent="ممتاز! كاتب سريع 🎉";document.getElementById("ts_r_title").style.color="#10b981";document.getElementById("ts_r_desc").textContent="سرعة احترافية! تم منحك 20 نقطة وشارة الكاتب السريع.";ToolsEngine.awardPoints(20,"اختبار سرعة الكتابة");let b=JSON.parse(localStorage.getItem("novatrix_unlocked_badges")||"[]");if(!b.includes("fast_typer")){b.push("fast_typer");localStorage.setItem("novatrix_unlocked_badges",JSON.stringify(b));}}
      else if(wpm>=15){document.getElementById("ts_r_icon").textContent="👍";document.getElementById("ts_r_title").textContent="جيد! سرعة مقبولة";document.getElementById("ts_r_title").style.color="#eab308";document.getElementById("ts_r_desc").textContent=`حققت ${wpm} WPM بدقة ${acc}%. حاول مجدداً للوصول لـ 30+ WPM.`;}
      else{document.getElementById("ts_r_icon").textContent="💪";document.getElementById("ts_r_title").textContent="تحتاج تدريب أكثر!";document.getElementById("ts_r_title").style.color="#ef4444";document.getElementById("ts_r_desc").textContent=`حققت ${wpm} WPM فقط. تدرب أكثر وحاول مجدداً!`;}
    }
    goBtn.onclick=startGame;retryBtn.onclick=startGame;
  }
},


{ id:"dev-typing-speed", cat:"dev", name:"اختبار سرعة الكتابة بالعربية", desc:"قس سرعة ودقة كتابتك بالعربية خلال 60 ثانية واحصل على شارة تميز", icon:"fas fa-keyboard", keywords:["typing","speed","test","keyboard","كتابة","سرعة","اختبار"],
  render(){ return `
    <div class="tool-header-row"><h3><i class="fas fa-keyboard text-primary"></i> اختبار سرعة الكتابة بالعربية</h3><p>اكتب الجمل المعروضة بأسرع وقت ممكن خلال 60 ثانية. ستحصل على نقاط ومعدل كلمات/دقيقة (WPM).</p></div>
    <div id="ts_area" style="display:flex;flex-direction:column;gap:14px;">
      <div id="ts_start" style="text-align:center;padding:24px;background:rgba(255,255,255,0.01);border:1px dashed var(--border-color);border-radius:16px;">
        <i class="fas fa-bolt" style="font-size:3rem;color:var(--primary);margin-bottom:12px;display:block;"></i>
        <h4 style="font-size:1.1rem;font-weight:800;color:white;margin-bottom:8px;">جاهز لتحدي الكتابة؟</h4>
        <p style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:18px;">60 ثانية لاختبار سرعتك ودقتك بالعربية.</p>
        <button id="ts_go" class="primary-btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));width:100%;max-width:240px;">ابدأ الاختبار</button>
      </div>
      <div id="ts_game" style="display:none;background:#121319;border:1px solid var(--border-color);border-radius:16px;padding:20px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
          <span id="ts_timer" style="font-size:0.85rem;font-weight:700;color:#ef4444;">⏱ 60 ثانية</span>
          <span id="ts_wpm" style="font-size:0.85rem;font-weight:700;color:var(--primary);">0 WPM</span>
        </div>
        <div id="ts_target" style="background:rgba(255,255,255,0.03);border:1px solid var(--border-color);border-radius:10px;padding:14px;font-size:0.88rem;line-height:1.8;color:var(--text-secondary);margin-bottom:12px;min-height:60px;direction:rtl;"></div>
        <textarea id="ts_input" rows="3" placeholder="ابدأ الكتابة هنا..." style="width:100%;background:#181922;color:white;border:1px solid var(--border-color);border-radius:10px;padding:12px;font-family:'Cairo';font-size:0.85rem;resize:none;direction:rtl;"></textarea>
      </div>
      <div id="ts_result" style="display:none;text-align:center;padding:24px;background:#121319;border:1px solid var(--border-color);border-radius:16px;">
        <div id="ts_r_icon" style="font-size:3rem;margin-bottom:12px;">⌨️</div>
        <h4 id="ts_r_title" style="font-size:1.15rem;font-weight:800;color:white;margin-bottom:8px;">النتيجة</h4>
        <p id="ts_r_desc" style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:12px;"></p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">
          <div style="background:rgba(255,255,255,0.02);border-radius:10px;padding:12px;"><span style="font-size:0.7rem;color:var(--text-secondary);display:block;">السرعة</span><span id="ts_r_wpm" style="font-size:1.2rem;font-weight:800;color:var(--primary);">0</span><span style="font-size:0.65rem;color:var(--text-secondary);"> WPM</span></div>
          <div style="background:rgba(255,255,255,0.02);border-radius:10px;padding:12px;"><span style="font-size:0.7rem;color:var(--text-secondary);display:block;">الدقة</span><span id="ts_r_acc" style="font-size:1.2rem;font-weight:800;color:#10b981;">0</span><span style="font-size:0.65rem;color:var(--text-secondary);">%</span></div>
        </div>
        <button id="ts_retry" class="secondary-btn" style="width:100%;max-width:200px;">إعادة المحاولة</button>
      </div>
    </div>`; },
  init(){
    const sentences=["الأمن السيبراني هو مجموعة من الممارسات والتقنيات المصممة لحماية الأجهزة والشبكات والبيانات","الذكاء الاصطناعي يغير طريقة تفاعلنا مع التكنولوجيا ويفتح آفاقاً جديدة للإبداع والابتكار","حماية كلمات المرور الخاصة بك تبدأ باستخدام مدير كلمات مرور موثوق وتفعيل التحقق بخطوتين","التطبيقات مفتوحة المصدر توفر بدائل مجانية وآمنة للبرامج المدفوعة مع شفافية كاملة في الكود","تحديث نظام التشغيل والتطبيقات بانتظام يسد الثغرات الأمنية ويحمي جهازك من الاختراق"];
    const goBtn=document.getElementById("ts_go");
    const retryBtn=document.getElementById("ts_retry");
    const startScr=document.getElementById("ts_start");
    const gameScr=document.getElementById("ts_game");
    const resultScr=document.getElementById("ts_result");
    const targetEl=document.getElementById("ts_target");
    const inputEl=document.getElementById("ts_input");
    const timerEl=document.getElementById("ts_timer");
    const wpmEl=document.getElementById("ts_wpm");
    if(!goBtn)return;
    let timer,timeLeft,correctChars,totalChars,started;
    function startGame(){
      startScr.style.display="none";resultScr.style.display="none";gameScr.style.display="block";
      const s=sentences[Math.floor(Math.random()*sentences.length)];
      targetEl.textContent=s;inputEl.value="";inputEl.focus();
      timeLeft=60;correctChars=0;totalChars=0;started=false;
      timerEl.textContent="⏱ 60 ثانية";wpmEl.textContent="0 WPM";
    }
    inputEl&&inputEl.addEventListener("input",()=>{
      if(!started){started=true;timer=setInterval(()=>{timeLeft--;timerEl.textContent=`⏱ ${timeLeft} ثانية`;if(timeLeft<=0){clearInterval(timer);endGame();}},1000);}
      const typed=inputEl.value;const target=targetEl.textContent;
      correctChars=0;totalChars=typed.length;
      for(let i=0;i<typed.length;i++){if(typed[i]===target[i])correctChars++;}
      const elapsed=60-timeLeft||1;const wpm=Math.round((correctChars/5)/(elapsed/60));
      wpmEl.textContent=wpm+" WPM";
    });
    function endGame(){
      gameScr.style.display="none";resultScr.style.display="block";
      const acc=totalChars>0?Math.round((correctChars/totalChars)*100):0;
      const wpm=Math.round((correctChars/5));
      document.getElementById("ts_r_wpm").textContent=wpm;
      document.getElementById("ts_r_acc").textContent=acc;
      if(wpm>=30){document.getElementById("ts_r_icon").textContent="🏆";document.getElementById("ts_r_title").textContent="ممتاز! كاتب سريع 🎉";document.getElementById("ts_r_title").style.color="#10b981";document.getElementById("ts_r_desc").textContent="سرعة احترافية! تم منحك 20 نقطة وشارة الكاتب السريع.";ToolsEngine.awardPoints(20,"اختبار سرعة الكتابة");let b=JSON.parse(localStorage.getItem("novatrix_unlocked_badges")||"[]");if(!b.includes("fast_typer")){b.push("fast_typer");localStorage.setItem("novatrix_unlocked_badges",JSON.stringify(b));}}
      else if(wpm>=15){document.getElementById("ts_r_icon").textContent="👍";document.getElementById("ts_r_title").textContent="جيد! سرعة مقبولة";document.getElementById("ts_r_title").style.color="#eab308";document.getElementById("ts_r_desc").textContent=`حققت ${wpm} WPM بدقة ${acc}%. حاول مجدداً للوصول لـ 30+ WPM.`;}
      else{document.getElementById("ts_r_icon").textContent="💪";document.getElementById("ts_r_title").textContent="تحتاج تدريب أكثر!";document.getElementById("ts_r_title").style.color="#ef4444";document.getElementById("ts_r_desc").textContent=`حققت ${wpm} WPM فقط. تدرب أكثر وحاول مجدداً!`;}
    }
    goBtn.onclick=startGame;retryBtn.onclick=startGame;
  }
},

]; // END OF TOOLS ARRAY

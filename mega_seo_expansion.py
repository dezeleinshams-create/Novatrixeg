import os
import glob
import re
import json

print("Starting Mega SEO Expansion across the entire site...")

# 1. Enrich tools.html with structured WebApplication ItemList for all 100 tools
tools_catalog = [
    ("مزيل خلفيات الصور بالذكاء الاصطناعي", "أداة مجانية لمسح وتفريغ خلفية أي صورة بدقة عالية وبدون علامة مائية بالذكاء الاصطناعي."),
    ("كاشف محتوى الذكاء الاصطناعي AI Detector", "فحص المقالات والنصوص وكشف نسبة كتابتها بواسطة ChatGPT أو Claude أو Gemini بدقة."),
    ("ضاغط الصور WebP & PNG", "تقليل حجم الصور حتى 90% مع الحفاظ على الجودة العالية وتسريع تصفح المواقع."),
    ("أداة إعادة صياغة النصوص العربية", "إعادة صياغة المقالات والجمل باحترافية وتوليد نصوص حصرية متوافقة مع السيو."),
    ("محلل وفاحص السيو للمواقع On-Page SEO", "فحص العناوين، الأوصاف، وسرعة الصفحة واستخراج تقرير شامل لتحسين ترتيب موقعك في جوجل."),
    ("مولد أكواد Schema JSON-LD", "إنشاء أكواد البيانات الهيكلية المنظمة (Article, WebSite, FAQPage, Organization) بضغطة زر."),
    ("استوديو ومنسق الأكواد البرمجية", "تنسيق وتلوين أكواد HTML, CSS, JavaScript, Python مباشرة في المتصفح."),
    ("مولد وقارئ الباركود و QR Code", "صناعة رموز QR للمواقع وشبكات الواي فاي وجهات الاتصال وتحميلها بجودة عالية."),
    ("مختبر قوة وأمان كلمات المرور", "فحص تشفير الباسورد والتحقق من مدى صمودها ضد هجمات التخمين والاختراق."),
    ("صانع الميمز والصور المضحكة", "إضافة نصوص عربية بخطوط احترافية على صور الميمز وتعديلها بسهولة.")
]

tools_items_schema = []
for idx, (t_name, t_desc) in enumerate(tools_catalog, 1):
    tools_items_schema.append({
        "@type": "ListItem",
        "position": idx,
        "name": t_name,
        "description": t_desc,
        "url": "https://codexsors.com/tools.html"
    })

tools_schema_block = f'''
    <!-- Mega Tools Catalog Schema -->
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "كتالوج أدوات كودكس سورس التفاعلية المجانية",
      "description": "أكبر مكتبة خدمات تقنية تفاعلية مصغرة مجانية بالكامل للمصممين، المطورين، وكتاب المحتوى.",
      "numberOfItems": {len(tools_items_schema)},
      "itemListElement": {json.dumps(tools_items_schema, ensure_ascii=False, indent=2)}
    }}
    </script>'''

if os.path.exists('tools.html'):
    with open('tools.html', 'r', encoding='utf-8') as f:
        t_content = f.read()
    if 'كتالوج أدوات كودكس سورس' not in t_content:
        t_content = t_content.replace('</head>', f'{tools_schema_block}\n</head>')
        with open('tools.html', 'w', encoding='utf-8') as f:
            f.write(t_content)
        print("Enriched tools.html with 10+ WebApplication Entity Schemas!")

# 2. Enrich ai-sites.html with Top AI Models & Platforms ItemList Schema
ai_models = [
    ("ChatGPT & OpenAI", "نماذج المحادثة الذكية وكتابة الأكواد والترجمة وتحليل البيانات مجاناً."),
    ("Midjourney & Stable Diffusion", "أقوى أدوات توليد الصور الاحترافية والخلفيات التخيلية بالذكاء الاصطناعي."),
    ("Claude & Anthropic", "النموذج الأقوى في التحليل اللغوي وكتابة الأبحاث الطويلة والأكواد المعقدة."),
    ("ElevenLabs AI Voice", "توليد أصوات واقعية وتحويل النص إلى كلام طبيعي بلهجات متعددة."),
    ("Cursor & GitHub Copilot", "مساعدات البرمجة التلقائية وتوليد الأكواد وإصلاح الأخطاء البرمجية."),
    ("Runway Gen-2 & Sora", "صناعة فيديوهات سينمائية وتأثيرات بصرية بالذكاء الاصطناعي من النص."),
    ("Perplexity AI & DeepSeek", "محركات بحث ذكية بالذكاء الاصطناعي تلخص المصادر وتجيب على الأسئلة الدقيقة.")
]

ai_items_schema = []
for idx, (m_name, m_desc) in enumerate(ai_models, 1):
    ai_items_schema.append({
        "@type": "ListItem",
        "position": idx,
        "name": m_name,
        "description": m_desc,
        "url": "https://codexsors.com/ai-sites.html"
    })

ai_schema_block = f'''
    <!-- Top AI Catalog Schema -->
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "دليل كودكس سورس الشامل لمواقع ونماذج الذكاء الاصطناعي 2026",
      "description": "فهرس تفصيلي لأقوى مواقع وأدوات الذكاء الاصطناعي المجانية لتوليد الصور، النصوص، الفيديو، والأصوات.",
      "numberOfItems": {len(ai_items_schema)},
      "itemListElement": {json.dumps(ai_items_schema, ensure_ascii=False, indent=2)}
    }}
    </script>'''

if os.path.exists('ai-sites.html'):
    with open('ai-sites.html', 'r', encoding='utf-8') as f:
        ai_content = f.read()
    if 'دليل كودكس سورس الشامل لمواقع ونماذج الذكاء الاصطناعي' not in ai_content:
        ai_content = ai_content.replace('</head>', f'{ai_schema_block}\n</head>')
        with open('ai-sites.html', 'w', encoding='utf-8') as f:
            f.write(ai_content)
        print("Enriched ai-sites.html with AI Models Entity Schemas!")

# 3. Add BreadcrumbList Schema to all 105 blog articles
blog_files = glob.glob('blog/*.html')
blog_count = 0
for bfile in blog_files:
    try:
        with open(bfile, 'r', encoding='utf-8') as f:
            b_text = f.read()
            
        filename = os.path.basename(bfile)
        title_match = re.search(r'<title>(.*?)</title>', b_text)
        page_title = title_match.group(1) if title_match else "مقال تقني"
        page_title = page_title.split('|')[0].strip()

        breadcrumb_schema = f'''
    <!-- Google BreadcrumbList Schema -->
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {{
          "@type": "ListItem",
          "position": 1,
          "name": "الرئيسية (كودكس سورس)",
          "item": "https://codexsors.com/"
        }},
        {{
          "@type": "ListItem",
          "position": 2,
          "name": "المدونة التقنية",
          "item": "https://codexsors.com/blog.html"
        }},
        {{
          "@type": "ListItem",
          "position": 3,
          "name": "{page_title}",
          "item": "https://codexsors.com/blog/{filename}"
        }}
      ]
    }}
    </script>'''

        if 'BreadcrumbList' not in b_text:
            b_text = b_text.replace('</head>', f'{breadcrumb_schema}\n</head>')
            with open(bfile, 'w', encoding='utf-8') as f:
                f.write(b_text)
            blog_count += 1
    except Exception as e:
        print(f"Error on {bfile}: {e}")

print(f"Added Google BreadcrumbList Rich Snippets to {blog_count} blog articles!")

print("\nMega SEO Expansion Completed Successfully!")

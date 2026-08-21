import os
import re

print("Starting SEO Keyword & Entity Optimization across Codexsors...")

# 1. Update index.html with ultra-rich Semantic Keywords & FAQPage Schema for Google Rich Snippets
index_path = 'index.html'
if os.path.exists(index_path):
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Ultra Comprehensive Keywords targeting high-volume Arabic & English search intents
    ultra_keywords = (
        "كودكس سورس, موقع كودكس سورس, كوديكس سورس, Codexsors, codexsors.com, "
        "تطبيقات مجانية, برامج مجانية للكمبيوتر, بدائل البرامج المدفوعة, بديل فوتوشوب مجاني, "
        "بديل بريمير مجاني, بديل اوفيس مجاني, بديل اليستريتور, بديل انترنت داونلود مانجر IDM, "
        "أفضل مواقع ذكاء اصطناعي مجانية, ادوات ذكاء اصطناعي مجانية, ai مجاني, شات جي بي تي مجانا, "
        "توليد صور بالذكاء الاصطناعي مجانا, تفريغ الصوت والترجمة بالذكاء الاصطناعي, إزالة خلفية الصور مجانا, "
        "تحسين جودة الصور القديمة بالذكاء الاصطناعي, تلخيص الفيديوهات بالذكاء الاصطناعي, كتابة مقالات بالذكاء الاصطناعي, "
        "حماية الهاتف من الاختراق, كشف التجسس على الموبايل, ازاي اعرف ان تليفوني مهكر, فحص الفيروسات اون لاين, "
        "استرجاع الصور المحذوفة, تسريع هاتف الاندرويد, زيادة مساحة الهاتف, حل مشكلة امتلاء الذاكرة, "
        "قوالب مواقع جاهزة مجانية, مكتبة اوامر الذكاء الاصطناعي prompts, خدمات مصغرة مجانية, ادوات سيو مجانية"
    )

    content = re.sub(
        r'<meta name="keywords" content="[^"]*">',
        f'<meta name="keywords" content="{ultra_keywords}">',
        content
    )

    # Add FAQPage Schema to index.html for Google Rich Snippets if not present
    faq_schema = '''
    <!-- Google Rich Snippets: FAQPage Schema for Search Ranking -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "ما هو موقع كودكس سورس (Codexsors)؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "كودكس سورس (Codexsors) هو أكبر منصة عربية تقنية مجانية تقدم بدائل البرامج المدفوعة، أدوات الذكاء الاصطناعي، شروحات حماية الهواتف، وأكثر من 100 أداة ويب تفاعلية مجاناً."
          }
        },
        {
          "@type": "Question",
          "name": "كيف أحصل على بدائل مجانية لأشهر البرامج المدفوعة؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "يقدم موقع كودكس سورس قسماً متخصصاً ومفصلاً يضم أفضل البدائل المجانية والمفتوحة المصدر لبرامج مثل Photoshop و Premiere و Microsoft Office و WinRAR و AutoCAD بدون أي تكلفة."
          }
        },
        {
          "@type": "Question",
          "name": "هل جميع أدوات الذكاء الاصطناعي والخدمات على كودكس سورس مجانية؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نعم، جميع الأدوات وقوالب الويب ومكتبة أوامر الذكاء الاصطناعي (Prompts) وشروحات الحماية متاحة مجاناً 100% لجميع الزوار."
          }
        },
        {
          "@type": "Question",
          "name": "كيف أكتشف وأحمي هاتفي من برامج التجسس والاختراق؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "توفر مدونة كودكس سورس دليلاً شاملاً لفحص الهواتف، كشف صلاحيات التطبيقات المشبوهة، حماية الواتساب، وتأمين الحسابات عبر المصادقة الثنائية خطوة بخطوة."
          }
        }
      ]
    }
    </script>'''

    if 'FAQPage' not in content:
        content = content.replace('</head>', f'{faq_schema}\n</head>')

    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated index.html with Ultra Keywords & Rich FAQ Schema!")

# 2. Update ai-sites.html
ai_path = 'ai-sites.html'
if os.path.exists(ai_path):
    with open(ai_path, 'r', encoding='utf-8') as f:
        ai_content = f.read()

    ai_keywords = (
        "مواقع ذكاء اصطناعي مجانية, كودكس سورس, أفضل مواقع AI, توليد صور بالذكاء الاصطناعي مجانا, "
        "مواقع كتابة بالذكاء الاصطناعي, مواقع تصميم بالذكاء الاصطناعي, انشاء فيديو بالذكاء الاصطناعي مجانا, "
        "تعديل الصوت بالذكاء الاصطناعي, بديل Midjourney مجاني, بديل ChatGPT مجاني, ادوات انتاجية بالذكاء الاصطناعي"
    )

    if '<meta name="keywords"' in ai_content:
        ai_content = re.sub(r'<meta name="keywords" content="[^"]*">', f'<meta name="keywords" content="{ai_keywords}">', ai_content)
    else:
        ai_content = ai_content.replace('</head>', f'    <meta name="keywords" content="{ai_keywords}">\n</head>')

    with open(ai_path, 'w', encoding='utf-8') as f:
        f.write(ai_content)
    print("Updated ai-sites.html with AI Keywords!")

print("\nAll SEO optimizations applied safely with ZERO design changes!")

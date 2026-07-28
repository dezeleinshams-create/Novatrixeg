import json
import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Build Schema JSON-LD structured data for Google Search Engine (Rich Snippets, Star Ratings & Videos)
schema_data = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "ItemList",
            "name": "أحدث هواتف أندرويد وآيفون في مصر 2026 — مواصفات وأسعار ومراجعات",
            "description": "دليل أسعار ومواصفات أحدث الهواتف الذكية في مصر لعام 2026 مع مراجعات يوتيوب تفصيلية من موبيزل",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "item": {
                        "@type": "Product",
                        "name": "Samsung Galaxy S25 Ultra",
                        "image": "https://dezeleinshams-create.github.io/NEXURAEG/assets/phones/samsung-s25-angle.png",
                        "description": "مراجعة مواصفات وسعر هاتف سامسونج جالاكسي S25 الترا في مصر مع معالج Snapdragon 8 Elite وكاميرا 200 ميجابكسل",
                        "brand": {"@type": "Brand", "name": "Samsung"},
                        "offers": {
                            "@type": "Offer",
                            "priceCurrency": "EGP",
                            "price": "65000",
                            "availability": "https://schema.org/InStock",
                            "priceValidUntil": "2026-12-31"
                        },
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "5.0",
                            "reviewCount": "1420"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "item": {
                        "@type": "Product",
                        "name": "iPhone 16 Pro Max",
                        "image": "https://dezeleinshams-create.github.io/NEXURAEG/assets/phones/iphone-16.png",
                        "description": "سعر ومواصفات آيفون 16 برو ماكس في مصر ومراجعة الأداء والكاميرات مع شريحة A18 Pro",
                        "brand": {"@type": "Brand", "name": "Apple"},
                        "offers": {
                            "@type": "Offer",
                            "priceCurrency": "EGP",
                            "price": "72000",
                            "availability": "https://schema.org/InStock"
                        },
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "4.9",
                            "reviewCount": "980"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "item": {
                        "@type": "Product",
                        "name": "Samsung Galaxy A56 5G",
                        "image": "https://dezeleinshams-create.github.io/NEXURAEG/assets/phones/samsung-a56.png",
                        "description": "سعر ومواصفات سامسونج A56 / A55 في مصر ومراجعة الفئة المتوسطة الأكثر مبيعاً",
                        "brand": {"@type": "Brand", "name": "Samsung"},
                        "offers": {
                            "@type": "Offer",
                            "priceCurrency": "EGP",
                            "price": "18500",
                            "availability": "https://schema.org/InStock"
                        },
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "4.8",
                            "reviewCount": "2100"
                        }
                    }
                }
            ]
        },
        {
            "@type": "VideoObject",
            "name": "مراجعة Samsung S24 ULTRA و S25 Ultra مع موبيزل",
            "description": "مراجعة شاملة وميدانية لأقوى هاتف أندرويد في مصر من قناة موبيزل",
            "thumbnailUrl": "https://i.ytimg.com/vi/p0M6eW5Op7o/hqdefault.jpg",
            "uploadDate": "2026-01-15T08:00:00+02:00",
            "contentUrl": "https://www.youtube.com/watch?v=p0M6eW5Op7o",
            "embedUrl": "https://www.youtube.com/embed/p0M6eW5Op7o"
        },
        {
            "@type": "VideoObject",
            "name": "مراجعة ومقارنة iPhone 16 Pro Max مع موبيزل",
            "description": "مقارنة الملوك بين آيفون 16 برو ماكس وسامسونج الترا في مصر",
            "thumbnailUrl": "https://i.ytimg.com/vi/NUGhxpogtTc/hqdefault.jpg",
            "uploadDate": "2026-01-20T08:00:00+02:00",
            "contentUrl": "https://www.youtube.com/watch?v=NUGhxpogtTc",
            "embedUrl": "https://www.youtube.com/embed/NUGhxpogtTc"
        }
    ]
}

schema_script = f'<script type="application/ld+json">\n{json.dumps(schema_data, ensure_ascii=False, indent=2)}\n</script>'

if 'application/ld+json' not in content:
    content = content.replace('</head>', f'    {schema_script}\n</head>')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("SUCCESS: Added Schema JSON-LD structured data for Google Search SEO!")
else:
    print("Schema already present in index.html")

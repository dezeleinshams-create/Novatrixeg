import glob
import re

client_id = "ca-pub-7387778090845192"
adsense_head_script = f'<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={client_id}" crossorigin="anonymous"></script>'

html_files = glob.glob('**/*.html', recursive=True)

updated_count = 0
for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        modified = False
        
        # Replace dummy client ids
        if 'ca-pub-0000000000000000' in content:
            content = content.replace('ca-pub-0000000000000000', client_id)
            modified = True
            
        # Add head script if not present
        if client_id not in content:
            if '</head>' in content:
                content = content.replace('</head>', f'    {adsense_head_script}\n</head>')
                modified = True
        
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            updated_count += 1
            print(f"Updated AdSense in: {filepath}")
    except Exception as e:
        print(f"Error on {filepath}: {e}")

print(f"\nDone! Updated {updated_count} HTML files with user's AdSense ID: {client_id}")

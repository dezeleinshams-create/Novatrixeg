import os
import glob
import re

# 1. Update CSS files
css_files = glob.glob("**/*.css", recursive=True)
for css_file in css_files:
    with open(css_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace body.light-theme with .light-theme
    new_content = re.sub(r'body\.light-theme', '.light-theme', content)
    
    if new_content != content:
        with open(css_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {css_file}")

# 2. Update HTML files to include the inline theme script
html_files = glob.glob("**/*.html", recursive=True)
script_tag = "<script>if(localStorage.getItem('theme') !== 'dark') document.documentElement.classList.add('light-theme');</script>"

for html_file in html_files:
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if script_tag not in content:
        # Insert after <head> or <meta charset>
        if "<head>" in content:
            new_content = content.replace("<head>", f"<head>\n    {script_tag}")
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Injected script into {html_file}")

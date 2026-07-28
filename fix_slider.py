def find_closing_div(html, start_pos):
    """Find the matching closing </div> for an opening <div> at start_pos"""
    depth = 0
    i = start_pos
    while i < len(html):
        if html[i:i+4] == '<div':
            depth += 1
            i += 4
        elif html[i:i+6] == '</div>':
            depth -= 1
            if depth == 0:
                return i + 6
            i += 6
        else:
            i += 1
    return -1

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

marker = '<div class="phone-slider-track" id="phoneSliderTrack">'
track_start = content.find(marker)

if track_start == -1:
    print("ERROR: track not found!")
    exit()

track_end = find_closing_div(content, track_start)
track_block = content[track_start:track_end]

card_count = track_block.count('<div class="phone-card">')
print(f"Found {card_count} phone cards in track")

if card_count <= 8:
    # Get inner content (between opening and closing div tags)
    inner_start = track_start + len(marker)
    inner_end = track_end - len('</div>')
    inner_content = content[inner_start:inner_end]
    
    new_track = marker + inner_content + inner_content + '</div>'
    content = content[:track_start] + new_track + content[track_end:]
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Done! Duplicated to {card_count * 2} cards for seamless loop")
else:
    print(f"Already has {card_count} cards - already duplicated, skipping.")

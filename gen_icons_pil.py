from PIL import Image, ImageDraw

def create_icon(size, color, filename):
    img = Image.new('RGBA', (size, size), color)
    draw = ImageDraw.Draw(img)
    # Draw a white bar chart
    padding = size // 4
    bar_width = size // 8
    spacing = size // 16
    
    # Bar 1
    draw.rectangle([padding, size - padding - size//4, padding + bar_width, size - padding], fill="white")
    # Bar 2
    draw.rectangle([padding + bar_width + spacing, size - padding - size//2, padding + 2*bar_width + spacing, size - padding], fill="white")
    # Bar 3
    draw.rectangle([padding + 2*(bar_width + spacing), size - padding - 3*size//4, padding + 3*bar_width + 2*spacing, size - padding], fill="white")
    
    img.save(filename)

os_dirs = ['public/icons', 'dist/icons', 'icons']
for d in os_dirs:
    if not os.path.exists(d):
        os.makedirs(d)

for size in [16, 48, 128]:
    for d in os_dirs:
        create_icon(size, (179, 27, 27, 255), os.path.join(d, f"icon{size}.png"))

print("Icons created with PIL successfully.")

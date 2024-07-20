from PIL import Image, ImageDraw, ImageFont
import sys
from datetime import datetime
import os

def draw_text_with_stroke(draw, position, text, font, fill, stroke_fill, stroke_width, char_spacing=3):
    x, y = position
    # Calculate total text width with character spacing
    total_width = sum(font.getbbox(char)[2] - font.getbbox(char)[0] for char in text) + (len(text) - 1) * char_spacing
    # Adjust the starting x-position to fit the text within the given position
    x = x - total_width
    for char in text:
        # Draw stroke for each character
        for dx in range(-stroke_width, stroke_width + 1):
            for dy in range(-stroke_width, stroke_width + 1):
                if dx != 0 or dy != 0:
                    draw.text((x + dx, y + dy), char, font=font, fill=stroke_fill)
        # Draw character
        draw.text((x, y), char, font=font, fill=fill)
        # Move to the next character position
        char_width = font.getbbox(char)[2] - font.getbbox(char)[0]
        x += char_width + char_spacing

def generate_donation_receipt(name, city, amount, output_path):
    
    directory = os.path.dirname(output_path)
    if not os.path.exists(directory):
        os.makedirs(directory)
    # Load the donation receipt template
    template_path = './certificates/template-donation.jpg'
    template = Image.open(template_path)

    # Create a drawing context
    draw = ImageDraw.Draw(template)

    # Load the font
    font_name="./Carme-Regular.ttf"
    font_path = './Quicksand-Regular.ttf'  # Update this path to the Quicksand font file
    font_medium = ImageFont.truetype(font_name, 66)
    font_small = ImageFont.truetype(font_path, 46)
    font_large = ImageFont.truetype(font_path, 100)

    # Define text positions
    name_position = (2200, 440)
    city_position = (2260, 530)
    amount_position = (1900, 1000)

    # Define stroke parameters
    stroke_fill = "white"
    stroke_width_name = 2
    stroke_width_city = 1
    stroke_width_amount = 3

    draw_text_with_stroke(draw, name_position, name, font_medium, fill="white", stroke_fill=stroke_fill, stroke_width=stroke_width_name, char_spacing=3)

    # Draw the city with stroke
    draw_text_with_stroke(draw, city_position, city, font_small, fill="white", stroke_fill=stroke_fill, stroke_width=stroke_width_city)

    # Draw the amount with stroke
    draw_text_with_stroke(draw, amount_position, f"{amount} /-", font_large, fill="white", stroke_fill=stroke_fill, stroke_width=stroke_width_amount)

    # Save the generated receipt
    template.save(output_path)

if __name__ == "__main__":
    name = sys.argv[1]
    city = sys.argv[2]
    amount = sys.argv[3]
    output_path = sys.argv[4]
    generate_donation_receipt(name, city, amount, output_path)

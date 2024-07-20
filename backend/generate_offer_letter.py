from PIL import Image, ImageDraw, ImageFont
from datetime import datetime
import os
import sys

def draw_text(draw, text, position, font, max_width, stroke_width=1, stroke_fill="black", line_spacing=10):
    lines = []
    words = text.split(' ')
    line = ''
    for word in words:
        test_line = line + word + ' '
        if draw.textbbox((0, 0), test_line, font=font)[2] <= max_width:
            line = test_line
        else:
            lines.append(line)
            line = word + ' '
    lines.append(line)

    x, y = position
    for line in lines:
        draw.text((x, y), line.strip(), font=font, fill="black", stroke_width=stroke_width, stroke_fill=stroke_fill)
        y += draw.textbbox((0, 0), line, font=font)[3] + line_spacing

def generate_offer_letter(name, date, internship_type, reporting_manager, output_path):
    # Define the path to the template
    template_path = './certificates/template-offerletter-blank.jpg'

    # Check if the template exists
    if not os.path.exists(template_path):
        print(f"Error: The file {template_path} does not exist.")
        return

    # Load the offer letter template
    template = Image.open(template_path)

    # Create a drawing context
    draw = ImageDraw.Draw(template)

    # Load a font
    font_name="./Carme-Regular.ttf"
    font_path = './Quicksand-Regular.ttf'  # Update this path to your font file
    font_regular = ImageFont.truetype(font_path, 46)
    font_bold = ImageFont.truetype(font_path, 54)
    font_carme = ImageFont.truetype(font_name, 54)

    # Convert the date to the desired format
    formatted_date = datetime.strptime(date, "%Y-%m-%d").strftime("%B %d, %Y")

    # Define text positions and maximum width for text wrapping
    date_position = (2050, 800)
    name_position = (190, 1370)
    content_position = (190, 1500)
    max_width = 2240  # Maximum width for text wrapping

    # Draw the date
    draw.text(date_position, formatted_date, font=font_carme, fill="black", stroke_width=2, stroke_fill="black")

    # Draw the name
    draw.text(name_position, f"Dear {name},", font=font_carme, fill="black", stroke_width=1, stroke_fill="black")

    # Define the content text
    content_text = (
        f"On behalf of Kshitiksha Foundation, I would like to extend this opportunity as a '{internship_type}' intern, "
        f"reporting to {reporting_manager}, Relationship Manager, Kshitiksha. Your main tasks and responsibilities will be:\n\n"
        "1. Accomplish certain activities assigned during Internship.\n"
        "2. Raising funds through donation appeal content.\n"
        "3. Creating an internship report at the end of the tenure.\n\n"
        f"As discussed at the time of Interview, this would be an unpaid internship for one month duration. "
        f"You are invited to join the Organization on {formatted_date}.\n\n"
        "By Signing below, you will be accepting the above terms. For any questions and clarifications, feel free to call or mail me at the contact information mentioned below.\n\n"
        "Once again, we look forward to you joining the team."
    )

    # Draw the content text
    draw_text(draw, content_text, content_position, font_regular, max_width, stroke_fill="black", line_spacing=22)

    # Save the generated offer letter
    template.save(output_path)

if __name__ == "__main__":
    name = sys.argv[1]  # Example name
    date = sys.argv[2] # Example date
    internship_type = sys.argv[3]  # Example internship type
    reporting_manager = sys.argv[4]  # Example reporting manager
    output_path = sys.argv[5]  # Example output path
    generate_offer_letter(name, date, internship_type, reporting_manager, output_path)

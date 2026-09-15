import re
import json

with open("full_text.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()

courses = []
current_course = None
current_week = None
current_lesson = None

# We can group it by Courses. Let's see how many courses there are.
# From the text, it seems there are multiple courses like "Frontend Development — 2 oylik o'quv reja"
# But wait, looking at the previous output, we saw "3-BOSQICH — ADVANCED BACKEND", "4-BOSQICH — SEQUELIZE ORM", etc.
# The user said: "Frontend Development - 2 oylik o'quv reja", maybe there are multiple courses?

# Let's extract lines that look like Course titles, weeks, lessons.

def parse_text():
    pass


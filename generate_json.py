import re
import json

with open("full_text.txt", "r", encoding="utf-8") as f:
    lines = [line.strip() for line in f.readlines() if line.strip()]

courses = []
current_course = None
current_week = None
current_lesson = None

def new_course(title, desc="", duration="", lessons=0):
    return {
        "id": "c" + str(len(courses) + 1),
        "title": title,
        "description": desc,
        "duration": duration,
        "lessonsCount": lessons,
        "weeks": []
    }

def new_week(title):
    return {
        "id": "w" + str(len(current_course["weeks"]) + 1) + "_" + current_course["id"],
        "title": title,
        "lessons": []
    }

def new_lesson(number, title):
    return {
        "id": f"l{number}_{current_course['id']}",
        "number": number,
        "title": title,
        "topics": [],
        "practice": "",
        "homework": "",
        "result": ""
    }

for line in lines:
    if line.startswith("Frontend Development —"):
        current_course = new_course("Frontend Development (HTML/CSS)", "HTML, CSS, Tailwind, Git", "8 hafta", 24)
        courses.append(current_course)
        current_week = None
        current_lesson = None
        continue
    elif line.startswith("JavaScript — 2 oylik"):
        current_course = new_course("JavaScript", "JavaScript Fundamentals to Advanced", "8 hafta", 24)
        courses.append(current_course)
        current_week = None
        current_lesson = None
        continue
    elif "React kursining bosqichlari" in line or (current_course and current_course["title"] == "JavaScript" and line == "1–3-hafta: React Fundamentals"):
        if current_course and current_course["title"] != "React":
            current_course = new_course("React", "Modern React, Hooks, Redux, Projects", "8 hafta", 24)
            courses.append(current_course)
            current_week = None
            current_lesson = None
        continue
    elif line == "Davomiyligi: 4 haftaJami: 12 dars" and (not current_course or current_course["title"] != "Vue.js"):
        current_course = new_course("Vue.js", "Vue 3 Fundamentals, Composition API", "4 hafta", 12)
        courses.append(current_course)
        current_week = None
        current_lesson = None
        continue
    elif line.startswith("1-BOSQICH — NODE.JS + EXPRESS"):
        current_course = new_course("Backend Development", "Node.js, Express, MongoDB, PostgreSQL", "12 hafta", 36)
        courses.append(current_course)
        current_week = new_week("1-BOSQICH — NODE.JS + EXPRESS")
        current_course["weeks"].append(current_week)
        current_lesson = None
        continue
    
    if not current_course:
        continue

    # Stop processing when we reach the end summary table
    if line == "📅 36 DARS — TO‘LIQ JADVAL":
        break

    if re.match(r'^\d+(–\d+)?-HAFTA', line) or re.match(r'^\d+-BOSQICH', line):
        current_week = new_week(line)
        current_course["weeks"].append(current_week)
        current_lesson = None
        continue

    lesson_match = re.match(r'^(?:[^\w\s]*\s*)?(\d+)-[dD][aA][rR][sS]\s*—\s*(.*)', line)
    if lesson_match:
        if not current_week:
            current_week = new_week("General")
            current_course["weeks"].append(current_week)
        current_lesson = new_lesson(int(lesson_match.group(1)), lesson_match.group(2))
        current_week["lessons"].append(current_lesson)
        continue
    
    if current_lesson:
        if line.startswith("Amaliyot:"):
            current_lesson["practice"] = line.replace("Amaliyot:", "").strip()
        elif line.startswith("Uyga vazifa:"):
            current_lesson["homework"] = line.replace("Uyga vazifa:", "").strip()
        elif line.startswith("Natija:"):
            current_lesson["result"] = line.replace("Natija:", "").strip()
        elif line == "Amaliyot":
            current_lesson["practice"] = "Amaliyot"
        elif line == "Uyga vazifa":
            current_lesson["homework"] = "Uyga vazifa"
        elif line == "Natija":
            current_lesson["result"] = "Natija"
        else:
            if current_lesson.get("practice") and current_lesson["practice"] in ["Amaliyot", "Amaliy loyihalar:"]:
                current_lesson["practice"] += "\n" + line
            elif current_lesson.get("homework") and current_lesson["homework"] == "Uyga vazifa":
                current_lesson["homework"] += "\n" + line
            elif current_lesson.get("result") and current_lesson["result"] == "Natija":
                current_lesson["result"] += "\n" + line
            else:
                if line not in ["📝", "🚀", "🛒"]:
                    current_lesson["topics"].append(line)

with open("curriculum_data.json", "w", encoding="utf-8") as f:
    json.dump(courses, f, ensure_ascii=False, indent=2)

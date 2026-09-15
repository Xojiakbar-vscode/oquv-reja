# Learning Curriculum Platform

This is a professional, modern, and product-ready Learning Management System (LMS) web application built based on the provided curriculum document.

## Features

- **Professional UI/UX**: Premium design using Tailwind CSS and Lucide icons.
- **Dark Mode**: Fully supported Light/Dark modes with system preference and manual toggle.
- **No Backend Required**: All curriculum data is structured and stored directly within the frontend (`src/data/curriculum.ts`).
- **Progress Tracking**: Your course progress is automatically saved to your browser's local storage using Zustand.
- **Comprehensive Routing**:
  - `/dashboard` - Overview of your progress, courses, and stats.
  - `/courses` - Browse all available courses.
  - `/courses/:courseId` - Detailed course view with weekly modules.
  - `/lessons/:lessonId` - Interactive lesson page with theory, practice, homework, and results.
  - `/roadmap` - Visual step-by-step learning journey.
  - `/projects` - Collection of all practical projects in the curriculum.
  - `/exams` - Milestone exams and assessments.
  - `/technologies` - Tech stack overview.
  - `/progress` - Detailed progress analytics.
  - `/search` - Global search functionality.

## Setup Instructions

1. Ensure you have Node.js installed.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.
4. Run `npm run build && npm run preview` to test the production build.

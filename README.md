# CV Builder

A multi-step CV Maker application built with **Next.js**, **Redux Toolkit**, **AI-SDK**, and **Framer Motion**. This project demonstrates frontend skills including state management, animations, API integration, and following UI designs.

**Live Demo:** [https://cv-builder-ts-g671.vercel.app/](https://cv-builder-ts-g671.vercel.app/)  
**GitHub Repository:** [https://github.com/rakibulislamdev/cv-builder-ts](https://github.com/rakibulislamdev/cv-builder-ts)

---

## Design Reference

The UI closely follows this Figma design:

[Figma Design – CV Maker](https://www.figma.com/design/ojlxr9UDkKql9vc00cLQIF/Practices-CV-Making?node-id=0-1&p=f&t=cpd2nyPPpDYBJLj2-0)

> Make sure to match spacing, colors, fonts, and component layout as closely as possible.

---

## Features / Requirements

### 1. Framework

- Built with **Next.js (App Router)**.
- Uses **Server Actions** for backend logic, including resume generation.

### 2. Multi-Step Form

The form includes multiple steps:

- Personal Information
- Education
- Skills
- Experience
- Summary

Features implemented:

- Each step is a separate UI screen/page.
- “Next” and “Back” buttons for navigation.
- Stepper at the top to indicate the active step.

### 3. Redux Integration

- State management is handled with **Redux Toolkit**.
- Form data is saved for all steps inside Redux.
- Data persists after refreshing the page using **Redux Persist** or `localStorage`.

### 4. Animations

- Smooth **fade** and **slide** animations when switching steps.
- Clean **transition animations** between pages.
- Animations implemented using **Framer Motion**.

### 5. Resume Generation Using AI-SDK

- Integrates **AI-SDK** ([Docs](https://ai-sdk.dev/docs/introduction)) using the **Gemini model**.
- Final step (or separate button) generates a resume:
  1. Collects all form data from Redux.
  2. Sends data to a Next.js Server Action.
  3. Calls the Gemini model to generate resume text.
  4. Displays the generated resume on the final screen.

### 6. Code Quality

- Clean folder structure.
- Reusable components for UI parts.
- Minimal but clear comments in the code.

---

## Tech Stack

- **Next.js (App Router)**
- **React**
- **Redux Toolkit + Redux Persist**
- **AI-SDK (Gemini Model)**
- **Tailwind CSS**
- **Framer Motion** for animations

---

## Environment Variables

Create a `.env` file in the root of your project:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_real_api_key_here

# Clone the repo
git clone https://github.com/rakibulislamdev/cv-builder.git
cd cv-builder

# Install dependencies
npm install

# Run development server
npm run dev

Open http://localhost:3000
in your browser to see the app.
```

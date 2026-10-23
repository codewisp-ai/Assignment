# Event Requirement Posting Flow

A production-ready, full-stack requirement posting platform built with **Next.js (Frontend)** and **Node.js + Express + MongoDB (Backend)** for hiring Event Planners, Performers, and Crew.

---

## 🚀 Key Features

* **Step 1 - Event Basics**: Form capturing event title, event type, date or date range toggle, location, optional venue, and interactive category selection (**Event Planner**, **Performer**, or **Crew**).
* **Steps 2 & 3 - Adaptive Dynamic Flow**: Step 2 and Step 3 dynamically change based on the Step 1 category selection:
  * **Event Planner**: Planning scope (full/partial/day-of), guest count, budget range, vendor services, planning timeline, and custom notes.
  * **Performer**: Act type (solo/band/DJ/comedian/etc.), set duration, genre/style, sound & PA provisions, microphone counts, and soundcheck arrangements.
  * **Crew**: Dynamic roles with individual headcount (add/remove crew roles), call time & wrap time shift logistics, safety certifications, gear provisions, and attire requirements.
* **Step 4 - Review & Submission**: Summary card with inline edit links jumping directly to any step, submission state management, and real-time backend persistence.
* **Submission Confirmation & Dashboard**: Human-readable tracking ID (`REQ-YYYY-XXXX`) with copy-to-clipboard, status tracking, and a real-time submissions feed with category filters and title search.
* **Resilient State Management**: Session draft persistence ensures form progress is preserved across accidental page refreshes.

---

## 🛠️ Tech Stack

* **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons.
* **Backend**: Node.js (ES Modules), Express.js, Mongoose (MongoDB ODM), CORS, Dotenv.
* **Database**: MongoDB (polymorphic category discriminator schemas).

---

## 📁 Repository Structure

```
├── backend/
│   ├── src/
│   │   ├── config/db.js                  # Database connection logic
│   │   ├── controllers/requirementController.js # CRUD handlers & ID generator
│   │   ├── models/Requirement.js          # Polymorphic Mongoose schema
│   │   ├── routes/requirementRoutes.js    # REST endpoints
│   │   ├── validators/requirementValidator.js # Field validation layer
│   │   └── server.js                      # Express app entry point
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css                # Tailwind CSS entry
│   │   │   ├── layout.tsx                 # Root layout & FormProvider wrapper
│   │   │   ├── page.tsx                   # Multi-step wizard coordinator
│   │   │   └── requirements/page.tsx      # Submissions feed & search
│   │   ├── components/
│   │   │   ├── ConfirmationScreen.tsx     # Post-submission confirmation card
│   │   │   ├── Navbar.tsx                 # Header navigation
│   │   │   ├── StepProgressBar.tsx        # Dynamic wizard progress indicator
│   │   │   └── steps/
│   │   │       ├── Step1Basics.tsx        # Basics & category selector
│   │   │       ├── Step2Details.tsx       # Dynamic Step 2
│   │   │       ├── Step3Details.tsx       # Dynamic Step 3
│   │   │       └── Step4Review.tsx        # Review & edit triggers
│   │   ├── context/FormContext.tsx        # Form state machine & draft storage
│   │   └── types/index.ts                 # TypeScript interfaces
│   ├── .env.example
│   └── package.json
└── README.md
```

---

## ⚡ Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

* Backend runs on `http://localhost:5000`
* Health check: `GET http://localhost:5000/api/health`

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

* Frontend runs on `http://localhost:3000`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/requirements` | Creates a new event requirement with category validation |
| `GET` | `/api/requirements` | Retrieves requirements (supports `?category=planner` and `?search=term`) |
| `GET` | `/api/requirements/:id` | Fetches a requirement by MongoDB `_id` or `referenceId` |
| `GET` | `/api/health` | Health check endpoint |

---

## 🛡️ Edge Cases Handled

1. **Date Boundary Logic**: Start dates are validated; end dates in date ranges cannot precede start dates.
2. **Category Isolation**: Category-specific subdocuments are isolated; submitting as `performer` strips out any lingering `planner` fields.
3. **Array Validation**: Crew role requirements require at least one valid entry with positive headcount ($> 0$).
4. **Numeric Bounds**: Validates that maximum budget is greater than or equal to minimum budget.
5. **Connection Fault Tolerance**: Server continues running and gracefully handles transient database reconnections.

---

## 🎥 5–7 Minute Walkthrough Script (Internship Video)

* **Minute 0:00 – 1:00 (Overview & Architecture)**:
  * Introduce project scope: Multi-step posting flow tailored for Planners, Performers, and Crew.
  * Tech stack selection rationale: Next.js App Router for fluid client-side transitions and Express + MongoDB for polymorphic schema storage.
* **Minute 1:00 – 2:30 (Step 1 & Dynamic Category Branching)**:
  * Fill Step 1 with single day vs date range.
  * Show category switching (Planner vs Performer vs Crew) and explain how Steps 2 and 3 dynamically reconfigure inputs and validation rules.
* **Minute 2:30 – 4:00 (Step 2, Step 3, and Validation)**:
  * Demonstrate form validation: attempting to proceed without required fields triggers inline error cues.
  * Fill category specifics (e.g. crew roles with multiple headcounts, call times, rider notes).
* **Minute 4:00 – 5:30 (Step 4 Review, API Call & MongoDB)**:
  * Show the summary card with jump-to-edit capability.
  * Click "Post Requirement": inspect DevTools network tab showing `POST /api/requirements` returning `201 Created` with generated `referenceId`.
  * Show the Confirmation Screen and switch to `/requirements` feed showing the newly saved record in MongoDB.
* **Minute 5:30 – 6:30 (Edge Cases & Technical Trade-offs)**:
  * Discuss payload sanitization, date inversion protection, and session draft recovery.
  * Mention future improvements: role-based authentication, file attachments for technical riders, and WebSockets for real-time applicant matching.

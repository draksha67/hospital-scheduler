*//Hospital Scheduler

A Hospital Appointment Scheduler built using Next.js, TypeScript, and Tailwind CSS.
It allows hospital staff to view and manage doctor appointments in Day View and Week View, with role-based filtering and a clean, modular architecture.

🚀 Features
🧩 Architecture & Design (30%)

Separation of Concerns: Organized into components, hooks, services, and types

Headless Logic: Custom React hooks handle data and logic separately from UI

Service Layer: Fetches data from mock APIs

Reusable Components: Calendar, Doctor Selector, Appointment Card

📅 Day View Calendar (25%)

Displays appointments for the selected doctor and selected date

Time range: 8:00 AM – 6:00 PM in 30-minute slots

Color-coded by appointment type

Handles overlapping appointments gracefully

🗓️ Week View Calendar (25%)

Shows appointments across 7 days (Monday–Sunday)

Same 8:00 AM – 6:00 PM range

Responsive grid layout for mobile and desktop

👨‍⚕️ Role-Based Filtering (20%)

Dropdown to select a doctor (for front desk staff view)

Displays doctor’s name, specialty, and working hours

Filters appointments accordingly

🛠️ Tech Stack
Category	Technology
Frontend Framework	Next.js 14

Language	TypeScript

Styling	Tailwind CSS

State Management	React Hooks
Data Layer	Mock data (JSON / Local)
Deployment	Vercel (Recommended)
📂 Folder Structure
src/
 ┣ components/
 ┃ ┣ DayView.tsx
 ┃ ┣ WeekView.tsx
 ┃ ┣ DoctorSelect.tsx
 ┃ ┗ AppointmentCard.tsx
 ┣ hooks/
 ┃ ┣ useAppointments.ts
 ┃ ┗ useDoctorFilter.ts
 ┣ services/
 ┃ ┗ appointmentService.ts
 ┣ types/
 ┃ ┗ index.ts
 ┣ pages/ or app/
 ┃ ┗ page.tsx
 ┗ mockData.ts

⚙️ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/your-username/hospital-scheduler.git
cd hospital-scheduler

2️⃣ Install dependencies
npm install

3️⃣ Run the development server
npm run dev


Then open your browser at http://localhost:3000

🧠 Accessibility

Each interactive element (select, button) has accessible labels
Keyboard-navigable interface
Uses aria-label and role attributes

#Clean Architecture Principles

UI Layer: Components under /components
Logic Layer: Custom hooks under /hooks
Data Layer: Fetch functions in /services
Types Layer: Shared interfaces in /types

 Loom Video Demo (add your link)


✨ Author

Raksha Dixit
Frontend Developer (Internship assessment)
[draksha480@gmail.com]



License

This project is for educational purposes only.
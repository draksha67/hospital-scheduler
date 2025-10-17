import type { Doctor, Appointment } from "@/types";
import { startOfDay, format, addDays } from "date-fns";
// ...and any other date-fns functions you need

const APPOINTMENT_COLORS: Record<string,string> = { 
  Checkup: "bg-blue-600", 
  Consultation: "bg-green-600", 
  "Follow-up": "bg-orange-600", 
  Procedure: "bg-purple-600" 
};

export const doctors: Doctor[] = [
  { id: "d1", name: "Dr. Sarah Chen", specialty: "Cardiology", workingHours: "8:00 AM - 4:00 PM" },
  { id: "d2", name: "Dr. Amir Patel", specialty: "Dermatology", workingHours: "9:00 AM - 6:00 PM" },
  { id: "d3", name: "Dr. Lina Gomez", specialty: "Orthopedics", workingHours: "8:00 AM - 5:00 PM" },
];

const today = startOfDay(new Date());
const iso = (d: Date) => d.toISOString();

export const appointments: Appointment[] = [
  // Dr. Chen (d1) - Today
  (() => {
    const s = new Date(today); s.setHours(9, 0, 0, 0);
    const e = new Date(s); e.setMinutes(e.getMinutes() + 30);
    return { id: "a1", doctorId: "d1", patientName: "John Doe", type: "Checkup", startTime: iso(s), endTime: iso(e), duration: 30 };
  })(),
  (() => {
    const s = new Date(today); s.setHours(10, 0, 0, 0);
    const e = new Date(s); e.setMinutes(e.getMinutes() + 60);
    return { id: "a2", doctorId: "d1", patientName: "Jane Smith", type: "Consultation", startTime: iso(s), endTime: iso(e), duration: 60 };
  })(),
  // Overlapping example for d1 (starts within a1's window)
  (() => {
    const s = new Date(today); s.setHours(9, 15, 0, 0);
    const e = new Date(s); e.setMinutes(e.getMinutes() + 45); // ends at 10:00
    return { id: "a3", doctorId: "d1", patientName: "Ali Khan", type: "Follow-up", startTime: iso(s), endTime: iso(e), duration: 45 };
  })(),
  // Dr. Patel (d2) - Tomorrow
  (() => {
    const tomorrow = addDays(today, 1);
    const s = new Date(tomorrow); s.setHours(11, 30, 0, 0);
    const e = new Date(s); e.setMinutes(e.getMinutes() + 45);
    return { id: "a4", doctorId: "d2", patientName: "Michael Green", type: "Procedure", startTime: iso(s), endTime: iso(e), duration: 45 };
  })(),
  // Dr. Gomez (d3) - Day After Tomorrow
  (() => {
    const dayAfter = addDays(today, 2);
    const s = new Date(dayAfter); s.setHours(15, 0, 0, 0);
    const e = new Date(s); e.setMinutes(e.getMinutes() + 30);
    return { id: "a5", doctorId: "d3", patientName: "Laura Black", type: "Checkup", startTime: iso(s), endTime: iso(e), duration: 30 };
  })(),
  // Dr. Chen (d1) - Next Week
  (() => {
    const nextWeekDay = addDays(today, 7);
    const s = new Date(nextWeekDay); s.setHours(14, 0, 0, 0);
    const e = new Date(s); e.setMinutes(e.getMinutes() + 30);
    return { id: "a6", doctorId: "d1", patientName: "Chris Blue", type: "Consultation", startTime: iso(s), endTime: iso(e), duration: 30 };
  })(),
];

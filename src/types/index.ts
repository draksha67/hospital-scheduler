export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  workingHours?: string;
};

export type Appointment = {
  id: string;
  doctorId: string;
  patientName: string;
  type: 'Checkup' | 'Consultation' | 'Follow-up' | 'Procedure';
  startTime: string; // ISO
  endTime: string;   // ISO
  duration: number;  // minutes
};

type View = 'day' | 'week';
type AppointmentType = Appointment['type'];

const APPOINTMENT_COLORS: Record<AppointmentType, string> = { 
    Checkup: "bg-blue-600", 
    Consultation: "bg-green-600", 
    "Follow-up": "bg-orange-600", 
    Procedure: "bg-purple-600" 
};

const doctors: Doctor[] = [
    { id: "d1", name: "Dr. Sarah Chen", specialty: "Cardiology", workingHours: "8:00 AM - 4:00 PM" },
    { id: "d2", name: "Dr. Amir Patel", specialty: "Dermatology", workingHours: "9:00 AM - 6:00 PM" },
    { id: "d3", name: "Dr. Lina Gomez", specialty: "Orthopedics", workingHours: "8:00 AM - 5:00 PM" },
];

const START_HOUR = 8;
const END_HOUR = 18; // 6 PM (exclusive)
const TOTAL_VIEW_MINUTES = (END_HOUR - START_HOUR) * 60; 
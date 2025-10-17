import { doctors, appointments as mock } from "@/data/mockData";
import type { Appointment, Doctor } from "@/types";

export class AppointmentService {
  getDoctors(): Doctor[] { return doctors; }

  getDoctorById(id: string): Doctor | undefined {
    return doctors.find(d => d.id === id);
  }

  getAppointmentsByDoctorAndDate(doctorId: string, date: Date): Appointment[] {
    const start = new Date(date); start.setHours(0,0,0,0);
    const end = new Date(start); end.setDate(end.getDate()+1);
    return mock.filter(a => a.doctorId === doctorId && new Date(a.startTime) >= start && new Date(a.startTime) < end);
  }

  getAppointmentsByDoctorAndRange(doctorId: string, startDate: Date, endDate: Date): Appointment[] {
    const s = new Date(startDate); s.setHours(0,0,0,0);
    const e = new Date(endDate); e.setHours(23,59,59,999);
    return mock.filter(a => a.doctorId === doctorId && new Date(a.startTime) >= s && new Date(a.startTime) <= e);
  }
}

export const appointmentService = new AppointmentService();

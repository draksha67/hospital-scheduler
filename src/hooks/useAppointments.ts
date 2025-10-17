import { useMemo } from "react";
import { appointmentService } from "@/services/appointmentServices";
import { startOfWeek, addDays, startOfDay } from "date-fns";
import { TimeSlot } from "@/domain/TimeSlot";
import type { Appointment, Doctor } from "@/types";

const START_HOUR = 8;
const END_HOUR = 18; // 6 PM (exclusive)
const TOTAL_VIEW_MINUTES = (END_HOUR - START_HOUR) * 60; // 600 minutes (10 hours)

function generateTimeSlots(date: Date) {
  const slots: TimeSlot[] = [];
  const startDay = startOfDay(date);
  for (let hour = START_HOUR; hour < END_HOUR; hour++) {
    for (const m of [0, 30]) {
      const s = new Date(startDay); s.setHours(hour,m,0,0);
      const e = new Date(s); e.setMinutes(e.getMinutes() + 30);
      slots.push(new TimeSlot(s,e));
    }
  }
  return slots;
}

export function useAppointments(doctorId: string | null, date: Date | null) {
  const doctors = useMemo(() => appointmentService.getDoctors(), []);
  // If doctorId is null, default to the first doctor in the list.
  const selectedDoctor = useMemo(() => doctors.find(d => d.id === doctorId) ?? doctors[0], [doctors, doctorId]);

  const dayAppointments = useMemo(() => {
    if (!date || !selectedDoctor) return [] as Appointment[];
    return appointmentService.getAppointmentsByDoctorAndDate(selectedDoctor.id, date);
  }, [selectedDoctor, date]);

  const weekRange = useMemo(() => {
    // Week starts on Monday (1)
    const start = date ? startOfWeek(date, { weekStartsOn: 1 }) : startOfWeek(new Date(), { weekStartsOn: 1 });
    return { start, end: addDays(start, 6) };
  }, [date]);

  const weekAppointments = useMemo(() => {
    if (!selectedDoctor) return [];
    return appointmentService.getAppointmentsByDoctorAndRange(selectedDoctor.id, weekRange.start, weekRange.end);
  }, [selectedDoctor, weekRange]);

  const timeSlots = useMemo(() => date ? generateTimeSlots(date) : [], [date]);

  return { doctors, selectedDoctor, dayAppointments, weekAppointments, timeSlots, weekRange };
}


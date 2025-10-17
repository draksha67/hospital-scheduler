import React from "react";
import type { Appointment } from "@/types";
import { addDays, format, differenceInMinutes,parseISO, isSameDay, startOfDay } from "date-fns";
import { Calendar } from 'lucide-react';

const COLORS = { Checkup:"bg-blue-600", Consultation:"bg-green-600", "Follow-up":"bg-orange-600", Procedure:"bg-purple-600" };
const START_HOUR = 8;
const END_HOUR = 18;
const TOTAL_VIEW_MINUTES =(END_HOUR-START_HOUR)*60;
export function WeekView({ weekStart, appointments }: { weekStart: Date; appointments: Appointment[] }) {
  const days = Array.from({length:7}).map((_,i)=> addDays(weekStart, i));
  const minutesFromStart = (d: Date) => (d.getHours() - START_HOUR) * 60 + d.getMinutes();
  
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-b-xl shadow-lg">
      <div className="min-w-[700px] grid grid-cols-[60px_repeat(7,1fr)] bg-white">
        
        {/* Top Header Row (Time + Days) */}
        <div className="col-span-1 bg-gray-100 border-r border-gray-200 h-14" />
        {days.map((d, i) => (
          <div key={i} className={`text-center font-bold p-2 h-14 flex flex-col justify-center border-l border-gray-200 ${isSameDay(d, startOfDay(new Date())) ? 'bg-blue-50 text-blue-800' : 'bg-gray-100 text-gray-700'}`}>
            <span className="text-xs">{format(d, 'EEE')}</span>
            <span className="text-lg">{format(d, 'dd')}</span>
          </div>
        ))}
        
        {/* Time Column */}
        <div className="col-span-1 border-r border-gray-200 flex flex-col pt-2 bg-gray-50 sticky left-0 z-10">
          {Array.from({ length: END_HOUR - START_HOUR }).map((_, i) => (
            <div key={i} className="h-24 relative text-right pr-1 text-xs text-gray-500 pt-0.5">
              <span className="font-medium text-gray-700 absolute top-0 right-1 translate-y-[-50%]">{8 + i}:00</span>
            </div>
          ))}
        </div>

        {/* Day Columns with Appointments */}
        {days.map((d, colIndex) => (
          <div key={colIndex} className="relative border-l border-gray-200 min-h-[500px]">
            {/* Hour Block Dividers (Horizontal Lines) */}
            {Array.from({ length: END_HOUR - START_HOUR }).map((_, i) => (
              <div key={i} className="h-24 border-b border-gray-100 border-dashed" />
            ))}
            
            {/* Appointments for this day */}
            {appointments.filter(a => isSameDay(parseISO(a.startTime), d)).map((apt, ai) => {
              const s = parseISO(apt.startTime), e = parseISO(apt.endTime);
              const top = (minutesFromStart(s) / TOTAL_VIEW_MINUTES) * 100;
              const height = (differenceInMinutes(e, s) / TOTAL_VIEW_MINUTES) * 100;

              return (
                <div 
                  key={ai} 
                  className={`absolute left-1 right-1 p-1 rounded-md text-white text-[10px] sm:text-xs shadow-md transition-shadow hover:shadow-xl ${COLORS[apt.type]}`} 
                  style={{ top: `${top}%`, height: `${height}%` }}
                >
                  <div className="font-bold truncate">{apt.patientName}</div>
                  <div className="opacity-90">{apt.duration} min</div>
                </div>
              );
            })}
          </div>
        ))}
        
        {appointments.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-white/80 col-span-full mt-14">
            <Calendar className="w-6 h-6 mr-2" /> No appointments scheduled for this week.
          </div>
        )}
      </div>
    </div>
  );
}

export default WeekView;

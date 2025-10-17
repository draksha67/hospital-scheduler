import React from "react";
import type { Appointment } from "@/types";
import { format, differenceInMinutes, parseISO } from "date-fns";
import { TimeSlot } from "@/domain/TimeSlot";
import { Calendar } from 'lucide-react';


const COLORS: Record<string, string> = { Checkup: "bg-blue-600", Consultation: "bg-green-600", "Follow-up": "bg-orange-600", Procedure: "bg-purple-600" };

const START_HOUR = 8;
const END_HOUR = 18;
const TOTAL_VIEW_MINUTES = (END_HOUR - START_HOUR) * 60;
export function DayView({ date, appointments, timeSlots }: { date: Date; appointments: Appointment[]; timeSlots: TimeSlot[] }) {
  const minutesFromStart = (d: Date) => (d.getHours() - START_HOUR) * 60 + d.getMinutes();

  const blocks = appointments.map(a => {
    const s = parseISO(a.startTime), e = parseISO(a.endTime);
    return { a, top: (minutesFromStart(s) / TOTAL_VIEW_MINUTES) * 100, height: (differenceInMinutes(e, s) / TOTAL_VIEW_MINUTES) * 100 };
  });

  // Overlap handling: Group overlapping blocks
  const positioned = blocks.map((b, i) => {
    const overlappingIndices = blocks.reduce<number[]>((acc, other, j) => {
      if (i === j) return acc;
      // Checks for overlap: [b.top, b.top + b.height] overlaps [other.top, other.top + other.height]
      if (!(b.top + b.height <= other.top || other.top + other.height <= b.top)) acc.push(j);
      return acc;
    }, []);

    // Create an ordered group of all appointments that overlap with this one
    const group = [i, ...overlappingIndices].sort((x, y) => x - y);
    const idx = group.indexOf(i); // This block's position within the overlap group

    // Width and left offset based on the size of the overlap group
    const width = 100 / group.length;
    const left = idx * width;

    return { ...b, left, width };
  });

  return (
    <div className="flex border border-gray-200 rounded-b-xl overflow-hidden shadow-lg">
      {/* Time Axis (Fixed Width) */}
      <div className="w-16 sm:w-20 bg-gray-50 border-r border-gray-200 flex flex-col">
        {timeSlots.map((t, i) => (
          // Only show every hour mark for cleanliness
          i % 2 === 0 ? (
            <div key={i} className="h-10 sm:h-12 relative text-right pr-2 text-xs text-gray-500 pt-0.5">
              <span className="font-medium text-gray-700">{format(t.start, 'h a')}</span>
            </div>
          ) : (
            <div key={i} className="h-10 sm:h-12 border-b border-gray-100" />
          )
        ))}
        {/* End Time Marker */}
        <div className="h-0 relative text-right pr-2 text-xs text-gray-500 pt-0.5">
          <span className="font-medium text-gray-700">{format(new Date(date).setHours(END_HOUR, 0, 0, 0), 'h a')}</span>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="flex-1 relative bg-white min-h-[500px] overflow-hidden">
        {/* Grid Lines */}
        {timeSlots.map((_, i) => (
          <div
            key={i}
            className={`h-10 sm:h-12 border-b ${i % 2 === 0 ? 'border-dashed' : ''}`}
            style={{ borderColor: 'border-gray-100' }}
          />
        ))}

        {/* Appointments */}
        {positioned.map((p, i) => (
          <div
            key={i}
            className={`absolute p-1 sm:p-2 text-xs rounded-lg text-white shadow-md transition-shadow hover:shadow-xl ${COLORS[p.a.type]}`}
            style={{
              top: `${p.top}%`,
              height: `${p.height}%`,
              left: `${p.left}%`,
              width: `calc(${p.width}% - 4px)`, // Subtract 4px for padding/margin gap
              marginLeft: '2px',
            }}
          >
            <div className="font-bold truncate">{p.a.patientName}</div>
            <div className="text-[10px] sm:text-[11px] opacity-90 truncate">{p.a.type} • {p.a.duration} min</div>
          </div>
        ))}

        {appointments.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-white/80">
            <Calendar className="w-6 h-6 mr-2" /> No appointments scheduled for this day.
          </div>
        )}
      </div>
    </div>
  );
}
export default DayView;

"use client";

import React, { useState, useMemo, useCallback,useEffect} from "react";
import { format, differenceInMinutes, startOfWeek, addDays, startOfDay, isSameDay, parseISO } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar, Stethoscope } from 'lucide-react';
import { useAppointments } from "@/hooks/useAppointments";
import DoctorSelector from "../components/DoctorSelector";
import DayView from "./DayView";
import WeekView from "./WeekView";


const COLORS: Record<string, string> = { 
    Checkup: "bg-blue-600", 
    Consultation: "bg-green-600", 
    "Follow-up": "bg-orange-600", 
    Procedure: "bg-purple-600" 
};
export default function HospitalScheduler({ initialDoctorId, initialDate }: { initialDoctorId?: string; initialDate?: Date }) {
  // Initialize doctorId to null, and let useEffect handle the default
  const [doctorId, setDoctorId] = useState<string | null>(initialDoctorId ?? null);
  const [date, setDate] = useState<Date>(initialDate ?? startOfDay(new Date()));
  const [view, setView] = useState<'day'|'week'>('day');
  const [loading, setLoading] = useState(false);

  const { doctors, selectedDoctor, dayAppointments, weekAppointments, timeSlots, weekRange } = useAppointments(doctorId, date);

  // Set the initial doctorId using data from the hook once doctors are available.
  useEffect(() => {
      // If no doctor is selected and we have a list of doctors, select the first one.
      if (!doctorId && doctors.length > 0) {
          setDoctorId(doctors[0].id);
      }
  }, [doctors, doctorId]); // Dependency array includes 'doctors' and 'doctorId'

  const handleNavigation = useCallback((direction: 1 | -1) => {
    setLoading(true);
    setTimeout(() => { // Simulate load time after navigation
      if (view === 'day') {
        setDate(prev => addDays(prev, direction));
      } else {
        setDate(prev => addDays(prev, direction * 7));
      }
      setLoading(false);
    }, 200);
  }, [view]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setTimeout(() => {
      setDate(startOfDay(new Date(e.target.value)));
      setLoading(false);
    }, 200);
  };

  const currentViewAppointments = view === 'day' ? dayAppointments : weekAppointments;
  const dateDisplay = view === 'day' 
    ? format(date, 'EEEE, MMM d, yyyy')
    : `${format(weekRange.start, 'MMM d')} - ${format(weekRange.end, 'MMM d, yyyy')}`;

  const ViewComponent = view === 'day' ? DayView : WeekView;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header and Controls */}
        <div className="bg-white p-5 rounded-xl shadow-lg border-t-4 border-blue-600">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            {/* Doctor Info */}
            <div className="flex-grow">
              <h1 className="text-2xl font-extrabold text-gray-800">{selectedDoctor?.name}</h1>
              <p className="text-md font-semibold text-blue-600">{selectedDoctor?.specialty}</p>
              <div className="text-sm text-gray-500 mt-1">Hours: {selectedDoctor?.workingHours}</div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <DoctorSelector doctors={doctors} value={doctorId} onChange={setDoctorId} />
              
              <button 
                className={`p-2 rounded-lg font-medium transition duration-150 ${view === 'day' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setView('day')}
              >
                Day View
              </button>
              <button 
                className={`p-2 rounded-lg font-medium transition duration-150 ${view === 'week' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setView('week')}
              >
                Week View
              </button>
            </div>
          </header>
          
          <hr className="my-4 border-gray-100" />
          
          {/* Navigation */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-2">
              <button onClick={() => handleNavigation(-1)} className="p-2 rounded-full text-gray-700 hover:bg-gray-200 transition"
                aria-label="Previous week">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-semibold text-gray-800 w-64 text-center">{dateDisplay}</h3>
              <button onClick={() => handleNavigation(1)} className="p-2 rounded-full text-gray-700 hover:bg-gray-200 transition"
                aria-label="Next Week">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <input 
              type="date" 
              className="p-2 border border-gray-300 rounded-lg text-sm shadow-sm" 
              value={format(date, 'yyyy-MM-dd')} 
              onChange={handleDateChange} 
              aria-label="Select Date"
            />
          </div>
        </div>

        {/* Schedule Body */}
        {loading ? (
          <div className="flex justify-center items-center h-48 bg-white rounded-xl shadow-lg">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-t-blue-600 border-gray-200 rounded-full mr-3"></div>
            <p className="text-lg text-gray-600">Loading {view} schedule...</p>
          </div>
        ) : (
          <ViewComponent 
            date={date} 
            weekStart={weekRange.start} 
            appointments={currentViewAppointments} 
            timeSlots={timeSlots} 
          />
        )}

        {/* Legend */}
        <div className="mt-8 p-4 bg-white rounded-xl shadow-lg flex flex-wrap gap-4 justify-center">
          <h3 className="text-lg font-semibold w-full text-center mb-2 text-gray-800">Appointment Type Legend</h3>
          {Object.entries(COLORS).map(([type, colorClass]) => (
            <div key={type} className="flex items-center gap-2 p-2 rounded-md bg-gray-50 border border-gray-200">
              <span className={`w-3 h-3 rounded-full ${colorClass}`}></span>
              <span className="text-sm text-gray-700 font-medium">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


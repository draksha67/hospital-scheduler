import React from "react";
import type { Doctor } from "@/types";
import {Stethoscope } from 'lucide-react';
// or whatever combination of icons you need

export function DoctorSelector({ doctors, value, onChange }: { doctors: Doctor[]; value?: string | null; onChange: (id: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <Stethoscope className="w-5 h-5 text-blue-600" />
      <select 
        value={value ?? ""} 
        onChange={e => onChange(e.target.value)} 
        className="p-2 border border-gray-300 rounded-lg text-sm bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-150"
        aria-label="Select Doctor"
      ></select>
      </div>
  );
}
export default DoctorSelector;

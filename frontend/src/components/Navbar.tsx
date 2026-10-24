'use client';

import React from 'react';
import Link from 'next/link';
import { useRequirementForm } from '../context/FormContext';
import { CalendarCheck, ListFilter, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { setCurrentStep, submittedDoc, resetForm } = useRequirementForm();

  const handlePostRequirementClick = () => {
    if (submittedDoc) {
      resetForm();
    } else {
      setCurrentStep(1);
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          onClick={handlePostRequirementClick}
          className="flex items-center gap-2.5 font-bold text-slate-900 text-lg hover:opacity-90"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span>EventFlow</span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-indigo-600">Requirement Portal</span>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/"
            onClick={handlePostRequirementClick}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition"
          >
            <CalendarCheck className="w-4 h-4 text-slate-400" />
            <span>Post Requirement</span>
          </Link>
          <Link
            href="/requirements"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition"
          >
            <ListFilter className="w-4 h-4 text-slate-400" />
            <span>View Submissions</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

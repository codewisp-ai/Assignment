'use client';

import React from 'react';
import { useRequirementForm } from '../context/FormContext';
import { Check, Calendar, Settings2, FileText, CheckCircle2 } from 'lucide-react';

export const StepProgressBar: React.FC = () => {
  const { currentStep, formData } = useRequirementForm();

  const getStepTitle = (stepIndex: number) => {
    switch (stepIndex) {
      case 1:
        return { label: 'Basics', sub: 'Event Overview', icon: Calendar };
      case 2:
        return {
          label: 'Details',
          sub:
            formData.category === 'planner'
              ? 'Scope & Budget'
              : formData.category === 'performer'
              ? 'Set & Style'
              : 'Crew Roles & Shift',
          icon: Settings2
        };
      case 3:
        return {
          label: 'Requirements',
          sub:
            formData.category === 'planner'
              ? 'Services & Timeline'
              : formData.category === 'performer'
              ? 'Sound & PA Rider'
              : 'Logistics & Gear',
          icon: FileText
        };
      case 4:
        return { label: 'Review', sub: 'Confirm & Post', icon: CheckCircle2 };
      default:
        return { label: '', sub: '', icon: Calendar };
    }
  };

  const steps = [1, 2, 3, 4];

  return (
    <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-sm mb-8">
      <div className="flex items-center justify-between relative">
        {/* Background track line */}
        <div className="absolute top-5 left-6 right-6 h-0.5 bg-slate-200 -z-0" />

        {/* Dynamic active progress bar fill */}
        <div
          className="absolute top-5 left-6 h-0.5 bg-indigo-600 transition-all duration-300 ease-out -z-0"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map(step => {
          const { label, sub, icon: Icon } = getStepTitle(step);
          const isCompleted = currentStep > step;
          const isCurrent = currentStep === step;

          return (
            <div key={step} className="flex flex-col items-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-200 ${
                  isCompleted
                    ? 'bg-indigo-600 text-white shadow-sm ring-4 ring-indigo-50'
                    : isCurrent
                    ? 'bg-white border-2 border-indigo-600 text-indigo-600 ring-4 ring-indigo-50 font-bold'
                    : 'bg-white border-2 border-slate-200 text-slate-400'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5 stroke-[2.5]" /> : <Icon className="w-4 h-4" />}
              </div>
              <div className="text-center mt-2.5 hidden sm:block">
                <span
                  className={`text-xs font-semibold block leading-tight ${
                    isCurrent ? 'text-indigo-600' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                  }`}
                >
                  Step {step}: {label}
                </span>
                <span className="text-[11px] text-slate-500 font-medium block mt-0.5">{sub}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

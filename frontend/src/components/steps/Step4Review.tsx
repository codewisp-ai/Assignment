'use client';

import React from 'react';
import { useRequirementForm } from '../../context/FormContext';
import {
  Calendar,
  MapPin,
  Building2,
  Tag,
  DollarSign,
  Users,
  Clock,
  Mic2,
  ShieldCheck,
  Edit3,
  AlertCircle
} from 'lucide-react';

export const Step4Review: React.FC = () => {
  const { formData, setCurrentStep, submitError } = useRequirementForm();
  const { basics, category, plannerDetails, performerDetails, crewDetails } = formData;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Step 4: Review & Post Requirement</h2>
        <p className="text-sm text-slate-500 mt-1">
          Please review your details carefully before posting. You can jump back to any step to edit.
        </p>
      </div>

      {submitError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-500" />
          <div className="text-sm">
            <span className="font-semibold block">Submission Error:</span>
            <span>{submitError}</span>
          </div>
        </div>
      )}

      {/* Review Section 1: Event Basics */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">Event Basics</h3>
          </div>
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Basics</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 text-sm">
          <div>
            <span className="text-xs text-slate-500 block">Event Title</span>
            <span className="font-semibold text-slate-800">{basics.eventName}</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Event Type</span>
            <span className="font-semibold text-slate-800 capitalize">{basics.eventType.replace('_', ' ')}</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Category</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 mt-0.5">
              {category}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Date</span>
            <span className="font-medium text-slate-800">
              {basics.startDate}
              {basics.isDateRange && basics.endDate ? ` → ${basics.endDate}` : ''}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Location</span>
            <span className="font-medium text-slate-800 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {basics.location}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Venue</span>
            <span className="font-medium text-slate-800 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              {basics.venue || 'Not specified'}
            </span>
          </div>
        </div>
      </div>

      {/* Review Section 2: Category Specifics */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">
              {category === 'planner'
                ? 'Planner Scope & Requirements'
                : category === 'performer'
                ? 'Performance & Rider Requirements'
                : 'Crew Allocation & Protocol'}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Details</span>
          </button>
        </div>

        {/* PLANNER REVIEW */}
        {category === 'planner' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 text-sm">
            <div>
              <span className="text-xs text-slate-500 block">Planning Scope</span>
              <span className="font-semibold text-slate-800 capitalize">
                {plannerDetails.planningScope.replace('_', ' ')}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Estimated Guests</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                {plannerDetails.estimatedGuestCount}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Budget Range</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-slate-400" />${plannerDetails.budget.min.toLocaleString()} – $
                {plannerDetails.budget.max.toLocaleString()}
              </span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-xs text-slate-500 block">Services Required</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {plannerDetails.servicesNeeded?.map(s => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 capitalize"
                  >
                    {s.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Timeline</span>
              <span className="font-medium text-slate-800 capitalize">
                {plannerDetails.timeline.replace(/_/g, ' ')}
              </span>
            </div>
            {plannerDetails.specialNotes && (
              <div className="md:col-span-3 pt-2">
                <span className="text-xs text-slate-500 block">Special Notes</span>
                <p className="text-xs text-slate-700 mt-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  {plannerDetails.specialNotes}
                </p>
              </div>
            )}
          </div>
        )}

        {/* PERFORMER REVIEW */}
        {category === 'performer' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 text-sm">
            <div>
              <span className="text-xs text-slate-500 block">Act Type</span>
              <span className="font-semibold text-slate-800 capitalize">
                {performerDetails.performerType.replace('_', ' ')}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Set Duration</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {performerDetails.durationMinutes} minutes
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Genre / Style</span>
              <span className="font-semibold text-slate-800">{performerDetails.genreOrStyle}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Sound & PA Setup</span>
              <span className="font-medium text-slate-800">
                {performerDetails.soundSetupProvided ? 'Provided by Venue' : 'Must Bring Gear'}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Microphones</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <Mic2 className="w-3.5 h-3.5 text-slate-400" />
                {performerDetails.micCount} mics
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Soundcheck Timing</span>
              <span className="font-medium text-slate-800">
                {performerDetails.soundcheckTiming || 'Standard / TBD'}
              </span>
            </div>
            {performerDetails.specialRequests && (
              <div className="md:col-span-3 pt-2">
                <span className="text-xs text-slate-500 block">Rider / Notes</span>
                <p className="text-xs text-slate-700 mt-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  {performerDetails.specialRequests}
                </p>
              </div>
            )}
          </div>
        )}

        {/* CREW REVIEW */}
        {category === 'crew' && (
          <div className="space-y-4 pt-4 text-sm">
            <div>
              <span className="text-xs text-slate-500 block mb-1.5">Required Crew Roles</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {crewDetails.rolesNeeded.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200"
                  >
                    <span className="font-semibold text-slate-800">{r.role}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
                      {r.headcount} Staff
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div>
                <span className="text-xs text-slate-500 block">Shift Call Time</span>
                <span className="font-semibold text-slate-800">{crewDetails.shiftTiming.callTime}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Shift Wrap Time</span>
                <span className="font-semibold text-slate-800">{crewDetails.shiftTiming.wrapTime}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Gear Provision</span>
                <span className="font-medium text-slate-800">
                  {crewDetails.gearProvided ? 'Provided On-Site' : 'Bring Own Tools'}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Production Uniform</span>
                <span className="font-medium text-slate-800">
                  {crewDetails.uniformRequired ? 'All-Black Crew' : 'Standard Casual'}
                </span>
              </div>
            </div>

            {crewDetails.certificationsRequired && crewDetails.certificationsRequired.length > 0 && (
              <div className="pt-2">
                <span className="text-xs text-slate-500 block mb-1">Required Badges / Certifications</span>
                <div className="flex flex-wrap gap-1.5">
                  {crewDetails.certificationsRequired.map(c => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-sky-50 text-sky-800 border border-sky-200"
                    >
                      <ShieldCheck className="w-3 h-3 text-sky-600" />
                      {c.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {crewDetails.additionalInstructions && (
              <div className="pt-2">
                <span className="text-xs text-slate-500 block">Load-in & Safety Instructions</span>
                <p className="text-xs text-slate-700 mt-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  {crewDetails.additionalInstructions}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

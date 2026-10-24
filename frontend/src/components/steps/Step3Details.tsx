'use client';

import React from 'react';
import { useRequirementForm } from '../../context/FormContext';
import { Check, Mic2, ShieldCheck, Sparkles } from 'lucide-react';

export const Step3Details: React.FC = () => {
  const { formData, updatePlanner, updatePerformer, updateCrew, errors } = useRequirementForm();
  const { category, plannerDetails, performerDetails, crewDetails } = formData;

  const togglePlannerService = (serviceId: string) => {
    const current = plannerDetails.servicesNeeded || [];
    const updated = current.includes(serviceId)
      ? current.filter(s => s !== serviceId)
      : [...current, serviceId];
    updatePlanner({ servicesNeeded: updated });
  };

  const toggleCrewCert = (certId: string) => {
    const current = crewDetails.certificationsRequired || [];
    const updated = current.includes(certId)
      ? current.filter(c => c !== certId)
      : [...current, certId];
    updateCrew({ certificationsRequired: updated });
  };

  const plannerServices = [
    { id: 'decor', label: 'Decor & Styling' },
    { id: 'catering', label: 'Catering & Beverages' },
    { id: 'photography', label: 'Photography & Video' },
    { id: 'sound_lighting', label: 'Audio / Visual & Lighting' },
    { id: 'venue_sourcing', label: 'Venue Sourcing & Contracts' },
    { id: 'invitations', label: 'Invitations & Guest RSVP' },
    { id: 'security', label: 'Security & Crowd Management' }
  ];

  const crewCerts = [
    { id: 'heights', label: 'Working at Heights / Scaffolding' },
    { id: 'osha', label: 'OSHA / General Site Safety' },
    { id: 'audio_board', label: 'Digital Audio Console Certified' },
    { id: 'electrical', label: 'High-Voltage / Stage Electrics' },
    { id: 'rigging', label: 'Certified Rigger' },
    { id: 'first_aid', label: 'First Aid / CPR' }
  ];

  return (
    <div className="space-y-8">
      {/* Dynamic Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Category: {category}</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Step 3:{' '}
          {category === 'planner'
            ? 'Services Needed & Timeline'
            : category === 'performer'
            ? 'Technical Rider & Stage Logistics'
            : 'Certifications & Safety Protocols'}
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          {category === 'planner'
            ? 'Select vendor domains you want the planner to manage and your timeframe.'
            : category === 'performer'
            ? 'Clarify sound requirements, microphone counts, and soundcheck arrangements.'
            : 'Specify mandatory safety badges, gear expectations, and crew guidelines.'}
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
        {/* --- PLANNER STEP 3 --- */}
        {category === 'planner' && (
          <>
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Required Services <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                {plannerServices.map(service => {
                  const isChecked = plannerDetails.servicesNeeded?.includes(service.id);
                  return (
                    <button
                      type="button"
                      key={service.id}
                      onClick={() => togglePlannerService(service.id)}
                      className={`px-3 py-2.5 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition ${
                        isChecked
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <span>{service.label}</span>
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border transition ${
                          isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.servicesNeeded && (
                <p className="text-xs text-rose-500 mt-2 font-medium">{errors.servicesNeeded}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Planning Timeline <span className="text-rose-500">*</span>
                </label>
                <select
                  value={plannerDetails.timeline}
                  onChange={e => updatePlanner({ timeline: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="immediate">Immediate (Event within 30 days)</option>
                  <option value="1_3_months">1 to 3 Months</option>
                  <option value="3_6_months">3 to 6 Months</option>
                  <option value="flexible">Flexible / Exploring</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Special Notes or Requirements (Optional)
                </label>
                <textarea
                  rows={3}
                  value={plannerDetails.specialNotes || ''}
                  onChange={e => updatePlanner({ specialNotes: e.target.value })}
                  placeholder="e.g. Must have prior experience handling destination weddings or high-security VIPs."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </>
        )}

        {/* --- PERFORMER STEP 3 --- */}
        {category === 'performer' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Sound & PA Equipment
                </label>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => updatePerformer({ soundSetupProvided: true })}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
                      performerDetails.soundSetupProvided
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Provided by Venue / Organizer
                  </button>
                  <button
                    type="button"
                    onClick={() => updatePerformer({ soundSetupProvided: false })}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
                      !performerDetails.soundSetupProvided
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Performer Must Bring Gear
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
                  <Mic2 className="w-4 h-4 text-slate-400" />
                  <span>Microphones Required</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={performerDetails.micCount === 0 ? '' : performerDetails.micCount}
                  onChange={e => updatePerformer({ micCount: e.target.value === '' ? 0 : parseInt(e.target.value, 10) || 0 })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Soundcheck Availability & Timing (Optional)
                </label>
                <input
                  type="text"
                  value={performerDetails.soundcheckTiming || ''}
                  onChange={e => updatePerformer({ soundcheckTiming: e.target.value })}
                  placeholder="e.g. Stage clear for soundcheck at 4:00 PM (1 hour prior to doors)"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Special Requests / Rider Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={performerDetails.specialRequests || ''}
                  onChange={e => updatePerformer({ specialRequests: e.target.value })}
                  placeholder="e.g. Dedicated DI box for acoustic guitar, monitor mix, dietary restrictions for backstage."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </>
        )}

        {/* --- CREW STEP 3 --- */}
        {category === 'crew' && (
          <>
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>Required Certifications / Badges (Optional)</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                {crewCerts.map(cert => {
                  const isChecked = crewDetails.certificationsRequired?.includes(cert.id);
                  return (
                    <button
                      type="button"
                      key={cert.id}
                      onClick={() => toggleCrewCert(cert.id)}
                      className={`px-3 py-2.5 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition ${
                        isChecked
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <span>{cert.label}</span>
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border transition ${
                          isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Gear & Tooling Provision
                </label>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => updateCrew({ gearProvided: true })}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
                      crewDetails.gearProvided
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Provided On-Site
                  </button>
                  <button
                    type="button"
                    onClick={() => updateCrew({ gearProvided: false })}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
                      !crewDetails.gearProvided
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Bring Own Tools / Kit
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Production Attire (Uniform)
                </label>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => updateCrew({ uniformRequired: true })}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
                      crewDetails.uniformRequired
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All-Black Production
                  </button>
                  <button
                    type="button"
                    onClick={() => updateCrew({ uniformRequired: false })}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
                      !crewDetails.uniformRequired
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Casual / Standard
                  </button>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Special Safety or Load-in Instructions (Optional)
                </label>
                <textarea
                  rows={3}
                  value={crewDetails.additionalInstructions || ''}
                  onChange={e => updateCrew({ additionalInstructions: e.target.value })}
                  placeholder="e.g. Loading dock requires security clearance badge at Gate 4. Steel-toe boots required."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

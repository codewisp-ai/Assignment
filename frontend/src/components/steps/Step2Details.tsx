'use client';

import React from 'react';
import { useRequirementForm } from '../../context/FormContext';
import { Plus, Trash2, Clock, Users, DollarSign, Sparkles } from 'lucide-react';

export const Step2Details: React.FC = () => {
  const { formData, updatePlanner, updatePerformer, updateCrew, errors } = useRequirementForm();
  const { category, plannerDetails, performerDetails, crewDetails } = formData;

  const addCrewRole = () => {
    updateCrew({
      rolesNeeded: [...crewDetails.rolesNeeded, { role: '', headcount: 1 }]
    });
  };

  const removeCrewRole = (index: number) => {
    if (crewDetails.rolesNeeded.length <= 1) return;
    const updated = crewDetails.rolesNeeded.filter((_, idx) => idx !== index);
    updateCrew({ rolesNeeded: updated });
  };

  const updateCrewRoleItem = (index: number, role: string, headcount: number) => {
    const updated = [...crewDetails.rolesNeeded];
    updated[index] = { role, headcount };
    updateCrew({ rolesNeeded: updated });
  };

  return (
    <div className="space-y-8">
      {/* Dynamic Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Category: {category}</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Step 2:{' '}
          {category === 'planner'
            ? 'Planning Scope & Budget'
            : category === 'performer'
            ? 'Performance Format & Duration'
            : 'Crew Roles & Shift Timing'}
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          {category === 'planner'
            ? 'Specify your planning expectations, scale of the event, and budget.'
            : category === 'performer'
            ? 'Define the style, set length, and talent category needed.'
            : 'Detail the technical roles required and the expected call times.'}
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
        {/* --- PLANNER STEP 2 --- */}
        {category === 'planner' && (
          <>
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Level of Planning Service <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  {
                    id: 'full_planning',
                    label: 'Full Planning',
                    desc: 'End-to-end design, vendor management, styling, and coordination.'
                  },
                  {
                    id: 'partial_planning',
                    label: 'Partial Planning',
                    desc: 'Assistance with remaining vendors, timeline structure, and logistics.'
                  },
                  {
                    id: 'day_of_coordination',
                    label: 'Day-of Coordination',
                    desc: 'On-site execution, schedule adherence, and emergency management.'
                  }
                ].map(scope => {
                  const isSelected = plannerDetails.planningScope === scope.id;
                  return (
                    <button
                      type="button"
                      key={scope.id}
                      onClick={() => updatePlanner({ planningScope: scope.id as any })}
                      className={`p-4 rounded-xl border text-left transition ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-500'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <h4 className="font-semibold text-sm text-slate-900">{scope.label}</h4>
                      <p className="text-xs text-slate-500 mt-1">{scope.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>Estimated Guest Count</span>
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={plannerDetails.estimatedGuestCount}
                  onChange={e => updatePlanner({ estimatedGuestCount: parseInt(e.target.value) || 0 })}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition ${
                    errors.estimatedGuestCount ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200 focus:border-indigo-500'
                  }`}
                />
                {errors.estimatedGuestCount && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.estimatedGuestCount}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-slate-400" />
                  <span>Budget Range ($)</span>
                  <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="number"
                      min="0"
                      placeholder="Min ($)"
                      value={plannerDetails.budget.min}
                      onChange={e =>
                        updatePlanner({
                          budget: { ...plannerDetails.budget, min: parseInt(e.target.value) || 0 }
                        })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      min="0"
                      placeholder="Max ($)"
                      value={plannerDetails.budget.max}
                      onChange={e =>
                        updatePlanner({
                          budget: { ...plannerDetails.budget, max: parseInt(e.target.value) || 0 }
                        })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                {errors.budgetMax && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.budgetMax}</p>}
              </div>
            </div>
          </>
        )}

        {/* --- PERFORMER STEP 2 --- */}
        {category === 'performer' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Performer Type <span className="text-rose-500">*</span>
                </label>
                <select
                  value={performerDetails.performerType}
                  onChange={e => updatePerformer({ performerType: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="solo_musician">Solo Musician (Singer / Guitarist / Pianist)</option>
                  <option value="live_band">Live Band / Orchestra</option>
                  <option value="dj">DJ / Electronic Producer</option>
                  <option value="comedian">Stand-up Comedian</option>
                  <option value="magician">Magician / Illusionist</option>
                  <option value="dancer">Dance Troupe / Choreographer</option>
                  <option value="speaker_mc">Master of Ceremonies (MC) / Keynote</option>
                  <option value="other">Other Entertainment</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Performance Duration (Minutes)</span>
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="15"
                  step="15"
                  value={performerDetails.durationMinutes}
                  onChange={e => updatePerformer({ durationMinutes: parseInt(e.target.value) || 0 })}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition ${
                    errors.durationMinutes ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200 focus:border-indigo-500'
                  }`}
                />
                {errors.durationMinutes && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.durationMinutes}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Genre / Performance Style <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={performerDetails.genreOrStyle}
                  onChange={e => updatePerformer({ genreOrStyle: e.target.value })}
                  placeholder="e.g. Classic Motown, Progressive House, Acoustic Pop, Corporate Humour"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition ${
                    errors.genreOrStyle ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200 focus:border-indigo-500'
                  }`}
                />
                {errors.genreOrStyle && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.genreOrStyle}</p>
                )}
              </div>
            </div>
          </>
        )}

        {/* --- CREW STEP 2 --- */}
        {category === 'crew' && (
          <>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-800">
                  Crew Roles & Headcount Required <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={addCrewRole}
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 rounded-lg transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Role</span>
                </button>
              </div>

              <div className="space-y-3">
                {crewDetails.rolesNeeded.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="e.g. FOH Audio Engineer, Lighting Tech, Stagehand"
                        value={item.role}
                        onChange={e => updateCrewRoleItem(idx, e.target.value, item.headcount)}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="w-28 flex items-center gap-1.5">
                      <span className="text-xs text-slate-500 font-medium">Qty:</span>
                      <input
                        type="number"
                        min="1"
                        value={item.headcount}
                        onChange={e => updateCrewRoleItem(idx, item.role, parseInt(e.target.value) || 1)}
                        className="w-16 px-2.5 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 text-center"
                      />
                    </div>
                    {crewDetails.rolesNeeded.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCrewRole(idx)}
                        className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {errors.rolesNeeded && (
                <p className="text-xs text-rose-500 mt-2 font-medium">{errors.rolesNeeded}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Call Time (Arrival) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="time"
                  value={crewDetails.shiftTiming.callTime}
                  onChange={e =>
                    updateCrew({
                      shiftTiming: { ...crewDetails.shiftTiming, callTime: e.target.value }
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Wrap Time (Estimated End) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="time"
                  value={crewDetails.shiftTiming.wrapTime}
                  onChange={e =>
                    updateCrew({
                      shiftTiming: { ...crewDetails.shiftTiming, wrapTime: e.target.value }
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>
              {errors.shiftTiming && (
                <p className="text-xs text-rose-500 mt-1 font-medium md:col-span-2">{errors.shiftTiming}</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

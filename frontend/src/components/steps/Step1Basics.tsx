'use client';

import React from 'react';
import { useRequirementForm } from '../../context/FormContext';
import { EventCategory, EventType } from '../../types';
import { Briefcase, Music, Users2, Calendar, MapPin, Building2, Check } from 'lucide-react';

export const Step1Basics: React.FC = () => {
  const { formData, updateBasics, setCategory, errors } = useRequirementForm();
  const { basics, category } = formData;

  const categories: {
    id: EventCategory;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    accent: string;
  }[] = [
    {
      id: 'planner',
      title: 'Event Planner',
      description: 'End-to-end planning, coordination, vendor sourcing, and budget control.',
      icon: Briefcase,
      accent: 'border-indigo-500 bg-indigo-50/40 text-indigo-700'
    },
    {
      id: 'performer',
      title: 'Performer',
      description: 'Live bands, DJs, solo musicians, MCs, comedians, or entertainment acts.',
      icon: Music,
      accent: 'border-violet-500 bg-violet-50/40 text-violet-700'
    },
    {
      id: 'crew',
      title: 'Crew & Technicians',
      description: 'Sound engineers, lighting crew, camera operators, stagehands, and security.',
      icon: Users2,
      accent: 'border-sky-500 bg-sky-50/40 text-sky-700'
    }
  ];

  const eventTypes: { value: EventType; label: string }[] = [
    { value: 'corporate', label: 'Corporate Event / Conference' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'concert', label: 'Concert / Music Festival' },
    { value: 'birthday', label: 'Birthday / Anniversary' },
    { value: 'conference', label: 'Summit / Seminar' },
    { value: 'private_party', label: 'Private Party / Gathering' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Step 1: Event Basics</h2>
        <p className="text-sm text-slate-500 mt-1">
          Tell us about your event and choose the type of professional you need.
        </p>
      </div>

      {/* Category Selection Cards */}
      <div>
        <label className="block text-sm font-semibold text-slate-800 mb-3">
          I am hiring for: <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = category === cat.id;

            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`relative p-5 rounded-xl border-2 text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? `${cat.accent} ring-2 ring-indigo-500/20 shadow-sm`
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50 text-slate-700'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
                <div>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{cat.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{cat.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Event Details Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        {/* Event Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            Event Title / Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={basics.eventName}
            onChange={e => updateBasics({ eventName: e.target.value })}
            placeholder="e.g. Annual Tech Symposium 2026 or Taylor & Alex Wedding"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition ${
              errors.eventName ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200 focus:border-indigo-500'
            }`}
          />
          {errors.eventName && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.eventName}</p>}
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            Event Type <span className="text-rose-500">*</span>
          </label>
          <select
            value={basics.eventType}
            onChange={e => updateBasics({ eventType: e.target.value as EventType })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
          >
            {eventTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Mode Toggle */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            Schedule Type
          </label>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => updateBasics({ isDateRange: false, endDate: '' })}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                !basics.isDateRange ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Single Day
            </button>
            <button
              type="button"
              onClick={() => updateBasics({ isDateRange: true })}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                basics.isDateRange ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Multi-Day Range
            </button>
          </div>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{basics.isDateRange ? 'Start Date' : 'Event Date'}</span>
            <span className="text-rose-500">*</span>
          </label>
          <input
            type="date"
            value={basics.startDate}
            onChange={e => updateBasics({ startDate: e.target.value })}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition ${
              errors.startDate ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200 focus:border-indigo-500'
            }`}
          />
          {errors.startDate && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.startDate}</p>}
        </div>

        {/* End Date (if isDateRange) */}
        {basics.isDateRange && (
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>End Date</span>
              <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              value={basics.endDate}
              min={basics.startDate || undefined}
              onChange={e => updateBasics({ endDate: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition ${
                errors.endDate ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200 focus:border-indigo-500'
              }`}
            />
            {errors.endDate && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.endDate}</p>}
          </div>
        )}

        {/* Location / City */}
        <div className={basics.isDateRange ? 'md:col-span-1' : 'md:col-span-2'}>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span>Location / City</span>
            <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={basics.location}
            onChange={e => updateBasics({ location: e.target.value })}
            placeholder="e.g. Austin, TX (or Virtual / Hybrid)"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition ${
              errors.location ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200 focus:border-indigo-500'
            }`}
          />
          {errors.location && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.location}</p>}
        </div>

        {/* Optional Venue */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span>Venue Name or Address (Optional)</span>
          </label>
          <input
            type="text"
            value={basics.venue || ''}
            onChange={e => updateBasics({ venue: e.target.value })}
            placeholder="e.g. The Grand Mirage Convention Center, Hall B"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
          />
        </div>
      </div>
    </div>
  );
};

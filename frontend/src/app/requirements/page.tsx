'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { RequirementDocument } from '../../types';
import {
  Calendar,
  MapPin,
  Clock,
  Search,
  Filter,
  PlusCircle,
  ExternalLink,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function RequirementsListPage() {
  const [requirements, setRequirements] = useState<RequirementDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRequirements = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());

      const res = await fetch(`${apiUrl}/requirements?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to load requirements');
      const data = await res.json();
      setRequirements(data.data || []);
    } catch (err: any) {
      setError(err.message || 'Error connecting to backend API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, [selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRequirements();
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Submitted Requirements</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Real-time feed of requirements saved in MongoDB.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition shadow-sm self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Requirement</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by event title..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 bg-white"
          />
        </form>

        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200">
          <Filter className="w-4 h-4 text-slate-400 ml-2" />
          {(['all', 'planner', 'performer', 'crew'] as const).map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* State Indicators */}
      {loading && (
        <div className="flex items-center justify-center py-16 text-slate-500">
          <Loader2 className="w-6 h-6 animate-spin mr-2 text-indigo-600" />
          <span className="text-sm font-medium">Fetching from MongoDB...</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-500" />
          <div className="text-sm">
            <span className="font-semibold block">Failed to load submissions:</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {!loading && !error && requirements.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No requirements found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {selectedCategory !== 'all'
              ? `No requirements currently posted under the "${selectedCategory}" category.`
              : 'Start by creating your first requirement using the multi-step posting flow.'}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create Requirement Now</span>
          </Link>
        </div>
      )}

      {/* Requirements Grid */}
      {!loading && !error && requirements.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requirements.map(req => {
            const getCategoryBadgeClass = (category: string) => {
              switch (category) {
                case 'planner':
                  return 'bg-indigo-50 text-indigo-700 border-indigo-200';
                case 'performer':
                  return 'bg-violet-50 text-violet-700 border-violet-200';
                case 'crew':
                  return 'bg-sky-50 text-sky-700 border-sky-200';
                default:
                  return 'bg-slate-100 text-slate-700 border-slate-200';
              }
            };

            return (
              <div
                key={req._id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-[11px] font-mono text-slate-400 font-semibold">
                      {req.referenceId}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getCategoryBadgeClass(
                        req.category
                      )}`}
                    >
                      {req.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {req.basics.eventName}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 mt-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(req.basics.startDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {req.basics.location}
                    </span>
                    <span className="capitalize px-1.5 py-0.5 bg-slate-100 rounded text-[11px] font-medium text-slate-600">
                      {req.basics.eventType.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Category Highlights */}
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs">
                    {req.category === 'planner' && req.plannerDetails && (
                      <div className="text-slate-600">
                        <span className="font-medium text-slate-800">Scope:</span>{' '}
                        {req.plannerDetails.planningScope.replace('_', ' ')} •{' '}
                        <span className="font-medium text-slate-800">Guests:</span>{' '}
                        {req.plannerDetails.estimatedGuestCount} •{' '}
                        <span className="font-medium text-slate-800">Budget:</span> $
                        {req.plannerDetails.budget?.min?.toLocaleString()} - $
                        {req.plannerDetails.budget?.max?.toLocaleString()}
                      </div>
                    )}

                    {req.category === 'performer' && req.performerDetails && (
                      <div className="text-slate-600">
                        <span className="font-medium text-slate-800">Act:</span>{' '}
                        {req.performerDetails.performerType.replace('_', ' ')} •{' '}
                        <span className="font-medium text-slate-800">Genre:</span>{' '}
                        {req.performerDetails.genreOrStyle} •{' '}
                        <span className="font-medium text-slate-800">Duration:</span>{' '}
                        {req.performerDetails.durationMinutes}m
                      </div>
                    )}

                    {req.category === 'crew' && req.crewDetails && (
                      <div className="text-slate-600">
                        <span className="font-medium text-slate-800">Roles:</span>{' '}
                        {req.crewDetails.rolesNeeded?.map(r => `${r.role} (x${r.headcount})`).join(', ')} •{' '}
                        <span className="font-medium text-slate-800">Shift:</span>{' '}
                        {req.crewDetails.shiftTiming?.callTime} - {req.crewDetails.shiftTiming?.wrapTime}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(req.createdAt).toLocaleDateString()}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {req.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

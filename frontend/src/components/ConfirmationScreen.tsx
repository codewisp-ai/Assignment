'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRequirementForm } from '../context/FormContext';
import { CheckCircle2, Copy, Check, PlusCircle, ListFilter, ArrowRight } from 'lucide-react';

export const ConfirmationScreen: React.FC = () => {
  const { submittedDoc, resetForm } = useRequirementForm();
  const [copied, setCopied] = useState(false);

  if (!submittedDoc) return null;

  const copyReference = () => {
    navigator.clipboard.writeText(submittedDoc.referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto text-center py-8">
      {/* Success Badge */}
      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm ring-8 ring-emerald-50">
        <CheckCircle2 className="w-9 h-9" />
      </div>

      <h1 className="text-2xl font-extrabold text-slate-900">Requirement Posted!</h1>
      <p className="text-sm text-slate-600 mt-2">
        Your event requirement has been successfully saved to the backend and is now live.
      </p>

      {/* Reference Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 mt-6 shadow-sm text-left">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
              Reference Tracking ID
            </span>
            <span className="text-lg font-mono font-bold text-slate-900 tracking-wide">
              {submittedDoc.referenceId}
            </span>
          </div>
          <button
            type="button"
            onClick={copyReference}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy ID</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 text-xs">
          <div>
            <span className="text-slate-400 block">Event Title:</span>
            <span className="font-semibold text-slate-800 text-sm">{submittedDoc.basics.eventName}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Category:</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 mt-0.5">
              {submittedDoc.category}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block">Location:</span>
            <span className="font-medium text-slate-700">{submittedDoc.basics.location}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Status:</span>
            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {submittedDoc.status}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
        <button
          type="button"
          onClick={resetForm}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition shadow-sm shadow-indigo-200"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post Another Requirement</span>
        </button>

        <Link
          href="/requirements"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition"
        >
          <ListFilter className="w-4 h-4 text-slate-500" />
          <span>View All Submissions</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
        </Link>
      </div>
    </div>
  );
};

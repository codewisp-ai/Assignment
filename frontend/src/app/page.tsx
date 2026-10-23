'use client';

import React from 'react';
import { useRequirementForm } from '../context/FormContext';
import { StepProgressBar } from '../components/StepProgressBar';
import { Step1Basics } from '../components/steps/Step1Basics';
import { Step2Details } from '../components/steps/Step2Details';
import { Step3Details } from '../components/steps/Step3Details';
import { Step4Review } from '../components/steps/Step4Review';
import { ConfirmationScreen } from '../components/ConfirmationScreen';
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

export default function HomePage() {
  const {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    submitRequirement,
    isSubmitting,
    submittedDoc
  } = useRequirementForm();

  if (submittedDoc) {
    return <ConfirmationScreen />;
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Basics />;
      case 2:
        return <Step2Details />;
      case 3:
        return <Step3Details />;
      case 4:
        return <Step4Review />;
      default:
        return <Step1Basics />;
    }
  };

  const handleNextOrSubmit = async () => {
    if (currentStep === 4) {
      await submitRequirement();
    } else {
      goToNextStep();
    }
  };

  return (
    <div className="space-y-6">
      <StepProgressBar />

      {/* Current Step Body */}
      {renderStep()}

      {/* Bottom Sticky Action Bar */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200/80">
        <div>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={goToPreviousStep}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={handleNextOrSubmit}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition shadow-sm shadow-indigo-200 disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting to Backend...</span>
            </>
          ) : currentStep === 4 ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Post Requirement</span>
            </>
          ) : (
            <>
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

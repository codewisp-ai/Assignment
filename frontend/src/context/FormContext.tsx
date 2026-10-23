'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FormData,
  EventCategory,
  EventBasics,
  PlannerDetails,
  PerformerDetails,
  CrewDetails,
  RequirementDocument
} from '../types';

const INITIAL_DATA: FormData = {
  basics: {
    eventName: '',
    eventType: 'corporate',
    isDateRange: false,
    startDate: '',
    endDate: '',
    location: '',
    venue: ''
  },
  category: 'planner',
  plannerDetails: {
    planningScope: 'full_planning',
    estimatedGuestCount: 100,
    budget: { min: 50000, max: 150000 },
    servicesNeeded: ['decor', 'catering'],
    timeline: '1_3_months',
    specialNotes: ''
  },
  performerDetails: {
    performerType: 'live_band',
    durationMinutes: 60,
    genreOrStyle: '',
    soundSetupProvided: false,
    micCount: 2,
    soundcheckTiming: '',
    specialRequests: ''
  },
  crewDetails: {
    rolesNeeded: [{ role: 'Stagehand', headcount: 2 }],
    shiftTiming: { callTime: '09:00', wrapTime: '17:00' },
    certificationsRequired: [],
    gearProvided: false,
    uniformRequired: false,
    additionalInstructions: ''
  }
};

interface FormContextType {
  currentStep: number;
  formData: FormData;
  errors: Record<string, string>;
  isSubmitting: boolean;
  submitError: string | null;
  submittedDoc: RequirementDocument | null;
  setCurrentStep: (step: number) => void;
  updateBasics: (fields: Partial<EventBasics>) => void;
  setCategory: (category: EventCategory) => void;
  updatePlanner: (fields: Partial<PlannerDetails>) => void;
  updatePerformer: (fields: Partial<PerformerDetails>) => void;
  updateCrew: (fields: Partial<CrewDetails>) => void;
  validateCurrentStep: () => boolean;
  goToNextStep: () => boolean;
  goToPreviousStep: () => void;
  submitRequirement: () => Promise<boolean>;
  resetForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const STORAGE_KEY = 'event_requirement_draft_v1';

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedDoc, setSubmittedDoc] = useState<RequirementDocument | null>(null);

  // Restore draft from sessionStorage on client mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.formData) setFormData(parsed.formData);
        if (parsed.currentStep) setCurrentStep(parsed.currentStep);
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save draft on state change
  useEffect(() => {
    if (!submittedDoc) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ currentStep, formData }));
      } catch {
        // Ignore storage errors
      }
    }
  }, [currentStep, formData, submittedDoc]);

  const updateBasics = (fields: Partial<EventBasics>) => {
    setFormData(prev => ({
      ...prev,
      basics: { ...prev.basics, ...fields }
    }));
    // Clear field-specific errors
    Object.keys(fields).forEach(key => {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    });
  };

  const setCategory = (category: EventCategory) => {
    setFormData(prev => ({ ...prev, category }));
  };

  const updatePlanner = (fields: Partial<PlannerDetails>) => {
    setFormData(prev => ({
      ...prev,
      plannerDetails: { ...prev.plannerDetails, ...fields }
    }));
  };

  const updatePerformer = (fields: Partial<PerformerDetails>) => {
    setFormData(prev => ({
      ...prev,
      performerDetails: { ...prev.performerDetails, ...fields }
    }));
  };

  const updateCrew = (fields: Partial<CrewDetails>) => {
    setFormData(prev => ({
      ...prev,
      crewDetails: { ...prev.crewDetails, ...fields }
    }));
  };

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.basics.eventName.trim()) {
        newErrors.eventName = 'Event name is required';
      }
      if (!formData.basics.startDate) {
        newErrors.startDate = 'Start date is required';
      }
      if (formData.basics.isDateRange) {
        if (!formData.basics.endDate) {
          newErrors.endDate = 'End date is required for a date range';
        } else if (new Date(formData.basics.endDate) < new Date(formData.basics.startDate)) {
          newErrors.endDate = 'End date cannot precede start date';
        }
      }
      if (!formData.basics.location.trim()) {
        newErrors.location = 'Location / City is required';
      }
    } else if (currentStep === 2) {
      if (formData.category === 'planner') {
        if (!formData.plannerDetails.estimatedGuestCount || formData.plannerDetails.estimatedGuestCount < 1) {
          newErrors.estimatedGuestCount = 'Estimated guest count must be at least 1';
        }
        if (formData.plannerDetails.budget.min < 0) {
          newErrors.budgetMin = 'Minimum budget cannot be negative';
        }
        if (formData.plannerDetails.budget.max < formData.plannerDetails.budget.min) {
          newErrors.budgetMax = 'Maximum budget cannot be less than minimum budget';
        }
      } else if (formData.category === 'performer') {
        if (!formData.performerDetails.genreOrStyle.trim()) {
          newErrors.genreOrStyle = 'Genre or performance style is required';
        }
        if (formData.performerDetails.durationMinutes < 15) {
          newErrors.durationMinutes = 'Duration must be at least 15 minutes';
        }
      } else if (formData.category === 'crew') {
        if (!formData.crewDetails.rolesNeeded || formData.crewDetails.rolesNeeded.length === 0) {
          newErrors.rolesNeeded = 'At least one crew role is required';
        } else {
          const hasInvalid = formData.crewDetails.rolesNeeded.some(r => !r.role.trim() || r.headcount < 1);
          if (hasInvalid) {
            newErrors.rolesNeeded = 'All crew roles must have a title and headcount of at least 1';
          }
        }
        if (!formData.crewDetails.shiftTiming.callTime || !formData.crewDetails.shiftTiming.wrapTime) {
          newErrors.shiftTiming = 'Both call time and wrap time are required';
        }
      }
    } else if (currentStep === 3) {
      if (formData.category === 'planner') {
        if (!formData.plannerDetails.servicesNeeded || formData.plannerDetails.servicesNeeded.length === 0) {
          newErrors.servicesNeeded = 'Please select at least one required service';
        }
      } else if (formData.category === 'performer') {
        if (formData.performerDetails.micCount < 0) {
          newErrors.micCount = 'Microphone count cannot be negative';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToNextStep = (): boolean => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
      return true;
    }
    return false;
  };

  const goToPreviousStep = () => {
    setErrors({});
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const submitRequirement = async (): Promise<boolean> => {
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      basics: formData.basics,
      category: formData.category,
      plannerDetails: formData.category === 'planner' ? formData.plannerDetails : undefined,
      performerDetails: formData.category === 'performer' ? formData.performerDetails : undefined,
      crewDetails: formData.category === 'crew' ? formData.crewDetails : undefined
    };

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    try {
      const res = await fetch(`${apiUrl}/requirements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.errors ? data.errors.join(', ') : data.error || 'Failed to submit requirement');
      }

      setSubmittedDoc(data.data);
      sessionStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (err: any) {
      setSubmitError(err.message || 'An unexpected network error occurred');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_DATA);
    setErrors({});
    setCurrentStep(1);
    setSubmittedDoc(null);
    setSubmitError(null);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return (
    <FormContext.Provider
      value={{
        currentStep,
        formData,
        errors,
        isSubmitting,
        submitError,
        submittedDoc,
        setCurrentStep,
        updateBasics,
        setCategory,
        updatePlanner,
        updatePerformer,
        updateCrew,
        validateCurrentStep,
        goToNextStep,
        goToPreviousStep,
        submitRequirement,
        resetForm
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useRequirementForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useRequirementForm must be used within a FormProvider');
  }
  return context;
};

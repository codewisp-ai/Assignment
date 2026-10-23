export type EventCategory = 'planner' | 'performer' | 'crew';

export type EventType =
  | 'wedding'
  | 'corporate'
  | 'concert'
  | 'birthday'
  | 'conference'
  | 'private_party'
  | 'other';

export interface EventBasics {
  eventName: string;
  eventType: EventType;
  isDateRange: boolean;
  startDate: string;
  endDate: string;
  location: string;
  venue?: string;
}

export interface PlannerDetails {
  planningScope: 'full_planning' | 'partial_planning' | 'day_of_coordination';
  estimatedGuestCount: number;
  budget: {
    min: number;
    max: number;
  };
  servicesNeeded: string[];
  timeline: 'immediate' | '1_3_months' | '3_6_months' | 'flexible';
  specialNotes?: string;
}

export interface PerformerDetails {
  performerType:
    | 'solo_musician'
    | 'live_band'
    | 'dj'
    | 'comedian'
    | 'magician'
    | 'dancer'
    | 'speaker_mc'
    | 'other';
  durationMinutes: number;
  genreOrStyle: string;
  soundSetupProvided: boolean;
  micCount: number;
  soundcheckTiming?: string;
  specialRequests?: string;
}

export interface CrewRoleItem {
  role: string;
  headcount: number;
}

export interface CrewDetails {
  rolesNeeded: CrewRoleItem[];
  shiftTiming: {
    callTime: string;
    wrapTime: string;
  };
  certificationsRequired: string[];
  gearProvided: boolean;
  uniformRequired: boolean;
  additionalInstructions?: string;
}

export interface FormData {
  basics: EventBasics;
  category: EventCategory;
  plannerDetails: PlannerDetails;
  performerDetails: PerformerDetails;
  crewDetails: CrewDetails;
}

export interface RequirementDocument {
  _id: string;
  referenceId: string;
  basics: EventBasics;
  category: EventCategory;
  plannerDetails?: PlannerDetails;
  performerDetails?: PerformerDetails;
  crewDetails?: CrewDetails;
  status: 'submitted' | 'in_review' | 'fulfilled';
  createdAt: string;
  updatedAt: string;
}

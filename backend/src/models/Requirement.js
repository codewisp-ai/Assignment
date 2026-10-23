import mongoose from 'mongoose';

const plannerDetailsSchema = new mongoose.Schema({
  planningScope: {
    type: String,
    enum: ['full_planning', 'partial_planning', 'day_of_coordination'],
    required: true
  },
  estimatedGuestCount: {
    type: Number,
    required: true,
    min: 1
  },
  budget: {
    min: { type: Number, required: true, min: 0 },
    max: { type: Number, required: true, min: 0 }
  },
  servicesNeeded: {
    type: [String],
    default: []
  },
  timeline: {
    type: String,
    enum: ['immediate', '1_3_months', '3_6_months', 'flexible'],
    required: true
  },
  specialNotes: {
    type: String,
    trim: true,
    default: ''
  }
}, { _id: false });

const performerDetailsSchema = new mongoose.Schema({
  performerType: {
    type: String,
    enum: ['solo_musician', 'live_band', 'dj', 'comedian', 'magician', 'dancer', 'speaker_mc', 'other'],
    required: true
  },
  durationMinutes: {
    type: Number,
    required: true,
    min: 15
  },
  genreOrStyle: {
    type: String,
    required: true,
    trim: true
  },
  soundSetupProvided: {
    type: Boolean,
    default: false
  },
  micCount: {
    type: Number,
    default: 1,
    min: 0
  },
  soundcheckTiming: {
    type: String,
    default: ''
  },
  specialRequests: {
    type: String,
    trim: true,
    default: ''
  }
}, { _id: false });

const crewRoleSchema = new mongoose.Schema({
  role: { type: String, required: true, trim: true },
  headcount: { type: Number, required: true, min: 1 }
}, { _id: false });

const crewDetailsSchema = new mongoose.Schema({
  rolesNeeded: {
    type: [crewRoleSchema],
    validate: [val => val.length > 0, 'At least one crew role is required']
  },
  shiftTiming: {
    callTime: { type: String, required: true },
    wrapTime: { type: String, required: true }
  },
  certificationsRequired: {
    type: [String],
    default: []
  },
  gearProvided: {
    type: Boolean,
    default: false
  },
  uniformRequired: {
    type: Boolean,
    default: false
  },
  additionalInstructions: {
    type: String,
    trim: true,
    default: ''
  }
}, { _id: false });

const requirementSchema = new mongoose.Schema({
  referenceId: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  basics: {
    eventName: { type: String, required: true, trim: true },
    eventType: {
      type: String,
      required: true,
      enum: ['wedding', 'corporate', 'concert', 'birthday', 'conference', 'private_party', 'other']
    },
    isDateRange: { type: Boolean, default: false },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    location: { type: String, required: true, trim: true },
    venue: { type: String, trim: true, default: '' }
  },
  category: {
    type: String,
    required: true,
    enum: ['planner', 'performer', 'crew']
  },
  plannerDetails: {
    type: plannerDetailsSchema,
    required: function() { return this.category === 'planner'; }
  },
  performerDetails: {
    type: performerDetailsSchema,
    required: function() { return this.category === 'performer'; }
  },
  crewDetails: {
    type: crewDetailsSchema,
    required: function() { return this.category === 'crew'; }
  },
  status: {
    type: String,
    enum: ['submitted', 'in_review', 'fulfilled'],
    default: 'submitted'
  }
}, {
  timestamps: true
});

export const Requirement = mongoose.model('Requirement', requirementSchema);

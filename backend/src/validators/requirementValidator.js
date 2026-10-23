export const validateRequirement = (req, res, next) => {
  const { basics, category, plannerDetails, performerDetails, crewDetails } = req.body;
  const errors = [];

  if (!basics) {
    return res.status(400).json({ success: false, errors: ['Basics data is required.'] });
  }

  const { eventName, eventType, startDate, endDate, isDateRange, location } = basics;

  if (!eventName || typeof eventName !== 'string' || !eventName.trim()) {
    errors.push('Event name is required.');
  }

  const validEventTypes = ['wedding', 'corporate', 'concert', 'birthday', 'conference', 'private_party', 'other'];
  if (!eventType || !validEventTypes.includes(eventType)) {
    errors.push(`Event type must be one of: ${validEventTypes.join(', ')}.`);
  }

  if (!startDate || isNaN(Date.parse(startDate))) {
    errors.push('A valid start date is required.');
  }

  if (isDateRange) {
    if (!endDate || isNaN(Date.parse(endDate))) {
      errors.push('End date is required for a date range.');
    } else if (new Date(endDate) < new Date(startDate)) {
      errors.push('End date cannot be earlier than start date.');
    }
  }

  if (!location || typeof location !== 'string' || !location.trim()) {
    errors.push('Location is required.');
  }

  const validCategories = ['planner', 'performer', 'crew'];
  if (!category || !validCategories.includes(category)) {
    errors.push('Category must be either planner, performer, or crew.');
  }

  if (category === 'planner') {
    if (!plannerDetails) {
      errors.push('Planner details are required.');
    } else {
      const { planningScope, estimatedGuestCount, budget, timeline } = plannerDetails;
      const validScopes = ['full_planning', 'partial_planning', 'day_of_coordination'];
      if (!planningScope || !validScopes.includes(planningScope)) {
        errors.push(`Planning scope must be one of: ${validScopes.join(', ')}.`);
      }
      if (!estimatedGuestCount || estimatedGuestCount < 1) {
        errors.push('Estimated guest count must be at least 1.');
      }
      if (!budget || typeof budget.min !== 'number' || typeof budget.max !== 'number') {
        errors.push('Budget range with min and max numbers is required.');
      } else if (budget.max < budget.min) {
        errors.push('Maximum budget cannot be less than minimum budget.');
      }
      const validTimelines = ['immediate', '1_3_months', '3_6_months', 'flexible'];
      if (!timeline || !validTimelines.includes(timeline)) {
        errors.push(`Timeline must be one of: ${validTimelines.join(', ')}.`);
      }
    }
  }

  if (category === 'performer') {
    if (!performerDetails) {
      errors.push('Performer details are required.');
    } else {
      const { performerType, durationMinutes, genreOrStyle } = performerDetails;
      const validPerformerTypes = ['solo_musician', 'live_band', 'dj', 'comedian', 'magician', 'dancer', 'speaker_mc', 'other'];
      if (!performerType || !validPerformerTypes.includes(performerType)) {
        errors.push(`Performer type must be one of: ${validPerformerTypes.join(', ')}.`);
      }
      if (!durationMinutes || durationMinutes < 15) {
        errors.push('Duration must be at least 15 minutes.');
      }
      if (!genreOrStyle || typeof genreOrStyle !== 'string' || !genreOrStyle.trim()) {
        errors.push('Genre or performance style is required.');
      }
    }
  }

  if (category === 'crew') {
    if (!crewDetails) {
      errors.push('Crew details are required.');
    } else {
      const { rolesNeeded, shiftTiming } = crewDetails;
      if (!Array.isArray(rolesNeeded) || rolesNeeded.length === 0) {
        errors.push('At least one crew role with headcount is required.');
      } else {
        rolesNeeded.forEach((r, idx) => {
          if (!r.role || typeof r.role !== 'string' || !r.role.trim()) {
            errors.push(`Role title is required for role entry #${idx + 1}.`);
          }
          if (!r.headcount || r.headcount < 1) {
            errors.push(`Headcount for "${r.role || idx + 1}" must be at least 1.`);
          }
        });
      }
      if (!shiftTiming || !shiftTiming.callTime || !shiftTiming.wrapTime) {
        errors.push('Both call time and wrap time are required for crew shift.');
      }
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};

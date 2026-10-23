import { Requirement } from '../models/Requirement.js';

export const createRequirement = async (req, res, next) => {
  try {
    const { basics, category, plannerDetails, performerDetails, crewDetails } = req.body;

    const timestampPart = Date.now().toString(36).toUpperCase();
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `REQ-${timestampPart}-${randomPart}`;

    const docPayload = {
      referenceId,
      basics,
      category,
      plannerDetails: category === 'planner' ? plannerDetails : undefined,
      performerDetails: category === 'performer' ? performerDetails : undefined,
      crewDetails: category === 'crew' ? crewDetails : undefined
    };

    const requirement = await Requirement.create(docPayload);

    return res.status(201).json({
      success: true,
      message: 'Requirement posted successfully',
      data: requirement
    });
  } catch (error) {
    next(error);
  }
};

export const getRequirements = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category && ['planner', 'performer', 'crew'].includes(category)) {
      filter.category = category;
    }

    if (search) {
      filter['basics.eventName'] = { $regex: search, $options: 'i' };
    }

    const requirements = await Requirement.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: requirements.length,
      data: requirements
    });
  } catch (error) {
    next(error);
  }
};

export const getRequirementById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = id.startsWith('REQ-') ? { referenceId: id } : { _id: id };
    const requirement = await Requirement.findOne(query);

    if (!requirement) {
      return res.status(404).json({
        success: false,
        error: 'Requirement not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: requirement
    });
  } catch (error) {
    next(error);
  }
};

import { Router } from 'express';
import {
  createRequirement,
  getRequirements,
  getRequirementById
} from '../controllers/requirementController.js';
import { validateRequirement } from '../validators/requirementValidator.js';

const router = Router();

router.post('/', validateRequirement, createRequirement);
router.get('/', getRequirements);
router.get('/:id', getRequirementById);

export default router;

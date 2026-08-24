import express from 'express';

import {
  getTattoos,
  createTattoo,
  updateTattoo,
  deleteTattoo
} from '../controllers/tattooController.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getTattoos)
  .post(protect, createTattoo);

router.route('/:id')
  .put(protect, updateTattoo)
  .delete(protect, deleteTattoo);

export default router;
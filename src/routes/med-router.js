import express from 'express';
import {postMedEntry, getMedEntries} from '../controllers/med-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const medRouter = express.Router();

// post to /api/med
// med dose data: user_id, name, bs_l1, d_l1, bs_l2, d_l2, notes
medRouter
  .route('/')
  .post(
    authenticateToken,
    body('med_name').notEmpty().isAlpha({min:2, max:10}),
    body('bs_low_level').trim().notEmpty().isDecimal,
    body('dosage_low_level').notEmpty().isInt(),
    body('bs_high_level').trim().notEmpty().isDecimal,
    body('dosage_high_level').notEmpty().isInt(),
    body('note').trim().escape(),
    validationErrorHandler,
    postMedEntry,
  )

  medRouter.route('/:id')
  .get(getMedEntries);

export default medRouter;


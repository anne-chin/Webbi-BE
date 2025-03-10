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
    body('name').notEmpty.isAlpha({min:2, max:10}),
    body('bs_l1').trim().notEmpty().isDecimal,
    body('d_l1').notEmpty.isInt(),
    body('bs_l2').trim().notEmpty().isDecimal,
    body('d_l2').notEmpty.isInt(),
    body('notes').trim().escape(),
    validationErrorHandler,
    postMedEntry,
  )
  .get(authenticateToken, getMedEntries);

export default medRouter;


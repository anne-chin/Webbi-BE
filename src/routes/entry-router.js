import express from 'express';
import {getEntries, postEntry} from '../controllers/entry-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const entryRouter = express.Router();

// post to /api/entries
// entry data: user_id, entry_date, bs, insulin, giver, notes

entryRouter
  .route('/')
  .post(
    authenticateToken,
    body('entry_date').notEmpty().isDate(),
    body('bs').trim().notEmpty().isDecimal,
    body('insulin').isAlpha({min: 2, max: 20}),
    body('giver').notEmpty.isAlpha({min: 0, max: 10}),
    body('notes').trim().escape(),
    validationErrorHandler,
    postEntry,
  )
  .get(authenticateToken, getEntries);

export default entryRouter;

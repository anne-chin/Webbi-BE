import express from 'express';
import {getEntries, postEntry} from '../controllers/entry-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const entryRouter = express.Router();

// post to /api/entries
entryRouter
  .route('/')
  .post(
    authenticateToken,
    body('entry_date').notEmpty().isDate(),
    body('bs_value').isDecimal(),
    body('given_dose').isInt({min: 0, max: 20}),
    body('giver').notEmpty().isLength({min: 2, max: 25}).escape(),
    body('med_name').trim().notEmpty().isLength({min: 3, max: 25}).escape(),
    body('notes').trim().escape().custom((value, {req}) => {
      // customvalidointiesimerkki: jos sisältö sama kuin mood-kentässä
      // -> ei mee läpi
      // https://express-validator.github.io/docs/guides/customizing#implementing-a-custom-validator
      console.log('custom validator', value);
      return !(req.body.giver === value);
    }),
    validationErrorHandler,
    postEntry,
  )
  .get(authenticateToken, getEntries);

export default entryRouter;

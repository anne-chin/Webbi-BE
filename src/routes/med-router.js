import express from 'express';
import {getEntries, postEntry} from '../controllers/med-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const medRouter = express.Router();

// post to /api/entries
medRouter
  .route('/')
  .post(
    authenticateToken,
    body('entry_date').notEmpty().isDate(),
    body('med_name').trim().notEmpty().isLength({min: 3, max: 25}).escape(),
    body('bs_l').isDecimal(),
    body('dosage_l').isInt({min: 0, max: 20}),
    body('bs_h').isDecimal(),
    body('dosage_h').isInt({min: 0, max: 20}),
    body('notes').notEmpty().trim().escape().custom((value, {req}) => {
      // customvalidointiesimerkki: jos sisältö sama kuin mood-kentässä
      // -> ei mee läpi
      // https://express-validator.github.io/docs/guides/customizing#implementing-a-custom-validator
      console.log('custom validator', value);
      return !(req.body.med_name === value);
    }),
    validationErrorHandler,
    postEntry,
  )
  .get(authenticateToken, getEntries);

export default medRouter;

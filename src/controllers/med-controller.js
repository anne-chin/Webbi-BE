import { medDose, latestMedDose } from "../models/med-model.js";

const postMedEntry = async (req, res, next) => {
  const newEntry = req.body;
  newEntry.user_id = req.user.user_id;
  try {
    await medDose(newEntry);
    res.status(201).json({message: "Entry added."});
  } catch (error) {
    next(error);
  }
};

/**
 * Get all entries of the logged in meddose
 * @param {*} req
 * @param {*} res
 */
const getMedEntries = async (req, res, next) => {
  try {
    const entries = await latestMedDose(req.user.user_id);
    res.json(entries);
  } catch (error) {
    next(error);
  }
};

export {postMedEntry, getMedEntries};

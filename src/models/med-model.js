import promisePool from '../utils/database.js';

const medDose = async (entry) => {
  try {
    const [result] = await promisePool.query(
      'INSERT INTO med_dose_calc (user_id, med_name, bs_low_level, dosage_low_level, bs_high_level, dosage_high_level, note) VALUES (?, ?, ?, ?, ?, ? ,?, ?)',
      [entry.user_id, entry.med_name, entry.bs_low_level, entry.dosage_low_level, entry.bs_high_level, entry.dosage_high_level, entry.note],
    );
    console.log('Medication log: ', result);
    // return only first item of the result array
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};


const latestMedDose = async (userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM med_dose_calc WHERE user_id=? ORDER BY created_at DESC LIMIT 1',
      [userId],
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

export {medDose, latestMedDose};


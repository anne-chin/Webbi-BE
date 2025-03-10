import promisePool from '../utils/database.js';

const medDose = async (entry) => {
  try {
    const [result] = await promisePool.query(
      'INSERT INTO MedDose (user_id, name, bs_l1, d_l1, bs_l2, d_l2, notes) VALUES (?, ?, ?, ?, ? ,?)',
      [entry.user_id, entry.name, entry.bs_l1, entry.d_l1, entry.bs_l2, entry.d_l2, entry.notes],
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
      'SELECT * FROM MedDose WHERE user_id=?',
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


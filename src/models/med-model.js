import promisePool from '../utils/database.js';

const insertEntry = async (entry) => {
  try {
    const [result] = await promisePool.query(
      'INSERT INTO med_table (user_id, entry_date, med_name, bs_l, dosage_l, bs_h, dosage_h, notes) VALUES (?, ?, ?, ?, ?, ? , ?, ?)',
      [entry.user_id, entry.entry_date, entry.med_name, entry.bs_l, entry.dosage_l, entry.bs_h, entry.dosage_h, entry.notes],
    );
    console.log('inserEntry', result);
    // return only first item of the result array
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

const selectEntriesByUserId = async (userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM med_table WHERE user_id=?',
      [userId],
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

export {insertEntry, selectEntriesByUserId};

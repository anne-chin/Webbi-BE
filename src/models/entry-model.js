import promisePool from '../utils/database.js';

const insertEntry = async (entry) => {
  try {
    const [result] = await promisePool.query(
      'INSERT INTO DiaryEntries (user_id, entry_date, bs_value, given_dose, giver, med_name, notes) VALUES (?, ?, ?, ?, ?, ? ,?)',
      [entry.user_id, entry.entry_date, entry.bs_value, entry.given_dose, entry.giver, entry.med_name, entry.notes],
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
      'SELECT * FROM DiaryEntries WHERE user_id=?',
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

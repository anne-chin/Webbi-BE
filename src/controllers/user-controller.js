import bcrypt from 'bcryptjs';
import {
  insertUser,
  selectAllUsers,
  selectUserById,
} from '../models/user-model.js';

// kaikkien käyttäjätietojen haku
const getUsers = async (req, res) => {
  // in real world application, password properties should never be sent to client
  const users = await selectAllUsers();
  res.json(users);
};

// Userin haku id:n perusteella
const getUserById = async (req, res) => {
  console.log('getUserById', req.params.id);

  try {
    const user = await selectUserById(req.params.id);
    console.log('User found:', user);
    // jos user löytyi, eli arvo ei ole undefined, lähetetään se vastauksena
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// käyttäjän lisäys (rekisteröinti)
// lisätään parempi virheenkäsittely myöhemmin
const addUser = async (req, res) => {
  console.log('addUser request body', req.body);
  // esitellään 3 uutta muuttujaa, johon sijoitetaan req.body:n vastaavien propertyjen arvot
  const {username, password, email, birthday} = req.body;
  // tarkistetaan, että pyynnössä on kaikki tarvittavat tiedot
  if (username && password && email && birthday) {
    // luodaan selväkielisestä sanasta tiiviste, joka tallennetaan kantaan
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // luodaan uusi käyttäjä olio ja lisätään se tietokantaa käyttäen modelia
    const newUser = {
      username,
      password: hashedPassword,
      email,
      birthday,
    };
    try {
      const result = await insertUser(newUser);
      res.status(201);
      return res.json({message: 'User added. id: ' + result});
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({message: 'DB error: ' + error.message});
    }
  }
  res.status(400);
  return res.json({
    message: 'Request should have username, password and email properties.',
  });
};


export {getUsers, getUserById, addUser};

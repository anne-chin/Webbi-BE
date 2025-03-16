import express from 'express';
import cors from 'cors';
import userRouter from './routes/user-router.js';
import authRouter from './routes/auth-router.js';
import entryRouter from './routes/entry-router.js';
import medRouter from './routes/med-router.js';
import {errorHandler, notFoundHandler} from './middlewares/error-handler.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

//middleware for FE testing
app.use(cors());


// middleware for json body
app.use(express.json());

// apidoc
app.use('/api', express.static('docs'));

//endpoints
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/entries', entryRouter);
app.use('/api/med', medRouter);

//error & not found handler
app.use(notFoundHandler);
app.use(errorHandler);


// palvelimen käynnistys lopuksi kaikkien määritysten jälkeen
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import 'express-async-errors';

import cors from 'cors';

import router from '@routes/index.routes';

import errorTreatment from '@middlewares/errorTreatment';
import uploadConfig from '@config/upload';

import '@database/connection';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use(router);

app.use(errorTreatment);

app.listen(3030, () => console.log('Server online'));

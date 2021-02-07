import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import router from './shared/routes/index.routes';
import AppError from './shared/errors/AppError';
import uploadConfig from './config/upload';

import './shared/database/connection';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(400).json({
                status: 'error',
                message: err.message,
            });
        }

        console.log(err);

        return response.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
);

app.listen(3030, () => console.log('Server online'));

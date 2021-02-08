import { Request, Response } from 'express';

import UsersRepository from '../repositories/UsersRepository';
import StorageProvider from '@providers/StorageProvider';

import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

class AvatarController {
    public async update(request: Request, response: Response) {
        const { filename } = request.file;

        const { id: user_id } = request.user;

        const usersRepository = new UsersRepository();
        const storageProvider = new StorageProvider();

        const updateUserAvatarService = new UpdateUserAvatarService(
            usersRepository,
            storageProvider
        );

        await updateUserAvatarService.execute({
            user_id,
            filename,
        });

        return response.status(204).json();
    }
}

export default AvatarController;

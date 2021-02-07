import { Request, Response } from 'express';

import UsersRepository from '../../../useCases/User/repositories/UsersRepository';
import StorageProvider from '../../../shared/providers/StorageProvider/StorageProvider';

import UpdateUserAvatarService from '../../../useCases/User/services/UpdateUserAvatarService';

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

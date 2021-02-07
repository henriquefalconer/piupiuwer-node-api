import { Request, Response } from 'express';

import UsersRepository from '../../../useCases/User/repositories/UsersRepository';

import ShowUserProfileService from '../../../useCases/User/services/ShowUserProfileService';

class ProfilesController {
    public async show(request: Request, response: Response) {
        const { profile_user_id } = request.body;

        const { id: user_id } = request.user;

        const usersRepository = new UsersRepository();

        const showUserProfileService = new ShowUserProfileService(
            usersRepository
        );

        const profileUser = await showUserProfileService.execute({
            user_id,
            profile_user_id,
        });

        return response.json(profileUser);
    }
}

export default ProfilesController;

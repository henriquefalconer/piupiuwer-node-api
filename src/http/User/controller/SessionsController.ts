import { Request, Response } from 'express';

import UsersRepository from '../../../useCases/User/repositories/UsersRepository';
import HashProvider from '../../../shared/providers/HashProvider/HashProvider';

import AuthenticateUserService from '../../../useCases/User/services/AuthenticateUserService';

class SessionsController {
    public async create(request: Request, response: Response) {
        const { email, password } = request.body;

        const usersRepository = new UsersRepository();
        const hashProvider = new HashProvider();

        const authenticateUser = new AuthenticateUserService(
            usersRepository,
            hashProvider
        );

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        return response.json({ user, token });
    }
}

export default SessionsController;

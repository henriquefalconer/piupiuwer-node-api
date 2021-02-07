import { Request, Response } from 'express';

import PiusRepository from '../repositories/Pius/PiusRepository';
import CreatePiuService from '../services/CreatePiuService';
import UsersRepository from '../../User/repositories/Users/UsersRepository';

class UsersController {
    public async create(request: Request, response: Response) {
        const { content } = request.body;

        const { id: user_id } = request.user;

        const piusRepository = new PiusRepository();
        const usersRepository = new UsersRepository();

        const createPiu = new CreatePiuService(usersRepository, piusRepository);

        const piu = await createPiu.execute({
            content,
            user_id,
        });

        return response.json(piu);
    }
}

export default UsersController;

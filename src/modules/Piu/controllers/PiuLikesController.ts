import { Request, Response } from 'express';

import UsersRepository from '@modules/User/repositories/Users/UsersRepository';
import PiusRepository from '../repositories/Pius/PiusRepository';
import PiuLikesRepository from '../repositories/PiuLikes/PiuLikesRepository';

import LikePiuService from '../services/LikePiuService';

class PiuLikesController {
    public async create(request: Request, response: Response) {
        const { piu_id } = request.body;

        const { id: user_id } = request.user;

        const usersRepository = new UsersRepository();
        const piusRepository = new PiusRepository();
        const piuLikesRepository = new PiuLikesRepository();

        const likePiu = new LikePiuService(
            usersRepository,
            piusRepository,
            piuLikesRepository
        );

        const piu = await likePiu.execute({
            piu_id,
            user_id,
        });

        return response.json({ likes: piu.likes });
    }
}

export default PiuLikesController;

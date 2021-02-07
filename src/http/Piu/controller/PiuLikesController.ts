import { Request, Response } from 'express';

import UsersRepository from '../../../useCases/User/repositories/UsersRepository';
import PiusRepository from '../../../useCases/Piu/repositories/PiusRepository';
import PiuLikesRepository from '../../../useCases/Piu/repositories/PiuLikesRepository';

import LikePiuService from '../../../useCases/Piu/services/LikePiuService';

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

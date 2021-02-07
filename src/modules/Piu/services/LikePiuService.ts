import AppError from '../../../shared/errors/AppError';

import IUsersRepository from '../../User/repositories/Users/IUsersRepository';
import IPiusRepository from '../repositories/Pius/IPiusRepository';
import IPiuLikesRepository from '../repositories/PiuLikes/IPiuLikesRepository';

interface IRequest {
    piu_id: string;
    user_id: string;
}

class LikeUserService {
    private usersRepository: IUsersRepository;
    private piusRepository: IPiusRepository;
    private piuLikesRepository: IPiuLikesRepository;

    constructor(
        usersRepository: IUsersRepository,
        piusRepository: IPiusRepository,
        piuLikesRepository: IPiuLikesRepository
    ) {
        this.usersRepository = usersRepository;
        this.piusRepository = piusRepository;
        this.piuLikesRepository = piuLikesRepository;
    }

    public async execute({ piu_id, user_id }: IRequest): Promise<any> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        const piu = await this.piusRepository.findById(piu_id);

        if (!piu) {
            throw new AppError('Piu not found');
        }

        const piuLikeExists = await this.piuLikesRepository.findByUserAndPiuIds(
            user_id,
            piu_id
        );

        if (piuLikeExists) {
            await this.piuLikesRepository.delete(piuLikeExists.id);

            piu.likes -= 1;
        } else {
            const piuLike = await this.piuLikesRepository.create({
                piu_id,
                user_id,
            });

            await this.piuLikesRepository.save(piuLike);

            piu.likes += 1;
        }

        await this.piusRepository.save(piu);

        return piu;
    }
}

export default LikeUserService;

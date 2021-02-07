import AppError from '../../../shared/errors/AppError';

import IUsersRepository from '../../User/repositories/IUsersRepository';
import IPiusRepository from '../repositories/IPiusRepository';
import IPiuLikesRepository from '../repositories/IPiuLikesRepository';

interface IRequest {
    piu_id: string;
    user_id: string;
}

class LikeUserService {
    private usersRespository: IUsersRepository;
    private piusRespository: IPiusRepository;
    private piuLikesRespository: IPiuLikesRepository;

    constructor(
        usersRespository: IUsersRepository,
        piusRespository: IPiusRepository,
        piuLikesRespository: IPiuLikesRepository
    ) {
        this.usersRespository = usersRespository;
        this.piusRespository = piusRespository;
        this.piuLikesRespository = piuLikesRespository;
    }

    public async execute({ piu_id, user_id }: IRequest): Promise<any> {
        const user = await this.usersRespository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        const piu = await this.piusRespository.findById(piu_id);

        if (!piu) {
            throw new AppError('Piu not found');
        }

        const piuLikeExists = await this.piuLikesRespository.findByUserAndPiuIds(
            user_id,
            piu_id
        );

        if (piuLikeExists) {
            await this.piuLikesRespository.delete(piuLikeExists.id);

            piu.likes -= 1;
        } else {
            const piuLike = await this.piuLikesRespository.create({
                piu_id,
                user_id,
            });

            await this.piuLikesRespository.save(piuLike);

            piu.likes += 1;
        }

        await this.piusRespository.save(piu);

        return piu;
    }
}

export default LikeUserService;

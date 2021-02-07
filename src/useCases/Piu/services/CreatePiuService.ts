import AppError from '../../../shared/errors/AppError';

import IUsersRepository from '../../User/repositories/IUsersRepository';
import IPiusRepository from '../repositories/IPiusRepository';

interface IRequest {
    content: string;
    user_id: string;
}

class CreateUserService {
    private usersRespository: IUsersRepository;
    private piusRespository: IPiusRepository;

    constructor(
        usersRespository: IUsersRepository,
        piusRespository: IPiusRepository
    ) {
        this.usersRespository = usersRespository;
        this.piusRespository = piusRespository;
    }

    public async execute({ content, user_id }: IRequest): Promise<any> {
        const user = await this.usersRespository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        if (!content) {
            throw new AppError('Invalid content');
        }

        const piu = await this.piusRespository.create({ content, user_id });

        await this.piusRespository.save(piu);

        return piu;
    }
}

export default CreateUserService;

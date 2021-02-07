import AppError from '../../../shared/errors/AppError';

import User from '../models/User';
import IUsersRepository from '../repositories/Users/IUsersRepository';

interface IRequest {
    user_id: string;
    profile_user_id: string;
}

class ShowUserProfileService {
    private usersRepository: IUsersRepository;

    constructor(usersRepository: IUsersRepository) {
        this.usersRepository = usersRepository;
    }

    public async execute({
        user_id,
        profile_user_id,
    }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        const profileUser = await this.usersRepository.findByIdWithRelations(
            profile_user_id
        );

        if (!profileUser) {
            throw new AppError('Target user not found');
        }

        return profileUser;
    }
}

export default ShowUserProfileService;

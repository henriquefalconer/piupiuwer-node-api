import AppError from '@errors/AppError';

import IHashProvider from '@providers/HashProvider/types';
import IUsersRepository from '../repositories/UsersRepository/types';

interface IRequest {
    name: string;
    username: string;
    email: string;
    password: string;
    // birthdate: string;
}

class CreateUserService {
    private usersRepository: IUsersRepository;
    private hashProvider: IHashProvider;

    constructor(
        usersRepository: IUsersRepository,
        hashProvider: IHashProvider
    ) {
        this.usersRepository = usersRepository;
        this.hashProvider = hashProvider;
    }

    public async execute({
        name,
        email,
        username,
        password,
    }: IRequest): Promise<any> {
        const emailUsed = await this.usersRepository.findByEmail(email);

        if (emailUsed) {
            throw new AppError('E-mail already used');
        }

        const usernameUsed = await this.usersRepository.findByUsername(
            username
        );

        if (usernameUsed) {
            throw new AppError('Username already used');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            username,
            email,
            password: hashedPassword,
        });

        await this.usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;

import AppError from '../../../shared/errors/AppError';

import IHashProvider from '../../../shared/providers/HashProvider/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    name: string;
    username: string;
    email: string;
    password: string;
    // birthdate: string;
}

class CreateUserService {
    private usersRespository: IUsersRepository;
    private hashProvider: IHashProvider;

    constructor(
        usersRespository: IUsersRepository,
        hashProvider: IHashProvider
    ) {
        this.usersRespository = usersRespository;
        this.hashProvider = hashProvider;
    }

    public async execute({
        name,
        email,
        username,
        password,
    }: IRequest): Promise<any> {
        const emailUsed = await this.usersRespository.findByEmail(email);

        if (emailUsed) {
            throw new AppError('E-mail already used');
        }

        const usernameUsed = await this.usersRespository.findByUsername(
            username
        );

        if (usernameUsed) {
            throw new AppError('Username already used');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRespository.create({
            name,
            username,
            email,
            password: hashedPassword,
        });

        await this.usersRespository.save(user);

        return user;
    }
}

export default CreateUserService;

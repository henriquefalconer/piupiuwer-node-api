import AppError from '@errors/AppError';

import moment from 'moment';

import IHashProvider from '@providers/HashProvider/types';
import IUsersRepository from '../repositories/UsersRepository/types';
import IDateProvider from '@providers/DateProvider/types';

interface IRequest {
    name: string;
    username: string;
    email: string;
    password: string;
    birthdate: string;
}

class CreateUserService {
    private usersRepository: IUsersRepository;
    private hashProvider: IHashProvider;
    private dateProvider: IDateProvider;

    constructor(
        usersRepository: IUsersRepository,
        hashProvider: IHashProvider,
        dateProvider: IDateProvider
    ) {
        this.usersRepository = usersRepository;
        this.hashProvider = hashProvider;
        this.dateProvider = dateProvider;
    }

    public async execute({
        name,
        email,
        username,
        password,
        birthdate,
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

        const parsedDate = this.dateProvider.parseDate(birthdate)

        if (!parsedDate) {
            throw new AppError('Invalid date');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            username,
            email,
            password: hashedPassword,
            birthdate: parsedDate,
        });

        await this.usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;

import { Request, Response } from 'express';

import UsersRepository from '../repositories/UsersRepository';

import HashProvider from '@providers/HashProvider';
import DateProvider from '@providers/DateProvider';

import CreateUserService from '../services/CreateUserService';

// Metódos que um controller pode ter:
// - create: cria um usuário
// - update: atualizar um usuário
// - delete: deletar um usuário
// - index: listar vários usuários
// - show: listar um usuário
class UsersController {
    public async create(request: Request, response: Response) {
        const { name, username, email, password, birthdate } = request.body;

        const usersRepository = new UsersRepository();
        const hashProvider = new HashProvider();
        const dateProvider = new DateProvider();

        const createUser = new CreateUserService(usersRepository, hashProvider, dateProvider);

        const user = await createUser.execute({
            name,
            username,
            email,
            password,
            birthdate,
        });

        return response.json({ user });
    }
}

export default UsersController;

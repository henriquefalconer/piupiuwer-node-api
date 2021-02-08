import User from '../../models/User';

import CreateUserDTO from '../../dtos/CreateUserDTO'

interface IUsersRepository {
    findByEmail(email: string): Promise<User | undefined>;
    findByUsername(username: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    findByIdWithRelations(id: string): Promise<User | undefined>;
    create(data: CreateUserDTO): Promise<User>;
    save(data: User): Promise<User>;
}

export default IUsersRepository;

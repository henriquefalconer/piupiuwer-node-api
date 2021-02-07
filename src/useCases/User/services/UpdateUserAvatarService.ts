import AppError from '../../../shared/errors/AppError';

import IStorageProvider from '../../../shared/providers/StorageProvider/IStorageProvider';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    filename: string;
    user_id: string;
}

class UpdateUserAvatarService {
    private usersRespository: IUsersRepository;
    private storageProvider: IStorageProvider;

    constructor(
        usersRespository: IUsersRepository,
        storageProvider: IStorageProvider
    ) {
        this.usersRespository = usersRespository;
        this.storageProvider = storageProvider;
    }

    public async execute({ filename, user_id }: IRequest): Promise<void> {
        const user = await this.usersRespository.findById(user_id);

        if (!user) {
            await this.storageProvider.deleteTempFile(filename);
            throw new AppError('User not found');
        }

        if (user.avatar) {
            await this.storageProvider.deleteFile(user.avatar);
        }

        await this.storageProvider.saveFile(filename);

        user.avatar = filename;

        await this.usersRespository.save(user);
    }
}

export default UpdateUserAvatarService;

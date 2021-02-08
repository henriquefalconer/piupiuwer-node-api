// Repositories:
import PiuLikesRepository from '@modules/Piu/repositories/PiuLikesRepository';
import PiusRepository from '@modules/Piu/repositories/PiusRepository';
import UsersRepository from '@modules/User/repositories/UsersRepository';

// Providers:
import HashProvider from '@providers/HashProvider';
import StorageProvider from '@providers/StorageProvider';

// Repositories:
export const piusRepository = new PiusRepository();
export const piuLikesRepository = new PiuLikesRepository();
export const usersRepository = new UsersRepository();

// Providers:
export const hashProvider = new HashProvider();
export const storageProvider = new StorageProvider();

import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';

import IStorageProvider from './types';

class StorageProvider implements IStorageProvider {
    public async saveFile(filename: string): Promise<void> {
        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, filename),
            path.resolve(uploadConfig.uploadsFolder, filename)
        );
    }

    public async deleteFile(filename: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.uploadsFolder, filename);

        try {
            await fs.promises.stat(filePath);
        } catch {
            return;
        }

        await fs.promises.unlink(filePath);
    }

    public async deleteTempFile(filename: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.tmpFolder, filename);

        try {
            await fs.promises.stat(filePath);
        } catch {
            return;
        }

        await fs.promises.unlink(filePath);
    }
}

export default StorageProvider;

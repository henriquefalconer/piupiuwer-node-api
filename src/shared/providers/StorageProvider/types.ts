interface IStorageProvider {
    saveFile(filename: string): Promise<void>;
    deleteFile(filename: string): Promise<void>;
    deleteTempFile(filename: string): Promise<void>;
}

export default IStorageProvider;

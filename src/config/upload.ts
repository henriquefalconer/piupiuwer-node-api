import multer from 'multer'
import path from 'path'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

const uploadsFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')

export default {
    tmpFolder,
    uploadsFolder,

    multer: {
        storage: multer.diskStorage({
            destination: tmpFolder,
            filename: (request, file, callback) => {
                const fileHash = `${Date.now()}`;

                const filename = `${fileHash}-${file.originalname.replace(/\s/g, '')}`

                return callback(null, filename)
            }
        }),

    }
}

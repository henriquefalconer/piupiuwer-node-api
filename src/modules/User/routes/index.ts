import Router from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload'

import ensureAuthenticated from '@middlewares/ensureAuthenticated';

import UsersController from '../controller/UsersController';
import SessionsController from '../controller/SessionsController';
import ProfilesController from '../controller/ProfilesController';
import AvatarController from '../controller/AvatarController';

const userRouter = Router();
const upload = multer(uploadConfig.multer);

const usersController = new UsersController();
const sessionsController = new SessionsController();
const profilesController = new ProfilesController();
const avatarController = new AvatarController();

userRouter.post('/register', usersController.create);
userRouter.post('/login', sessionsController.create);
userRouter.get('/profile', ensureAuthenticated, profilesController.show);
userRouter.patch('/update-avatar', ensureAuthenticated, upload.single('avatar'), avatarController.update);

export default userRouter;

import Router from 'express';

import ensureAuthenticated from '../../../shared/middlewares/ensureAuthenticated';

import PiusController from '../controller/PiusController';
import PiuLikesController from '../controller/PiuLikesController';

const piusRouter = Router();

const piusController = new PiusController();
const piuLikesController = new PiuLikesController();

piusRouter.post('/', ensureAuthenticated, piusController.create);
piusRouter.patch('/', ensureAuthenticated, piuLikesController.create);

export default piusRouter;

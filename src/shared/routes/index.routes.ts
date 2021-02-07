import Router from 'express'

import usersRouter from '@modules/User/routes'
import piusRouter from '@modules/Piu/routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/pius', piusRouter)

export default routes

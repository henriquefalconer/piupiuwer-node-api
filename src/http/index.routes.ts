import Router from 'express'

import usersRouter from './User/routes'
import piusRouter from './Piu/routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/pius', piusRouter)

export default routes

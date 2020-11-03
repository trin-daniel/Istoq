import { expressMiddlewareAdapter } from '../adapters/express/express-middleware-adapter'
import { makeAuthMiddlewareFactory } from '@main/factories/middlewares/auth-middleware-factory'

export const authUser = expressMiddlewareAdapter(makeAuthMiddlewareFactory())

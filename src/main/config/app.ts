import { setupMiddlewares } from './middlewares'
import express from 'express'

export const app = express()
setupMiddlewares(app)

import 'reflect-metadata'

import { InversifyExpressServer } from 'inversify-express-utils'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import config from './config'
import container from './ioc/inversify.config'
import AuthProvider from './ioc/providers/auth'
import { AppError } from './interfaces/common'
import { STATUS } from './constants/response'

const port = 3000

mongoose.connect('mongodb://localhost:27017/e-shopping', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: config.dbUser,
  pass: config.dbPassword,
  authSource: config.dbAuthSource,
})
mongoose.set('useFindAndModify', false)

const server = new InversifyExpressServer(container, null, null, null, AuthProvider)

server.setConfig(app => {
  app.use(cors())
  app.use(helmet())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
})

server.setErrorConfig(app => {
  app.use((err: AppError, _req: Request, res: Response, _next: NextFunction) => {
    const httpStatus = 'status' in err ? err.status : STATUS.INTER_ERROR
    res.status(httpStatus)
    res.json({
      message: err.message,
    })
  })
})

const app = server.build()

app.listen(port)
console.log(`API listening at http://localhost:${port}`)

// TODO: store config/secret in process.env for each env (test/production)
// TODO: query/body validation middleware
// TODO: error handler
// TODO: handle parsing data type

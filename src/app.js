/**
 * @fileoverview Configuración de la aplicación express
 * @version     1.0
 * @author      Interfaz
 */

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import logger from 'morgan'
import config from 'config'
import router from 'interface/router'
import customResponse from 'helpers/customResponse'
import { error404, generalErrorHandler } from 'middlewares/errors'

const app = express()
const LOGGER_FORMAT = config.get('LOGGER')

app
  .use(cors({}))
  .use(helmet())
  .use(logger(LOGGER_FORMAT))
  .use('/uploads', express.static('public/uploads'))
  .use(express.json({ limit: '1mb' }))
  .use(express.urlencoded({ extended: true }))
  .use(customResponse)

router(app)

app.use(error404)
app.use(generalErrorHandler)

export default app

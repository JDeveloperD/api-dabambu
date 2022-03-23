// @ts-check
/**
 * @fileoverview Archivo principal de manejo de rutas de toda la app
 * @version     1.0
 * @author      Interfaz
 *
 */
import { Router } from 'express'
import routesUsers from 'components/users/routes'

function router (app) {
  const routerMain = Router()

  routerMain.get('/', (req, res) => {
    return res.json({
      version: '2.0.0',
      info: {
        name: 'api name',
        description: 'api description',
        author: 'api author'
      }
    })
  })

  routerMain.use('/users', routesUsers)

  app.use('/api/v2', routerMain)
}

export default router

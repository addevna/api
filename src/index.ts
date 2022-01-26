import 'reflect-metadata'
import { Application } from './system/core/Application'
;(async () => {
  const app = await Application.instance(__dirname)
  app.httpServer()
})()

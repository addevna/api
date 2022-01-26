import { createConnection } from 'typeorm'
import { Config } from './Config'
import { container } from './IoC'

export class Database {
  constructor() {
    const config = container.get<Config>(Config.name)
    createConnection({
      type: 'postgres',
      host: config.get('database.host'),
      username: config.get('database.username'),
      password: config.get('database.password'),
      database: config.get('database.database'),
      port: config.get('database.port'),
      synchronize: config.get('database.synchronize', false),
      logging: true, //config.get('database.logging', true),
      entities: ['src/system/models/*.ts'],
    }).catch((error) => {
      console.log(error.message)
    })
  }
}

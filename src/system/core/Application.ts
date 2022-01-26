import path from 'path'
import { AbstractProvider } from '../providers/AbstractProvider'
import { Config } from './Config'
import { providers } from '../providers/registry'
import express from 'express'
import { container } from './IoC'
import { glob } from 'glob'
import {
  IAddUserInputPort,
  IAddUserInputPortType,
} from '../../domain/usecases/contracts/inputport/IAddUserInputPort'
import { InversifyExpressServer } from 'inversify-express-utils'
import bodyParser from 'body-parser'

export class Application {
  private static _application: Application
  private _providers: AbstractProvider[] = []
  private _systemDirectoryPath: string = path.join(this.basePath, 'system')
  private _configDirectoryPath: string = path.join(
    this._systemDirectoryPath,
    'config'
  )
  private _httpDirectory: string = path.join(this._systemDirectoryPath, 'http')
  private _express?: express.Application

  static get application(): Application {
    return this._application
  }
  get providers(): AbstractProvider[] {
    return this._providers
  }
  get systemDirectoryPath(): string {
    return this._systemDirectoryPath
  }
  get configDirectoryPath(): string {
    return this._configDirectoryPath
  }
  get httpDirectory(): string {
    return this._httpDirectory
  }

  /**
   * @param basePath
   */
  public static async instance(basePath: string): Promise<Application> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this._application) {
          this._application = new Application(basePath)
          await this._application.init()
        }
        resolve(this._application)
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * @param basePath
   */
  constructor(private readonly basePath: string) {
    this.basePath = basePath
  }

  /**
   * @private
   */
  private async init() {
    await this.loadConfig()
    await this.loadControllers()
    await this.loadProviders()
    await this.providerRegister()
    await this.providerBoot()
  }

  /**
   * @private
   */
  private async loadProviders() {
    for (const provider of Object.keys(providers)) {
      this._providers.push(new providers[provider](this))
    }
  }

  /**
   * @private
   */
  private async loadConfig() {
    const config = await Config.loadFromPath(this._configDirectoryPath)
    container.bind<Config>(Config.name).toConstantValue(config)
  }

  /**
   * @private
   */
  private async providerRegister() {
    for (const provider of this._providers) {
      await provider.register()
    }
  }

  /**
   * @private
   */
  private async providerBoot() {
    for (const provider of this._providers) {
      await provider.boot()
    }
  }

  /**
   * @private
   */
  private async loadControllers() {
    const controllerPath = path.join(
      this.basePath,
      'system',
      'http',
      'controllers',
      '**',
      '*.ts'
    )
    for (const f of await glob.sync(controllerPath)) {
      await import(f)
    }
  }

  /**
   * @param port
   */
  public httpServer(port: number = 3000): void {
    const server = new InversifyExpressServer(container)
    server
      .setConfig((app) => {
        app.use(
          bodyParser.urlencoded({
            extended: true,
          })
        )
        app.use(bodyParser.json())
      })
      .build()
      .listen(port)
  }
}

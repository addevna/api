import { AbstractProvider } from './AbstractProvider'

export class AppProvider extends AbstractProvider {
  boot(): void {}

  async register(): Promise<void> {}
}

import { IMenuFactory } from '../../contracts/factories/IMenuFactory'
import { Menu } from '../Menu'
import { injectable } from 'inversify'

@injectable()
export class MenuFactory implements IMenuFactory {
  make(name: string, parentId?: number, id?: number): Menu {
    return new Menu(name, parentId, id)
  }
}

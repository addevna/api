import { Menu } from '../../implementation/Menu'

export interface IMenuFactory {
  make(name: string, parentId?: number, id?: number): Menu
}

export const IMenuFactoryType = Symbol('IMenuFactory')

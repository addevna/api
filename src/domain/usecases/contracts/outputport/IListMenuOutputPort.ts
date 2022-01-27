import { IViewModel } from '../IViewModel'
import { Menu } from '../../../entities/implementation/Menu'

export interface IListMenuOutputPort {
  menus(menu: Menu[]): Promise<IViewModel>
}
export const IListMenuOutputPortType = Symbol('IListMenuOutputPort')

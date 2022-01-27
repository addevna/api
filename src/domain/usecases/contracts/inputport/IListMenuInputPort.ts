import { AddMenuRequestData } from '../../implementation/addmenu/AddMenuRequestData'
import { IViewModel } from '../IViewModel'

export interface IListMenuInputPort {
  menus(): Promise<IViewModel>
}
export const IListMenuInputPortType = Symbol('IListMenuInputPort')

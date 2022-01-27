import { AddMenuRequestData } from '../../implementation/addmenu/AddMenuRequestData'
import { IViewModel } from '../IViewModel'

export interface IAddMenuInputPort {
  add(data: AddMenuRequestData): Promise<IViewModel>
}
export const IAddMenuInputPortType = Symbol('IAddMenuInputPort')

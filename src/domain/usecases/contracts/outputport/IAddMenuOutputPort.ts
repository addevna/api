import { IViewModel } from '../IViewModel'
import { Menu } from '../../../entities/implementation/Menu'

export interface IAddMenuOutputPort {
  created(menu: Menu): Promise<IViewModel>
  alreadyExists(menu: Menu): Promise<IViewModel>
  failed(e: any): Promise<IViewModel>
}
export const IAddMenuOutputPortType = Symbol('IAddMenuOutputPort')

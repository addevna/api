import { IViewModel } from '../IViewModel'

export interface IListUserInputPort {
  users(): Promise<IViewModel>
}
export const IListUserInputPortType = Symbol('IListUserInputPort')

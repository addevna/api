import { IViewModel } from '../IViewModel'
import { AddUserRequestData } from '../../implementation/adduser/AddUserRequestData'

export interface IAddUserInputPort {
  createUser(userData: AddUserRequestData): Promise<IViewModel>
}
export const IAddUserInputPortType = Symbol('IAddUserInputPort')

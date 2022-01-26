import { IViewModel } from '../IViewModel'
import { AddUserResponseData } from '../../implementation/adduser/AddUserResponseData'

export interface IAddUserOutputPort {
  added(userData: AddUserResponseData): IViewModel
  failed(): IViewModel
}

export const IAddUserOutputPortType = Symbol('IAddUserOutputPort')

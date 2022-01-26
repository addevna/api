import { IViewModel } from '../IViewModel'
import { AddUserResponseData } from '../../implementation/adduser/AddUserResponseData'
import { User } from '../../../entities/implementation/User'

export interface IListUserOutputPort {
  users(userData: User[]): IViewModel
}

export const IListUserOutputPortType = Symbol('IListUserOutputPort')

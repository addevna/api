import { injectable } from 'inversify'
import { IAddUserOutputPort } from '../../../../domain/usecases/contracts/outputport/IAddUserOutputPort'
import { RestViewModel } from '../../viewmodels/RestViewModel'
import { AddUserRequestData } from '../../../../domain/usecases/implementation/adduser/AddUserRequestData'
import { IListUserOutputPort } from '../../../../domain/usecases/contracts/outputport/IListUserOutputPort'
import { User } from '../../../../domain/entities/implementation/User'
import { IViewModel } from '../../../../domain/usecases/contracts/IViewModel'

@injectable()
export class ListUserRestPresenter implements IListUserOutputPort {
  users(userData: User[]): IViewModel {
    return new RestViewModel(userData)
  }
}

import { injectable } from 'inversify'
import { IAddUserOutputPort } from '../../../../domain/usecases/contracts/outputport/IAddUserOutputPort'
import { RestViewModel } from '../../viewmodels/RestViewModel'
import { AddUserRequestData } from '../../../../domain/usecases/implementation/adduser/AddUserRequestData'

@injectable()
export class AddUserRestPresenter implements IAddUserOutputPort {
  added(userData: AddUserRequestData): RestViewModel {
    return new RestViewModel([])
  }

  failed(): RestViewModel {
    return new RestViewModel([])
  }
}

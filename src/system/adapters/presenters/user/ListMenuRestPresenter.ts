import { injectable } from 'inversify'
import { IAddUserOutputPort } from '../../../../domain/usecases/contracts/outputport/IAddUserOutputPort'
import { RestViewModel } from '../../viewmodels/RestViewModel'
import { AddUserRequestData } from '../../../../domain/usecases/implementation/adduser/AddUserRequestData'
import { IListUserOutputPort } from '../../../../domain/usecases/contracts/outputport/IListUserOutputPort'
import { User } from '../../../../domain/entities/implementation/User'
import { IViewModel } from '../../../../domain/usecases/contracts/IViewModel'
import { IListMenuOutputPort } from '../../../../domain/usecases/contracts/outputport/IListMenuOutputPort'
import { Menu } from '../../../models/Menu'

@injectable()
export class ListMenuRestPresenter implements IListMenuOutputPort {
  menus(menus: Menu[]): Promise<IViewModel> {
    return Promise.resolve(new RestViewModel(menus))
  }
}

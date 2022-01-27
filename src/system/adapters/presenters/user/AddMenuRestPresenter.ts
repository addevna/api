import { injectable } from 'inversify'
import { RestViewModel } from '../../viewmodels/RestViewModel'
import { IAddMenuOutputPort } from '../../../../domain/usecases/contracts/outputport/IAddMenuOutputPort'
import { Menu } from '../../../../domain/entities/implementation/Menu'
import { IViewModel } from '../../../../domain/usecases/contracts/IViewModel'

@injectable()
export class AddMenuRestPresenter implements IAddMenuOutputPort {
  alreadyExists(menu: Menu): Promise<IViewModel> {
    return Promise.resolve(
      new RestViewModel({
        message: 'Já existe um menu com o nome especificado',
      })
    )
  }

  created(menu: Menu): Promise<IViewModel> {
    return Promise.resolve(new RestViewModel(menu))
  }

  failed(e: any): Promise<IViewModel> {
    return Promise.resolve(e)
  }
}

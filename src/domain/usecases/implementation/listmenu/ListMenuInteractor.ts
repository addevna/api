import { IListMenuInputPort } from '../../contracts/inputport/IListMenuInputPort'
import { IViewModel } from '../../contracts/IViewModel'
import { inject, injectable, tagged } from 'inversify'
import {
  IMenuRepository,
  IMenuRepositoryType,
} from '../../contracts/repositories/IMenuRepository'
import {
  IMenuFactory,
  IMenuFactoryType,
} from '../../../entities/contracts/factories/IMenuFactory'
import {
  IListMenuOutputPort,
  IListMenuOutputPortType,
} from '../../contracts/outputport/IListMenuOutputPort'

@injectable()
export class ListMenuInteractor implements IListMenuInputPort {
  @inject(IMenuRepositoryType)
  menuRepository!: IMenuRepository

  @inject(IMenuFactoryType)
  menuFactory!: IMenuFactory

  @inject(IListMenuOutputPortType)
  @tagged('output', 'rest')
  output!: IListMenuOutputPort

  async menus(): Promise<IViewModel> {
    const menus = await this.menuRepository.all()
    console.log(menus)
    return this.output.menus(menus)
  }
}

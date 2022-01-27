import { IAddMenuInputPort } from '../../contracts/inputport/IAddMenuInputPort'
import {
  IMenuRepository,
  IMenuRepositoryType,
} from '../../contracts/repositories/IMenuRepository'
import { inject, injectable, tagged } from 'inversify'
import {
  IMenuFactory,
  IMenuFactoryType,
} from '../../../entities/contracts/factories/IMenuFactory'
import {
  IAddMenuOutputPort,
  IAddMenuOutputPortType,
} from '../../contracts/outputport/IAddMenuOutputPort'
import { AddMenuRequestData } from './AddMenuRequestData'
import { IViewModel } from '../../contracts/IViewModel'

@injectable()
export class AddMenuInteractor implements IAddMenuInputPort {
  @inject(IMenuRepositoryType)
  menuRepository!: IMenuRepository

  @inject(IMenuFactoryType)
  menuFactory!: IMenuFactory

  @inject(IAddMenuOutputPortType)
  @tagged('output', 'rest')
  output!: IAddMenuOutputPort

  async add(data: AddMenuRequestData): Promise<IViewModel> {
    let menu = this.menuFactory.make(data.name, data.parentId)
    const menuExists = await this.menuRepository.nameExists(menu)
    console.log(menuExists)
    if (menuExists) {
      return this.output.alreadyExists(menu)
    }
    try {
      menu = await this.menuRepository.create(menu)
      return this.output.created(menu)
    } catch (e) {
      return this.output.failed(e)
    }
  }
}

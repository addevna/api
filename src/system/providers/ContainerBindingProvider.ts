import { AsyncContainerModule } from 'inversify'
import { AbstractProvider } from './AbstractProvider'
import {
  IAddUserInputPort,
  IAddUserInputPortType,
} from '../../domain/usecases/contracts/inputport/IAddUserInputPort'
import {
  IAddUserOutputPort,
  IAddUserOutputPortType,
} from '../../domain/usecases/contracts/outputport/IAddUserOutputPort'
import { AddUserRestPresenter } from '../adapters/presenters/user/AddUserRestPresenter'
import { AddUserInteractor } from '../../domain/usecases/implementation/adduser/AddUserInteractor'
import {
  IUserRepository,
  IUserRepositoryType,
} from '../../domain/usecases/contracts/repositories/IUserRepository'
import { UserRepository } from '../repositories/UserRepository'
import {
  IUserFactory,
  IUserFactoryType,
} from '../../domain/entities/contracts/factories/IUserFactory'
import { UserFactory } from '../../domain/entities/implementation/factories/UserFactory'
import { container } from '../core/IoC'
import {
  IListUserInputPort,
  IListUserInputPortType,
} from '../../domain/usecases/contracts/inputport/IListUserInputPort'
import { ListUserInteractor } from '../../domain/usecases/implementation/listuser/ListUserInteractor'
import {
  IListUserOutputPort,
  IListUserOutputPortType,
} from '../../domain/usecases/contracts/outputport/IListUserOutputPort'
import { ListUserRestPresenter } from '../adapters/presenters/user/ListUserRestPresenter'
import {
  IMenuRepository,
  IMenuRepositoryType,
} from '../../domain/usecases/contracts/repositories/IMenuRepository'
import { MenuRepository } from '../repositories/MenuRepository'
import {
  IMenuFactory,
  IMenuFactoryType,
} from '../../domain/entities/contracts/factories/IMenuFactory'
import { MenuFactory } from '../../domain/entities/implementation/factories/MenuFactory'
import {
  IAddMenuInputPort,
  IAddMenuInputPortType,
} from '../../domain/usecases/contracts/inputport/IAddMenuInputPort'
import { AddMenuInteractor } from '../../domain/usecases/implementation/addmenu/AddMenuInteractor'
import {
  IAddMenuOutputPort,
  IAddMenuOutputPortType,
} from '../../domain/usecases/contracts/outputport/IAddMenuOutputPort'
import { AddMenuRestPresenter } from '../adapters/presenters/user/AddMenuRestPresenter'
import {
  IListMenuInputPort,
  IListMenuInputPortType,
} from '../../domain/usecases/contracts/inputport/IListMenuInputPort'
import { ListMenuInteractor } from '../../domain/usecases/implementation/listmenu/ListMenuInteractor'
import {
  IListMenuOutputPort,
  IListMenuOutputPortType,
} from '../../domain/usecases/contracts/outputport/IListMenuOutputPort'
import { ListMenuRestPresenter } from '../adapters/presenters/user/ListMenuRestPresenter'

export class ContainerBindingProvider extends AbstractProvider {
  boot(): void {}

  async register(): Promise<void> {
    await container.load(
      new AsyncContainerModule(async (bind) => {
        bind<IAddUserInputPort>(IAddUserInputPortType).to(AddUserInteractor)
        bind<IAddUserOutputPort>(IAddUserOutputPortType)
          .to(AddUserRestPresenter)
          .whenTargetTagged('output', 'rest')
        bind<IUserRepository>(IUserRepositoryType).to(UserRepository)
        bind<IUserFactory>(IUserFactoryType).to(UserFactory)

        bind<IListUserInputPort>(IListUserInputPortType).to(ListUserInteractor)
        bind<IListUserOutputPort>(IListUserOutputPortType)
          .to(ListUserRestPresenter)
          .whenTargetTagged('output', 'rest')

        // Menu Resources
        bind<IMenuRepository>(IMenuRepositoryType).to(MenuRepository)
        bind<IMenuFactory>(IMenuFactoryType).to(MenuFactory)

        bind<IAddMenuInputPort>(IAddMenuInputPortType).to(AddMenuInteractor)
        bind<IAddMenuOutputPort>(IAddMenuOutputPortType)
          .to(AddMenuRestPresenter)
          .whenTargetTagged('output', 'rest')

        bind<IListMenuInputPort>(IListMenuInputPortType).to(ListMenuInteractor)
        bind<IListMenuOutputPort>(IListMenuOutputPortType)
          .to(ListMenuRestPresenter)
          .whenTargetTagged('output', 'rest')
      })
    )
  }
}

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
      })
    )
  }
}

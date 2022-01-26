import { inject, injectable, tagged } from 'inversify'
import { IAddUserInputPort } from '../../contracts/inputport/IAddUserInputPort'
import {
  IUserFactory,
  IUserFactoryType,
} from '../../../entities/contracts/factories/IUserFactory'
import {
  IUserRepository,
  IUserRepositoryType,
} from '../../contracts/repositories/IUserRepository'
import {
  IAddUserOutputPort,
  IAddUserOutputPortType,
} from '../../contracts/outputport/IAddUserOutputPort'
import { IViewModel } from '../../contracts/IViewModel'
import { AddUserRequestData } from './AddUserRequestData'
import { User } from '../../../entities/implementation/User'

@injectable()
export class AddUserInteractor implements IAddUserInputPort {
  constructor(
    @inject(IUserFactoryType) private userFactory: IUserFactory,
    @inject(IUserRepositoryType) private userRepository: IUserRepository,
    @inject(IAddUserOutputPortType)
    @tagged('output', 'rest')
    private output: IAddUserOutputPort
  ) {}

  async createUser(userData: AddUserRequestData): Promise<IViewModel> {
    const result = await this.userRepository.create(new User())
    return this.output.failed()
  }
}

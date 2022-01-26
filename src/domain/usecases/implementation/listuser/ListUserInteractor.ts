import { inject, injectable, tagged } from 'inversify'
import {
  IUserRepository,
  IUserRepositoryType,
} from '../../contracts/repositories/IUserRepository'
import { IViewModel } from '../../contracts/IViewModel'
import { IListUserInputPort } from '../../contracts/inputport/IListUserInputPort'
import {
  IListUserOutputPort,
  IListUserOutputPortType,
} from '../../contracts/outputport/IListUserOutputPort'

@injectable()
export class ListUserInteractor implements IListUserInputPort {
  constructor(
    @inject(IUserRepositoryType) private userRepository: IUserRepository,
    @inject(IListUserOutputPortType)
    @tagged('output', 'rest')
    private output: IListUserOutputPort
  ) {}

  async users(): Promise<IViewModel> {
    const result = await this.userRepository.all()
    return this.output.users(result)
  }
}

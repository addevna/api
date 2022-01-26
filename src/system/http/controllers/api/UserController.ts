import { inject } from 'inversify'
import {
  IAddUserInputPort,
  IAddUserInputPortType,
} from '../../../../domain/usecases/contracts/inputport/IAddUserInputPort'
import {
  BaseHttpController,
  controller,
  httpGet,
} from 'inversify-express-utils'
import {
  IListUserInputPort,
  IListUserInputPortType,
} from '../../../../domain/usecases/contracts/inputport/IListUserInputPort'

@controller('/api/user')
export class UserController extends BaseHttpController {
  @inject(IListUserInputPortType)
  private listUserInteractor!: IListUserInputPort
  @inject(IAddUserInputPortType)
  private addUserInteractor!: IAddUserInputPort

  @httpGet('/create')
  async create() {
    const result = await this.addUserInteractor.createUser({
      id: 1,
      email: 'asfasdf@gmail.com',
      name: 'asfasdf',
      password: 'asdfasfd',
    })
    return result.output()
  }

  @httpGet('/')
  async getAll() {
    const result = await this.listUserInteractor.users()
    return result.output()
  }
}

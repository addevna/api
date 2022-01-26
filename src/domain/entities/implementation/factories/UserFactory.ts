import { injectable } from 'inversify'
import { IUserFactory } from '../../contracts/factories/IUserFactory'
import { User } from '../User'

@injectable()
export class UserFactory implements IUserFactory {
  make(name: string, email: string, password: string, id?: number): User {
    return new User(name, email, password, id)
  }
}

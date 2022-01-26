import { IUserRepository } from '../../domain/usecases/contracts/repositories/IUserRepository'
import { User } from '../../domain/entities/implementation/User'
import { User as UserModel } from '../../system/models/User'
import { inject, injectable } from 'inversify'
import { getRepository } from 'typeorm'
import { IUserFactoryType } from '../../domain/entities/contracts/factories/IUserFactory'
import { UserFactory } from '../../domain/entities/implementation/factories/UserFactory'

@injectable()
export class UserRepository implements IUserRepository {
  @inject(IUserFactoryType)
  private userFactory!: UserFactory

  async create(user: User): Promise<User> {
    const userRepository = getRepository<UserModel>(UserModel)
    let userModel = new UserModel()
    userModel.name = 'Alvaro'
    userModel.email = 'alvaro@gmail.com'
    userModel.password = '123456'
    userModel = await userRepository.save(userModel)
    return this.userFactory.make(
      userModel.name,
      userModel.email,
      userModel.password,
      userModel.id
    )
  }

  async all(): Promise<User[]> {
    const users = await getRepository<UserModel>(UserModel).find()
    const list = users.map(
      (userModel) =>
        new User(
          userModel.name,
          userModel.email,
          userModel.password,
          userModel.id
        )
    )
    return list
  }
}

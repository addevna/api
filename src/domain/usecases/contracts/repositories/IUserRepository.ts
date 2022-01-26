import { User } from '../../../entities/implementation/User'
export interface IUserRepository {
  all(): Promise<User[]>
  create(user: User): Promise<User>
}
export const IUserRepositoryType = Symbol('IUserRepository')

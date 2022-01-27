import { Menu } from 'src/domain/entities/implementation/Menu'

export interface IMenuRepository {
  all(): Promise<Menu[]>
  nameExists(user: Menu): Promise<boolean>
  create(user: Menu): Promise<Menu>
  delete(user: Menu): Promise<boolean>
}
export const IMenuRepositoryType = Symbol('IMenuRepository')

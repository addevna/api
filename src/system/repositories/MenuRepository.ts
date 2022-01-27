import { Menu as MenuModel } from '../../system/models/Menu'
import { inject, injectable } from 'inversify'
import { getRepository } from 'typeorm'
import { IMenuRepository } from '../../domain/usecases/contracts/repositories/IMenuRepository'
import {
  IMenuFactory,
  IMenuFactoryType,
} from '../../domain/entities/contracts/factories/IMenuFactory'
import { Menu } from '../../domain/entities/implementation/Menu'

@injectable()
export class MenuRepository implements IMenuRepository {
  @inject(IMenuFactoryType)
  private menuFactory!: IMenuFactory

  async create(menu: Menu): Promise<Menu> {
    const menuRepository = getRepository<MenuModel>(MenuModel)
    let menuModel = new MenuModel()
    menuModel.name = menu.name
    menuModel.parentId = menu.parentId
    menuModel = await menuRepository.save(menuModel)
    return this.menuFactory.make(
      menuModel.name,
      menuModel.parentId,
      menuModel.id
    )
  }

  async all(): Promise<Menu[]> {
    const menuRepository = getRepository<MenuModel>(MenuModel)
    const menus = await menuRepository
      .createQueryBuilder('menus')
      .leftJoinAndSelect('menus.submenus', 'submenu')
      .getMany()
    return Promise.resolve([])
  }

  delete(menu: Menu): Promise<boolean> {
    return Promise.resolve(false)
  }

  async nameExists(menu: Menu): Promise<boolean> {
    const menuRepository = getRepository<MenuModel>(MenuModel)
    const menuModel = await menuRepository.findOne({
      name: menu.name,
    })
    return Promise.resolve(!!menuModel)
  }
}

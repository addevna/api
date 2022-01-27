import { inject } from 'inversify'
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  requestBody,
} from 'inversify-express-utils'
import {
  IAddMenuInputPort,
  IAddMenuInputPortType,
} from '../../../../domain/usecases/contracts/inputport/IAddMenuInputPort'
import { AddMenuRequestData } from '../../../../domain/usecases/implementation/addmenu/AddMenuRequestData'
import {
  IListMenuInputPort,
  IListMenuInputPortType,
} from '../../../../domain/usecases/contracts/inputport/IListMenuInputPort'

@controller('/api/v1/menu')
export class MenuController extends BaseHttpController {
  @inject(IAddMenuInputPortType)
  private addMenuInteractor!: IAddMenuInputPort

  @inject(IListMenuInputPortType)
  private listMenuInteractor!: IListMenuInputPort

  @httpPost('/')
  async create(@requestBody() menuData: AddMenuRequestData) {
    const result = await this.addMenuInteractor.add({
      name: menuData.name,
      parentId: menuData.parentId,
    })
    return result.output()
  }

  @httpGet('/')
  async getAll() {
    const result = await this.listMenuInteractor.menus()
    return result.output()
  }
}

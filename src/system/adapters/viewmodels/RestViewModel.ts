import { IViewModel } from '../../../domain/usecases/contracts/IViewModel'

export class RestViewModel implements IViewModel {
  constructor(private data: any) {}
  output(): any {
    return this.data
  }
}

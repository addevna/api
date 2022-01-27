export class AddMenuRequestData {
  constructor(
    public readonly name: string,
    public readonly parentId?: number
  ) {}
}

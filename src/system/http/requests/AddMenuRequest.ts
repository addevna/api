export class AddMenuRequest {
  constructor(
    public readonly name: string,
    public readonly parentId?: number
  ) {}
}

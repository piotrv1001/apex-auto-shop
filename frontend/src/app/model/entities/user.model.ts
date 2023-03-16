export class User {
  constructor (
    public id: number,
    public email: string,
    public password: string,
    // public orders: Order[],
    public name?: string,
    public zipCode?: string,
    public city?: string,
    public street?: string,
    public houseNumber?: string
  ) {}
}

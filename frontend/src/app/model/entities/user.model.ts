export class User {
  constructor (
    public id: number,
    public username: string,
    public password: string,
    public email?: string,
    // public orders: Order[],
    public name?: string,
    public zipCode?: string,
    public city?: string,
    public street?: string,
    public houseNumber?: string
  ) {}
}

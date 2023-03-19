import { OrderItem } from "./order-item.model";
import { User } from "./user.model";

export class Order {
  constructor (
    public id: number,
    public date: string,
    public phoneNumber: string,
    public orderItems: OrderItem[],
    public email?: string,
    public zipCode?: string,
    public street?: string,
    public houseNumber?: string,
    public city?: string,
    public name?: string,
    public user?: User
  ) {}
}

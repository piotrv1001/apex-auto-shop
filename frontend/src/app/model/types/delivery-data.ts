export type Address = {
  city?: string,
  houseNumber?: string,
  street?: string,
  zipCode?: string
}

export interface DeliveryData {
  address?: Address,
  name?: string,
  email?: string,
  phoneNumber?: string
}

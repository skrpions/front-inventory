interface Product {
  id: number
  name: string
  price: number
  account: number
  category: any
  picture: any
}

export type ProductEntity = Required<Product>;

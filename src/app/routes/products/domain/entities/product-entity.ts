interface Product {
  id: number
  picture: any
  name: string
  price: number
  account: number
  category: any
}

export type ProductEntity = Required<Product>;

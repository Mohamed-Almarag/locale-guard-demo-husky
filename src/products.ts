export interface Product {
  id: string
  name: string
  price: number
  stock: number
  rating: number
  reviews: number
}

export const products: Product[] = [
  { id: 'lamp', name: 'Desk lamp', price: 49, stock: 12, rating: 4.6, reviews: 128 },
  { id: 'mug', name: 'Stoneware mug', price: 18, stock: 1, rating: 4.8, reviews: 1 },
  { id: 'chair', name: 'Oak chair', price: 189, stock: 0, rating: 4.4, reviews: 37 }
]

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}
export interface ProductListProps {
  products: Product[];
  onDeleteProduct: (id: number) => void;
}

export interface ProductFormProps {
  onAddProduct: (product: Omit<Product, 'id'>) => void;
}

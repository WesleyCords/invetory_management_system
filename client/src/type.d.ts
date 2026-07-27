interface IProduct {
  id: string;
  sku: string;
  name: string;
  price: number;
  costPrice: number;
  description: string;
  isActive: boolean;
  categoryId: string;
  brandId: string;
  brand: {
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
  suppliers: ISuppliers[];
  quantity: number;
  isLowStock: boolean;
}

interface IProductGet {
  products: IProduct[];
  totalCount: number;
  totalPages: number;
}

interface ISuppliers {
  id: string;
  name: string;
  company: string;
  address: string;
}

interface UseProductsParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface ICategories {
  id: string;
  name: string;
}

interface IBrands {
  id: string;
  name: string;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface IMovement {
  id: string;
  type: "IN" | "OUT";
  quantity: number;
  createdAt: Date;
  user: {
    name: string;
    avatarUrl: string;
    role: "MANAGER" | "EMPLOYEE";
    id: string;
  };
  product: {
    name: string;
    sku: string;
    id: string;
  };
}

interface UseGetMovementParams {
  period?: number;
  page?: number;
  productId?: string;
}

interface IMovementGet {
  movements: IMovement[];
  totalCount: number;
  totalPages: number;
}

interface IActivity {
  id: string;
  title: string;
  description: string;
  action: "Movimentação" | "Produto";
  createdAt: Date;
  user: {
    name: string;
    avatarUrl: string;
    role: "MANAGER" | "EMPLOYEE";
    id: string;
  };
  product: {
    name: string;
    sku: string;
    id: string;
  };
}

interface IActivityGet {
  activities: IActivity[];
  totalCount: number;
}

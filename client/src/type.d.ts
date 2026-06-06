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
}

interface ISuppliers {
  id: string;
  name: string;
  company: string;
  address: string;
}

interface ICategories {
  id: string;
  name: string;
}

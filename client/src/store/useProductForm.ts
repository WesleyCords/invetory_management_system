import { create } from "zustand";

export type ProductFormData = Pick<
  IProduct,
  | "name"
  | "sku"
  | "categoryId"
  | "brandId"
  | "price"
  | "costPrice"
  | "description"
  | "price"
> & {
  id?: string;
  suppliers: string[];
  categoryName?: string;
  brandName?: string;
  categoryId?: string;
  brandId?: string;
};

const initialFormState: ProductFormData = {
  name: "",
  sku: "",
  price: 0,
  categoryId: "",
  brandId: "",
  brandName: "",
  categoryName: "",
  costPrice: 0,
  suppliers: [],
  description: "",
};

interface UIProductsStore {
  productForm: ProductFormData;
  setFormField: <K extends keyof ProductFormData>(
    field: K,
    value: ProductFormData[K],
  ) => void;
  resetForm: () => void;
  loadProductForEdit: (product: IProduct) => void;
}

export const useProductForm = create<UIProductsStore>((set) => ({
  productForm: initialFormState,

  setFormField: (field, value) =>
    set((state) => ({ productForm: { ...state.productForm, [field]: value } })),

  resetForm: () => set({ productForm: initialFormState }),

  loadProductForEdit: (product) =>
    set(() => ({
      productForm: {
        id: product.id,
        name: product.name,
        sku: product.sku,
        categoryId: product.categoryId,
        brandId: product.brandId,
        costPrice: product.costPrice,
        price: product.price,
        description: product.description,
        suppliers: product.suppliers ? product.suppliers.map((s) => s.id) : [],
      },
    })),
}));

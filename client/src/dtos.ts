export interface CreateProductDTO {
  name: string;
  sku: string;
  price: number;
  costPrice: number;
  supplierIds: string[];
  categoryId?: string;
  categoryName?: string;
  brandId?: string;
  brandName?: string;
  description?: string;
}

export interface CreateMovementDTO {
  productId: string;
  quantity: number;
  type: "IN" | "OUT";
  description?: string;
}

export type UpdateProductDTO = Partial<Omit<CreateProductDTO, "sku">> & {
  id: string;
};

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}

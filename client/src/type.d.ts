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
  notes: string;
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
  limit?: number;
  type?: "IN" | "OUT" | "all";
  search?: string;
}

interface IMovementGet {
  movements: IMovement[];
  totalCount: number;
  totalPages: number;
  summary: {
    totalMovements: number;
    totalEntries: number;
    totalExits: number;
  };
}

interface IActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  action: string;
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

interface PatchUserProfile {
  name?: string;
  username?: string;
}

interface ICategoryStat {
  name: string;
  value: number;
  pct: number;
}

interface IRankingStat {
  name: string;
  sku: string;
  valueTotal: number;
  quantityTotal: number;
  quantityDelta: number;
}

interface IMarginStat {
  name: string;
  fullName: string;
  margin: number;
}

interface ILowStockProduct {
  id: string;
  name: string;
  sku: string;
  price: number;
  costPrice: number;
  currentStock: number;
  category: {
    id: string;
    name: string;
  };
}
interface AnalyticsResponse {
  totalStockValue: number;
  stockValueDelta: number;
  totalCostValue: number;
  costValueDelta: number;
  totalProfit: number;
  profitDelta: number;
  avgMargin: number;
  avgMarginDelta: number;
  categories: ICategoryStat[];
  ranking: IRankingStat[];
  margins: IMarginStat[];
  bestMargin: IMarginStat | null;
  lowStock: ILowStockProduct[];
  totalIn: number;
  totalOut: number;
  priceData: PriceChartData[];
  workflowData: WorkflowChartData[];
}

interface PriceChartData {
  date: string;
  mid: number;
  min: number;
  max: number;
}
interface WorkflowChartData {
  in: number;
  out: number;
  label: string;
}

interface LogsStatsResponse {
  totalLogs: number;
  criticalLogsCount: number;
  topUser: {
    name: string;
    actionsCount: number;
  } | null;
  logs: IActivity[];
  totalPages: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  minStock: number;
  price: number;
  costPrice: number;
  supplier: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Movement {
  id: string;
  productId: string;
  productName: string;
  type: "entrada" | "saida";
  quantity: number;
  reason: string;
  userId: string;
  userName: string;
  createdAt: Date;
  notes?: string;
}

export interface LogEntry {
  id: string;
  action: string;
  userId: string;
  userName: string;
  details: string;
  entityType: "product" | "movement" | "user";
  entityId: string;
  createdAt: Date;
}

export interface StockStats {
  totalProducts: number;
  totalValue: number;
  lowStockItems: number;
  movementsToday: number;
  entriesThisMonth: number;
  exitsThisMonth: number;
}

// Mock data
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Camiseta Básica Branca",
    sku: "CAM-001",
    category: "Vestuário",
    quantity: 150,
    minStock: 30,
    price: 49.9,
    costPrice: 22.0,
    supplier: "Fornecedor A",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-03-10"),
  },
  {
    id: "2",
    name: "Calça Jeans Slim",
    sku: "CAL-002",
    category: "Vestuário",
    quantity: 45,
    minStock: 20,
    price: 189.9,
    costPrice: 85.0,
    supplier: "Fornecedor B",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-03-08"),
  },
  {
    id: "3",
    name: "Tênis Esportivo Runner",
    sku: "TEN-003",
    category: "Calçados",
    quantity: 12,
    minStock: 15,
    price: 299.9,
    costPrice: 150.0,
    supplier: "Fornecedor C",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-03-12"),
  },
  {
    id: "4",
    name: "Boné Trucker",
    sku: "BON-004",
    category: "Acessórios",
    quantity: 78,
    minStock: 25,
    price: 59.9,
    costPrice: 18.0,
    supplier: "Fornecedor A",
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-03-05"),
  },
  {
    id: "5",
    name: "Mochila Urban",
    sku: "MOC-005",
    category: "Acessórios",
    quantity: 8,
    minStock: 10,
    price: 149.9,
    costPrice: 65.0,
    supplier: "Fornecedor D",
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-03-11"),
  },
  {
    id: "6",
    name: "Jaqueta Corta-Vento",
    sku: "JAQ-006",
    category: "Vestuário",
    quantity: 25,
    minStock: 12,
    price: 249.9,
    costPrice: 110.0,
    supplier: "Fornecedor B",
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-03-09"),
  },
  {
    id: "7",
    name: "Relógio Digital Sport",
    sku: "REL-007",
    category: "Acessórios",
    quantity: 5,
    minStock: 8,
    price: 199.9,
    costPrice: 90.0,
    supplier: "Fornecedor E",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-13"),
  },
  {
    id: "8",
    name: "Meias Kit 3 Pares",
    sku: "MEI-008",
    category: "Vestuário",
    quantity: 200,
    minStock: 50,
    price: 39.9,
    costPrice: 12.0,
    supplier: "Fornecedor A",
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-03-14"),
  },
];

export const mockMovements: Movement[] = [
  {
    id: "1",
    productId: "1",
    productName: "Camiseta Básica Branca",
    type: "entrada",
    quantity: 50,
    reason: "Reposição de estoque",
    userId: "u1",
    userName: "Maria Silva",
    createdAt: new Date("2024-03-14T10:30:00"),
    notes: "Pedido #1234",
  },
  {
    id: "2",
    productId: "3",
    productName: "Tênis Esportivo Runner",
    type: "saida",
    quantity: 8,
    reason: "Venda",
    userId: "u2",
    userName: "João Santos",
    createdAt: new Date("2024-03-14T11:15:00"),
    notes: "Venda online",
  },
  {
    id: "3",
    productId: "5",
    productName: "Mochila Urban",
    type: "saida",
    quantity: 3,
    reason: "Venda",
    userId: "u1",
    userName: "Maria Silva",
    createdAt: new Date("2024-03-14T14:00:00"),
  },
  {
    id: "4",
    productId: "2",
    productName: "Calça Jeans Slim",
    type: "entrada",
    quantity: 30,
    reason: "Reposição de estoque",
    userId: "u3",
    userName: "Ana Costa",
    createdAt: new Date("2024-03-13T09:00:00"),
    notes: "Pedido #1235",
  },
  {
    id: "5",
    productId: "7",
    productName: "Relógio Digital Sport",
    type: "saida",
    quantity: 5,
    reason: "Venda",
    userId: "u2",
    userName: "João Santos",
    createdAt: new Date("2024-03-13T16:30:00"),
  },
  {
    id: "6",
    productId: "4",
    productName: "Boné Trucker",
    type: "entrada",
    quantity: 40,
    reason: "Reposição de estoque",
    userId: "u1",
    userName: "Maria Silva",
    createdAt: new Date("2024-03-12T11:00:00"),
  },
  {
    id: "7",
    productId: "6",
    productName: "Jaqueta Corta-Vento",
    type: "saida",
    quantity: 10,
    reason: "Transferência loja",
    userId: "u3",
    userName: "Ana Costa",
    createdAt: new Date("2024-03-12T15:45:00"),
    notes: "Transferência para filial",
  },
  {
    id: "8",
    productId: "8",
    productName: "Meias Kit 3 Pares",
    type: "entrada",
    quantity: 100,
    reason: "Reposição de estoque",
    userId: "u2",
    userName: "João Santos",
    createdAt: new Date("2024-03-11T10:00:00"),
  },
];

export const mockLogs: LogEntry[] = [
  {
    id: "1",
    action: "Registrou entrada de estoque",
    userId: "u1",
    userName: "Maria Silva",
    details: "50 unidades de Camiseta Básica Branca",
    entityType: "movement",
    entityId: "1",
    createdAt: new Date("2024-03-14T10:30:00"),
  },
  {
    id: "2",
    action: "Registrou saída de estoque",
    userId: "u2",
    userName: "João Santos",
    details: "8 unidades de Tênis Esportivo Runner",
    entityType: "movement",
    entityId: "2",
    createdAt: new Date("2024-03-14T11:15:00"),
  },
  {
    id: "3",
    action: "Atualizou produto",
    userId: "u1",
    userName: "Maria Silva",
    details: "Alterou preço de Mochila Urban de R$ 139,90 para R$ 149,90",
    entityType: "product",
    entityId: "5",
    createdAt: new Date("2024-03-14T13:00:00"),
  },
  {
    id: "4",
    action: "Registrou saída de estoque",
    userId: "u1",
    userName: "Maria Silva",
    details: "3 unidades de Mochila Urban",
    entityType: "movement",
    entityId: "3",
    createdAt: new Date("2024-03-14T14:00:00"),
  },
  {
    id: "5",
    action: "Cadastrou novo produto",
    userId: "u3",
    userName: "Ana Costa",
    details: "Produto: Meias Kit 3 Pares (MEI-008)",
    entityType: "product",
    entityId: "8",
    createdAt: new Date("2024-03-13T08:30:00"),
  },
  {
    id: "6",
    action: "Registrou entrada de estoque",
    userId: "u3",
    userName: "Ana Costa",
    details: "30 unidades de Calça Jeans Slim",
    entityType: "movement",
    entityId: "4",
    createdAt: new Date("2024-03-13T09:00:00"),
  },
  {
    id: "7",
    action: "Registrou saída de estoque",
    userId: "u2",
    userName: "João Santos",
    details: "5 unidades de Relógio Digital Sport",
    entityType: "movement",
    entityId: "5",
    createdAt: new Date("2024-03-13T16:30:00"),
  },
  {
    id: "8",
    action: "Atualizou estoque mínimo",
    userId: "u1",
    userName: "Maria Silva",
    details: "Tênis Esportivo Runner: 10 → 15 unidades",
    entityType: "product",
    entityId: "3",
    createdAt: new Date("2024-03-12T10:00:00"),
  },
];

export function calculateStats(
  products: Product[],
  movements: Movement[],
): StockStats {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const movementsToday = movements.filter(
    (m) => new Date(m.createdAt) >= today,
  ).length;

  const monthMovements = movements.filter(
    (m) => new Date(m.createdAt) >= startOfMonth,
  );
  const entriesThisMonth = monthMovements
    .filter((m) => m.type === "entrada")
    .reduce((sum, m) => sum + m.quantity, 0);
  const exitsThisMonth = monthMovements
    .filter((m) => m.type === "saida")
    .reduce((sum, m) => sum + m.quantity, 0);

  return {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + p.quantity * p.price, 0),
    lowStockItems: products.filter((p) => p.quantity <= p.minStock).length,
    movementsToday,
    entriesThisMonth,
    exitsThisMonth,
  };
}

export interface Category {
  category: string;
  total: number;
}

export interface DashboardData {
  income_total: number;
  expense_total: number;
  balance: number;
  category_totals: Category[];
}

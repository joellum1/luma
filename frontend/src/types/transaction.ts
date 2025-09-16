export interface Transaction {
  id: number;
  amount: number;
  transaction_type: "INCOME" | "EXPENSE";
  category: string;
  date: string;
}

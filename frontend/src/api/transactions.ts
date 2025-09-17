import { BASE_URL } from "./constants";

import { useApiClient } from "./client";
import type { Transaction } from "../types/transaction";

const TRANSACTIONS_URL = BASE_URL + "api/transactions/";

export const useTransactionsApi = () => {
  const { authFetch } = useApiClient();

  return {
    // Fetch all transactions
    getTransactions: async (): Promise<Transaction[]> => {
      return authFetch(TRANSACTIONS_URL, { method: "GET" });
    },

    // Create a new transaction
    createTransaction: async (data: Omit<Transaction, "id" | "user" | "date">) => {
      return authFetch(TRANSACTIONS_URL, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    // Update a transaction
    updateTransaction: async (
      id: number,
      data: Partial<Omit<Transaction, "id" | "user" | "date">>
    ) => {
      return authFetch(TRANSACTIONS_URL + `${id}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },

    // Delete a transaction
    deleteTransaction: async (id: number) => {
      await authFetch(TRANSACTIONS_URL + `${id}/`, { method: "DELETE" });
      return true;
    },
  };
}

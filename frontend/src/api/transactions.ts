import { BASE_URL } from "./constants";
import { type Transaction } from "../types/transaction";

// Fetch all transactions
export const fetchTransactions = async (token: string): Promise<Transaction[]> => {
  const res = await fetch(BASE_URL + "api/transactions/", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch transactions");

  return res.json();
};

// Create a new transaction
export const createTransaction = async (
    token: string, 
    data: Omit<Transaction, "id" | "user" | "date">
) => {
  const res = await fetch(BASE_URL + "api/transactions/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create transaction");

  return res.json();
};

// Update a transaction
export const updateTransaction = async (
  token: string,
  id: number,
  data: Partial<Omit<Transaction, "id" | "user" | "date">>
) => {
  const res = await fetch(BASE_URL + `api/transactions/${id}/`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update transaction");

  return res.json();
};

// Delete a transaction
export const deleteTransaction = async (
    token: string, 
    id: number
) => {
  const res = await fetch(BASE_URL + `api/transactions/${id}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to delete transaction");
  
  return true;
};

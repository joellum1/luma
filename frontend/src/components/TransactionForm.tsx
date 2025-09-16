import { useState, type ChangeEvent, type FormEvent } from "react";
import { type Transaction } from "../types/transaction";

interface Props {
  initialData?: Omit<Transaction, "id" | "user" | "date">;
  onSubmit: (data: Omit<Transaction, "id" | "user" | "date">) => void;
  onCancel?: () => void;
}

export const TransactionForm = ({ initialData, onSubmit, onCancel }: Props) => {
  const [form, setForm] = useState<Omit<Transaction, "id" | "user" | "date">>(
    initialData || { amount: 0, transaction_type: "EXPENSE", category: "", description: "" }
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ amount: 0, transaction_type: "EXPENSE", category: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-2">
      <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" className="border p-2 rounded w-full" />
      <select name="transaction_type" value={form.transaction_type} onChange={handleChange} className="border p-2 rounded w-full">
        <option value="INCOME">Income</option>
        <option value="EXPENSE">Expense</option>
      </select>
      <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border p-2 rounded w-full" />
      <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded w-full" />
      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">{initialData ? "Update" : "Add"} Transaction</button>
        {onCancel && <button type="button" className="text-gray-700 p-2 rounded" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
};

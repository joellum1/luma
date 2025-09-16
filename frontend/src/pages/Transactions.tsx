import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { DashboardContext } from "../context/DashboardContext";

import { TransactionForm } from "../components/TransactionForm";
import { TransactionRow } from "../components/TransactionRow";
import { Navbar } from "../components/Navbar";

import { type Transaction } from "../types/transaction";
import { fetchTransactions, createTransaction, updateTransaction, deleteTransaction } from "../api/transactions";

export default function Transactions() {
  const { token } = useContext(AuthContext);
  const { refreshDashboard } = useContext(DashboardContext);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    if (!token) return;

    fetchTransactions(token)
      .then((data) => setTransactions(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  const handleSubmit = async (data: Omit<Transaction, "id" | "user" | "date">) => {
    if (!token) return;

    try {
      if (editingTransaction) {
        const updated = await updateTransaction(token, editingTransaction.id, data);
        setTransactions(transactions.map(t => t.id === updated.id ? updated : t));
        setEditingTransaction(null);
      } else {
        const newTransaction = await createTransaction(token, data);
        setTransactions([newTransaction, ...transactions]);
      }

      refreshDashboard();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (t: Transaction) => setEditingTransaction(t);

  const handleDelete = async (id: number) => {
    if (!token || !confirm("Are you sure you want to delete this transaction?")) return;

    try {
      await deleteTransaction(token, id);
      setTransactions(transactions.filter(t => t.id !== id));

      refreshDashboard();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <p className="p-8">Loading transactions...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <Navbar />
      
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      {/* Form */}
      <TransactionForm
        initialData={editingTransaction || undefined}
        onSubmit={handleSubmit}
        onCancel={editingTransaction ? () => setEditingTransaction(null) : undefined}
      />

      {/* Transactions Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Date</th>
            <th className="p-2">Category</th>
            <th className="p-2">Type</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Description</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <TransactionRow
              key={t.id}
              transaction={t}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
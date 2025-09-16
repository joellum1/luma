import { type Transaction } from "../types/transaction";

interface Props {
  transaction: Transaction;
  onEdit: (t: Transaction) => void;
  onDelete: (id: number) => void;
}

export const TransactionRow = ({ transaction, onEdit, onDelete }: Props) => (
  <tr className="border-t">
    <td className="p-2">{new Date(transaction.date).toLocaleDateString()}</td>
    <td className="p-2">{transaction.category}</td>
    <td className="p-2">{transaction.transaction_type}</td>
    <td className={`p-2 ${transaction.transaction_type === "EXPENSE" ? "text-red-500" : "text-green-600"}`}>${transaction.amount}</td>
    <td className="p-2">{transaction.description}</td>
    <td className="p-2 space-x-2">
      <button onClick={() => onEdit(transaction)} className="text-blue-500">Edit</button>
      <button onClick={() => onDelete(transaction.id)} className="text-red-500">Delete</button>
    </td>
  </tr>
);

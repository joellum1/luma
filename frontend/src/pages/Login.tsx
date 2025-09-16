import { useState, type FormEvent } from "react";
import { loginUser } from "../api/auth";
import { type LoginPayload } from "../types";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload: LoginPayload = { username, password };
    const data = await loginUser(payload);
    if (data.error) setError(data.error);
    else navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* ...same Tailwind form as before... */}
    </div>
  );
}

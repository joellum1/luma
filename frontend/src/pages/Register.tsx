import { useState, type FormEvent, useContext } from "react";
import { registerUser, loginUser } from "../api/auth";
import { type RegisterPayload, type LoginPayload } from "../types";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload: RegisterPayload = { username, email, password };
    const result = await registerUser(payload);

    if (result.error) {
      setError(result.error);
      return;
    }

    // If registration succeeds, immediately log in
    const loginPayload: LoginPayload = { username, password };
    const auth = await loginUser(loginPayload);

    if (auth.error) {
      setError(auth.error);
    } else if (auth.access) {
      login(username, auth.access); // save token + user
      navigate("/"); // redirect to Dashboard
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}

        <label className="block mb-2">
          <span className="text-gray-700">Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
            required
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
            required
          />
        </label>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}

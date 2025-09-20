import { useState, useEffect, useContext, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { useAuthApi } from "../api/auth";

import type { LoginPayload, RegisterPayload } from "../types";

export default function LoginForm() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { login } = useContext(AuthContext);
  const { registerUser, loginUser } = useAuthApi();

  // --- Validators ---
  const validatePassword = (pw: string) => pw.length >= 8 && /\d/.test(pw);
  const validateEmail = (em: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em); // basic email regex

  // --- Unified validation effect ---
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Only validate in register mode
      if (mode === "register") {
        if (email && !validateEmail(email)) {
          setError("Please enter a valid email address.");
          return;
        }
      }

      if (password && !validatePassword(password)) {
        setError("Password must be at least 8 characters and include a number.");
        return;
      }

      setError("");   // Clear error if everything is valid
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [password, email, mode]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Guard: required fields
    if (!username || !password || (mode === "register" && !email) || !!error) return;

    try {
      if (mode === "register") {
        const payload: RegisterPayload = { username, email, password };
        await registerUser(payload);

        const data = await loginUser(payload);
        login(username, data.access, data.refresh);
        navigate("/dashboard");
      } else {
        const payload: LoginPayload = { username, password };

        const data = await loginUser(payload);
        login(username, data.access, data.refresh);
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const isFormDisabled =
    !username || !password || (mode === "register" && !email) || !!error || !validatePassword(password);

  const switchMode = (newMode: "login" | "register") => {
    setMode(newMode);
    setError("");
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-108 flex flex-col">
      <form
        onSubmit={handleSubmit}
        className="bg-transparent rounded"
      >
        <label className="block mb-4">
          <span className="text-gray-700 opacity-75">Username</span>
          <input
            type="text"
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
            required
          />
        </label>

        {mode === "register" && (
          <label className="block mb-4">
            <span className="text-gray-700 opacity-75">Email</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
              required
            />
          </label>
        )}

        <label className="block mb-2">
          <span className="text-gray-700 opacity-75">Password</span>
          <input
            type="password"
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
            required
          />
        </label>

        {/* Error messages */}
        {error && password && (
          <p className="text-red-500 mb-6">{error}</p>
        )}

        <button
          type="submit"
          disabled={!!error}
          className={`w-full py-2 rounded-md bg-[#3069ff] text-white ${
            isFormDisabled ? 
            "opacity-75 cursor-not-allowed" 
            : "hover:bg-[#2557d6] hover:shadow-sm}"
          }`}
        >
          {mode === "login" ? "Login" : "Register"}
        </button>

        {/* Divider */}
        <div className="my-4 after:border-border relative text-center text-sm after:absolute after:inset-x-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t opacity-50">
          <span className="bg-[#f6f5f1] text-muted-foreground relative z-10 px-4">
            Or continue with
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Apple sign-in */}
          <button
            className="flex justify-center items-center border border-gray-200 rounded-md p-2 shadow-sm opacity-75 hover:opacity-100 hover:cursor-pointer"
          >
            <svg 
              className="w-4"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24"
            >
              <path
                d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                fill="currentColor"
              />
            </svg>
          </button>

          {/* Google sign-in */}
          <button 
            className="flex justify-center items-center border border-gray-200 rounded-md p-2 shadow-sm opacity-75 hover:opacity-100 hover:cursor-pointer"
          >
            <svg 
              className="w-4"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24"
            >
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          {mode === "login" ? (
            <span>
              New to Luma?{" "}
              <button
                type="button"
                onClick={() => switchMode("register")}
                className="text-[#3069ff] hover:underline"
              >
                Create an account
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("login")}
                className="text-[#3069ff] hover:underline"
              >
                Sign in
              </button>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

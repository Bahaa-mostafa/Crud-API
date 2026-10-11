import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, saveLogin } from "../services/authService";
import { toast } from "react-toastify";

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const isLoggedIn = login(email, password);

    if (!isLoggedIn) {
      toast.error("Invalid email or password");
      return;
    }
    saveLogin();
    setEmail("");
    setPassword("");

    navigate("/home");
  };

  return (
    <div className="bg-gray-300 flex justify-center items-center min-h-screen">
      <form
        action=""
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-md"
      >
        <h1 className="flex mb-6 text-2xl font-bold justify-center">Login</h1>

        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border px-3 py-2"
            id="email"
            placeholder="Enter Your Email"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="mb-2 block">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border px-3 py-2"
            id="password"
            placeholder="Enter Your Password"
          />
        </div>

        <button
          className="w-full rounded bg-blue-600 px-4 py-2 text-white"
          type="submit"
        >
          Login
        </button>

        <div className="mt-2 flex flex-col items-center text-sm">
          <span>I don't have Account</span>

          <Link to="/register" className="mt-1 text-black hover:text-blue-900">
            Register →
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

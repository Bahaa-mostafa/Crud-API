import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { toast } from "react-toastify";
import { Button, Input } from "../../../shared/index";

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const success = login(email, password);

  if (success) {
    toast.success("Login successful");
    navigate("/home");
  } else {
    toast.error("Invalid email or password");
  }
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

          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            id="email"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="mb-2 block">
            Password
          </label>

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border px-3 py-2"
            id="password"
            placeholder="Enter Your Password"
          />
        </div>

        <Button variant="primary" type="submit" className="w-full">
          Login
        </Button>

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

import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { toast } from "react-toastify";
import { Button, Input } from "../../../shared/index";

function RegisterForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      register(email.trim(), password);

      toast.success("Account created successfully");

      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/login");
    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-300">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-md"
      >
        <h1 className="mb-6 flex justify-center text-2xl font-bold">
          Register
        </h1>

        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block">
            Email
          </label>

          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="Enter Your Email"
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
            id="password"
            placeholder="Enter Your Password"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="mb-2 block">
            Confirm Password
          </label>

          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirmPassword"
            placeholder="Confirm Your Password"
          />
        </div>

        <Button variant="primary" type="submit" className="w-full">
          Register
        </Button>

        <div className="mt-2 flex flex-col items-center text-sm">
          <span>I have an account</span>

          <Link to="/login" className="mt-1 text-black hover:text-blue-900">
            Login →
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;

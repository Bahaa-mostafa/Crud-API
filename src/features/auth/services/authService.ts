import type { User } from "../types/auth";
import { toast } from "react-toastify";

const STORAGE_KEY = "users";

export function getUsers(): User[] {
  const users = localStorage.getItem(STORAGE_KEY);

  if (!users) {
    return [];
  }

  return JSON.parse(users);
}

export function saveUsers(users: User[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function register(email: string, password: string): void {
  const users = getUsers();

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    toast.error("Email already exists, login");
    throw new Error("Email already exists");
    
  }
  
  const newUser: User = {
    id: Date.now(),
    email,
    password,
  };
  
  users.push(newUser);

  saveUsers(users);
}


export function login(email: string, password: string): boolean {
  const users = getUsers();

  const user = users.find(
    (user) => user.email === email && user.password === password,
  );

  return !!user;
}

export function saveLogin(): void {
  localStorage.setItem("isLoggedIn", "true");
}

export function isAuthenticated(): boolean {
  return localStorage.getItem("isLoggedIn") === "true"
}



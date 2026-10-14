
import type { User } from "../types/auth";
import { toast } from "react-toastify";

const STORAGE_KEY = "users";
const CURRENT_USER_KEY = "currentUserId";

export function getUsers(): User[] {
  const users = localStorage.getItem(STORAGE_KEY);

  if (!users) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(users);
    return Array.isArray(parsed) ? (parsed as User[]) : [];
  } catch {
    return [];
  }
}

export function saveUsers(users: User[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function register(email: string, password: string): void {
  const users = getUsers();

  const existingUser = users.find(
    (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
  );

  if (existingUser) {
    toast.error("Email already exists, login");
    throw new Error("Email already exists");
  }

  const newUser: User = {
    id: Date.now(),
    email: email.trim(),
    password,
  };

  users.push(newUser);
  saveUsers(users);
}

export function login(email: string, password: string): boolean {
  const users = getUsers();

  const user = users.find(
    (user) =>
      user.email.toLowerCase() === email.trim().toLowerCase() &&
      user.password === password,
  );

  if (!user) {
    localStorage.removeItem(CURRENT_USER_KEY);
    return false;
  }

  saveLogin(user.id);
  return true;
}

export function saveLogin(userId: User["id"]): void {
  localStorage.setItem(CURRENT_USER_KEY, String(userId));
}

export function isAuthenticated(): boolean {
  const currentUserId = localStorage.getItem(CURRENT_USER_KEY);

  if (currentUserId === null) {
    return false;
  }

  const users = getUsers();

  return users.some(
    (user) => String(user.id) === currentUserId,
  );
}

export function logout(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
}

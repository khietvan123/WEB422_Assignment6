import { jwtDecode  } from "jwt-decode";

const TOKEN_KEY = "access_token";

const URL = process.env.NEXT_PUBLIC_API_URL;

export function setToken(token) {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function removeToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function getToken() {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function readToken() {
  const token = getToken();
  return token ? jwtDecode(token) : null;
}

export function isAuthenticated() {
  const token = getToken();
  return !!token;
}

export async function authenticateUser(userName, password) {
  const res = await fetch(`${URL}/login`, {
    method: "POST",
    body: JSON.stringify({ userName, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (res.status === 200 && data.token) {
    setToken(data.token);
    return true;
  } else {
    throw new Error(data.message || "Invalid username or password");
  }
}

export async function registerUser(userName, password, password_confirm) {
  const res = await fetch(`${URL}/register`, {
    method: "POST",
    body: JSON.stringify({ userName, password, password2: password_confirm }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Log the raw text response for debugging
  const rawText = await res.text();
  console.log("Raw response from API:", rawText);

  let data;
  try {
    data = JSON.parse(rawText);
  } catch (e) {
    throw new Error("Server did not return valid JSON. See console for details.");
  }

  if (res.status === 200) {
    return true;
  } else {
    throw new Error(data.message || "Registration failed");
  }
}

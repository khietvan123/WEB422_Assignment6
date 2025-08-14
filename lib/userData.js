import { getToken } from "./authenticate";

function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `JWT ${getToken()}`,
  };
}

async function handleResponse(res) {
  if (res.ok) {
    return await res.json();
  }
  return [];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function addToFavourites(id) {
  const res = await fetch(`${API_URL}/favourites/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
}

export async function removeFromFavourites(id) {
  const res = await fetch(`${API_URL}/favourites/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
}

export async function getFavourites() {
  const res = await fetch(`${API_URL}/favourites`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
}

export async function addToHistory(id) {
  const res = await fetch(`${API_URL}/history/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
}

export async function removeFromHistory(id) {
  const res = await fetch(`${API_URL}/history/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
}

export async function getHistory() {
  const res = await fetch(`${API_URL}/history`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
}
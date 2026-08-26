/**
 * API client — handles all communication with the FastAPI backend.
 * All functions include auth token from Clerk.
 * TODO [BACKEND]: Replace localStorage auth with Clerk useAuth() token
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function getAuthHeaders(): Promise<Record<string, string>> {
  // TODO [BACKEND]: Get real Clerk token
  // const { getToken } = useAuth();
  // const token = await getToken();
  // return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
  return { "Content-Type": "application/json" };
}

export async function fetchUser() {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}/api/users/me`, { headers });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function fetchUserStats() {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}/api/users/me/stats`, { headers });
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export async function uploadContract(file: File, contractType: string) {
  // TODO [BACKEND]: Add real auth token
  const formData = new FormData();
  formData.append("file", file);
  formData.append("contract_type", contractType);

  const res = await fetch(`${API_URL}/api/contracts/upload`, {
    method: "POST",
    body: formData,
  });

  if (res.status === 403) {
    throw new Error("FREE_LIMIT_REACHED");
  }
  if (!res.ok) {
    const data: unknown = await res.json().catch(() => ({}));
    const detail =
      typeof data === "object" && data !== null && "detail" in data && typeof data.detail === "string"
        ? data.detail
        : "Upload failed";
    throw new Error(detail);
  }
  return res.json();
}

export async function fetchReviews() {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}/api/contracts/reviews`, { headers });
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}

export async function fetchReview(reviewId: string) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}/api/contracts/reviews/${reviewId}`, { headers });
  if (!res.ok) throw new Error("Review not found");
  return res.json();
}

export async function createCheckoutSession() {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}/api/billing/create-checkout`, {
    method: "POST",
    headers,
  });
  if (!res.ok) throw new Error("Failed to create checkout");
  return res.json();
}

export async function createPortalSession() {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}/api/billing/portal`, { headers });
  if (!res.ok) throw new Error("Failed to create portal session");
  return res.json();
}

export async function deleteAccount() {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}/api/users/me`, {
    method: "DELETE",
    headers,
  });
  if (!res.ok) throw new Error("Failed to delete account");
  return res.json();
}

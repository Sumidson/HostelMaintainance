import { fetchAuthSession } from "aws-amplify/auth";

/* =====================================
   FIXED: Removed /$default
===================================== */
const API_BASE = "https://i5m5qyt01f.execute-api.eu-north-1.amazonaws.com";

async function getToken(): Promise<string> {
  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();
  if (!token) throw new Error("User not authenticated");
  return token;
}

export async function createComplaint(data: {
  title: string;
  description: string;
  status?: string;
}) {
  try {
    const token = await getToken();

    // This will now call: https://i5m5qyt01f.execute-api.eu-north-1.amazonaws.com/complaints
    const response = await fetch(`${API_BASE}/complaints`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        status: data.status || "OPEN",
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }
    return await response.json();
  } catch (error) {
    console.error("Create complaint error:", error);
    throw error;
  }
}

export async function getComplaints() {
  try {
    const token = await getToken();
    const response = await fetch(`${API_BASE}/complaints`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }
    return await response.json();
  } catch (error) {
    console.error("Get complaints error:", error);
    throw error;
  }
}
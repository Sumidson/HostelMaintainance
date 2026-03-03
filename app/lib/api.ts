import { fetchAuthSession, fetchUserAttributes } from "aws-amplify/auth";
/* ============================================
   API BASE URL (Next.js route.ts backend)
============================================ */
const API_BASE = "/api/complaints";


/* ============================================
   GET AUTH TOKEN FROM COGNITO
============================================ */
async function getToken(): Promise<string> {

  try {

    const session = await fetchAuthSession();

    const token =
      session.tokens?.idToken?.toString() ||
      session.tokens?.accessToken?.toString();

    if (!token) {
      throw new Error("User not authenticated");
    }

    return token;

  } catch (error) {

    console.error("Token error:", error);

    throw error;
  }
}


/* ============================================
   CREATE COMPLAINT
   POST /api/complaints
============================================ */
export async function createComplaint(data: {
  title: string;
  description: string;
  status?: string;
}) {

  const token = await getToken();

  let userEmail = "";
  try {
    const attributes = await fetchUserAttributes();
    userEmail = attributes.email || "";
  } catch (e) {
    console.error("Could not fetch user attributes", e);
  }

  const response = await fetch(API_BASE, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      title: data.title || "Untitled",
      description: data.description || "No description provided",
      status: data.status || "OPEN",
      userEmail: userEmail,
      email: userEmail
    }),

  });

  if (!response.ok) {

    const errorText = await response.text();

    console.error("Create complaint failed:", errorText);

    throw new Error(errorText);
  }

  return await response.json();
}


/* ============================================
   GET ALL COMPLAINTS
   GET /api/complaints
============================================ */
export async function getComplaints() {

  const token = await getToken();

  const response = await fetch(API_BASE, {

    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
    },

  });

  if (!response.ok) {

    const errorText = await response.text();

    console.error("Get complaints failed:", errorText);

    throw new Error(errorText);
  }

  return await response.json();
}


/* ============================================
   UPDATE COMPLAINT STATUS
   PATCH /api/complaints/{id}
============================================ */
export async function updateComplaintStatus(
  complaintID: string,
  status: "OPEN" | "IN_PROGRESS" | "COMPLETED"
) {

  const token = await getToken();

  const response = await fetch(`${API_BASE}/${complaintID}`, {

    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      status,
    }),

  });

  if (!response.ok) {

    const errorText = await response.text();

    console.error("Update complaint failed:", errorText);

    throw new Error(errorText);
  }

  return await response.json();
}
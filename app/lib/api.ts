import { fetchAuthSession } from "aws-amplify/auth";

/* ============================================
   API BASE URL (NO /$default needed)
============================================ */
const API_BASE = "/api";


/* ============================================
   GET AUTH TOKEN FROM COGNITO
============================================ */
async function getToken(): Promise<string> {

  const session = await fetchAuthSession();

  const token = session.tokens?.idToken?.toString();

  if (!token) {
    throw new Error("User not authenticated");
  }

  return token;
}


/* ============================================
   CREATE COMPLAINT
   POST /complaints
============================================ */
export async function createComplaint(data: {
  title: string;
  description: string;
  status?: string;
}) {

  const token = await getToken();

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

    const errorText = await response.text();

    console.error("Create complaint failed:", errorText);

    throw new Error(errorText);
  }

  return await response.json();
}



/* ============================================
   GET ALL COMPLAINTS
   GET /complaints
============================================ */
export async function getComplaints() {

  const token = await getToken();

  const response = await fetch(`${API_BASE}/complaints`, {

    method: "GET",

    headers: {
      "Authorization": `Bearer ${token}`,
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
   PATCH /complaints/{id}
============================================ */
export async function updateComplaintStatus(
  complaintID: string,
  status: "OPEN" | "IN_PROGRESS" | "COMPLETED"
) {

  const token = await getToken();

  const response = await fetch(
    `${API_BASE}/complaints/${complaintID}`,
    {

      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },

      body: JSON.stringify({
        status,
      }),

    }
  );

  if (!response.ok) {

    const errorText = await response.text();

    console.error("Update complaint failed:", errorText);

    throw new Error(errorText);
  }

  return await response.json();
}
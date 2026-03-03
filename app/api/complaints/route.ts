import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://i5m5qyt01f.execute-api.eu-north-1.amazonaws.com";

/* ============================================
   GET ALL COMPLAINTS
   GET /api/complaints
============================================ */
export async function GET(request: NextRequest) {
    try {
        const authHeader =
            request.headers.get("authorization") ||
            request.headers.get("Authorization");

        if (!authHeader) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const response = await fetch(`${API_BASE}/complaints`, {
            method: "GET",
            headers: {
                Authorization: authHeader,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            cache: "no-store",
        });

        const text = await response.text();

        if (!response.ok) {
            console.error("AWS GET Error (Database corrupted, falling back to empty list):", text);
            // Fallback to empty array so the frontend UI doesn't crash because of the AWS Lambda backend error
            return NextResponse.json([]);
        }

        let data;
        try {
            data = text ? JSON.parse(text) : {};
        } catch (e) {
            console.error("Failed to parse JSON:", text);
            data = { raw_response: text };
        }

        return NextResponse.json(data, { status: response.status });

    } catch (error: any) {
        console.error("GET route error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/* ============================================
   CREATE COMPLAINT
   POST /api/complaints
============================================ */
export async function POST(request: NextRequest) {
    try {
        const authHeader =
            request.headers.get("authorization") ||
            request.headers.get("Authorization");

        if (!authHeader) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();

        const response = await fetch(`${API_BASE}/complaints`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeader,
            },
            body: JSON.stringify(body),
        });

        const text = await response.text();

        if (!response.ok) {
            console.error("AWS POST Error:", text);
            return NextResponse.json({ error: text || "Unknown AWS Error" }, { status: response.status });
        }

        let data;
        try {
            data = text ? JSON.parse(text) : {};
        } catch (e) {
            console.error("Failed to parse JSON:", text);
            data = { raw_response: text };
        }

        return NextResponse.json(data, { status: response.status });

    } catch (error: any) {
        console.error("POST route error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
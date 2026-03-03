import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://i5m5qyt01f.execute-api.eu-north-1.amazonaws.com";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    try {

        const authHeader =
            request.headers.get("authorization") ||
            request.headers.get("Authorization");

        if (!authHeader) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();

        // In Next 15, params is a Promise. To be safe across versions, await it before using properties.
        const resolvedParams = await Promise.resolve(params);

        const response = await fetch(
            `${API_BASE}/complaints/${resolvedParams.id}`,
            {

                method: "PATCH",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeader,
                },

                body: JSON.stringify(body),

            }
        );

        const text = await response.text();

        if (!response.ok) {
            console.error("AWS PATCH Error:", text);
            return NextResponse.json({ error: text || "Unknown AWS Error" }, { status: response.status });
        }

        let data;
        try {
            data = text ? JSON.parse(text) : {};
        } catch (e) {
            console.error("Failed to parse JSON:", text);
            data = { raw_response: text };
        }

        return NextResponse.json(data, {
            status: response.status,
        });

    } catch (error: any) {

        console.error("PATCH route error:", error);

        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
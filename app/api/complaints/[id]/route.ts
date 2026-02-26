import { NextResponse } from 'next/server';

const API_BASE = "https://i5m5qyt01f.execute-api.eu-north-1.amazonaws.com";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        const response = await fetch(`${API_BASE}/complaints/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authHeader,
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json({ error: errorText }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("PATCH /api/complaints/[id] Route Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

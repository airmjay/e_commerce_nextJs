import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../libs/db";
import sanitizeInput from "../../../config/SanitizHtmlData";
import { CategorySchema, z } from "../../../zod/Validation";

// READ: Get single product

export async function GET(
    request: NextRequest,

    {
        params
    }: {
        params: { id: string };
    }
) {
    const id = params.id;
    try {
        const [rows] = await pool.query(`SELECT * FROM category WHERE id = ?`, [
            id
        ]);
        if (rows) {
            return NextResponse.json(rows);
        }
        return NextResponse.json(null);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch items" + error },
            { status: 500 }
        );
    }
}
export async function PUT(
    request: NextRequest,

    {
        params
    }: {
        params: { id: string };
    }
) {
    const id = Number(params.id);
    const formData = await request.formData();
    const get = (key: string): string | null => formData.get(key);

    const input = {
        name: get("name")
    };

    const sanitized = sanitizeInput(input);
    try {
    CategorySchema.parse(sanitized);
    const [rows] = await pool.query(
        `UPDATE category SET name = ?  WHERE id = ? `,
        [input.name, id]
    );
    if (rows) {
        return NextResponse.json(rows);
    }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ errors: error.issues }, { status: 500 });
        }
        return NextResponse.json(
            { error: "Failed to fetch items" + error },
            { status: 500 }
        );
    }
}

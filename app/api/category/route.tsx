import { NextResponse } from "next/server";
import pool from "../../../libs/db";
import sanitizeHtml from "sanitize-html";
import { CategorySchema, z } from "../../zod/Validation";
import { ResultSetHeader } from "mysql2";

const sanitizeInput = (
    input: Record<string, string | File | number | null>
) => {
    const sanitized: Record<string, string | File | number | null> = {};
    for (const field in input) {
        if (typeof input[field] === "string") {
            sanitized[field] = sanitizeHtml(input[field], {
                allowedTags: [],
                allowedAttributes: {}
            }).trim();
        } else {
            sanitized[field] = input[field];
        }
    }
    return sanitized;
};
export async function GET() {
    try {
        const [rows] = await pool.query("SELECT * FROM category");
        return NextResponse.json(rows);
    } catch (e) {
        return NextResponse.json(e);
    }
}
export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const get = (key: string): string => formData.get(key);
    const input = {
        name: get("name")
    };
    const sanitized = sanitizeInput(input);
    try {
        CategorySchema.parse(sanitized);
        const [result] = await pool.query<ResultSetHeader>(
            "INSERT INTO category (name) VALUES (?)",
            [input.name]
        );
        return NextResponse.json(
            {
                id: result.insertId,
                name: input.name,
                description: input.description
            },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ errors: error.issues }, { status: 500 });
        }
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 501 }
        );
    }
}

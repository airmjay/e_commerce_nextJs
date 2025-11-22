import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../libs/db";
import bcrypt from "bcryptjs";
import { productSchema, z } from "../../../zod/Validation";

// READ: Get single product

export async function POST(request: NextRequest) {
    const { email, password } = request.json();
    try {
        emailSchema.parse(sanitized);
        const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
            email
        ]);
        if (rows) {
            return NextResponse.json(
                { error: "User Already exist" },
                { status: 409 }
            );
        } else {
            const passwordHash = await bcrypt.hash(password, 12);
        }
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

    try {
        const [rows] = await pool.query(
            `UPDATE category SET name = ?  WHERE id = ? `,
            [input.name, id]
        );
        if (rows) {
            return NextResponse.json(rows);
        }
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch items" + error },
            { status: 500 }
        );
    }
}

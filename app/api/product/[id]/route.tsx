import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../libs/db";

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
        const [rows] = await pool.query(`SELECT * FROM product WHERE id = ?`, [
            id
        ]);
        if (rows) {
            return NextResponse.json(rows);
        }
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch items" },
            { status: 500 }
        );
    }
}

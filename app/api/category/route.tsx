import { NextRequest, NextResponse } from "next/server";
import pool from "../../../libs/db";

export async function GET() {
    try {
        const [rows] = await pool.query("SELECT * FROM category");
        return NextResponse.json(rows);
    } catch (e) {
        return NextResponse.json(e);
    }
}
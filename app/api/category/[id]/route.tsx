import { NextRequest } from "next/server";
import pool from "../../../../libs/db";
import sanitizeInput from "../../../config/SanitizHtmlData";
import { CategorySchema, z } from "../../../zod/Validation";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
// READ: Get single product

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const [rows] = await pool.query(`SELECT * FROM category WHERE id = ?`, [
      id,
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
    params,
  }: {
    params: { id: string };
  }
) {
  const id = Number(params.id);
  const { name } = await request.json();

  const input = {
    name: name,
  };
  const [rows] = await pool.query(`SELECT * FROM category WHERE name = ? `, [
    input.name,
  ]);

  const categoryRows = rows as RowDataPacket[];

  if (categoryRows.length > 0) {
    return NextResponse.json(
      { error: "Category Already Exist" },
      { status: 409 }
    );
  }
  //   return;
  const sanitized = sanitizeInput(input);
  try {
    CategorySchema.parse(sanitized);
    const [rows] = await pool.query(
      `UPDATE category SET name = ?  WHERE id = ? `,
      [input.name, id]
    );
    if (rows) {
      return NextResponse.json({ success: rows });
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

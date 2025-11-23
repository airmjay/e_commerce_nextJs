import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../libs/db";
import bcrypt from "bcryptjs";
import { AuthSchema, z } from "../../../zod/Validation";
import sanitizeInput from "@/app/config/SanitizHtmlData";
import { RowDataPacket } from "mysql2";

// READ: Get single product

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const input = {
    email,
    password,
  };
  const sanitized = sanitizeInput(input);
  try {
    AuthSchema.parse(sanitized);
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);
    const ProductRows = rows as RowDataPacket;
    if (ProductRows.length > 0) {
      return NextResponse.json(
        { error: "User Already exist" },
        { status: 409 }
      );
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const [rowsUser] = await pool.query(
      `INSERT INTO users(email,password) VALUES(?,?)`,
      [sanitized.email, passwordHash]
    );
    if (rowsUser) {
      return NextResponse.json({ success: "User have added" }, { status: 201 });
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
// export async function PUT(
//   request: NextRequest,

//   {
//     params,
//   }: {
//     params: { id: string };
//   }
// ) {
//   const id = Number(params.id);
//   const formData = await request.formData();
//   const get = (key: string): string | null => formData.get(key);

//   const input = {
//     name: get("name"),
//   };

//   try {
//     const [rows] = await pool.query(
//       `UPDATE category SET name = ?  WHERE id = ? `,
//       [input.name, id]
//     );
//     if (rows) {
//       return NextResponse.json(rows);
//     }
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch items" + error },
//       { status: 500 }
//     );
//   }
// }

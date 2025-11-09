import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../libs/db";
import sanitizeHtml from "sanitize-html";

import DeleteFile from "../../../utils/DeleteFile";
import { join } from "path";
import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";
import { keyof } from "zod";
// READ: Get single product
interface ProductType {
  name: string;
  description: string;
  specification: string;
  unit: number;
  category: string;
  price: number;
  image: null;
}
const sanitizeInput = (input: Record<string, string | number>) => {
  const sanitized: Record<string, string | ProductType | number> = {};
  for (const field in input) {
    if (typeof input[field] === "string") {
      sanitized[field] = sanitizeHtml(input[field], {
        allowedTags: [],
        allowedAttributes: {},
      }).trim();
    } else {
      sanitized[field] = input[field];
    }
  }
  return sanitized;
};
export async function GET(
  request: NextRequest,

  {
    params,
  }: {
    params: { id: string };
  }
) {
  const id = params.id;
  try {
    const [rows] = await pool.query(`SELECT * FROM product WHERE id = ?`, [id]);
    if (rows) {
      return NextResponse.json(rows);
    }
    return NextResponse.json(null);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch items" },
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
  const formData = await request.formData();
  const input = {
    name: formData.get("name"),
    description: formData.get("description"),
    filename: formData.get("filename"),
    price: Number(formData.get("price")),
    category: Number(formData.get("category")),
    unit: Number(formData.get("unit")),
    image: formData.get("image") ? formData.get("image").name : null,
    specification: formData.get("specification"),
  };
  console.log(input);
  if (formData.get("image")) {
    await DeleteFile(input.filename);
    const file = formData.get("image");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileuploadName =
      randomUUID().slice(0, 8) +
      Date.now() +
      "." +
      getFileExtension(input.image);
    const filepath = join(process.cwd(), "public/uploads/", fileuploadName);
    await writeFile(filepath, buffer);
    const [rows] = await pool.query(
      `UPDATE product SET image = ? WHERE id = ? `,
      [fileuploadName, id]
    );
  }
  try {
    const [rows] = await pool.query(
      `UPDATE product SET name = ?, description = ? , specification = ? , unit = ? , category_id = ? , price = ? WHERE id = ? `,
      [
        input.name,
        input.description,
        input.specification,
        input.unit,
        input.category,
        input.price,
        id,
      ]
    );
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
function getFileExtension(filename) {
  const parts = filename.split(".");
  if (parts.length > 1) {
    return parts.pop(); // Returns the last element (extension)
  }
  return ""; // No extension found
}

import pool from "../../../libs/db";
import { NextResponse, NextRequest } from "next/server";
import sanitizeHtml from "sanitize-html";
import { productSchema, z } from "../../zod/Validation";
import { join } from "path";
import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";
import { ResultSetHeader } from "mysql2";

const sanitizeInput = (
  input: Record<string, string | File | number | null>
) => {
  const sanitized: Record<string, string | File | number | null> = {};
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
// CREATE: Insert a new item
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const get = (key: string): string | File | null => formData.get(key);
  let imageFile: File | null | string | undefined = get("image");
  if (imageFile && typeof imageFile === "object" && "name" in imageFile) {
    imageFile = imageFile?.name;
  }
  const input = {
    name: get("name"),
    description: get("description"),
    filename: formData.get("filename"),
    price: Number(get("price")),
    category: Number(get("category")),
    unit: Number(get("unit")),
    image: imageFile,
    specification: formData.get("specification"),
  };

  let fileUpload: null | undefined | string | File | Promise<ArrayBuffer> =
    get("image");
  if (fileUpload instanceof File) {
    fileUpload = fileUpload.arrayBuffer();
  }

  const bytes: string | ArrayBuffer | null = await fileUpload;
  const buffer = Buffer.from(bytes as ArrayBuffer);
  const fileuploadName =
    randomUUID().slice(0, 8) +
    Date.now() +
    "." +
    getFileExtension(input.image as string);
  const filepath = join(process.cwd(), "public/uploads/", fileuploadName);

  await writeFile(filepath, buffer);
  const sanitized = sanitizeInput(input);
  try {
    productSchema.parse(sanitized);
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO product (name, description, specification, unit, category_id, price, image ) VALUES (?, ?, ? , ? , ? , ? , ?)",
      [
        input.name,
        input.description,
        input.specification,
        input.unit,
        input.category,
        input.price,
        fileuploadName,
      ]
    );

    return NextResponse.json(
      {
        id: result.insertId,
        name: input.name,
        description: input.description,
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

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM product");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch items" + error },
      { status: 500 }
    );
  }
}

function getFileExtension(filename: string) {
  const parts = filename.split(".");
  if (parts.length > 1) {
    return parts.pop(); // Returns the last element (extension)
  }
  return ""; // No extension found
}

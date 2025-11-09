import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../libs/db";
import sanitizeHtml from "sanitize-html";

import DeleteFile from "../../../utils/DeleteFile";
import { join } from "path";
import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";

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
  if (formData.get("image")) {
    await DeleteFile(input.filename);
    // const file = formData.get("image");
    const bytes: string | ArrayBuffer | null = await fileUpload;
    if (!bytes) {
      throw new Error("invalid: No file is upload");
    }

    const buffer = Buffer.from(bytes as ArrayBuffer);
    const fileuploadName =
      randomUUID().slice(0, 8) +
      Date.now() +
      "." +
      getFileExtension(input.image as string);
    const filepath = join(process.cwd(), "public/uploads/", fileuploadName);
    await writeFile(filepath, buffer);
    await pool.query(`UPDATE product SET image = ? WHERE id = ? `, [
      fileuploadName,
      id,
    ]);
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

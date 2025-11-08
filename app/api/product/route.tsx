import pool from "../../../libs/db";
import { NextResponse, NextRequest } from "next/server";
import sanitizeHtml from "sanitize-html";
import { productSchema, z } from "../../zod/Validation";
import { join } from "path";
import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";

const sanitizeInput = input => {
    const sanitized = {};
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
// CREATE: Insert a new item
export async function POST(request) {
    const formData = await request.formData();
    console.log(formData, { error: "Only data is empty look 😂" });

    const input = {
        name: formData.get("name"),
        description: formData.get("description"),
        image: formData.get("image").name,
        price: Number(formData.get("price")),
        category: Number(formData.get("category")),
        unit: Number(formData.get("unit")),
        specification: formData.get("specification")
    };
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
    const sanitized = sanitizeInput(input);
    try {
        productSchema.parse(sanitized);
        const [result] = await pool.query(
            "INSERT INTO product (name, description, specification, unit, category_id, price, image ) VALUES (?, ?, ? , ? , ? , ? , ?)",
            [
                input.name,
                input.description,
                input.specification,
                input.unit,
                input.category,
                input.price,
                fileuploadName
            ]
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

export async function GET() {
    try {
        const [rows] = await pool.query("SELECT * FROM product");
        return NextResponse.json(rows);
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

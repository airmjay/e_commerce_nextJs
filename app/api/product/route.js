import pool from "../../../libs/db";
import { NextResponse, NextRequest } from "next/server";
import sanitizeHtml from "sanitize-html";
import { productSchema, z } from "../../zod/Validation";

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
    console.log(request, { error: "Only data is empty look 😂" });
    const formData = await request.formData();
    const input = {
        name: formData.get("name"),
        description: formData.get("description"),
        image: formData.get("image"),
        price: formData.get("price"),
        category: formData.get("category"),
        unit: formData.get("unit"),
        specification: formData.get("specification")
    };
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
                input.image
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

// READ: Get all product
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

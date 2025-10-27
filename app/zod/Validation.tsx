import { z } from "zod";

const productSchema = z.object({
    name: z.string().min(3, "Name is required and min 3 chars"),
    description: z
        .string()
        .min(10, "Description must be greater than 10 character"),
    specification: z.string().min(10, "specification must be greater than 10"),
    image: z.any().optional(),
    unit: z.number().positive("Unit must be positive"),
    price: z.number().positive("Price must be positive"),
    category: z.number()
});

export { productSchema, z };

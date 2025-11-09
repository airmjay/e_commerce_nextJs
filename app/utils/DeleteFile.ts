import { promises as fs } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

export default async function FileDelete(fileName: string) {
  try {
    if (!fileName) {
      return NextResponse.json(
        { error: "File name is required" },
        { status: 400 }
      );
    }

    // Construct the full file path.
    // For example, to delete from the 'public/uploads' folder
    const uploadDir = join(process.cwd(), "public/uploads");
    const filePath = join(uploadDir, fileName);

    // Check if the file exists before attempting deletion (optional but recommended)
    try {
      await fs.access(filePath);
    } catch (error) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    // Delete the file using fs.unlink
    await fs.unlink(filePath);
    console.log(`Deleted file: ${filePath}`);
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

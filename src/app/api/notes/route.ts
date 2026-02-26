import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET() {
  const prisma = getPrisma();
  const notes = await prisma.note.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  const prisma = getPrisma();
  const body = await request.json();
  const title = String(body.title || "").trim();
  const content = String(body.content || "").trim();

  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content are required" },
      { status: 400 }
    );
  }

  const note = await prisma.note.create({ data: { title, content } });
  return NextResponse.json(note, { status: 201 });
}

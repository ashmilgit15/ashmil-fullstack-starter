import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const notes = await prisma.note.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(notes);
}

export async function POST(request: Request) {
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

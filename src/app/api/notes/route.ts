import { NextResponse } from "next/server";
import { addNote, listNotes } from "@/lib/store";

export async function GET() {
  return NextResponse.json(listNotes());
}

export async function POST(request: Request) {
  const body = await request.json();
  const title = String(body.title || "").trim();
  const content = String(body.content || "").trim();
  const tags = Array.isArray(body.tags)
    ? body.tags.map((t: string) => String(t).trim()).filter(Boolean)
    : [];

  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content are required" },
      { status: 400 }
    );
  }

  const note = addNote(title, content, tags);
  return NextResponse.json(note, { status: 201 });
}

import { NextResponse } from "next/server";
import { deleteNote } from "@/lib/store";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const result = deleteNote(params.id);
  if (!result.ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const submitNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }

    setTitle("");
    setContent("");
    await loadNotes();
    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Full‑Stack Notes</h1>
          <p>Next.js + Prisma + SQLite — a tiny end‑to‑end demo.</p>
        </div>

        <form className={styles.form} onSubmit={submitNote}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Write something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Add note"}
          </button>
          {error && <div className={styles.error}>{error}</div>}
        </form>

        <section className={styles.list}>
          {notes.length === 0 ? (
            <p className={styles.empty}>No notes yet. Add one above.</p>
          ) : (
            notes.map((note) => (
              <article key={note.id} className={styles.card}>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <span>
                  {new Date(note.createdAt).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </article>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

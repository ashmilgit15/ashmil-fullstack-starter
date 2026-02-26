"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setDark(savedTheme === "dark");
    loadNotes();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const submitNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, tags }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }

    setTitle("");
    setContent("");
    setTagsInput("");
    await loadNotes();
    setLoading(false);
  };

  const deleteNote = async (id: string) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    await loadNotes();
  };

  const filtered = notes.filter((n) => {
    const q = search.toLowerCase();
    return (
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q) ||
      n.tags.join(" ").toLowerCase().includes(q)
    );
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <div>
            <h1>Full‑Stack Notes</h1>
            <p>Notes + tags + search + delete + theme toggle.</p>
          </div>
          <button
            className={styles.toggle}
            onClick={() => setDark((d) => !d)}
          >
            {dark ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>

        <div className={styles.toolbar}>
          <input
            type="text"
            placeholder="Search notes or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Add note"}
          </button>
          {error && <div className={styles.error}>{error}</div>}
        </form>

        <section className={styles.list}>
          {filtered.length === 0 ? (
            <p className={styles.empty}>No notes yet. Add one above.</p>
          ) : (
            filtered.map((note) => (
              <article key={note.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3>{note.title}</h3>
                  <button
                    className={styles.delete}
                    onClick={() => deleteNote(note.id)}
                  >
                    Delete
                  </button>
                </div>
                <p>{note.content}</p>
                <div className={styles.tags}>
                  {note.tags.map((t) => (
                    <span key={t} className={styles.tag}>
                      #{t}
                    </span>
                  ))}
                </div>
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

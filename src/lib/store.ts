export type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
};

declare global {
  // eslint-disable-next-line no-var
  var notesStore: Note[] | undefined;
}

const getStore = () => {
  if (!global.notesStore) global.notesStore = [];
  return global.notesStore;
};

export function listNotes() {
  return getStore();
}

export function addNote(title: string, content: string, tags: string[]) {
  const note: Note = {
    id: Math.random().toString(36).slice(2),
    title,
    content,
    tags,
    createdAt: new Date().toISOString(),
  };
  const store = getStore();
  store.unshift(note);
  return note;
}

export function deleteNote(id: string) {
  const store = getStore();
  const idx = store.findIndex((n) => n.id === id);
  if (idx !== -1) store.splice(idx, 1);
  return { ok: idx !== -1 };
}

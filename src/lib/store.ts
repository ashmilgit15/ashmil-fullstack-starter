export type Note = {
  id: string;
  title: string;
  content: string;
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

export function addNote(title: string, content: string) {
  const note: Note = {
    id: Math.random().toString(36).slice(2),
    title,
    content,
    createdAt: new Date().toISOString(),
  };
  const store = getStore();
  store.unshift(note);
  return note;
}

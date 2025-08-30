import api from "../services/api";

export interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}
interface AddNoteResponse {
  success: boolean;
  note: Note;
}

// ✅ Add a new note
export const addNote = async (title: string, content: string, token: string) => {
  const res = await api.post<AddNoteResponse>(
    "/notes",
    { title, content },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.note;
};


// ✅ Get all notes for logged-in user
export const getNotes = async (token: string) => {
  const res = await api.get<{ success: boolean; notes: Note[] }>("/notes", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.notes || [];
};

// ✅ Delete a note
export const deleteNote = async (id: string, token: string) => {
  const res = await api.delete<{ message: string }>(`/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

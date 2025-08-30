import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";
import NotesList from "../components/NotesList";
import CreateNotePopup from "../components/CreateNotePopup";
import NotePopup from "../components/NotePopup";
import { getNotes, addNote, deleteNote, type Note } from "../utils/notes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard: React.FC = () => {
  const { user, token, logout, isLoading } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const navigate = useNavigate();

  // fetch notes from backend
  useEffect(() => {
    const fetchNotes = async () => {
      if (!token) return;
      try {
        const data = await getNotes(token);
        setNotes(data);
      } catch (err) {
        console.error("Failed to fetch notes", err);
      }
    };
    fetchNotes();
  }, [token]);

  const handleCreateNote = async (title: string, content: string) => {
    if (!token) return;
    try {
      const newNote = await addNote(title, content, token);
      setNotes((prev) => [...prev, newNote]);
      setShowCreatePopup(false);
    } catch (err) {
      console.error("Failed to create note", err);
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (!token) return;
    try {
      await deleteNote(id, token);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      if (selectedNote?._id === id) {
        setSelectedNote(null);
      }
    } catch (err) {
      console.error("Failed to delete note", err);
    }
  };

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Navbar with signout */}
      <Navbar onSignOut={handleSignOut} />

      <div className="p-2 sm:p-4 md:p-6 flex flex-col items-center">
        {/* User info */}
        {user && <UserCard name={user.name} email={user.email} />}

        {/* Create Note Button */}
        <button
          onClick={() => setShowCreatePopup(true)}
          className="w-full max-w-xl mt-4 px-3 py-2 sm:px-4 sm:py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 text-base sm:text-lg font-semibold transition"
        >
          Create Note
        </button>

        {/* Notes section header */}
        <div className="w-full max-w-xl mt-8 mb-2 px-1 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-semibold">Notes</h2>
        </div>

        {/* Notes List */}
        <div className="w-full max-w-xl">
          <NotesList
            notes={notes}
            onOpen={(note) => setSelectedNote(note)}
            onDelete={handleDeleteNote}
          />
        </div>
      </div>

      {/* Create Note Popup */}
      {showCreatePopup && (
        <CreateNotePopup
          onSave={handleCreateNote}
          onClose={() => setShowCreatePopup(false)}
        />
      )}

      {/* Note Details Popup */}
      {selectedNote && (
        <NotePopup
          title={selectedNote.title}
          content={selectedNote.content}
          onClose={() => setSelectedNote(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;

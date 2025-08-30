import NoteCard from "./NoteCard";

interface Note {
  _id: string;
  title: string;
  content: string;
}

interface NotesListProps {
  notes: Note[];
  onOpen: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NotesList: React.FC<NotesListProps> = ({ notes, onOpen, onDelete }) => {
  return (
    <div className="mt-6 grid gap-3 w-full">
      {notes.length > 0 ? (
        notes.map((note) => (
          <NoteCard
            key={note._id}
            id={note._id}
            title={note.title}
            onOpen={() => onOpen(note)}
            onDelete={() => onDelete(note._id)}
          />
        ))
      ) : (
        <p className="text-gray-500 text-center text-base sm:text-lg py-8 bg-white rounded-lg shadow">
          No notes yet. Create one!
        </p>
      )}
    </div>
  );
};

export default NotesList;
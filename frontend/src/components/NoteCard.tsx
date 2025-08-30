import { Trash2 } from "lucide-react";

interface NoteCardProps {
  id: string;
  title: string;
  onOpen: () => void;
  onDelete: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ title, onOpen, onDelete }) => {
  return (
    <div
      className="flex justify-between items-center p-3 sm:p-4 border border-gray-200 shadow-md rounded-lg hover:bg-gray-100 cursor-pointer transition-all w-full"
      onClick={onOpen}
    >
      <span className="font-medium text-base sm:text-lg truncate max-w-[70vw] sm:max-w-[85%]">
        {title}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className=" font-bold text-lg sm:text-xl px-2"
        aria-label="Delete note"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default NoteCard;
interface NotePopupProps {
  title: string;
  content: string;
  onClose: () => void;
}

const NotePopup: React.FC<NotePopupProps> = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white border border-blue-100 p-6 sm:p-8 rounded-2xl shadow-2xl w-[90vw] max-w-md sm:max-w-lg transition-all">
        <h2 className="text-lg sm:text-2xl font-bold mb-4 text-blue-700 break-words">{title}</h2>
        <div className="text-gray-700 text-base sm:text-lg whitespace-pre-line break-words mb-6 max-h-64 overflow-y-auto">
          {content}
        </div>
        <button
          onClick={onClose}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NotePopup;
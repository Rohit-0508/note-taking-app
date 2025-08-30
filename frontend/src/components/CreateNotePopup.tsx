import { useState, useRef } from "react";

interface CreateNotePopupProps {
  onSave: (title: string, content: string) => void;
  onClose: () => void;
}

const CreateNotePopup: React.FC<CreateNotePopupProps> = ({ onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    onSave(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-900/40 z-50">
      <div className="bg-white border border-blue-200 p-4 sm:p-8 rounded-2xl shadow-2xl w-[95vw] max-w-md relative">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-blue-700 text-center">Create Note</h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-2 sm:p-3 mb-3 sm:mb-4 rounded-lg text-base sm:text-lg outline-none transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <label
          className="block w-full mb-3 sm:mb-4 cursor-text"
          onClick={() => textareaRef.current?.focus()}
        >
          <span className="sr-only">Content</span>
          <textarea
            ref={textareaRef}
            placeholder="Content"
            className="w-full border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-2 sm:p-3 rounded-lg text-base outline-none min-h-[90px] sm:min-h-[100px] resize-none transition"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-medium w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow w-full sm:w-auto"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNotePopup;
import { Request, Response } from "express";
import Note from "../models/Note";

// Add a note
export const addNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;
    // later we'll take user from auth middleware
    const userId = (req as any).user?.id || "dummyUserId"; 

    const note = new Note({ title, content, user: userId });
    await note.save();

    res.status(201).json({ success: true, note });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all notes
export const getNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id || "dummyUserId";

    const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete note
export const deleteNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id || "dummyUserId";

    const note = await Note.findOneAndDelete({ _id: id, user: userId });

    if (!note) {
      res.status(404).json({ success: false, message: "Note not found" });
      return;
    }

    res.status(200).json({ success: true, message: "Note deleted" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

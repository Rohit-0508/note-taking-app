import express from "express";
import { addNote, getNotes, deleteNote } from "../controllers/noteController";
import { verifyToken } from "../utils/jwt";

const router = express.Router();

// For now no auth, later we’ll add middleware
router.post("/", verifyToken, addNote);
router.get("/", verifyToken, getNotes);
router.delete("/:id", verifyToken, deleteNote);

export default router;

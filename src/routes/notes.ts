import express from 'express';
import authCheck from '../middleware/authCheck';
import { createNote, deleteNote, getNote, getNotes, updateNote } from '../controllers/noteController';

const router = express.Router()

router.use(authCheck)

router.get('/',getNotes)

router.get('/:id',getNote)

router.post('/',createNote)

router.put('/:id',updateNote)

router.delete('/:id',deleteNote)

export default router
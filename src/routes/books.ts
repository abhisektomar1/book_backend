import express from 'express';
import authCheck from '../middleware/authCheck';
import { createBook, getBook, getBooks } from '../controllers/booksController';


const router = express.Router()

router.use(authCheck)

router.get('/',getBooks)

router.get('/:id',getBook)

router.post('/',createBook)



export default router
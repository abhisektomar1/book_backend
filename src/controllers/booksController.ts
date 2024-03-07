import { Request, Response } from "express";
import mongoose from "mongoose";
import bookModel from "../models/bookModel";

// get all Notes
const getBooks = async (req: any, res: Response) => {
  try {
    const user_id = req.user._id;
    const books = await bookModel.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (err) {
    console.log("@@err", err);
  }
};

const getBook = async (req:Request, res: Response) => {

  
  const { id } = req.params;
  console.log(id);
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(400).json({ error: "Invalid book ID" });
  // }
  
  try {
    const book = await bookModel.findOne({id});

    if (!book) {  
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// create a new Note
const createBook = async (req: any, res: Response) => {
  const { title, id, description, publication, auther, isbn, content } =
    req.body;
  let emptyFields = [];
  try {
    if (!title) {
      emptyFields.push("title");
    }
    if (!description) {
        emptyFields.push("title");
      }
      if (!content) {
        emptyFields.push("title");
      }
    if (emptyFields.length > 0) {
      res
        .status(400)
        .json({ error: "please insert all empty fields", emptyFields });
    } else {
      const user_id = req.user._id;
      const note = await bookModel.create({title, id, description, publication, auther, isbn, content,user_id  });
      res.status(200).json(note);
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export { createBook, getBooks, getBook };

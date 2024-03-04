import {Request, Response} from "express";
import mongoose from "mongoose";
import noteModels from "../models/noteModels";


// get all Notes
const getNotes = async (req: any, res: Response) => {
    try {
        const user_id = req.user._id
        const notes = await noteModels.find({user_id}).sort({createdAt: -1})
        res.status(200).json(notes)
    } catch (err) {
        console.log('@@err', err)
    }
}

// get a single note
const getNote = async (req: Request, res: Response) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such workout'})
    }
    try {
        const note = await noteModels.findById(id).sort({createdAt: -1})

        if (!note) {
            return res.status(400).json({error: 'No such workout'})
        }
        res.status(200).json(note)
    } catch (err) {
        console.log('@@err', err)
    }
}

// create a new Note
const createNote = async (req: any, res: Response) => {
    const {title, reps, load} = req.body
    let emptyFields = [];
    try {
        if (!title) {
            emptyFields.push('title');
        }
        if (emptyFields.length > 0) {
            res.status(400).json({error: 'please insert all empty fields', emptyFields})
        } else {
            const user_id = req.user._id
            const note = await noteModels.create({title, reps, load, user_id})
            res.status(200).json(note)
        }

    } catch (err) {
        res.status(400).json({error: err})
    }
}

// delete a Note
const deleteNote = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: 'No such workout'})
        }
        const workout = await noteModels.findByIdAndDelete(id)
        res.status(200).json(workout)
    } catch (err) {
        console.log('@@err', err)
    }
}

// update a Note
const updateNote = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const {title, reps, load} = req.body
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: 'No such workout'})
        }
        const workout = await noteModels.findByIdAndUpdate(id, {
            title, reps, load
        })
        if (!workout) {
            res.status(400).json({error: 'No such workout'})
        }else{
            const updatedWorkout = await noteModels.findById(id)
            res.status(200).json(updatedWorkout)
        }
    } catch (err: any) {
        console.log('@@err', err)
    }
}

export {
    createNote,
    getNotes,
    getNote,
    deleteNote,
    updateNote,
}
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNote = exports.deleteNote = exports.getNote = exports.getNotes = exports.createNote = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const noteModels_1 = __importDefault(require("../models/noteModels"));
// get all Notes
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.user._id;
        const notes = yield noteModels_1.default.find({ user_id }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    }
    catch (err) {
        console.log('@@err', err);
    }
});
exports.getNotes = getNotes;
// get a single note
const getNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such workout' });
    }
    try {
        const note = yield noteModels_1.default.findById(id).sort({ createdAt: -1 });
        if (!note) {
            return res.status(400).json({ error: 'No such workout' });
        }
        res.status(200).json(note);
    }
    catch (err) {
        console.log('@@err', err);
    }
});
exports.getNote = getNote;
// create a new Note
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, reps, load } = req.body;
    let emptyFields = [];
    try {
        if (!title) {
            emptyFields.push('title');
        }
        if (emptyFields.length > 0) {
            res.status(400).json({ error: 'please insert all empty fields', emptyFields });
        }
        else {
            const user_id = req.user._id;
            const note = yield noteModels_1.default.create({ title, reps, load, user_id });
            res.status(200).json(note);
        }
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
});
exports.createNote = createNote;
// delete a Note
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'No such workout' });
        }
        const workout = yield noteModels_1.default.findByIdAndDelete(id);
        res.status(200).json(workout);
    }
    catch (err) {
        console.log('@@err', err);
    }
});
exports.deleteNote = deleteNote;
// update a Note
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, reps, load } = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'No such workout' });
        }
        const workout = yield noteModels_1.default.findByIdAndUpdate(id, {
            title, reps, load
        });
        if (!workout) {
            res.status(400).json({ error: 'No such workout' });
        }
        else {
            const updatedWorkout = yield noteModels_1.default.findById(id);
            res.status(200).json(updatedWorkout);
        }
    }
    catch (err) {
        console.log('@@err', err);
    }
});
exports.updateNote = updateNote;

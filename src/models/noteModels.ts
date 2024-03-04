import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema

export interface IWorkout extends Document {
    title: string;
}

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true,
    },
},{timestamps: true})

export default mongoose.model<IWorkout>('Notes',noteSchema)
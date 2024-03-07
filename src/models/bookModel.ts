import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema

export interface Ibooks extends Document {
    title: string;
    id:string;
    description:string;
    publication:string;
    auther:string;
    isbn:string; 
    content:string
}

const bookSchema = new Schema({
    id: {
        type: String,
        required: false
    },
       title: {
        type: String,
        required: true
    },
       description: {
        type: String,
        required: true
    },
       publication: {
        type: String,
        required: false
    },
       auther: {
        type: String,
        required: true
    }, 
      isbn: {
        type: String,
        required: false
    },

    content: {
        type: String,
        required: true
    },

    user_id: {
        type: String,
        required: true,
    },
},{timestamps: true})

export default mongoose.model<Ibooks>('Books',bookSchema)
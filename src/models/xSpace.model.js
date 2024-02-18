import mongoose, { Schema } from "mongoose";

const xSpaceSchema = new Schema({
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    content:{
        type: String,
        required: true
    }
}, {timestamps: true})


export const Xspace = mongoose.model("Xspace", xSpaceSchema)
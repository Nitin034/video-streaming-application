import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema({
    comment:{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    video:{
        type: Schema.Types.ObjectId,
        ref: "video"
    },
    likedBy:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    xspace:{
        type: Schema.Types.ObjectId,
        ref: "xspaces"
    }

}, {timestamps: true})

export const Like = mongoose.model("Like" , likeSchema)
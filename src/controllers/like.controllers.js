import { Like } from "../models/like.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
 


const toggleVideoLike = asyncHandler(async(req, res) => {
    const {videoId} = req.params

    const userId = await req.user._id; 

    const like = await Like.findOne({ video: videoId , likedBy: userId});

    if(subscription){
        await like.remove();
        return res
        .status(200)
        .json(new ApiResponse(200, "Video Disliked"))
    }
    else{
        await Like.create({
            video: videoId,
            likedBy: userId
        });
    }
return res 
.status(200)
.json(new ApiResponse(200 , "Sucess"))
})

const toggleCommentLike = asyncHandler(async(req, res) =>{
    const {commentId} = req.params
    const userId = await req.user._id;

    const like = await Like.findOne({comment: commentId, likedBy: userId})

    if(like){
        await like.remove();
        return res
        .status(200)
        .json(new ApiResponse(200, "Comment Disliked"))
    }
    else{
        await Like.create({
            comment: commentId,
            likedBy: userId
        })
    }
    return res.status(200)
    .json(new ApiResponse(200, "Success"))
})

const toggleXspaceLike = asyncHandler(async(req, res) =>{
    const {xSpaceId} = req.params
    const userId = await req.user._id;

    const like = await Like.findOne({ xspace: xSpaceId, likedBy: userId})

    if(like){
        await like.remove();
        return res
        .status(200)
        .json(new ApiResponse (200, "Xspace Dislike"))
    } else{
        await Like.create({
            xspace: xSpaceId,
            likedBy: userId
        })
    }
    return res.status(200)
    .json(new ApiResponse(200, "Success"))
})

const getVideoLike = asyncHandler(async(req, res) =>{
    const userId = req.user._id;

    const likedVideo = await Like.find({likedBy: userId})
    .populate("video", "_id title description owner views")

    return res
    .status(200).json(
        new ApiResponse(200, "Your Liked Video retrieved", likedVideo)
    )
})

export {toggleVideoLike, toggleCommentLike, toggleXspaceLike, getVideoLike}  
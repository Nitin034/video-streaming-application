import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async(req,  res) => {
 const{page = 1, limit = 10 , query, sortBy, sortType, userId} = req.query;

 const sortOptions= {};
 if(sortBy){
    sortOptions[sortBy] = sortType == "desc"? -1 : 1;
 }
 let basequery = {};
 if(query){
    basequery.
    $or=[
        {
            title:{
                $regex: query,
                $options: "i"
            }
        },{
            description:{
                $regex: query,
                $options: "i"
            }
        }
    ];
 }
 try {
    const result = await Video.aggregate([
        {
            $match:{
                ...basequery,
                owner: new mongoose.Types.ObjectId(userId),
            }
        },{
            $sort: sortOptions,
        },{
            $skip: (page - 1)* limit,
        },{
            $limit: parseInt(limit),
        }
    ]);
    console.log(result)
    return res.status(200).json(new ApiResponse(200, { result }, "Success"));
} catch (e) {
  throw new ApiError(500, e.message);    
 }
})
const postAvideo = asyncHandler(async(req, res)=>{
    const{title, description }= req.body
    // console.log("title:", title)

    if(title === " "){
        throw new ApiError(400, "title field is required")
    }
    const userId = req.user._id   

    const videoFileLocalPath = req.files?.videoFile[0]?.path;
    const thumbnailLocalPath = req.files?.videoFile[0]?.path;
    if(!videoFileLocalPath){
        throw new ApiError(400, "Video File is required")
    }
    if(!thumbnailLocalPath){
        throw new ApiError(400, "Thumbnail File is required")
    }

    const uploadeoncloudinaryvideoFile = await uploadOnCloudinary(videoFileLocalPath)
    const uploadeoncloudinarythumbnailFile = await uploadOnCloudinary(thumbnailLocalPath)

    if(!(uploadeoncloudinaryvideoFile || uploadeoncloudinarythumbnailFile)){
        throw new ApiError(400, "All File is required")
    }

    const videoPublish = await Video.create({
        videoFile: uploadeoncloudinaryvideoFile.url,
        thumbnail: uploadeoncloudinarythumbnailFile.url,
        title,
        description,
        duration: uploadeoncloudinaryvideoFile.duration,
        cloudinaryVideoId: uploadeoncloudinarythumbnailFile.public_id,
        cloudinaryThumbnailId: uploadeoncloudinarythumbnailFile.public_id,
        owner: userId,
         
    })
    

    if(!videoPublish){
        throw new ApiError(500, "Something went wrong while uploding  the video")
    }
    return res.status(201).json(
        new ApiResponse(200, {videoPublish}, "Video uploded successfully" )
    )

});

 

export {postAvideo , getAllVideos}
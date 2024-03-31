 import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


 const toggleSubscription = asyncHandler(async(req, res) => {
    const {channelId} = req.params
    const userId = req.user._id

    const subscribed = await Subsciption.findOne({channel: channelId , Subscriber: userId})

    if(subscribed){
        await Subsciption.remove()
        return res
        .status(200)
        .json(new ApiResponse(200 , "Unsubsciption the channel"))
    }else{
        await subscribed.create({
            channel: channelId,
            Subscriber: userId
        })
    }
    return res
    .status(200)
    .json(new ApiResponse(200, "Success"))
 })

 const getUserSubscription = asyncHandler(async(req, res)=>{
    const {channelId} = req.params
    const userId = req.user._id

    const getsubscribedUser = await Subsciption.find({channel: channelId, Subscriber: userId})

    
 })

 export {toggleSubscription}
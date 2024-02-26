import { Router } from "express";
import {deleteVideo, getAllVideos, getVideoById, postAvideo, togglePostStatus, updateVideo} from "../controllers/video.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/").get(getAllVideos).post(
    upload.fields([
        {
          name: "videoFile",
          maxCount: 1
        },{
            name: "thumbnail",
            maxCount: 1,
        },
        
    ]),
    postAvideo)

    router.route("/:videoId")
     .get(getVideoById)
     .delete(deleteVideo)
     .patch(upload.single("thumbnail"), updateVideo);

     router.route("/toggle/publish/:videoId").patch(togglePostStatus)

export default router
import { Router } from "express";
import {deleteVideo, getAllVideos, postAvideo, updateVideo} from "../controllers/video.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/videos").post(
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

    router.route("/allVideo").get(getAllVideos)
    router.route("/updateVideo").patch(updateVideo)
    router.route("/deleteVideo").post(deleteVideo)

export default router
import { Router } from "express";
import { getVideoLike, toggleCommentLike, toggleVideoLike, toggleXspaceLike } from "../controllers/like.controllers.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"


const router = Router();
router.use(verifyJWT);

router.route("/toggle/v/:videoId").post(toggleVideoLike)
router.route("/toggle/c/:commentId").post(toggleCommentLike);
router.route("/toggle/x/:xSpaceId").post(toggleXspaceLike)
router.report("/videos").get(getVideoLike)

export default router
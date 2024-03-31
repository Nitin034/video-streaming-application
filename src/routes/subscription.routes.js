 import { Router } from "express";
 import { toggleSubscriptio } from "../controllers/subscription.controllers.js";

 const router = Router()

 router.route("/subscribe").post(toggleSubscriptio)

 export default router
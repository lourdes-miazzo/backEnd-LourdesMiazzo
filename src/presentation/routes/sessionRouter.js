import { Router } from "express";
import {login, current, logout, signup, forgetPassword, newPassword} from "../controllers/sessionController.js"
import auth from "../middlewares/auth.js";

const sessionRouter= Router()

sessionRouter.post("/login", login)
sessionRouter.get("/current", auth, current)
sessionRouter.get("/logout", logout)
sessionRouter.post("/signup", signup)
sessionRouter.post("/forgetPassword", forgetPassword)
sessionRouter.post("/newPassword/:token/:email", newPassword)

export default sessionRouter

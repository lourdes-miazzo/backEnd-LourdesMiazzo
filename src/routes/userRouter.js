import { Router } from "express";
import { allUsers, oneUser, saveNewUser, updateUser, deleteUser } from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const userRouter = Router()

userRouter.get("/", allUsers)
userRouter.get("/:uid", oneUser)
userRouter.post("/", saveNewUser) 
userRouter.put("/:uid", updateUser)
userRouter.delete("/:uid", deleteUser)

export default userRouter
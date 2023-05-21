import { Router } from "express";
import { allUsers, oneUser, saveNewUser, updateUser, deleteUser } from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const userRouter = Router()

userRouter.get("/", allUsers)
userRouter.get("/:id", oneUser)
userRouter.post("/", auth, saveNewUser) 
userRouter.put("/:id", updateUser)
userRouter.delete("/:id", deleteUser)

export default userRouter
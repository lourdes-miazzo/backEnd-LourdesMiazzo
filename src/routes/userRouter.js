import { Router } from "express";
import { allUsers, oneUser, saveNewUser, saveCartInUser, updateUser, deleteUser } from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";

const userRouter = Router()

userRouter.get("/", auth, authorization("getUsers"), allUsers)
userRouter.get("/:id", auth, authorization("getUser"), oneUser)
userRouter.post("/", auth, authorization("postUser"), saveNewUser) 
userRouter.post("/:id", auth, authorization("postCartInUser"), saveCartInUser) 
userRouter.put("/:id", auth, authorization("putUser"), updateUser)
userRouter.delete("/:id", auth, authorization("deleteUser"), deleteUser)

export default userRouter
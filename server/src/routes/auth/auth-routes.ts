import express from "express"
import { registerUser,loginUser, logOutUser, checkUser} from "../../controllers/auth/auth-controller.js"
import { authMiddleware } from "../../middlewares/auth.middleware.js"

const router = express.Router()
router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logOutUser)
router.get("/check-auth" , authMiddleware, checkUser)
export {
    router as authRouter
}
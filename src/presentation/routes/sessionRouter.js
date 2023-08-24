import { Router } from 'express';
import { login, current, logout, signup, forgotPassword, newPassword, changePassword, forgotPasswordView } from '../controllers/sessionController.js';
import auth from '../middlewares/auth.js';

const sessionRouter = Router();

sessionRouter.post('/login', login);
sessionRouter.get('/current', auth, current);
sessionRouter.get('/logout', auth, logout);
sessionRouter.post('/signup', signup);
sessionRouter.post('/forgotPassword', forgotPassword);
sessionRouter.get('/resetPassword/:token/:email', forgotPasswordView);
sessionRouter.post('/newPassword', newPassword);
sessionRouter.post('/changePassword', auth, changePassword);


export default sessionRouter;

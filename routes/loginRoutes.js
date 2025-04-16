import express from 'express';
const router1 = express.Router();
// import auth from '../middleware/auth.js';

import loginController from '../controller/loginController.js';
// import homeController from '../controller/homeController.js';

router1.post('/api',loginController);

// router1.get('/home',auth,homeController);
export default router1;
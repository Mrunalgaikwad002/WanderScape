import express from 'express';
import registerController from '../controller/registerController.js';

const router = express.Router();

router.post('/api', registerController);

export default router;

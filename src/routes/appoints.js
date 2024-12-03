import express from 'express';
const appointRouter = express.Router();
import appointsController from '../controllers/appointsController.js';

appointRouter.get('/', appointsController.getAllAppoints);

export default appointRouter;
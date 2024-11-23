import express from 'express';
const doctorRouter = express.Router();
import doctorsController from '../controllers/doctotrsController.js';

// Получение всех пациентов
doctorRouter.get('/', doctorsController.getAllDoctors);

// Добавление нового пациента
// doctorRouter.post('/', doctorsController.createDoctor);

export default doctorRouter;

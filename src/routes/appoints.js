import express from 'express';
const appointRouter = express.Router();
import appointsController from '../controllers/appointsController.js';

// Получение всех пациентов
appointRouter.get('/', appointsController.getAllAppoints);

// Добавление нового пациента
// patientRouter.post('/', patientsController.createPatient);

export default appointRouter;

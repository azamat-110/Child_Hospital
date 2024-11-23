import express from 'express';
const patientRouter = express.Router();
import patientsController from '../controllers/patientController.js';

// Получение всех пациентов
patientRouter.get('/', patientsController.getAllPatients);

// Добавление нового пациента
patientRouter.post('/', patientsController.createPatient);

export default patientRouter;

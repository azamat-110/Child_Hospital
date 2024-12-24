import express from 'express';

const patientRouter = express.Router();
import patientsController from '../controllers/patientController.js';

// Получение всех пациентов
patientRouter.get('/', patientsController.getAllPatients);

// Добавление нового пациента
patientRouter.post('/add-patient', patientsController.createPatient);

//Удаление пациента
patientRouter.delete('/delete-patient/:patientId', patientsController.deletePatient);

export default patientRouter;

import express from 'express';
const router = express.Router();
import patientsController from '../controllers/patientController.js';

// Получение всех пациентов
router.get('/', patientsController.getAllPatients);

// Добавление нового пациента
router.post('/', patientsController.createPatient);

export default router;

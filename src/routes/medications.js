import express from 'express';
const medicationRouter = express.Router();
import medicationsController from '../controllers/medicationsController.js';

// Получение всех пациентов
medicationRouter.get('/', medicationsController.getAllMedications);

// Добавление нового пациента
// medicationRouter.post('/', medicationsController.createMedication);

export default medicationRouter;

import express from 'express';
const prescriptionRouter = express.Router();
import prescriptionsController from "../controllers/prescriptionsController.js";

// Получение всех пациентов
prescriptionRouter.get('/', prescriptionsController.getAllPrescriptions);

// Добавление нового пациента
// patientRouter.post('/', patientsController.createPatient);

export default prescriptionRouter;

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.port || 3001;
import patientRouter from'./src/routes/patients.js';
import doctorRouter from './src/routes/doctors.js';
import medicationRouter from "./src/routes/medications.js";
import prescriptionRouter from "./src/routes/prescriptions.js";
import appointRouter from "./src/routes/appoints.js";

app.use(cors());
app.use(bodyParser.json());
app.use('/api/patients', patientRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/medications', medicationRouter);
app.use('/api/prescriptions', prescriptionRouter);
app.use('/api/appoints', appointRouter);

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
});






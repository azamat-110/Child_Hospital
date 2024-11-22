import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.port || 3001;
import patientRouter from'./src/routes/patients.js';

app.use(cors());
app.use(bodyParser.json());
app.use('/api/patients', patientRouter);


app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})







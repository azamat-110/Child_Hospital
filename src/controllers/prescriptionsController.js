import {executeQuery} from '../models/database.js';

const getAllPrescriptions = async (req, res) => {
    try {
        const result = await executeQuery('SELECT * FROM PRESCRIPTIONS');
        res.json(result.rows);
    } catch (err) {
        console.log(err);
    }
}


export default {getAllPrescriptions};

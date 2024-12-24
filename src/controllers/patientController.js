import {executeQuery} from '../models/database.js';
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const getAllPatients = async (req, res) => {
    try {
        const result = await executeQuery('SELECT * FROM PATIENTS ORDER BY PATIENT_ID');
        console.log(result);
        res.json(result.rows);
    } catch (err) {
        console.log(err);
    }
}

const createPatient = async (req, res) => {
    const {email, fullName, phoneNumber, dateOfBirth, gender, disabilityStatus} = req.body;


    if (!email || !fullName || !phoneNumber || !dateOfBirth || !gender || !disabilityStatus) {
        return res.status(400).json({message: 'Заполните все обязательные поля'});
    }

    try {
        const defaultPassword = '12345678';
        const hashedPassword = await bcrypt.hash(defaultPassword, SALT_ROUNDS);
        const defaultRoleId = 3;

        await executeQuery('BEGIN');

        const getMaxPatientIdQuery = `SELECT NVL(MAX(PATIENT_ID), 0) + 1 AS NEW_ID FROM PATIENTS`;
        const maxResult = await executeQuery(getMaxPatientIdQuery);
        const newPatientId = maxResult.rows[0].NEW_ID;

        const getMaxUserIdQuery = `SELECT NVL(MAX(USER_ID), 0) + 1 AS NEW_ID FROM USERS`;
        const maxUserRes = await executeQuery(getMaxUserIdQuery);
        const newUserId = maxUserRes.rows[0].NEW_ID;

        const insertUserQuery = `
            INSERT INTO USERS (USER_ID, EMAIL, PASSWORD, ROLE_ID)
            VALUES (:newUserId, :email, :password, :roleId)
        `;
        await executeQuery(insertUserQuery, {
            newUserId: newUserId,
            email: email,
            password: hashedPassword,
            roleId: defaultRoleId,
        });

        const insertPatientQuery = `
                INSERT INTO PATIENTS 
                (PATIENT_ID, FULL_NAME, EMAIL, CONTACT_INFO, DATE_OF_BIRTH, GENDER, DISABILITY_TYPE) 
                VALUES 
                (:newPatientId, :fullName, :email, :phoneNumber, :dateOfBirth, :gender, :disabilityStatus)
        `;

        await executeQuery(insertPatientQuery, {
            newPatientId: {val: newPatientId},
            fullName: {val: fullName},
            email: {val: email},
            phoneNumber: {val: phoneNumber},
            dateOfBirth: {val: dateOfBirth},
            gender: {val: gender},
            disabilityStatus: {val: disabilityStatus}
        });

        await executeQuery('COMMIT');

        res.status(201).json({message: 'Пациент успешно добавлен', defaultPassword});
    } catch (error) {
        console.error('Ошибка базы данных:', error);
        await executeQuery('ROLLBACK');
        res.status(500).json({message: 'Ошибка сервера'});
    }
};

const deletePatient = async (req, res) => {
    const {patientId} = req.params;
    if (!patientId) {
        return res.status(400).json({message: 'Не указан идентификатор пациента'});
    }
    try {
        await executeQuery('BEGIN');
        const deletePatientQuery = `
            DECLARE v_email USERS.EMAIL%TYPE;
                BEGIN
            SELECT EMAIL INTO v_email FROM PATIENTS WHERE PATIENT_ID = :patientId;
            DELETE FROM USERS WHERE EMAIL = v_email;
            DELETE FROM PATIENTS WHERE PATIENT_ID = :patientId;
                END;`
        await executeQuery(deletePatientQuery, {patientId: patientId});
        await executeQuery('COMMIT');
        res.status(200).json({message: 'Пациент успешно удалён'});
    } catch (error) {
        console.error('Ошибка базы данных при удалении:', error);
        await executeQuery('ROLLBACK');
        res.status(500).json({message: 'Ошибка сервера при удалении пациента'});
    }
}

export default {getAllPatients, createPatient, deletePatient};
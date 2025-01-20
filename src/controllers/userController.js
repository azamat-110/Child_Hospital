import bcrypt from 'bcrypt';
import {executeQuery} from '../models/database.js';

// Регистрация пользователя
const registerUser = async (req, res) => {
    const {email, password, role} = req.body;

    // Проверка, что роль допустимая
    if (!['patient', 'doctor', 'admin'].includes(role)) {
        return res.status(400).send('Invalid role.');
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await executeQuery(
            'INSERT INTO users (email, password, role) VALUES (:email, :password, :role)',
            {email, password: hashedPassword, role}
        );
        res.status(201).send('User registered');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
};

// Удаление пользователя
const deleteUser = async (req, res) => {
    const {userId} = req.params;

    try {
        await executeQuery('DELETE FROM users WHERE user_id = :userId', {userId});
        res.status(200).send('User deleted');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting user');
    }
};

//Получение данных пользователя
const getUserInfo = async (req, res) => {
    const {userId} = req.params;

    try {
        const result = await executeQuery(
            'SELECT * FROM PATIENTS WHERE PATIENT_ID = :userId', {userId});
        res.status(200).json(result.rows);
    } catch {
        res.status(500).send('Error getting data');
    }
}

export default {registerUser, deleteUser, getUserInfo};
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { executeQuery } from '../models/database.js'; // Импорт функции
import { checkRole } from '../middleware/authMiddleware.js';

const router = express.Router();
const JWT_SECRET = 'your-secret-key';
const SALT_ROUNDS = 10; // Для хеширования пароля

// Маршрут для входа
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Введите email и пароль' });
    }

    try {
        const query = 'SELECT * FROM USERS WHERE EMAIL = :email';
        const result = await executeQuery(query, { email });

        if (!result.rows || result.rows.length === 0) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.PASSWORD);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Неверный пароль' });
        }

        const token = jwt.sign(
            { userId: user.USER_ID, roleId: user.ROLE_ID }, // Используем role_id
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, roleId: user.ROLE_ID });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Маршрут для регистрации
router.post('/register', async (req, res) => {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
        return res.status(400).json({ message: 'Введите полное имя, email и пароль' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const defaultRoleId = 3;
        await executeQuery('BEGIN');

        const getMaxPatientIdQuery = `SELECT NVL(MAX(PATIENT_ID), 0) + 1 AS NEW_ID FROM PATIENTS`;
        const maxResult = await executeQuery(getMaxPatientIdQuery);
        const newPatientId = maxResult.rows[0].NEW_ID;

        const insertUserQuery = `
            INSERT INTO USERS (USER_ID, EMAIL, PASSWORD, ROLE_ID) 
            VALUES (USERS_SEQ.NEXTVAL, :email, :password, :roleId)
        `;
        await executeQuery(insertUserQuery, {
            email,
            password: hashedPassword,
            roleId: defaultRoleId,
        });

        const insertPatientQuery = `
            INSERT INTO PATIENTS (PATIENT_ID, FULL_NAME, EMAIL) 
            VALUES (:newPatientId, :fullName, :email)
        `;
        await executeQuery(insertPatientQuery, {
            newPatientId,
            fullName,
            email,
        });

        await executeQuery('COMMIT');

        res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (error) {
        console.error('Ошибка базы данных:', error);
        await executeQuery('ROLLBACK');
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

router.get('/admin', checkRole(['admin']), (req, res) => {
    res.json({ message: 'Добро пожаловать в админку!' });
});

router.post("/update-role", checkRole(["admin"]), async (req, res) => {
    const { email, newRoleId } = req.body;

    try {
        const updateRoleQuery = "UPDATE USERS SET ROLE_ID = :newRoleId WHERE EMAIL = :email";
        await executeQuery(updateRoleQuery, { email, newRoleId });

        // Логика изменения пациента на доктора
        if (newRoleId === 2) {
            const transferQuery = `
        INSERT INTO DOCTORS (DOCTOR_ID, FULL_NAME, EMAIL)
        SELECT PATIENTS_SEQ.NEXTVAL, FULL_NAME, EMAIL FROM PATIENTS WHERE EMAIL = :email;
        DELETE FROM PATIENTS WHERE EMAIL = :email;
      `;
            await executeQuery(transferQuery, { email });
        }

        res.json({ message: "Роль успешно обновлена" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

export default router;

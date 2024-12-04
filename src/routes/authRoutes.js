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
        const user = result.rows[0];
        console.log(user);  // Выведет найденного пользователя

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        const passwordMatch = await bcrypt.compare(password, user.PASSWORD);
        console.log(password, user.PASSWORD, passwordMatch);
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
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ message: 'Заполните email, пароль и роль' });
    }

    try {
        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Получаем role_id на основе роли
        const roleQuery = 'SELECT ROLE_ID FROM ROLES WHERE ROLE_NAME = :role';
        const roleResult = await executeQuery(roleQuery, { role });
        const roleId = roleResult.rows[0]?.ROLE_ID;

        if (!roleId) {
            return res.status(400).json({ message: 'Неверная роль' });
        }

        // Вставляем пользователя в базу
        const insertQuery = `
            INSERT INTO USERS (USER_ID, EMAIL, PASSWORD, ROLE_ID) 
            VALUES (USERS_SEQ.NEXTVAL, :email, :password, :roleId)
        `;

        await executeQuery(insertQuery, {
            email,
            password: hashedPassword,
            roleId, // Используем roleId
        });

        // Подтверждаем изменения
        await executeQuery('COMMIT');

        res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (error) {
        console.error('Ошибка базы данных:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

router.get('/admin', checkRole(['admin']), (req, res) => {
    res.json({ message: 'Добро пожаловать в админку!' });
});

export default router;
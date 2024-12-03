import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {executeQuery} from '../models/database.js';

const router = express.Router();
const JWT_SECRET = 'your-secret-key';
const SALT_ROUNDS = 10;

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({message: 'Введите email и пароль'});
    }

    try {
        const query = 'SELECT * FROM USERS WHERE EMAIL = :email';
        const result = await executeQuery(query, {email});
        const user = result.rows[0];
        console.log(user);

        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден'});
        }

        const passwordMatch = await bcrypt.compare(password, user.PASSWORD);
        console.log(password, user.PASSWORD, passwordMatch);
        if (!passwordMatch) {
            return res.status(401).json({message: 'Неверный пароль'});
        }

        const token = jwt.sign(
            {userId: user.USER_ID, role: user.ROLE},
            JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.json({token, role: user.ROLE});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Ошибка сервера'});
    }
});

router.post('/register', async (req, res) => {
    const {email, password, role} = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({message: 'Заполните email, пароль и роль'});
    }
    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const insertQuery = `
            INSERT INTO USERS (USER_ID, EMAIL, PASSWORD, ROLE) 
            VALUES (USERS_SEQ.NEXTVAL, :email, :password, :role)
        `;
        await executeQuery(insertQuery, {
            email,
            password: hashedPassword,
            role,
        });
        await executeQuery('COMMIT');
        res.status(201).json({message: 'Пользователь успешно зарегистрирован'});
    } catch (error) {
        console.error('Ошибка базы данных:', error);
        res.status(500).json({message: 'Ошибка сервера'});
    }
});


export default router;

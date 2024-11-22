const oracledb = require('oracledb');

// Конфигурация подключения к базе данных Oracle
const dbConfig = {
    user: 'C##AUTODEALERSHIP',  // замените на ваш пользователь
    password: 'auto1234',       // замените на ваш пароль
    connectString: 'localhost:1521/ORCLCDB', // строка подключения (проверьте правильность)
};

async function getDataFromDB() {
    let connection;

    try {
        // Устанавливаем соединение с базой данных
        connection = await oracledb.getConnection(dbConfig);

        // Выполняем SQL-запрос
        const result = await connection.execute('SELECT * FROM HODIM', [], {
            outFormat: oracledb.OUT_FORMAT_OBJECT, // результат в виде объекта
        });

        // Проверяем наличие данных
        if (result.rows.length === 0) {
            console.log('Данные не найдены');
            return;
        }

        // Выводим данные
        console.log(result.rows);  // Массив объектов с результатами запроса
    } catch (err) {
        console.error('Ошибка подключения или выполнения запроса:', err);
    } finally {
        // Закрываем соединение
        if (connection) {
            try {
                await connection.close();
            } catch (closeErr) {
                console.error('Ошибка при закрытии соединения:', closeErr);
            }
        }
    }
}

// Вызов функции для получения данных
getDataFromDB();
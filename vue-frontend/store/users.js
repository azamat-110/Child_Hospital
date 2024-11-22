export const getUsers = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/hodim'); // Тот же URL
        if (!response.ok) {
            throw new Error('Ошибка HTTP: ' + response.status);
        }
        return await response.json(); // Возвращаем JSON
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
};

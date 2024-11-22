<script setup lang="js">
import { ref, onMounted } from 'vue';

const users = ref([]);

const loadUsers = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/patients'); // Запрос к серверу
    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
    users.value = await response.json(); // Получаем данные
    console.log(users.value); // Проверка данных
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
};

onMounted(() => {
  loadUsers(); // Загружаем данные при монтировании компонента
});
</script>

<template>
  <div>
    <h1>Users Data</h1>

    <div class="name" v-for="item in users" :key="item.id">
      <div>{{ item.NAME }}</div>
    </div>
    <p></p>
  </div>
</template>


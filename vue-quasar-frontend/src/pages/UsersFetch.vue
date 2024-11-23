<script setup>
import {ref, onMounted} from 'vue';

const users = ref([]);

const loadUsers = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/appoints');
    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
    users.value = await response.json();
    console.log(users.value);
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);

  }
};

onMounted(() => {
  loadUsers();
});
</script>

<template>
  <div>

  </div>
</template>


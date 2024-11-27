<script setup>
import {ref, onMounted} from 'vue';
import apiClient from 'src/api'; // Импортируем наш Axios клиент
import DoctorCard from 'components/DoctorCard.vue';

const doctors = ref([]);
const loading = ref(false);
const error = ref(null);

const loadDoctors = async () => {
  loading.value = true;
  try {
    const response = await apiClient.get('/doctors'); // GET запрос
    doctors.value = response.data; // Данные из API
    console.log(doctors.value);
  } catch (err) {
    error.value = 'Ошибка при загрузке врачей: ' + err.message;
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadDoctors();
});
</script>

<template>
  <div class="q-pa-md">
    <div v-if="loading">Loading doctors...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="row q-col-gutter-md">
      <div class="col-xs-12 col-sm-6 col-md-4" v-for="doctor in doctors" :key="doctor.DOCTOR_ID">
        <DoctorCard :doctor="doctor"/>
      </div>
    </div>
  </div>
</template>

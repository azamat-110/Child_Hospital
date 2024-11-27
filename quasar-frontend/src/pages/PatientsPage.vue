<script setup>
import { ref, onMounted } from 'vue';
import apiClient from 'src/api'; // Импортируем наш Axios клиент
import PatientsCard from 'components/PatientsCard.vue';

const patients = ref([]);
const loading = ref(false);
const error = ref(null);

const loadPatients = async () => {
  loading.value = true;
  try {
    const response = await apiClient.get('/patients'); // GET запрос
    patients.value = response.data; // Данные из API
    console.log(patients.value);
  } catch (err) {
    error.value = 'Ошибка при загрузке пациентов: ' + err.message;
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadPatients();
});
</script>

<template>
  <div class="q-pa-md">
    <div v-if="loading">Loading patients...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="row q-col-gutter-md">
      <div class="col-xs-12 col-sm-6 col-md-4" v-for="patient in patients" :key="patient.PATIENT_ID">
        <PatientsCard :patient="patient" />
      </div>
    </div>
  </div>
</template>

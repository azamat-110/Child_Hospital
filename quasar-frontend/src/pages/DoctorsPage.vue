<script setup>
import { ref, onMounted } from "vue";
import apiClient from "src/api"; // Axios клиент
import DoctorCard from "components/DoctorCard.vue";
import { QSpinner, QBtn } from "quasar";

const doctors = ref([]); // Все данные из базы
const displayedDoctors = ref([]); // Карточки для отображения
const loading = ref(false);
const error = ref(null);
const itemsPerPage = 8; // Количество карточек за раз
const currentPage = ref(0); // Текущая страница

// Загрузка данных врачей
const loadDoctors = async () => {
  loading.value = true;
  try {
    const response = await apiClient.get("/doctors");
    doctors.value = response.data; // Все данные врачей
    updateDisplayedDoctors(); // Инициализация первых карточек
  } catch (err) {
    error.value = "Ошибка при загрузке врачей: " + err.message;
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const updateDisplayedDoctors = () => {
  const start = currentPage.value * itemsPerPage;
  const end = start + itemsPerPage;
  displayedDoctors.value = doctors.value.slice(0, end);
};

const loadMore = () => {
  currentPage.value++;
  updateDisplayedDoctors();
};

onMounted(() => {
  loadDoctors();
});
</script>

<template>
  <div class="doctors-page">
    <div class="page-header">
      <h1>Our Doctors</h1>
      <p class="subtitle ">Meet the professionals who care about your health</p>
    </div>

    <div class="content-container">
      <q-spinner v-if="loading" size="40px" color="primary" class="loading-spinner" />

      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>

      <div v-else>
        <div class="doctors-grid">
          <div v-for="doctor in displayedDoctors" :key="doctor.DOCTOR_ID" class="doctor-card">
            <DoctorCard :doctor="doctor" />
          </div>
        </div>

        <q-btn
          v-if="displayedDoctors.length < doctors.length"
          label="Load More..."
          color="primary"
          outline
          class="load-more-btn"
          @click="loadMore"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.doctors-page {
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 4rem;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #1f2b6c;
  margin: 0;
}

.page-header .subtitle {
  font-size: 1rem;
  color: #555;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-spinner {
  margin-top: 3rem;
}

.error-message {
  text-align: center;
  font-size: 1.2rem;
  color: red;
  margin-top: 2rem;
}

.doctors-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 карточки в ряду */
  gap: 1.5rem;
  width: 100%;
}

.doctor-card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.doctor-card:hover {
  transform: translateY(-5px); /* Легкое поднятие карточки */
}

.load-more-btn {
  margin-top: 2rem;
}
</style>

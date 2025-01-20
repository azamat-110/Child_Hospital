<script setup>
import { ref, computed, watch, onMounted } from "vue";
import DoctorCard from "components/DoctorCard.vue";
import { QSpinner, QBtn, useQuasar } from "quasar";
import { useDataStore } from "stores/dataStore";
import { useAuthStore } from "stores/authStore";

const authStore = useAuthStore();

onMounted(() => {
  authStore.initialize();
});

const dataStore = useDataStore();
const doctors = computed(() => dataStore.doctors);
const loading = computed(() => dataStore.loading);
const error = computed(() => dataStore.error);
const displayedDoctors = ref([]);
const itemsPerPage = 8;
const currentPage = ref(0);
const $q = useQuasar();
const isDarkMode = computed(() => $q.dark.isActive);

const updateDisplayedDoctors = () => {
  const start = currentPage.value * itemsPerPage;
  const end = start + itemsPerPage;
  displayedDoctors.value = doctors.value.slice(0, end);
};

updateDisplayedDoctors();

watch(doctors, () => {
  updateDisplayedDoctors();
});

const loadMore = () => {
  currentPage.value++;
  updateDisplayedDoctors();
};
</script>

<template>
  <div class="doctors-page">
    <div class="page-header">
      <h2 :class="{ dark__title: isDarkMode }" class="q-pl-xl">Doctors</h2>
    </div>

    <div class="content-container">
      <q-spinner
        v-if="loading"
        size="40px"
        color="primary"
        class="loading-spinner"
      />

      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>

      <div v-else style="transform: scale(0.9)">
        <div class="doctors__grid">
          <div
            v-for="doctor in displayedDoctors"
            :key="doctor.DOCTOR_ID"
            class="doctor-card"
          >
            <DoctorCard :doctor="doctor" />
          </div>
        </div>

        <q-btn
          v-if="displayedDoctors.length < doctors.length"
          label="Load More..."
          :color="isDarkMode ? 'white' : 'primary'"
          outline
          class="load-more-btn"
          @click="loadMore"
          rounded
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
}

.page-header h2 {
  font-size: 2rem;
  font-weight: bold;
  color: #000000;
  text-align: left;
  margin: 0;
  padding-top: 1rem;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -1rem;
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

.doctors__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 карточки в ряду */
  gap: 1.5rem;
  width: 100%;
  opacity: 0;
  transform: translateY(-30px);
  animation: showCards 1s ease-out forwards;
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

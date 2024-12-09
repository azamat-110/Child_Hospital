<script setup>
import { computed } from 'vue';
import {useDataStore} from "stores/dataStore";
import {useAuthStore} from "stores/authStore";

const authStore = useAuthStore();
authStore.initialize();

const dataStore = useDataStore();
const medications = computed(() => dataStore.medications);

</script>

<template>
  <div class="medications-page q-pa-md">
    <h2 class="text-h4 text-center q-mb-lg medication__title">Available Medications</h2>

    <div class="medication-grid">
      <div
        v-for="medication in medications"
        :key="medication.MEDICATION_ID"
        class="medication-card"
      >
        <div class="medication-image-container">
          <div class="medication-image"></div>
        </div>
        <div class="medication-info">
          <h3 class="medication-name">{{ medication.NAME }}</h3>
          <p class="medication-dosage">Dosage: {{ medication.DOSAGE }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.medication__title{
  font-size: 2rem;
  font-weight: bold;
  color: #1f2b6c;
  line-height: 4rem;
  margin-top: 0;
}
.medications-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #f5f7fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 2.2rem;
  font-weight: bold;
  color: #1f2b6c;
  margin-bottom: 2rem;
}

.medication-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.medication-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  overflow: hidden;
}

.medication-card:hover {
  transform: translateY(-5px);
}

/* Контейнер для изображения */
.medication-image-container {
  height: 150px;
  background-color: #e6e9f1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.medication-image {
  height: 100%;
  width: 100%;
  object-fit: contain;
  background: url('../assets/images/medicationImg.jpg');
  background-size: cover;
}



/* Информация о медикаменте */
.medication-info {
  padding: 1rem;
}

.medication-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #1f2b6c;
  margin-bottom: 0.5rem;
}

.medication-dosage {
  font-size: 1rem;
  color: #555555;
}
</style>

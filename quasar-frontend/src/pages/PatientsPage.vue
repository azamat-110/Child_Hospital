<script setup>
import { ref, computed } from "vue";
import PatientsCard from "components/PatientsCard.vue";
import { useDataStore } from "stores/dataStore";
import { useAuthStore } from "stores/authStore";
import AddPatient from "components/AddPatient.vue";
import DeletePatient from "components/DeletePatient.vue";

const authStore = useAuthStore();
authStore.initialize();

const isListView = ref(true);
const currentPage = ref(1);
const itemsPerPage = ref(8);
const openModal = ref(false);
const searchQuery = ref(""); // Поле для поиска

const dataStore = useDataStore();
const patients = computed(() => dataStore.patients);
const loading = computed(() => dataStore.loading);
const error = computed(() => dataStore.error);

const toggleView = () => {
  isListView.value = !isListView.value;
};

const filteredPatients = computed(() => {
  if (!searchQuery.value) return patients.value;
  return patients.value.filter((patient) =>
    patient.FULL_NAME.toLowerCase().includes(searchQuery.value)
  );
});

const paginatedPatients = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredPatients.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredPatients.value.length / itemsPerPage.value)
);

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
console.log();

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<template>
  <div class="patients-page">
    <AddPatient
      :openModal="openModal"
      :model-value="openModal"
      @update:model-value="openModal = $event"
    />
    <div class="page-header">
      <q-input
        outlined
        dense
        clearable
        class="search-input"
        placeholder="Search by name..."
        v-model="searchQuery"
        style="width: 300px; margin-top: 1rem"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <h1>Patients List</h1>
      <p class="subtitle">Data of patients</p>
      <q-btn
        v-if="authStore.role === 1"
        class="add-patient-btn"
        icon="add"
        label="Add Patient"
        color="primary"
        outline
        @click="openModal = true"
      />
      <q-btn
        class="toggle-view-btn"
        icon="swap_horiz"
        label="Toggle View"
        color="primary"
        flat
        @click="toggleView"
      />
    </div>
    <div class="q-pa-md">
      <div v-if="loading" class="loading-spinner">
        <q-spinner color="primary" size="50px" />
        <p>Загрузка пациентов...</p>
      </div>

      <div v-else-if="error" class="error-box">
        {{ error }}
      </div>

      <div v-else>
        <div v-if="filteredPatients.length === 0" class="no-results">
          <p>Нет результатов для поиска "{{ searchQuery }}".</p>
        </div>

        <transition-group
          v-else
          name="list"
          tag="ul"
          class="patients-container"
          :class="{ 'list-view': isListView }"
          :style="!isListView ? 'gap:2rem;' : ''"
        >
          <div
            v-for="patient in paginatedPatients"
            :key="patient.PATIENT_ID"
            class="patient-wrapper"
          >
            <PatientsCard v-if="!isListView" :patient="patient" />
            <div v-else class="patient-list-item">
              <div class="patient-list-content">
                <div style="display: flex; align-items: flex-start">
                  <div class="patient-details q-pl-md">
                    <span class="patient-number">{{ patient.PATIENT_ID }}</span>
                    <div class="patient-info">
                      <p><strong>Full Name:</strong> {{ patient.FULL_NAME }}</p>
                      <p>
                        <strong>Date of Birth:</strong>
                        {{ patient.DATE_OF_BIRTH }}
                      </p>
                    </div>
                    <q-list dense style="display: flex">
                      <q-item>
                        <q-item-section side>
                          <q-icon
                            :name="
                              patient.GENDER === 'Мужской' ? 'man' : 'woman'
                            "
                          />
                        </q-item-section>
                        <q-item-section>{{ patient.GENDER }}</q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section side>
                          <q-icon name="phone" />
                        </q-item-section>
                        <q-item-section>{{
                          patient.CONTACT_INFO
                        }}</q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section side>
                          <q-icon name="accessible" />
                        </q-item-section>
                        <q-item-section>{{
                          patient.DISABILITY_TYPE || "None"
                        }}</q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                </div>
                <q-card-actions align="right" class="q-pr-md">
                  <q-btn flat label="More" color="primary" icon="info" />
                  <DeletePatient
                    :patientId="patient.PATIENT_ID"
                    v-if="authStore.role === 1"
                  />
                </q-card-actions>
              </div>
            </div>
          </div>
        </transition-group>

        <div
          v-if="filteredPatients.length > itemsPerPage"
          class="pagination-controls"
        >
          <q-btn
            flat
            icon="chevron_left"
            label="Prev"
            color="primary"
            :disable="currentPage === 1"
            @click="prevPage"
          />
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <q-btn
            flat
            icon="chevron_right"
            label="Next"
            color="primary"
            :disable="currentPage === totalPages"
            @click="nextPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.no-results {
  text-align: center;
  padding: 1rem;
  font-size: 1.2rem;
  color: #999;
}

.search-input {
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  left: 2rem;
  top: 1rem;
}

.patients-container .patient-wrapper {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.patient-wrapper.hidden {
  opacity: 0;
  transform: scale(0.9);
  pointer-events: none;
}

.pagination-controls {
  padding-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.patients-page {
  max-width: 1300px;
  margin: 0 auto;
  padding: 1rem;
}

.patient-info {
  min-width: 300px;

  & p:nth-child(1) {
    margin-bottom: 0 !important;
  }

  & p:nth-child(2) {
    margin-top: 0 !important;
  }
}

.page-header {
  text-align: center;
  position: relative;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #1f2b6c;
  margin: 0;
  line-height: 4rem;
}

.page-header .subtitle {
  font-size: 1rem;
  padding: 0;
  margin: 0;
  color: #888;
}

.toggle-view-btn {
  position: absolute;
  top: 10px;
  right: 1rem;
}

.add-patient-btn {
  position: absolute;
  top: 50px;
  right: 1rem;
}

.patients-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0;
}

.patients-container.list-view {
  display: flex;
  flex-direction: column;
}

.patient-wrapper {
  display: flex;
  justify-content: center;
}

.patient-list-item {
  background: linear-gradient(to bottom right, #e3f2fd, #a5d8ff);
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 1rem;
  //padding: 1rem;
  transition: box-shadow 0.2s;
  width: 100%;
}

.patient-list-item:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.patient-list-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.patient-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2b6c;
  margin-right: 1rem;
  padding-left: 1rem;
}

.patient-details {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;

  & p {
    font-size: 1rem;
    margin: 0.5rem 0;
    color: #1f2b6c;
  }
}

.patient-details p strong {
  font-weight: bold;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #1f2b6c;
}

.loading-spinner p {
  margin-top: 0.5rem;
  font-size: 1.1rem;
}

.error-box {
  padding: 1rem;
  background: #ffebee;
  border: 1px solid #f44336;
  color: #d32f2f;
  text-align: center;
  border-radius: 8px;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

/* убедитесь, что удаляющиеся элементы выведены из потока, чтобы
анимации перемещения могли быть рассчитаны правильно. */
.list-leave-active {
  position: absolute;
}
</style>

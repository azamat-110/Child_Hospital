<script setup>
import { onMounted, computed, ref } from "vue";
import { useDataStore } from "stores/dataStore";
import { useAuthStore } from "stores/authStore";
import AddPrescription from "components/AddPrescription.vue";
import { useQuasar } from "quasar";

const authStore = useAuthStore();
authStore.initialize();
const $q = useQuasar();
const isDarkMode = computed(() => $q.dark.isActive);

const dataStore = useDataStore();
const groupedPrescriptions = computed(() => dataStore.groupedPrescriptions);

const openModal = ref(false);

onMounted(() => {
  dataStore.loadAllData();
});
</script>

<template>
  <div class="prescriptions-page q-pa-md" :class="{ dark: isDarkMode }">
    <h2
      class="text-h5 text-center prescipt__title"
      :class="{ dark__title: isDarkMode }"
    >
      Prescriptions by Doctor
    </h2>
    <AddPrescription
      :openModal="openModal"
      :model-value="openModal"
      @update:model-value="openModal = $event"
    />
    <q-btn
      icon="add_circle"
      label="Add prescription"
      :color="isDarkMode ? 'white' : 'primary'"
      @click="openModal = true"
      class="add__prescription-btn"
      outline
    />
    <div class="timeline">
      <div
        v-for="(prescriptions, doctorName) in groupedPrescriptions"
        :key="doctorName"
        class="doctor-group"
      >
        <div class="doctor-divider">
          <div
            class="divider-line"
            :style="isDarkMode ? 'background: #fff' : ''"
          ></div>
          <div
            class="doctor-name"
            :class="{
              dark: isDarkMode,
              dark__shadow: isDarkMode,
              dark__title: isDarkMode,
            }"
          >
            {{ doctorName }}
          </div>
          <div
            class="divider-line"
            :style="isDarkMode ? 'background: #fff' : ''"
          ></div>
        </div>

        <div class="prescriptions-list">
          <div
            v-for="prescription in prescriptions"
            :key="prescription.PRESCRIPTION_ID"
            class="prescription-item"
            :class="{ dark: isDarkMode, dark__shadow: isDarkMode }"
          >
            <div class="prescription-details">
              <div>
                <p><strong>Patient:</strong> {{ prescription.PATIENT_NAME }}</p>
                <p>
                  <strong>Prescribed on:</strong>
                  {{ prescription.DATE_PRESCRIBED }}
                </p>
              </div>
              <q-chip
                color="primary"
                outline
                class="q-my-sm full-height text-subtitle2"
                :class="{ dark__title: isDarkMode }"
              >
                {{ prescription.INSTRUCTIONS }}
              </q-chip>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.add__prescription-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  margin-top: 1rem;
}

.prescription-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  & div {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    & p {
      margin-bottom: 0;
      font-size: 1rem;
    }
  }
}

.prescipt__title {
  font-size: 2rem;
  font-weight: bold;
  color: #1f2b6c;
  line-height: 4rem;
  margin-top: 0;
  margin-bottom: 1rem;
}

.prescriptions-page {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f5f7fa;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

h2 {
  font-size: 2.2rem;
  font-weight: bold;
  color: #1f2b6c;
  margin-bottom: 2rem;
}

.timeline {
  padding-left: 1.5rem;
}

.doctor-group {
  margin-bottom: 3rem;
}

.doctor-divider {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.divider-line {
  flex: 1;
  height: 2px;
  background-color: #1f2b6c;
  margin: 0 1rem;
}

.doctor-name {
  font-size: 1.4rem;
  font-weight: bold;
  color: #1f2b6c;
  background-color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.prescriptions-list {
  margin-top: 1rem;
}

.prescription-item {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-left: 4px solid #1f2b6c;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  position: relative;
}

.prescription-item:hover {
  transform: translateY(-5px);
  transition: 0.3s ease;
}

.prescription-item::before {
  content: "";
  position: absolute;
  left: -10px;
  top: 1rem;
  width: 12px;
  height: 12px;
  background-color: #1f2b6c;
  border-radius: 50%;
}
</style>

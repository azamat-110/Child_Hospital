<script setup>
import {ref, onMounted} from 'vue';
import apiClient from 'src/api';

const prescriptions = ref([]);
const patients = ref([]);
const doctors = ref([]);

const groupedPrescriptions = ref({});

const loadPrescriptions = async () => {
  try {
    const [prescriptionsRes, patientsRes, doctorsRes] = await Promise.all([
      apiClient.get('/prescriptions'),
      apiClient.get('/patients'),
      apiClient.get('/doctors')
    ]);

    prescriptions.value = prescriptionsRes.data;
    patients.value = patientsRes.data;
    doctors.value = doctorsRes.data;

    prescriptions.value.forEach(prescription => {
      const patient = patients.value.find(p => p.PATIENT_ID === prescription.PATIENT_ID);
      const doctor = doctors.value.find(d => d.DOCTOR_ID === prescription.DOCTOR_ID);

      const groupKey = doctor ? doctor.FULL_NAME : 'Unknown Doctor';

      if (!groupedPrescriptions.value[groupKey]) {
        groupedPrescriptions.value[groupKey] = [];
      }

      groupedPrescriptions.value[groupKey].push({
        ...prescription,
        PATIENT_NAME: patient ? patient.FULL_NAME : 'Unknown Patient',
        DOCTOR_NAME: groupKey
      });
    });
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
  }
};

onMounted(() => {
  loadPrescriptions();
});
</script>

<template>
  <div class="prescriptions-page q-pa-md">
    <h2 class="text-h5 text-center prescipt__title">Prescriptions by Doctor</h2>

    <div class="timeline">
      <div
        v-for="(prescriptions, doctorName) in groupedPrescriptions"
        :key="doctorName"
        class="doctor-group"
      >
        <!-- Разделитель между группами -->
        <div class="doctor-divider">
          <div class="divider-line"></div>
          <div class="doctor-name">{{ doctorName }}</div>
          <div class="divider-line"></div>
        </div>

        <div class="prescriptions-list">
          <div
            v-for="prescription in prescriptions"
            :key="prescription.PRESCRIPTION_ID"
            class="prescription-item"
          >
            <div class="prescription-details">
              <div>
                <p><strong>Patient:</strong> {{ prescription.PATIENT_NAME }}</p>
                <p><strong>Prescribed on:</strong> {{ prescription.DATE_PRESCRIBED }}</p>
              </div>
              <q-chip color="primary" outline class="q-my-sm full-height text-subtitle2">
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

/* Общий стиль страницы */
.prescriptions-page {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f5f7fa;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Заголовок */
h2 {
  font-size: 2.2rem;
  font-weight: bold;
  color: #1f2b6c;
  margin-bottom: 2rem;
}

/* Лента рецептов */
.timeline {
  padding-left: 1.5rem;
}

/* Группа докторов */
.doctor-group {
  margin-bottom: 3rem;
}

/* Разделитель между докторами */
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

/* Список рецептов */
.prescriptions-list {
  margin-top: 1rem;
}

/* Карточка рецепта */
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
  content: '';
  position: absolute;
  left: -10px;
  top: 1rem;
  width: 12px;
  height: 12px;
  background-color: #1f2b6c;
  border-radius: 50%;
}
</style>

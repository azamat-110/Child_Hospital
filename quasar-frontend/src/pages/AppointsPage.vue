<script setup>
import { ref, computed } from 'vue';
import apiClient from 'src/api';
import {useDataStore} from "stores/dataStore";

const dataStore = useDataStore();
const appointments = ref([]);
const patients = ref([]);
const doctors = ref([]);

const formattedAppointments = computed(()=> dataStore.formattedAppointments);

const columns = [
  { name: 'id', label: 'ID', align: 'left', field: 'APPOINTMENT_ID', style: 'font-size: 16px;' },
  { name: 'patient', label: 'Patient', align: 'left', field: 'PATIENT_NAME', style: 'font-size: 16px;' },
  { name: 'doctor', label: 'Doctor', align: 'left', field: 'DOCTOR_NAME', style: 'font-size: 16px;' },
  { name: 'date', label: 'Date', align: 'left', field: 'APPOINTMENT_DATE', style: 'font-size: 16px;' },
  { name: 'time', label: 'Time', align: 'left', field: 'APPOINTMENT_TIME', style: 'font-size: 16px;' },
  { name: 'notes', label: 'Notes', align: 'left', field: 'NOTES', style: 'font-size: 16px;' }
];

const loadAppointments = async () => {
  try {
    const [appointmentsRes, patientsRes, doctorsRes] = await Promise.all([
      apiClient.get('/appoints'),
      apiClient.get('/patients'),
      apiClient.get('/doctors')
    ]);

    appointments.value = appointmentsRes.data;
    patients.value = patientsRes.data;
    doctors.value = doctorsRes.data;

    formattedAppointments.value = appointments.value.map(app => {
      const patient = patients.value.find(p => p.PATIENT_ID === app.PATIENT_ID);
      const doctor = doctors.value.find(d => d.DOCTOR_ID === app.DOCTOR_ID);

      return {
        ...app,
        PATIENT_NAME: patient ? patient.FULL_NAME : 'Unknown',
        DOCTOR_NAME: doctor ? doctor.FULL_NAME : 'Unknown'
      };
    });
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
  }
};

</script>

<template>
  <div class="q-px-xl q-py-md">
    <h2 class="appoints__title text-h4 text-center q-ma-none">
      Appointments
    </h2>
    <q-table
      class="q-ma-lg"
      :header-class="'text-h6 text-center'"
      :rows="formattedAppointments"
      :columns="columns"
      row-key="APPOINTMENT_ID"
      :pagination="{ rowsPerPage: 10 }"
      flat
      bordered
    >
      <template v-slot:body-cell-notes="props">
        <q-chip
          color="secondary"
          outline
          class="full-height flex items-center justify-center"
        >
          {{ props.row.NOTES }}
        </q-chip>
      </template>
    </q-table>

  </div>
</template>


<style scoped>
.full-height {
  height: 100%;
}

.appoints__title{
  font-size: 2rem;
  font-weight: bold;
  color: #1f2b6c;
  line-height: 4rem;
}
</style>



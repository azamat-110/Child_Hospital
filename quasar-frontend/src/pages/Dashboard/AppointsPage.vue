<script setup>
import { ref, computed, onMounted } from "vue";
import { useDataStore } from "stores/dataStore";
import { useAuthStore } from "stores/authStore";
import { useQuasar } from "quasar";

const authStore = useAuthStore();
onMounted(() => {
  authStore.initialize();
});
const $q = useQuasar();
const isDarkMode = computed(() => $q.dark.isActive);

const dataStore = useDataStore();
const patients = ref([]);
const doctors = ref([]);

const formattedAppointments = computed(() =>
  dataStore.formattedAppointments.filter(
    (app) => app.PATIENT_ID === authStore.currentUserData[0].PATIENT_ID
  )
);

const columns = [
  {
    name: "id",
    label: "ID",
    align: "left",
    field: "APPOINTMENT_ID",
    style: "font-size: 16px;",
  },
  {
    name: "patient",
    label: "Patient",
    align: "left",
    field: "PATIENT_NAME",
    style: "font-size: 16px;",
  },
  {
    name: "doctor",
    label: "Doctor",
    align: "left",
    field: "DOCTOR_NAME",
    style: "font-size: 16px;",
  },
  {
    name: "date",
    label: "Date",
    align: "left",
    field: "APPOINTMENT_DATE",
    style: "font-size: 16px;",
  },
  {
    name: "time",
    label: "Time",
    align: "left",
    field: "APPOINTMENT_TIME",
    style: "font-size: 16px;",
  },
  {
    name: "notes",
    label: "Notes",
    align: "left",
    field: "NOTES",
    style: "font-size: 16px;",
  },
];
</script>

<template>
  <div class="q-px-xl q-py-md">
    <h2
      class="appoints__title text-h6 text-left q-ma-none q-px-lg"
      :class="{ dark__title: isDarkMode }"
    >
      Appointments
    </h2>
    <q-table
      class="q-ma-lg animation"
      :header-class="'text-h6 text-center'"
      :rows="formattedAppointments"
      :columns="columns"
      row-key="APPOINTMENT_ID"
      :pagination="{ rowsPerPage: 10 }"
      flat
      bordered
    >
      <q-chip
        :color="isDarkMode ? 'white' : 'primary'"
        outline
        class="full-height flex items-center justify-center"
      >
        {{ props.row.NOTES }}
      </q-chip>
    </q-table>
  </div>
</template>

<style scoped>
.full-height {
  height: 100%;
}

.appoints__title {
  font-size: 2rem;
  font-weight: bold;
  color: #000000;
  line-height: 4rem;
}

.animation {
  opacity: 0;
  transform: translateY(-30px);
  animation: showCards 1s ease-out forwards;
}
</style>

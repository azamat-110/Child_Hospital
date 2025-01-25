import { defineStore } from "pinia";
import apiClient from "src/api";
import { useAuthStore } from "stores/authStore";

export const useDataStore = defineStore("data", {
  state: () => ({
    appointments: [],
    patients: [],
    doctors: [],
    prescriptions: [],
    medications: [],
    groupedPrescriptions: {},
    formattedAppointments: [],
    error: null,
    loading: false,
  }),
  actions: {
    async loadAllData() {
      if (
        this.patients.length &&
        this.doctors.length &&
        this.appointments.length &&
        this.prescriptions.length &&
        this.medications.length
      ) {
        return;
      }
      this.loading = true;
      try {
        const [
          appointmentsRes,
          patientsRes,
          doctorsRes,
          prescriptionsRes,
          medicationsRes,
        ] = await Promise.all([
          apiClient.get("/appoints"),
          apiClient.get("/patients"),
          apiClient.get("/doctors"),
          apiClient.get("/prescriptions"),
          apiClient.get("/medications"),
        ]);

        this.appointments = appointmentsRes.data;
        this.patients = patientsRes.data;
        this.doctors = doctorsRes.data;
        this.prescriptions = prescriptionsRes.data;
        this.medications = medicationsRes.data;
        this.formatAppointments();
        this.groupPrescriptions();
      } catch (error) {
        this.error = `Ошибка загрузки данных: ${error.message}`;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    formatAppointments() {
      this.formattedAppointments = this.appointments.map((app) => {
        const patient = this.patients.find(
          (p) => p.PATIENT_ID === app.PATIENT_ID
        );
        const doctor = this.doctors.find((d) => d.DOCTOR_ID === app.DOCTOR_ID);

        return {
          ...app,
          PATIENT_NAME: patient ? patient.FULL_NAME : "Unknown",
          DOCTOR_NAME: doctor ? doctor.FULL_NAME : "Unknown",
        };
      });
    },

    groupPrescriptions() {
      const grouped = {};
      const authStore = useAuthStore();
      this.prescriptions.forEach((prescription) => {
        const patient = this.patients.find(
          (p) => p.PATIENT_ID === prescription.PATIENT_ID
        );
        const doctor = this.doctors.find(
          (d) => d.DOCTOR_ID === prescription.DOCTOR_ID
        );


        const groupKey = doctor ? doctor.FULL_NAME : patient.PATIENT_ID;


        if (!grouped[groupKey]) {
          grouped[groupKey] = [];
        }

        grouped[groupKey].push({
          ...prescription,
          PATIENT_NAME: patient ? patient.FULL_NAME : "Unknown Patient",
          DOCTOR_NAME: groupKey,
        });
      });
      this.groupedPrescriptions = grouped;
    },
  },
});

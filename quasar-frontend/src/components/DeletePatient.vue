<script setup>
import axios from "axios";
import {ref} from "vue";

defineProps({
  patientId: Number,
});

const confirm = ref(false);

const deletePatient = async (patientId) => {
  try {
    await axios.delete(`http://localhost:3001/auth/delete-patient/${patientId}`);
    window.location.reload();
  } catch (error) {
    console.error('Ошибка при удалении пациента:', error);
    alert(error.response?.data?.message || 'Ошибка при удалении пациента');
  }
};
</script>

<template>
  <q-btn @click="confirm = true" size="1rem" label="Delete" color="red" outline dense/>
  <q-dialog v-model="confirm" persistent>
    <q-card class="q-pa-md">
      <q-card-section class="row items-center">
        <q-avatar icon="delete" color="primary" text-color="white"/>
        <span class="q-ml-lg text-h6">Are you sure you want to delete this patient?</span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cancel" color="primary" v-close-popup flat/>
        <q-btn label="Delete" color="red" v-close-popup outline @click="deletePatient(patientId)"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

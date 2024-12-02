<template>
  <q-card class="patient-card q-pa-md">
    <q-card-section>
      <div class="patient-info">
        <div class="patient-name">{{ patient.FULL_NAME }}</div>
        <div class="patient-dob">Date of birth: {{ patient.DATE_OF_BIRTH }}</div>
      </div>
    </q-card-section>

    <q-card-section>
      <q-list dense>
        <q-item>
          <q-item-section side><q-icon name="person" /></q-item-section>
          <q-item-section>{{ patient.GENDER }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section side><q-icon name="phone" /></q-item-section>
          <q-item-section>{{ patient.CONTACT_INFO }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section side><q-icon name="accessible" /></q-item-section>
          <q-item-section>{{ patient.DISABILITY_TYPE }}</q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Подробнее" color="primary" icon="info" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
defineProps({
  patient: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.patient-card {
  background: linear-gradient(to bottom right, #e3f2fd, #bbdefb);
  border: 1px solid #90caf9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.patient-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.patient-info {
  margin-bottom: 1rem;
}

.patient-name {
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2b6c;
}

.patient-dob {
  font-size: 1rem;
  color: #555;
}
</style>

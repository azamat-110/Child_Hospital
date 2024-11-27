<template>
  <q-card class="q-mb-md" >
    <q-card-section>
      <div class="text-h6">{{ patient.FULL_NAME }}</div>
      <div class="text-subtitle1">Дата рождения: {{ patient.DATE_OF_BIRTH }}</div>
    </q-card-section>

    <q-card-section style="font-size: 16px;">
      <q-list>
        <q-item >
          <q-item-section>Пол:</q-item-section>
          <q-item-section>{{ patient.GENDER }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>Контакты:</q-item-section>
          <q-item-section>{{ patient.CONTACT_INFO }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>Инвалидность:</q-item-section>
          <q-item-section>{{ patient.DISABILITY_TYPE }}</q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Details" color="primary" />
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
.text-h6 {
  font-weight: bold;
}
</style>

<template>
  <q-card class="q-mb-md">
    <q-card-section>
      <div class="text-h6">{{ doctor.FULL_NAME }}</div>
      <div class="text-subtitle2">Specialisation: {{ doctor.SPECIALISATION }}</div>
    </q-card-section>

    <q-card-section>
      <q-list>
        <q-item>
          <q-item-section>Contact:</q-item-section>
          <q-item-section>{{ doctor.CONTACT_INFO }}</q-item-section>
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
  doctor: {
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

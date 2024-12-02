<script setup>
defineProps({
  doctor: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <q-card class="doctor-card">
    <img src="../assets/images/doctor.png" alt="Doctor Image" class="doctor-image"/>
    <q-card-section class="info-section">
      <q-item class="">
        <q-item-section side>
          <q-icon name="person"/>
        </q-item-section>
        <q-item-section class="text-weight-bold item__section name">{{ doctor.FULL_NAME }}</q-item-section>
      </q-item>
      <q-item>
        <q-item-section side>
          <q-icon name="health_and_safety"/>
        </q-item-section>
        <q-item-section class="text-weight-medium item__section">{{ doctor.SPECIALISATION }}</q-item-section>
      </q-item>
      <q-item>
        <q-item-section side>
          <q-icon name="call"/>
        </q-item-section>
        <q-item-section class="text-weight-medium item__section">{{ doctor.CONTACT_INFO }}</q-item-section>
      </q-item>
      <div class="social-links row justify-center q-mt-md">
        <q-btn
          v-for="social in doctor.socialMedia"
          :key="social.name"
          :icon="social.icon"
          round
          flat
          color="primary"
          class="q-mx-xs"
        />
      </div>
      <q-btn
        label="View Profile"
        color="primary"
        flat
        class="q-mt-md full-width bg-grey-1"
        @click="viewProfile"
        style="border-radius: 10px"
      />
    </q-card-section>
  </q-card>
</template>

<style scoped>
.item__section{
  font-size: 1rem;

  &.name{
    min-height: 48px;
  }
}

.info-section{
  background: linear-gradient(to bottom right, #e3f2fd, #bbdefb) !important;
}

.doctor-card {
  max-width: 280px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  margin: 0 auto;
}

.doctor-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
}

.doctor-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.info-section {
  padding: 1rem;
  background: linear-gradient(135deg, #ffffff, #f3f3f3);
  text-align: center;
  color: #1f2b6c;

}

.social-links {
  margin-top: 1rem;
}

.full-width {
  width: 100%;
}
</style>


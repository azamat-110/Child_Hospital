<script setup>
import { useQuasar } from "quasar";
import { computed } from "vue";

const $q = useQuasar();
const isDarkMode = computed(() => $q.dark.isActive);

defineProps({
  doctor: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <q-card class="doctor-card" :class="{darkShadow: isDarkMode}">
    <q-card-section class="info-section" :class="{dark: isDarkMode}">
      <img
        :src="
          doctor.GENDER === 'Мужской'
            ? '/src/assets/images/Doctor_Male.png'
            : '/src/assets/images/Doctor_Female.png'
        "
        alt="Doctor Image"
        class="doctor-image"
      />
      <q-item>
        <q-item-section side>
          <q-icon name="person" />
        </q-item-section>
        <q-item-section class="text-weight-bold item__section name">{{
          doctor.FULL_NAME
        }}</q-item-section>
      </q-item>
      <q-item>
        <q-item-section side>
          <q-icon name="health_and_safety" />
        </q-item-section>
        <q-item-section class="text-weight-medium item__section">{{
          doctor.SPECIALISATION
        }}</q-item-section>
      </q-item>
      <q-item>
        <q-item-section side>
          <q-icon name="call" />
        </q-item-section>
        <q-item-section class="text-weight-medium item__section">{{
          doctor.CONTACT_INFO
        }}</q-item-section>
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
        color="black"
        outline
        class="q-mt-md full-width bg-grey-1"
        @click="viewProfile"
        style="border-radius: 10px"
      />
    </q-card-section>
  </q-card>
</template>

<style scoped>
.item__section {
  font-size: 1rem;

  &.name {
    min-height: 48px;
  }
}

.info-section {
  background: rgb(248, 248, 248);
}

.doctor-card {
  max-width: 280px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
  margin: 0 auto;
}

.doctor-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  border-radius: 16px;
}

.doctor-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(0.6);
}

.info-section {
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

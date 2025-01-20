<script setup>
import { useQuasar } from "quasar";
import { computed } from "vue";

defineProps({
  doctor: {
    type: Object,
    required: true,
  },
});

const $q = useQuasar();
const isDarkMode = computed(() => $q.dark.isActive);

const viewProfile = () => {
  console.log(doctor.DOCTOR_ID);
};
</script>

<template>
  <q-card class="doctor__card" :class="{ 'dark__shadow-hover': isDarkMode }">
    <q-card-section class="info__section" :class="{ dark: isDarkMode }">
      <img
        :src="
          doctor.GENDER === 'Мужской'
            ? '/src/assets/images/Doctor_Male.png'
            : '/src/assets/images/Doctor_Female.png'
        "
        alt="Doctor Image"
        class="doctor__image"
      />
      <q-item>
        <q-item-section side>
          <q-icon name="person" />
        </q-item-section>
        <q-item-section class="text-weight-bold item__section name"
          >Dr. {{ doctor.FULL_NAME }}
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section side>
          <q-icon name="health_and_safety" />
        </q-item-section>
        <q-item-section class="text-weight-medium item__section"
          >{{ doctor.SPECIALISATION }}
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section side>
          <q-icon name="call" />
        </q-item-section>
        <q-item-section class="text-weight-medium item__section"
          >{{ doctor.CONTACT_INFO }}
        </q-item-section>
      </q-item>
      <q-btn
        label="View Profile"
        :color="isDarkMode ? 'white' : 'black'"
        outline
        class="q-mt-sm full-width"
        @click="viewProfile"
        rounded
      />
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
.item__section {
  font-size: 1rem;

  &.name {
    min-height: 50px;
  }
}

.info__section {
  background: rgb(255, 255, 255);
  text-align: center;
  color: #000000;
}

.doctor {
  &__card {
    max-width: 280px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s, box-shadow 0.3s;
    margin: 0 auto;


    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
      border-radius: 16px;
    }
  }

  &__image {
    width: 70%;
    height: 70%;
    object-fit: cover;
    transform: translateX(10%) scale(.9);
  }
}

.full-width {
  width: 100%;
}
</style>

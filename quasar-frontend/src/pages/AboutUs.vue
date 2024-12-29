<script setup>
import { computed, ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const isDarkMode = computed(() => $q.dark.isActive);

const team = ref([
  {
    name: "Oleg Vassilyevich",
    position: "Chief Doctor",
    icon: "medical_services",
  },
  { name: "Anna Petrovna", position: "Pediatrician", icon: "face" },
  { name: "Sergey Nikolaevich", position: "Surgeon", icon: "healing" },
  {
    name: "Ekaterina Vladimirovna",
    position: "Cardiologist",
    icon: "favorite",
  },
]);
</script>

<template>
  <q-page class="about__page q-pb-xl">
    <section class="hero">
      <div class="hero__content" :class="{dark__title : isDarkMode}">
        <h1 class="text-h3 text-bold q-ma-none" >About Our Hospital</h1>
        <p class="text-subtitle">
          The best children's hospital for children with special needs. We care
          about each one.
        </p>
      </div>
    </section>

    <q-page-container>
      <section class="about__content" >
        <q-card
          class="info__card q-pa-lg"
          :class="{ dark__shadow: isDarkMode} "

        >
          <q-card-section>
            <h2 class="text-h5 text-bold" >Our Mission</h2>
            <p>
              We strive to improve the quality of life for children with
              disabilities by providing high-quality medical care, psychological
              support, and innovative technologies.
            </p>
          </q-card-section>
          <q-card-section>
            <h2 class="text-h5 text-bold">Our Values</h2>
            <ul>
              <li>Care and attention to each patient</li>
              <li>Innovative treatment methods</li>
              <li>Collaboration with global specialists</li>
              <li>Support for children and their families</li>
            </ul>
          </q-card-section>
        </q-card>
      </section>

      <section class="team__section">
        <h2 class="text-h5 text-center">Our Team</h2>
        <div class="team__list">
          <q-card
            v-for="(member, index) in team"
            :key="index"
            class="team__card"
            :class="{ dark__shadow: isDarkMode }"
          >
            <q-card-section>
              <q-avatar
                size="80px"
                :icon="member.icon"
                :color="isDarkMode ? 'secondary' : 'primary'"
                text-color="white"
              />
              <h3 class="text-h6 text-bold">{{ member.name }}</h3>
              <p class="text__caption">{{ member.position }}</p>
            </q-card-section>
          </q-card>
        </div>
      </section>
    </q-page-container>
  </q-page>
</template>

<style scoped lang="scss">
.hero {
  color: #000000;
  text-align: center;
  padding: 2rem 1rem;
  &__content {
    max-width: 800px;
    margin: auto;
  }
}

.about {
  &__content {
    margin: 30px auto;
    max-width: 800px;
  }
}

.info__card {
  margin: 20px 0;
  border-radius: 20px;
  transition: 0.5s;
}

.team {
  &__section {
    margin-top: 50px;
  }

  &__list {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  &__card {
    width: 200px;
    text-align: center;
    padding: 20px;
    border-radius: 20px;
    transition: 0.5s;
  }
}
</style>

<template>
  <q-page class="about-page q-pb-xl">
    <section class="hero">
      <div class="hero-content">
        <h1 class="text-h3 text-bold q-ma-none">About Our Hospital</h1>
        <p class="text-subtitle">
          The best children's hospital for children with special needs. We care about each one.
        </p>
      </div>
    </section>

    <q-page-container>
      <section class="about-content">
        <q-card class="info-card q-pa-lg" bordered>
          <q-card-section>
            <h2 class="text-h5 text-bold">Our Mission</h2>
            <p>
              We strive to improve the quality of life for children with disabilities by providing
              high-quality medical care, psychological support, and innovative technologies.
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

      <section class="team-section">
        <h2 class="text-h5 text-center">Our Team</h2>
        <div class="team-list">
          <q-card v-for="(member, index) in team" :key="index" class="team-card">
            <q-card-section>
              <q-avatar size="80px" :icon="member.icon" color="primary" text-color="white"/>
              <h3 class="text-h6 text-bold">{{ member.name }}</h3>
              <p class="text-caption">{{ member.position }}</p>
            </q-card-section>
          </q-card>
        </div>
      </section>
    </q-page-container>
  </q-page>
</template>

<script setup>
import {ref} from 'vue';

const team = ref([
  {name: 'Oleg Vasilyevich', position: 'Chief Doctor', icon: 'medical_services'},
  {name: 'Anna Petrovna', position: 'Pediatrician', icon: 'face'},
  {name: 'Sergey Nikolaevich', position: 'Surgeon', icon: 'healing'},
  {name: 'Ekaterina Vladimirovna', position: 'Cardiologist', icon: 'favorite'},
]);
</script>

<style scoped>
.about-page {
  background-color: #f9fbff;
}

.hero {
  background: linear-gradient(to bottom right, #e3f2fd, #bbdefb);
  color: #1F2B6C;
  text-align: center;
  padding: 2rem 1rem;
}

.hero-content {
  max-width: 800px;
  margin: auto;
}

.about-content {
  margin: 30px auto;
  max-width: 800px;
}

.info-card {
  margin: 20px 0;
}

.team-section {
  margin-top: 50px;
}

.team-list {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.team-card {
  width: 200px;
  text-align: center;
  padding: 20px;
}
</style>

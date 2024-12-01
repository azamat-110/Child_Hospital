<template>
  <q-page class="home-page">
    <div class="content">
      <!-- Hero Section -->
      <section class="hero">
        <h1>MedDical: Your Health, Our Priority</h1>
        <p>We offer a range of medical services to ensure your well-being. Whether you need emergency care, routine
          check-ups, or specialized treatment, we're here for you. Our experienced team is committed to providing
          top-notch healthcare with compassion and care.</p>
        <q-btn label="Learn More" color="primary" class="learn-more-btn"/>
      </section>
    </div>
  </q-page>
</template>

<script setup>
import {QBtn} from 'quasar';
</script>

<style scoped>
.home-page {
  width: 100vw;
  min-height: 100vh;
  background: url('../assets/images/mainBg.png') no-repeat center center;
  background-size: cover;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

.content {
  max-width: 800px;
  padding: 20px;
  text-align: left;
  margin-left: 50px;
  color: black;
}

.hero h1 {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
}

.hero p {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.learn-more-btn {
  margin-top: 20px;
}
</style>

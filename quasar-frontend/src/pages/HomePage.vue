<script setup>
import {QBtn} from 'quasar';
import {ref, onMounted} from "vue";
import {useAuthStore} from "stores/authStore";


const userRole = ref("patient"); // Роль по умолчанию
const authStore = useAuthStore();
authStore.initialize();

console.log(authStore.role);

onMounted(() => {
  // Получаем роль из localStorage, если она есть
  userRole.value = localStorage.getItem("role") || "patient";
});
</script>

<template>
  <q-page class="home-page">
    <div class="content">
      <section class="hero">
        <h1 v-if="authStore.role === 1">Welcome, Administrator!</h1>
        <h1 v-else-if="authStore.role === 2">Welcome, Doctor!</h1>
        <h1 v-else-if="authStore.role === 3">Welcome, Patient!</h1>
        <h1 v-else>Welcome to Children's Hospital!</h1>
        <p>We offer a range of medical services to ensure your well-being. Whether you need emergency care, routine
          check-ups, or specialized treatment, we're here for you. Our experienced team is committed to providing
          top-notch healthcare with compassion and care.</p>
        <q-btn label="Learn More" color="primary" class="learn-more-btn"/>
      </section>
    </div>
  </q-page>
</template>


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
  display: flex;
  align-items: center;
}

.hero{
  padding-bottom: 80px;
}

.hero h1 {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 30px;
  line-height: 60px;
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

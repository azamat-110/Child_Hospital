<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useAuthStore } from "stores/authStore";
import { useDataStore } from "stores/dataStore";
import DoctorCard from "components/DoctorCard.vue";

const dataStore = useDataStore();
const authStore = useAuthStore();

const userRole = ref("patient");
const doctors = computed(() => dataStore.doctors);
const limitedDrs = ref([]);

const limitDoctors = () => {
  limitedDrs.value = doctors.value.slice(0, 4);
  console.log("Limited Doctors:", limitedDrs.value);
};

onMounted(async () => {
  await authStore.initialize();
  userRole.value = localStorage.getItem("role") || "patient";

  if (doctors.value.length > 0) {
    limitDoctors();
  }

  watch(
    doctors,
    (newDoctors) => {
      if (newDoctors.length > 0) {
        limitDoctors();
      }
    },
    { immediate: true }
  );
});
</script>

<template>
  <q-page class="home-page">
    <div class="content">
      <section class="hero">
        <div class="hero__img"></div>
        <div class="hero__title">
          <h1 v-if="authStore.role === 1">Welcome, Administrator!</h1>
          <h1 v-else-if="authStore.role === 2">Welcome, Doctor!</h1>
          <h1 v-else-if="authStore.role === 3">Welcome, Patient!</h1>
          <h1 v-else>Welcome to Children's Hospital!</h1>
          <p>
            We offer a range of medical services to ensure your well-being.
            Whether you need emergency care, routine check-ups, or specialized
            treatment, we're here for you. Our experienced team is committed to
            providing top-notch healthcare with compassion and care.
          </p>
          <q-btn
            v-if="!authStore.role"
            to="/login"
            label="Log In"
            color="primary"
            class="learn-more-btn text-bold"
            outline
          />
          <q-btn
            to="/about"
            label="Learn More..."
            color="primary"
            class="learn-more-btn q-ml-lg text-bold"
            outline
          />
        </div>
      </section>

      <section class="doctors">
        <div class="doctors__title">
          <h2>Doctors</h2>
          <q-btn to="/doctors" label="View all" color="black" rounded outline />
        </div>

        <div class="doctors__flex">
          <div
            class="doctor__card"
            v-for="doctor in limitedDrs"
            :key="doctor.DOCTOR_ID"
          >
            <DoctorCard doctor="doctor" />
          </div>
        </div>
      </section>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.doctors {
  width: 100%;
  min-width: 1330px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 50px;

  &__title {
    width: 100%;
    min-width: 1330px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & h2 {
      font-weight: bold;
      font-size: 2rem;
    }
  }

  &__flex {
    display: flex;
    gap: 2rem;
  }
}

.something {
  height: 100vh;
  width: 100%;
}

.home-page {
  background: url("../assets/images/Gradient.png") no-repeat center center;
  min-height: 100vh;
  min-width: 1440px;
  width: 100%;
  background-size: cover;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
}

.content {
  max-width: 800px;
  padding: 20px;
  text-align: right;
  margin-left: 50px;
  color: #000;
  display: flex;
  align-items: center;
  flex-direction: column;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
}

.hero {
  display: flex;
  align-items: end;
  justify-content: center;
  flex-direction: column;
  height: 95vh;
  width: 100%;
  min-width: 1300px;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: end;
  -ms-flex-align: end;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: reverse;
  -ms-flex-direction: column;

  &__img {
    position: absolute;
    bottom: 50px;
    left: -100px;
    background: url("../assets/images/headerDoctor.png") no-repeat;
    height: 100vh;
    width: 100%;
    background-size: auto;
    transform: scale(0.9);
    -webkit-transform: scale(0.9);
    -ms-transform: scale(0.9);
  }

  &__title {
    width: 100%;
    max-width: 700px;
    padding-bottom: 20vh;
  }

  & h1 {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 30px;
    line-height: 60px;
  }

  & p {
    font-size: 20px;
    line-height: 1.5;
    margin-bottom: 20px;
    font-weight: bold;
  }
}

.learn-more-btn {
  margin-top: 20px;
}

.hero__title {
  opacity: 0;
  transform: translateY(-50px);
  animation: slideDown 1.5s ease-out forwards;
}

@keyframes slideDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

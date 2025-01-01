<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useAuthStore } from "stores/authStore";
import { useDataStore } from "stores/dataStore";
import { useQuasar } from "quasar";
import DoctorCard from "components/DoctorCard.vue";
import headerDoctorLight from "assets/images/headerDoctorLight.png";
import headerDoctorDark from "assets/images/headerDoctorDark.png";

const dataStore = useDataStore();
const authStore = useAuthStore();
const $q = useQuasar();

const isDarkMode = computed(() => $q.dark.isActive);
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
        <div
          class="hero__img"
          :style="
            isDarkMode
              ? `background: url(${headerDoctorDark}) no-repeat;`
              : `background: url(${headerDoctorLight}) no-repeat;`
          "
        ></div>
        <div class="hero__title" :class="{ dark__title: isDarkMode }">
          <h1 v-if="authStore.role === 1">
            {{ $t("homePage.welcome_admin") }}
          </h1>
          <h1 v-else-if="authStore.role === 2">Welcome, Doctor!</h1>
          <h1 v-else-if="authStore.role === 3">Welcome, Patient!</h1>
          <h1 v-else>{{ $t("homePage.welcome") }}</h1>
          <p>
            {{ $t("homePage.medical_services") }}
          </p>
          <q-btn
            v-if="!authStore.role"
            to="/login"
            :label="$t('homePage.login')"
            :color="isDarkMode ? 'light' : 'primary'"
            class="learn-more-btn text-bold"
            outline
            rounded
          />
          <q-btn
            to="/about"
            :label="$t('homePage.learn_more')"
            :color="isDarkMode ? 'light' : 'primary'"
            class="learn-more-btn q-ml-lg text-bold"
            outline
            rounded
          />
        </div>
      </section>

      <section class="doctors">
        <div class="doctors__title" :class="{ dark__title: isDarkMode }">
          <h2>{{ $t("homePage.doctor_title") }}</h2>
          <q-btn
            to="/doctors"
            :label="$t('homePage.view_all')"
            :color="isDarkMode ? 'light' : 'primary'"
            rounded
            outline
          />
        </div>

        <div class="doctors__flex">
          <div
            class="doctor__card"
            v-for="doctor in limitedDrs"
            :key="doctor.DOCTOR_ID"
          >
            <DoctorCard :doctor="doctor" />
          </div>
        </div>
      </section>
      <section class="about">
        <div class="about__title">
          <h2 :class="{ dark__title: isDarkMode }">
            {{ $t("homePage.about") }}
          </h2>
          <q-btn
            to="/about"
            :label="$t('homePage.learn_more')"
            :color="isDarkMode ? 'grey-1' : 'primary'"
            rounded
            outline
          />
        </div>
        <div class="about__content q-mt-lg q-px-md" :class="{ dark__title: isDarkMode }">
          {{$t('homePage.about_content')}}
        </div>
      </section>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.about {
  width: 100%;
  min-width: 1300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 50px;

  &__title {
    width: 100%;
    min-width: 1300px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & h2 {
      font-weight: bold;
      font-size: 2rem;
    }
  }

  &__content{
    font-size: 1.5rem;
    line-height: 1.5;
    margin-bottom: 20px;
    font-weight: bold;
    color: #000000;
    text-align: center;
    max-width: 800px;
  }
}

.doctors {
  width: 100%;
  min-width: 1300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 50px;

  &__title {
    width: 100%;
    min-width: 1300px;
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
    opacity: 0;
    transform: translateX(-50px);
    animation: showCards 1s ease-out forwards;
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
    left: -80px;
    //background: url("../assets/images/headerDoctorDark.png") no-repeat;
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

@keyframes showCards {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>

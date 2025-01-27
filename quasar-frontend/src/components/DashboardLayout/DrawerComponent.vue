<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { useAuthStore } from "stores/authStore";
import axios from "axios";
import clinicLogoDark from "assets/images/clinicLogoDark.svg";

const authStore = useAuthStore();
authStore.initialize();

const props = defineProps({
  leftDrawer: Boolean,
});

const $q = useQuasar();
const isDarkMode = computed(() => $q.dark.isActive);
const localLeftDrawer = ref(props.leftDrawer);

// const getUserData = async (userId) => {
//   try {
//     const result = await axios.get(
//       `http://localhost:3001/auth/getUserInfo/${userId}`
//     );
//     authStore.setUserData(result.data);
//   } catch {
//     console.error("Ошибка при получении данных пользователя");
//   }
// };
//
// onMounted(async () => {
//   await getUserData(authStore.userId.userId);
// });

watch(
  () => props.leftDrawer,
  (newVal) => {
    if (localLeftDrawer.value !== newVal) {
      localLeftDrawer.value = newVal;
    }
  }
);
</script>

<template>
  <q-drawer
    show-if-above
    v-model="localLeftDrawer"
    side="left"
    :class="{ dark__shadow: isDarkMode }"
    class="drawer"
    bordered
  >
    <!-- drawer content -->
    <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; background: rgba(249,251,252,255)">
      <q-list>
        <q-item
          clickable
          v-ripple
          to="/dashboard/main"
          active-class="drawer__item-active"
        >
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section> Dashboard</q-item-section>
        </q-item>
        <q-separator />
        <q-item
          active-class="drawer__item-active"
          clickable
          v-ripple
          to="/dashboard/doctors"
        >
          <q-item-section avatar>
            <q-icon name="health_and_safety" />
          </q-item-section>
          <q-item-section>{{ $t("navBar.doctors") }}</q-item-section>
        </q-item>

        <q-item
          active-class="drawer__item-active"
          clickable
          v-ripple
          to="/dashboard/appointments"
        >
          <q-item-section avatar>
            <q-icon name="calendar_month" />
          </q-item-section>
          <q-item-section> {{ $t("navBar.appointments") }}</q-item-section>
        </q-item>

        <q-item
          active-class="drawer__item-active"
          clickable
          v-ripple
          to="/dashboard/prescriptions"
        >
          <q-item-section avatar>
            <q-icon name="app_registration" />
          </q-item-section>
          <q-item-section> {{ $t("navBar.prescriptions") }}</q-item-section>
        </q-item>

        <q-item
          active-class="drawer__item-active"
          clickable
          v-ripple
          to="/dashboard/medications"
        >
          <q-item-section avatar>
            <q-icon name="medication" />
          </q-item-section>
          <q-item-section> {{ $t("navBar.medications") }}</q-item-section>
        </q-item>
        <q-separator />
        <q-item
          active-class="drawer__item-active"
          clickable
          v-ripple
          to="/dashboard/settings"
        >
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section> Settings</q-item-section>
        </q-item>

        <q-item
          active-class="drawer__item-active"
          clickable
          v-ripple
          to="/dashboard/feedback"
        >
          <q-item-section avatar>
            <q-icon name="feedback" />
          </q-item-section>
          <q-item-section> Send feedback</q-item-section>
        </q-item>

        <q-item
          active-class="drawer__item-active"
          clickable
          v-ripple
          to="/dashboard/help"
        >
          <q-item-section avatar>
            <q-icon name="help" />
          </q-item-section>
          <q-item-section> Help</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
    <q-toolbar-title class="absolute-top q-py-md" style="background: rgba(249,251,252,255)">
      <header class="info__toolbar">
        <div class="flex" style="gap: 5px">
          <img :src="clinicLogoDark" alt="clinic" />
          <div class="info__toolbar-title">
            Children's
            <br />
            Hospital
          </div>
        </div>
        <div class="info__toolbar-card">
          <q-icon name="place" />
          <p>
            <span> Avicena Clinic </span>
            <br />
            845 Euclid Avenue, CA
          </p>
        </div>
      </header>
    </q-toolbar-title>

    <div class="absolute-bottom q-pa-lg q-pb-lg">
      © 2025 Child Hospital, Inc.
    </div>
  </q-drawer>
</template>

<style scoped lang="scss">
.drawer {
  background-color: rgb(0, 1, 2) !important;

  &__item-active {
    background: rgba(232, 240, 251, 255);
    color: #0194e6ff;
  }
}

.q-item {
  border-radius: 15px;
  margin: 10px;
  padding: 0 15px;
  font-weight: bold;
  font-size: 15px;
  transition: .5s;
}

.info {
  &__toolbar {
    display: flex;
    align-items: start;
    gap: 0.5rem;
    flex-direction: column;

    &-title {
      font-weight: bold;
      color: #000;
      font-size: 1.3rem;
      line-height: 1.1;
      text-align: left;
    }

    &-card {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      justify-content: start;
      margin-top: 20px;
      border: 1px solid rgba(232, 234, 234, 255);
      padding: 6px;
      border-radius: 10px;

      & p {
        font-size: 10px;
        margin: 0;

        & span {
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>

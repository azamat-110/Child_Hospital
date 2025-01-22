<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { useAuthStore } from "stores/authStore";
import axios from "axios";

const authStore = useAuthStore();
authStore.initialize();

const props = defineProps({
  leftDrawer: Boolean,
});

const $q = useQuasar();
const isDarkMode = computed(() => $q.dark.isActive);
const localLeftDrawer = ref(props.leftDrawer);

const getUserData = async (userId) => {
  try {
    const result = await axios.get(
      `http://localhost:3001/auth/getUserInfo/${userId}`
    );
    authStore.setUserData(result.data);
    console.log(authStore.currentUserData)
  } catch {
    console.error("Ошибка при получении данных пользователя");
  }
};

onMounted(  async () => {
     await getUserData(authStore.userId.userId);
});

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
    style="box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4)"
  >
    <!-- drawer content -->
    <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px">
      <q-list padding>
        <q-item clickable v-ripple to="/dashboard/main">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section> Dashboard</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-ripple to="/dashboard/doctors">
          <q-item-section avatar>
            <q-icon name="health_and_safety" />
          </q-item-section>
          <q-item-section>{{ $t("navBar.doctors") }}</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/dashboard/appointments">
          <q-item-section avatar>
            <q-icon name="calendar_month" />
          </q-item-section>
          <q-item-section> {{ $t("navBar.appointments") }}</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/dashboard/prescriptions">
          <q-item-section avatar>
            <q-icon name="app_registration" />
          </q-item-section>
          <q-item-section> {{ $t("navBar.prescriptions") }}</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/dashboard/medications">
          <q-item-section avatar>
            <q-icon name="medication" />
          </q-item-section>
          <q-item-section> {{ $t("navBar.medications") }}</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-ripple to="/dashboard/settings">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section> Settings</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/dashboard/feedback">
          <q-item-section avatar>
            <q-icon name="feedback" />
          </q-item-section>
          <q-item-section> Send feedback</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/dashboard/help">
          <q-item-section avatar>
            <q-icon name="help" />
          </q-item-section>
          <q-item-section> Help</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
    <q-img
      class="absolute-top"
      src="https://img.freepik.com/free-vector/gradient-hexagonal-background_23-2148932756.jpg?t=st=1737363477~exp=1737367077~hmac=f47765e6c930e384259cfc069db1c5c653ef54c6e5c3fb4be9496e3ffd42c942&w=1800"
      style="height: 150px"
    >
      <div class="absolute-bottom bg-transparent">
        <q-avatar size="56px" class="q-mb-sm">
          <q-img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzrKwzB9qf6z1LUGt9CMjPzC5zBy87WL6Fw&s"
          />
        </q-avatar>
        <div class="text-weight-bold text-black">
          {{ (authStore.currentUserData && authStore.currentUserData[0]?.FULL_NAME) || 'Ghost'}}
        </div>
<!--        <div class="text-black">{{ authStore.currentUserData[0].EMAIL || "" }}</div>-->
      </div>
    </q-img>
    <div class="absolute-bottom q-pa-lg q-pb-xl">
      © 2025 Child Hospital, Inc.
    </div>
  </q-drawer>
</template>

<style scoped></style>

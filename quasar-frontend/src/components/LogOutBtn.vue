<template>
  <q-btn
    @click="logout"
    type="submit"
    color="primary"
    flat
    text-color="black"
    unelevated
    to="/login"
    dense
  >
    {{ $t("logOutBtn.logout") }}
    <q-icon name="logout" size="1.5em" class="q-ml-sm" />
  </q-btn>
</template>

<script setup>
import { useAuthStore } from "stores/authStore";

const authStore = useAuthStore();
const logout = () => {
  authStore.logout();
};
</script>

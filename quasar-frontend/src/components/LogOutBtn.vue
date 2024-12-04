<template>
  <q-btn
    @click="logout"
    type="submit"
    color="primary"
    outline
    text-color="white"
    unelevated
    to="/login"
  >
    Log out
    <q-icon name="logout" size="1.5em" class="q-ml-sm" />
  </q-btn>
</template>


<script setup>
import {useAuthStore} from 'stores/authStore';

const authStore = useAuthStore();
const logout = () => {
  authStore.logout();
};

</script>

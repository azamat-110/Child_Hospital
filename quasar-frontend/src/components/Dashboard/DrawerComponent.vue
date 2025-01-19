<script setup>
import { computed, ref, watch } from "vue";
import { useQuasar } from "quasar";

const props = defineProps({
  leftDrawer: Boolean,
});

const $q = useQuasar();
const isDarkMode = computed(() => $q.dark.isActive);
const localLeftDrawer = ref(props.leftDrawer);

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
    :elevated="!isDarkMode"
  >
    <!-- drawer content -->
  </q-drawer>
</template>

<style scoped></style>

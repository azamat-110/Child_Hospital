<script setup></script>

<template>
  <q-card class="treatment">
    <q-card-section class="q-pa-md">
      <h2 class="text-h6 q-ma-none treatment__title">Popular Treatment</h2>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
.treatment {
  display: flex;
  border: 1px solid #edeeef;
  border-radius: 10px;
  box-shadow: none;
  width: 100%;

  &__title {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>

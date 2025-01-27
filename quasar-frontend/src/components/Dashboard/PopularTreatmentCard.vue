<script setup>

</script>

<template>
  <q-card class="cashflow">
    <q-card-section class="q-pa-md">
      <div class="row items-center justify-between q-mb-sm">
        <h2 class="text-h6 q-ma-none cashflow__title">Cashflow</h2>
        <q-select
          v-model="timeRange"
          :options="timeRanges"
          outlined
          dense
          input-class="cashflow__select"
        />
      </div>
      <h3 class="text-h6 q-mr-sm cashflow__total-title">
        Total cash
      </h3>
      <div class="q-mb-lg flex justify-between items-center">
        <div class="flex items-center">
          <span class="cashflow__total-cash">$ 134 422</span>
          <q-chip
            color="green-11"
            text-color="black"
            class="flex items-center q-ml-md"
          >
            <q-icon name="arrow_upward" class="q-mr-xs" size="15px" />
            {{ percentage }}
          </q-chip>
        </div>
        <div class="text-subtitle1 text-grey-7">
          January 1522 - December 1522
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>

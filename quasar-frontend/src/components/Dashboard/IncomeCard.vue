<script setup>

</script>

<template>
  <q-card class="income">
    <q-card-section class="q-pa-md">
      <div class="row items-center justify-between q-mb-sm">
        <h2 class="text-h6 q-ma-none cashflow__title">
          Income & Expense
        </h2>
        <q-select
          v-model="timeRange"
          :options="timeRanges"
          outlined
          dense
          input-class="cashflow__select"
        />
      </div>
      <div class="q-mb-lg flex justify-between column income__total">
        <h3 class="text-h6 q-mr-sm income__total-title">
          Total income
        </h3>
        <div class="flex items-center">
          <span class="income__total-cash">$ 134 422</span>
          <q-chip
            text-color="green-14"
            class="bg-white flex items-center q-ml-md text-bold q-pa-none"
          >
            <q-icon
              name="arrow_drop_up"
              class="q-mr-xs q-ma-none"
              size="30px"
            />
            {{ percentage }}
          </q-chip>
        </div>
      </div>
      <div class="q-mb-lg flex justify-between column income__total">
        <h3 class="text-h6 q-mr-sm income__total-title">
          Total income
        </h3>
        <div class="flex items-center">
          <span class="income__total-cash">$ 134 422</span>
          <q-chip
            text-color="green-14"
            class="bg-white flex items-center q-ml-md text-bold q-pa-none"
          >
            <q-icon
              name="arrow_drop_up"
              class="q-mr-xs q-ma-none"
              size="30px"
            />
            {{ percentage }}
          </q-chip>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">

.income {
  border: 1px solid #edeeef;
  border-radius: 10px;
  box-shadow: none;
  min-width: 50%;

  &__total {
    padding-top: 20px;

    &-title {
      margin: 0;
      font-size: 14px;
      color: rgba(124, 132, 149, 255);
      text-transform: uppercase;
      line-height: 1.1;
    }

    &-cash {
      font-size: 16px;
      font-weight: bold;
    }
  }
}

</style>

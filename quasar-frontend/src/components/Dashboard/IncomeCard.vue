<script setup>
import { ref } from "vue";

const timeRange = ref("Last 12 month");
const timeRanges = ["Last 12 month", "Last 6 month", "Last month"];
const percentageUp = ref("4.51%");
const percentageDown = ref("2.41%");
</script>

<template>
  <q-card class="income">
    <q-card-section class="q-pa-md">
      <div class="row items-center justify-between q-mb-sm">
        <h2 class="text-h6 q-ma-none income__title">Income & Expense</h2>
        <q-select v-model="timeRange" :options="timeRanges" outlined dense />
      </div>
      <div class="row items-center justify-between q-my-lg">
        <div class="q-ml-lg flex justify-between column income__total">
          <div
            class="income__total-color"
            style="background: rgba(141, 207, 150, 255)"
          ></div>
          <h3 class="text-h6 q-mr-sm income__total-title">Total income</h3>
          <div class="flex items-center">
            <span class="income__total-cash">$ 1 412</span>
            <q-chip
              text-color="green-14"
              class="bg-white flex items-center text-bold q-pa-none"
            >
              <q-icon name="arrow_drop_up" class="q-ma-none" size="20px" />
              {{ percentageUp }}
            </q-chip>
          </div>
        </div>
        <div class="q-ml-lg flex justify-between column income__total">
          <div
            class="income__total-color"
            style="background: rgba(255, 181, 10, 255)"
          ></div>
          <h3 class="text-h6 q-mr-sm income__total-title">Total expenses</h3>
          <div class="flex items-center">
            <span class="income__total-cash">$ 612</span>
            <q-chip
              text-color="pink"
              class="bg-white flex items-center text-bold q-pa-none"
            >
              <q-icon name="arrow_drop_down" class="q-ma-none" size="20px" />
              {{ percentageDown }}
            </q-chip>
          </div>
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

  &__title {
    font-size: 18px;
    font-weight: bold;
  }

  :deep(.q-field__control) {
    border-radius: 10px;
  }

  &__total {
    position: relative;

    &-title {
      margin: 0;
      font-size: 12px;
      color: rgba(124, 132, 149, 255);
      text-transform: uppercase;
      line-height: 1.1;
      font-weight: bold;
    }

    &-cash {
      font-size: 16px;
      font-weight: bold;
    }

    &-color {
      width: 15px;
      height: 5px;
      position: absolute;
      top: 4px;
      left: -22px;
      border-radius: 5px;
    }
  }
}
</style>

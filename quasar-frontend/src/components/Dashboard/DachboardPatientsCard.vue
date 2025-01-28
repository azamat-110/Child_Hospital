<script setup>
import { ref } from "vue";

const timeRange = ref("Last 12 month");
const timeRanges = ["Last 12 month", "Last 6 month", "Last month"];
</script>

<template>
  <q-card class="patients">
    <q-card-section class="q-pa-md">
      <div class="row items-center justify-between q-mb-sm">
        <h2 class="text-h6 q-ma-none patients__title">Patients</h2>
        <q-select
          v-model="timeRange"
          :options="timeRanges"
          outlined
          dense
          input-class="patients__select"
        />
      </div>
      <div class="row no-wrap">
        <q-separator vertical />
        <div class="col-6 q-pl-sm">
          <div class="q-mb-sm text-bold">21</div>
          <div class="text-grey-7  ">36.52%</div>
          <div class="text-grey text-26">New patients</div>
          <q-linear-progress
            :value="0.3652"
            color="light-blue"
            class="progress-bar"
            style="width: 50px"
          />
        </div>

        <q-separator vertical />
        <div class="col-6 q-pl-sm">
          <div class="text-bold q-mb-sm">142</div>
          <div class="text-grey-7  ">61.41%</div>
          <div class="text-grey">Returning patients</div>
          <q-linear-progress
            :value="0.6141"
            color="grey-4"
            class="progress-bar"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
.patients {
  border: 1px solid #edeeef;
  border-radius: 10px;
  box-shadow: none;
  width: 100%;

  &-card {
    border-radius: 12px;
  }

  &__title {
    font-size: 18px;
    font-weight: bold;
  }

  :deep(.q-field__control) {
    border-radius: 10px;
  }

  &__total {
    &-title {
      margin: 0;
      font-size: 14px;
      color: rgba(124, 132, 149, 255);
      text-transform: uppercase;
    }

    &-cash {
      font-size: 26px;
      font-weight: bold;
    }
  }
}

.progress-bar {
  height: 8px;
}

:deep(.q-field--outlined .q-field__control) {
  border-radius: 8px;
}
</style>

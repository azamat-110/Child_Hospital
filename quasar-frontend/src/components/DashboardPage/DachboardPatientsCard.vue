<script setup>
import { ref } from "vue";

const timeRange = ref("Last 12 month");
const timeRanges = ["Last 12 month", "Last 6 month", "Last month"];
const newWidth = ref(36);
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
      <div class="patients__line">
        <div class="patients__line-new" :style="{ width: newWidth + '%' }">
          <div class="patients__line-new-content">
            <q-separator vertical   />
            <div class="flex column">
              <span class="text-bold">21</span>
              <div class="column">
                <span class="q-pt-md">36.52%</span>
                <p class="text-caption">New patients</p>
              </div>
            </div>
          </div>
        </div>
        <div class="patients__line-return">
          <div class="patients__line-return-content">
            <q-separator vertical  />
            <div class="flex column">
              <span class="text-bold">142</span>
              <div class="column">
                <span class="q-pt-md">61.41%</span>
                <p class="text-caption">Returning patients</p>
              </div>
            </div>
          </div>
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
  height: 50%;

  &__line {
    width: 100%;
    height: 10px;
    display: flex;
    margin-top: 100px;

    &-new {
      height: 100%;
      background: rgba(96, 176, 255, 255);
      position: relative;

      &-content {
        display: flex;
        gap: 15px;
        width: 100%;
        height: 100px;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }

    &-return {
      height: 100%;
      position: relative;

      &-content {
        width: 100%;
        height: 100px;
        display: flex;
        gap: 15px;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }

    &-return {
      width: 70%;
      height: 100%;
      margin-left: 3px;
      background: repeating-linear-gradient(
        90deg,
        rgb(168, 168, 168) 0px,
        rgb(168, 168, 168) 1px,
        rgba(255, 255, 255, 0.2) 1px,
        rgba(255, 255, 255, 0.2) 4px
      );
    }
  }

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

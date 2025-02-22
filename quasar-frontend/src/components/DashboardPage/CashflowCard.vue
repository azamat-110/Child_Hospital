<script setup>
import { onMounted, ref } from "vue";
import Chart from "chart.js/auto";

const timeRange = ref("Last 12 month");
const timeRanges = ["Last 12 month", "Last 6 month", "Last month"];
const percentage = ref("4.51%");
const chartRef = ref(null);
const chartInstance = ref(null);

const monthlyData = [
  2000, 2200, 1800, 4500, 5000, 10897, 6000, 7000, 9000, 10000, 10500, 11000,
];
const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const createChart = () => {
  if (chartRef.value && !chartInstance.value) {
    const ctx = chartRef.value.getContext("2d");

    chartInstance.value = new Chart(ctx, {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            data: monthlyData,
            borderColor: "#2196F3",
            backgroundColor: "rgba(33, 150, 243, 0.1)",
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: "#2196F3",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        tooltip: {
          backgroundColor: "#1d2939",
          titleFont: {
            size: 13,
          },
          bodyFont: {
            size: 12,
          },
          padding: 12,
          displayColors: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false, // Включаем сетку
          },
          ticks: {
            font: {
              size: 11,
            },
            color: "#64748b",
          },
        },
        y: {
          beginAtZero: true,
          max: 12000,
          ticks: {
            stepSize: 2000,
            callback: function (value) {
              return value === 0 ? "0" : `${value / 1000}K`;
            },
            font: {
              size: 11,
            },
            color: "#64748b",
          },
          grid: {
            color: "#e2e8f0",
          },
        },
      },
    });
  }
};

onMounted(() => {
  createChart();
});
</script>

<template>
  <q-card class="cashflow">
    <q-card-section class="q-pa-md">
      <div class="row items-center justify-between" style="gap: 15px">
        <h2 class="text-h6 q-ma-none cashflow__title">Cashflow</h2>
        <q-select
          v-model="timeRange"
          :options="timeRanges"
          outlined
          dense
          input-class="cashflow__select"
        />
      </div>
      <h3 class="text-h6 q-mr-sm cashflow__total-title">Total cash</h3>
      <div class="q-mb-sm flex justify-between items-center">
        <div class="flex items-center">
          <span class="cashflow__total-cash">$134 422</span>
          <q-chip
            color="green-11"
            text-color="black"
            class="flex items-center q-ml-md"
          >
            <q-icon name="arrow_upward" class="q-mr-xs" size="15px" />
            {{ percentage }}
          </q-chip>
        </div>
        <div class="text-subtitle1 text-grey-7 text-bold">
          January 15 - December 15
        </div>
      </div>

      <div class="chart" style="height: 250px; position: relative">
        <canvas ref="chartRef"></canvas>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
.cashflow {
  border: 1px solid #edeeef;
  border-radius: 10px;
  box-shadow: none;
  width: 100%;

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
      font-size: 12px;
      color: rgba(124, 132, 149, 255);
      font-weight: bold;
      text-transform: uppercase;
    }

    &-cash {
      font-size: 26px;
      font-weight: bold;

    }
  }
}
</style>

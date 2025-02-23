<script setup>
import { onMounted, ref } from "vue";
import Chart from "chart.js/auto";

const timeRange = ref("Last 12 month");
const timeRanges = ["Last 12 month", "Last 6 month", "Last month"];
const expensesChart = ref(null);
const expensesChartInstance = ref(null);
const totalExpense = [
  "Rental costs",
  "Wages",
  "Medical Equipments",
  "Supplies",
  "Promotion costs",
  "Other",
];
const totalExpenseValue = [30, 22, 20, 18, 12, 8];
const totalExpenseColor = [
  "rgb(150,104,247)",
  "rgb(153,230,109)",
  "rgb(52,179,241)",
  "rgb(241,0,44)",
  "rgb(254,127,0)",
  "rgb(255,213,0)",
];

const centerText = {
  id: "customCenterText",
  beforeDatasetsDraw(chart) {
    const { width, height, ctx } = chart;
    ctx.save();
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText("Total Expense", width / 2, height / 2 - 10);
    ctx.font = "bold 18px Mulish";
    ctx.fillText("$80,832", width / 2, height / 2 + 10);

    ctx.restore();
  },
};

const innerDashedCircle = {
  id: "innerDashedCircle",
  beforeDraw(chart) {
    console.log(chart.data);
    const { ctx, chartArea } = chart;
    const { width, height } = chartArea;
    const centerX = width / 2 + chartArea.left;
    const centerY = height / 2 + chartArea.top;
    const radius = Math.min(width, height) / 2.8;
    const lineCount = 100;
    const lineLength = 5;

    ctx.save();
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 1;
    for (let i = 0; i < lineCount; i++) {
      const angle = (i / lineCount) * (2 * Math.PI);
      const xStart = centerX + radius * Math.cos(angle);
      const yStart = centerY + radius * Math.sin(angle);
      const xEnd = centerX + (radius - lineLength) * Math.cos(angle);
      const yEnd = centerY + (radius - lineLength) * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(xStart, yStart);
      ctx.lineTo(xEnd, yEnd);
      ctx.stroke();
    }
    ctx.restore();
  },
};

const createChart = () => {
  const ctx = expensesChart.value.getContext("2d");

  expensesChartInstance.value = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: totalExpense,
      datasets: [
        {
          label: "Value",
          data: totalExpenseValue,
          backgroundColor: totalExpenseColor,
          borderColor: "white",
          borderWidth: 1,
          cutout: "88%",
          borderRadius: 100,
          spacing: -100,
        },
      ],
    },
    options: {
      interaction: {
        mode: null,
      },
      hover: {
        mode: null,
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
    },
    plugins: [centerText, innerDashedCircle],
  });
};

onMounted(() => {
  createChart();
});
</script>

<template>
  <q-card class="expenses">
    <q-card-section class="q-pa-md">
      <div class="row items-center justify-between q-mb-sm">
        <h2 class="text-h6 q-ma-none expenses__title">Expenses</h2>
        <q-select v-model="timeRange" :options="timeRanges" outlined dense />
      </div>
      <div class="expenses__content">
        <div class="expenses__chart">
          <canvas ref="expensesChart" style="width: 150px"></canvas>
        </div>
        <div class="expenses__chart-descr">
          <div
            class="expenses__chart-descr-content"
            v-for="(expense, index) in totalExpense"
            :key="index"
          >
            <div class="expenses__chart-descr-title">
              <span>{{ expense }}</span>
              <div
                class="expenses__chart-descr-color"
                :style="{ background: totalExpenseColor[index] }"
              ></div>
            </div>
            <span class="expenses__chart-descr-percentage"
              >{{ totalExpenseValue[index] }}%</span
            >
          </div>
        </div>
      </div>
      <div class="expenses__top">
        <span class="expenses__top-title">Total expenses</span>
        <div class="expenses__top-content">
          <div
            class="expenses__top-card"
            v-for="(expense, index) in totalExpense.slice(0, 4)"
            :key="index"
          >
            <div class="expenses__chart-descr-title">
              <span>{{ expense }}</span>
              <div
                class="expenses__chart-descr-color"
                :style="{ background: totalExpenseColor[index] }"
              ></div>
            </div>
            <div class="expenses__top-card-value">
              ${{ totalExpenseValue[index] * 550 }}
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
.expenses {
  border: 1px solid #edeeef;
  border-radius: 10px;
  box-shadow: none;
  width: 100%;

  &__top {
    &-title {
      font-size: 10px;
      color: rgba(124, 132, 149, 255);
      font-weight: bold;
      text-transform: uppercase;
    }

    &-content {
      padding-top: 5px;
      display: grid;
      gap: 10px;
      grid-template-columns: 1fr 1fr;
    }

    &-card {
      padding: 10px;
      background: rgba(249, 251, 252, 255);
      border-radius: 10px;

      &-value {
        padding-top: 5px;
        font-size: 12px;
        text-transform: uppercase;
        line-height: 1.1;
        font-weight: bold;
        margin-left: 20px;
      }
    }
  }

  &__chart {
    height: 200px;
    position: relative;

    &-descr {
      width: 100%;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;

      &-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      &-color {
        width: 10px;
        height: 5px;
        border-radius: 5px;
        position: absolute;
        top: 4px;
        left: -15px;
      }

      &-title {
        position: relative;
        font-size: 10px;
        color: rgba(124, 132, 149, 255);
        line-height: 1.1;
        font-weight: bold;
        margin-left: 20px;
      }

      &-percentage {
        font-size: 10px;
        text-transform: uppercase;
        line-height: 1.1;
        font-weight: bold;
        margin-left: 20px;
      }
    }
  }

  &__title {
    font-size: 18px;
    font-weight: bold;
  }

  &__content {
    display: flex;
  }

  :deep(.q-field__control) {
    border-radius: 10px;
  }
}
</style>

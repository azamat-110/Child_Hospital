<template>
  <q-card class="cashflow-card">
    <q-card-section>
      <!-- Header -->
      <div class="row items-center justify-between q-mb-md">
        <div class="text-h6">Cashflow</div>
        <q-select
          v-model="timeRange"
          :options="timeRanges"
          outlined
          dense
          style="width: 150px"
        />
      </div>

      <!-- Total Cash -->
      <div class="row items-center q-mb-lg">
        <div class="text-h4 q-mr-sm">${{ formatNumber(totalCash) }}</div>
        <q-chip
          dense
          color="green-7"
          text-color="white"
          class="percentage-chip"
        >
          <q-icon name="arrow_upward" size="sm" />
          {{ percentage }}%
        </q-chip>
      </div>

      <!-- Date Range -->
      <div class="text-subtitle1 text-grey-7 q-mb-md">
        January 2022 - December 2022
      </div>

      <!-- Chart -->
      <div class="chart-container" style="height: 300px; position: relative;">
        <canvas ref="chartRef"></canvas>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

// Data
const timeRange = ref('Last 12 month')
const timeRanges = ['Last 12 month', 'Last 6 months', 'Last 3 months']
const totalCash = 130232
const percentage = 4.51
const chartRef = ref(null)

// Chart data
const monthlyData = [2000, 2200, 1800, 4500, 5000, 10897, 6000, 7000, 9000, 10000, 10500, 11000]
const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

// Format number with commas
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Initialize chart
onMounted(() => {
  const ctx = chartRef.value.getContext('2d')

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        data: monthlyData,
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#2196F3',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#1d2939',
          titleFont: {
            size: 13
          },
          bodyFont: {
            size: 12
          },
          padding: 12,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return `Total: $${formatNumber(context.parsed.y)}`
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: 11
            },
            color: '#64748b'
          }
        },
        y: {
          beginAtZero: true,
          max: 12000,
          ticks: {
            stepSize: 2000,
            callback: function(value) {
              return value === 0 ? '0' : `${value/1000}K`
            },
            font: {
              size: 11
            },
            color: '#64748b'
          },
          grid: {
            color: '#e2e8f0'
          }
        }
      }
    }
  })
})
</script>

<style scoped>
.cashflow-card {
  border-radius: 12px;
}

.percentage-chip {
  height: 24px;
}

:deep(.q-chip__content) {
  padding: 0 4px;
}

:deep(.q-field--outlined .q-field__control) {
  border-radius: 8px;
}
</style>

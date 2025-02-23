<script setup>


const stockCategories = ["Available", "Low Stock", "Out of stock"];

const stockCategoryColor = [
  "rgb(21, 203, 203)",
  "rgb(247, 183, 8)",
  "rgb(243,24,24)",
];

const stockLowItems = [
  {
    title: "Dental Brush",
    qty: 3,
  },
  {
    title: "Charmflex Regular",
    qty: 2,
  },
];
</script>

<template>
  <q-card class="stock">
    <q-card-section class="q-pa-md">
      <h2 class="text-h6 q-ma-none stock__title">Stock availability</h2>
      <div class="stock__total">
        <div class="stock__total-asset">
          <span>Total asset</span>
          <div>$53,000</div>
        </div>
        <div class="stock__total-product">
          <span>Total product</span>
          <div>442</div>
        </div>
      </div>
      <div class="stock__line">
        <div
          class="stock__line-availability"
          style="width: 60%; background: rgb(21, 203, 203)"
        ></div>
        <div
          class="stock__line-low"
          style="width: 25%; background: rgb(247, 183, 8)"
        ></div>
        <div
          class="stock__line-out"
          style="width: 15%; background: rgb(243,24,24)"
        ></div>
      </div>

      <div class="stock__line-title">
        <div
          class="stock__line-title-value"
          v-for="(category, index) in stockCategories"
          :key="index"
        >
          <div
            class="stock__line-title-value-color"
            :style="{ background: stockCategoryColor[index] }"
          ></div>
          <span>{{ category }}</span>
        </div>
      </div>
      <q-separator class="q-mt-lg" />
      <div class="stock__low">
        <div class="stock__low-title">
          <div>Low Stock</div>
          <a href="" class="stock__low-title-link">View All</a>
        </div>
        <div
          class="stock__low-items"
          v-for="(item, index) in stockLowItems"
          :key="index"
        >
          <div class="stock__low-items-title">{{ item.title }}</div>
          <div class="flex items-center" style="gap: 10px">
            <div class="stock__low-items-qty">Qty: {{ item.qty }}</div>
            <q-separator vertical />
            <button class="stock__low-items-order">Order</button>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
.stock {
  border: 1px solid #edeeef;
  border-radius: 10px;
  box-shadow: none;
  width: 100%;
  flex: 1;

  &__low {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding-top: 10px;

    &-items {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      background: rgba(249, 251, 252, 255);
      border-radius: 10px;

      &-qty {
        font-size: 14px;
        font-weight: 600;
      }

      &-order {
        font-size: 12px;
        font-weight: bold;
        color: #2563eb;
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
      }
    }

    &-title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      & div {
        font-size: 12px;
        color: rgba(124, 132, 149, 255);
        font-weight: bold;
        text-transform: uppercase;
      }

      & a {
        color: #2563eb;
        text-decoration: none;
        font-size: 14px;
        font-weight: bold;
      }

    }
  }

  &__line {
    width: 100%;
    display: flex;
    gap: 2px;
    padding-top: 15px;

    & div {
      height: 10px;
      border-radius: 3px;
    }

    &-title {
      display: flex;
      gap: 15px;
      padding-top: 15px;

      &-value {
        display: flex;
        align-items: center;
        gap: 5px;

        & span {
          font-size: 12px;
          color: rgba(124, 132, 149, 255);
          line-height: 1.1;
          font-weight: bold;
        }

        &-color {
          width: 8px;
          height: 8px;
          border-radius: 2px;
        }
      }
    }
  }

  &__title {
    font-size: 18px;
    font-weight: bold;
  }

  &__total {
    display: flex;
    padding-top: 20px;

    & span {
      font-size: 12px;
      color: rgba(124, 132, 149, 255);
      font-weight: bold;
      text-transform: uppercase;
    }

    &-asset {
      width: 50%;

      & div {
        font-size: 16px;
        padding-top: 5px;
        text-transform: uppercase;
        line-height: 1.1;
        font-weight: bold;
      }
    }

    &-product {
      width: 50%;

      & div {
        font-size: 16px;
        padding-top: 5px;
        text-transform: uppercase;
        line-height: 1.1;
        font-weight: bold;
      }
    }
  }
}
</style>

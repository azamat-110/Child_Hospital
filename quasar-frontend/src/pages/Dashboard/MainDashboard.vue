<script setup>
import CashflowCard from "components/DashboardPage/CashflowCard.vue";
import IncomeCard from "components/DashboardPage/IncomeCard.vue";
import DachboardPatientsCard from "components/DashboardPage/DachboardPatientsCard.vue";
import PopularTreatmentCard from "components/DashboardPage/PopularTreatmentCard.vue";
import ExpencesCard from "components/DashboardPage/ExpencesCard.vue";
import StockCard from "components/DashboardPage/StockCard.vue";
</script>

<template>
  <div class="dashboard q-pa-lg">
    <div class="dashboard__header">
      <h1 class="dashboard__header-title">Good morning, John!</h1>
      <p class="dashboard__header-date">Wednesday, December 8, 2025</p>
    </div>
    <div class="dashboard__content">
      <div class="left__side flex column" style="gap: 24px; width: 70%">
        <CashflowCard />

        <div
          class="left__side-bottom flex row no-wrap"
          style="gap: 24px; max-height: 50%"
        >
          <IncomeCard />
          <div
            class="left__side-bottom-right column"
            style="gap: 24px; width: 50%"
          >
            <DachboardPatientsCard class="fill-height" />
            <PopularTreatmentCard class="fill-height" />
          </div>
        </div>
      </div>

      <div class="right__side flex column" style="gap: 24px; width: 30%">
        <ExpencesCard />
        <StockCard />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__content {
    display: flex;
    width: 100%;
    gap: 24px;
    align-items: stretch;
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: 5px;

    &-title {
      font-size: 26px;
      font-weight: bold;
      margin: 0;
      line-height: 1.3;
    }
  }
}

.left__side-bottom {
  display: flex;
  gap: 24px;
  max-height: 500px; /* Можно менять, чтобы контролировать высоту */
  width: 100%;

  & > * {
    flex: 1; /* Оба элемента займут одинаковую ширину */
    min-width: 0; /* Важно для адаптивности */
  }

  &-right {
    display: flex;
    flex-direction: column;
    gap: 24px;
    flex: 1;

    & > * {
      flex: 1; /* Карточки внутри будут одинакового размера */
    }
  }
}

.right__side {
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 24px;

  &__side > * {
    flex-grow: 1; /* Равномерное распределение высоты */
  }
}
</style>

<script setup>
import CashflowCard from "components/Dashboard/CashflowCard.vue";
import IncomeCard from "components/Dashboard/IncomeCard.vue";
import DachboardPatientsCard from "components/Dashboard/DachboardPatientsCard.vue";
import PopularTreatmentCard from "components/Dashboard/PopularTreatmentCard.vue";
import ExpencesCard from "components/Dashboard/ExpencesCard.vue";
import StockCard from "components/Dashboard/StockCard.vue";
</script>

<template>
  <div class="dashboard q-pa-lg">
    <div class="dashboard__header">
      <h1 class="dashboard__header-title">Good morning, John!</h1>
      <p class="dashboard__header-date">Wednesday, December 8, 2025</p>
    </div>
    <div class="dashboard__content">

      <div class="left__side flex" style="gap: 15px; min-width: 550px;">
        <CashflowCard />
        <div class="left__side-bottom flex no-wrap" style="gap: 15px">
          <IncomeCard />
          <div class="left__side-bottom-right flex" style="gap: 15px">
            <DachboardPatientsCard />
            <PopularTreatmentCard />
          </div>
        </div>
      </div>

      <div class="right__side flex" style="gap: 15px;min-width: 350px; ">
        <ExpencesCard />
        <StockCard />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard {

    max-width: 1250px;
    margin: 0 auto;
    //padding: 0 15px; // Боковые отступы
    display: flex;
    flex-direction: column;
    gap: 20px; // Расстояние между карточками



  &__content {
    display: flex;
    justify-content: center;
    gap: 15px;
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
</style>

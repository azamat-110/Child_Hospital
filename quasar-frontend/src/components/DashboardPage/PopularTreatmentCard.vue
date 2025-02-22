<script setup>

const treatments = [
  {
    id: 1,
    title: "Scaling Teeth",
    rate: 4.7,
  },
  {
    id: 2,
    title: "Tooth extraction",
    rate: 4.4,
  },
  {
    id: 3,
    title: "General checkup",
    rate: 4.6
  }
]

</script>

<template>
  <q-card class="treatment">
    <q-card-section class="q-pa-md">
      <h2 class="text-h6 q-ma-none treatment__title">Popular Treatment</h2>
      <div class="treatment__ratings">
        <div class="treatment__ratings-content" v-for="treatment in treatments" :key="treatment.id">
          <div class="treatment__ratings-content-title">
            <q-separator class="separator" vertical />
            {{treatment.title}}
          </div>
          <div class="treatment__ratings-content-rate">
            <q-icon name="star" color="yellow-14" size="15px" class="q-pa-none"/>
            <span>{{treatment.rate}}</span>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
.treatment {
  border: 1px solid #edeeef;
  border-radius: 10px;
  box-shadow: none;
  width: 100%;

  &__ratings {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    gap: 10px;

    &-content {
      display: flex;
      justify-content: space-between;
      &-title {
        display: flex;
        align-items: center;
        gap: 5px;
        height: 16px;
      }

      &-rate{
        display: flex;
        align-items: center;
        padding: 2px 5px;
        background: rgba(247,250,251,255);
        border-radius: 5px;
      }
    }
  }

  &__title {
    font-size: 18px;
    font-weight: bold;
  }
}

.separator {
  width: 3px;
  border-radius: 5px;
  background: rgba(168,171,182,255);
}
</style>

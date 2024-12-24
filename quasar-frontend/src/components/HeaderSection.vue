<script setup>
import { useAuthStore } from "stores/authStore";

const authStore = useAuthStore();
</script>

<template>
  <header class="info__section q-px-xl q-py-md">
    <header class="info__toolbar">
      <img src="../assets/images/clinicLogo.svg" alt="clinic" />
      <div class="info__toolbar-title">Children's<br />Hospital</div>
      <div class="info__toolbar-line"></div>
      <div class="info__toolbar-description">
        The Medical Center equipped<br />with Advanced equipment
      </div>
      <!--    <div v-if="authStore.role === 1" class="admin-title">Admin Panel</div>-->
    </header>
    <div class="info__section-contacts">
      <p>
        <q-icon name="call" size="sm" />
        +998 (97) 770-07-07
      </p>
      <p>
        <q-icon name="mail" size="sm" />
        info@hospital.com
      </p>
    </div>
  </header>
</template>

<style scoped lang="scss">
.info {
  &__section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 4rem;
    background: #fff;
    transition: 0.5s;

    &-contacts {
      display: flex;
      gap: 1rem;
      font-size: 1rem;

      & p{
        margin: 0;
      }
    }
  }

  &__toolbar {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &-title {
      font-weight: bold;
      color: #000;
      font-size: 1.5rem;
      line-height: 1.1;
      text-align: left;
    }

    &-line {
      height: 1px;
      width: 50px;
      transform: rotate(90deg);
      background: #787878;
      margin: 0 -1rem;
    }

    &-description {
      font-size: 1rem;
      color: #787878;
      line-height: 1.4;
      text-align: left;
    }
  }
}
</style>

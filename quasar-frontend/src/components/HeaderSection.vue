<script setup>
import { useAuthStore } from "stores/authStore";
import { useThemeStore } from "stores/useThemeStore";
import { useQuasar } from "quasar";
import { computed, ref } from "vue";
import clinicLogoLight from "../assets/images/clinicLogoLight.svg";
import clinicLogoDark from "../assets/images/clinicLogoDark.svg";

const $q = useQuasar();
const authStore = useAuthStore();
const themeStore = useThemeStore();

const currentLanguage = ref("EN");
const darkTheme = themeStore.darkTheme;
const toggleTheme = themeStore.toggleTheme;
const isDarkTheme = computed(() => $q.dark.isActive);

const changeLanguage = (lang) => {
  currentLanguage.value = lang;
};
</script>

<template>
  <header class="info__section q-px-xl q-py-md" :class="{ dark: isDarkTheme }">
    <header class="info__toolbar">
      <img :src="isDarkTheme ? clinicLogoLight : clinicLogoDark" alt="clinic" />
      <div class="info__toolbar-title" :class="{ dark__title: isDarkTheme }">
        Children's
        <br />
        Hospital
      </div>
      <div class="info__toolbar-line"></div>
      <div class="info__toolbar-description">
        The Medical Center equipped
        <br />
        with Advanced equipment
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
      <q-btn :label="currentLanguage" rounded icon="language" push flat>
        <q-menu
          transition-show="jump-down"
          transition-hide="jump-up"
          anchor="bottom middle"
          self="top middle"
          auto-close
        >
          <q-list style="min-width: 100px">
            <q-item clickable @click="changeLanguage('UZ')">
              <q-item-section class="text-center">Uzbek</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable @click="changeLanguage('RU')">
              <q-item-section class="text-center">Russian</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable @click="changeLanguage('EN')">
              <q-item-section class="text-center">English</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-toggle
        v-model="darkTheme"
        :color="darkTheme ? 'grey' : 'grey-10'"
        :icon="darkTheme ? 'dark_mode' : 'light_mode'"
        :label="darkTheme ? 'Dark' : 'Light'"
        size="lg"
        @click="toggleTheme($q)"
      />
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
    background: rgb(255, 255, 255);
    transition: 0.5s;

    &-contacts {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 1rem;

      & p {
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

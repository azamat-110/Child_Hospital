<script setup>
import { useThemeStore } from "stores/useThemeStore";
import { useQuasar } from "quasar";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import clinicLogoLight from "../assets/images/clinicLogoLight.svg";
import clinicLogoDark from "../assets/images/clinicLogoDark.svg";

const $q = useQuasar();
const { locale } = useI18n();
const themeStore = useThemeStore();
const savedLanguage = localStorage.getItem("app-locale") || "en";
const savedTheme = localStorage.getItem("app-theme") || "light";
const currentLanguage = ref(savedLanguage.toUpperCase());

const isDarkTheme = computed({
  get: () => themeStore.darkTheme,
  set: (value) => {
    themeStore.setTheme(value, $q);
    localStorage.setItem("app-theme", value ? "dark" : "light");
  },
});

if (savedTheme === "dark") {
  themeStore.setTheme(true, $q);
} else {
  themeStore.setTheme(false, $q);
}

const changeLanguage = (lang) => {
  currentLanguage.value = lang;
  const newLocale = lang.toLowerCase();
  locale.value = newLocale;
  localStorage.setItem("app-locale", newLocale);
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
      <div
        class="info__toolbar-description"
        v-html="$t('headerSection.description').replace('\n', '<br/>')"
      ></div>
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
      <q-btn
        :label="currentLanguage"
        icon="language"
        rounded
        flat
        style="min-width: 90px"
      >
        <q-menu
          transition-show="jump-down"
          transition-hide="jump-up"
          anchor="bottom middle"
          self="top middle"
          auto-close
          :class="{ dark__shadow: isDarkTheme }"
        >
          <q-list style="min-width: 100px">
            <q-item clickable @click="changeLanguage('UZ')">
              <q-item-section class="text-center">
                {{ $t("headerSection.language.uz") }}
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable @click="changeLanguage('RU')">
              <q-item-section class="text-center">
                {{ $t("headerSection.language.ru") }}
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable @click="changeLanguage('EN')">
              <q-item-section class="text-center">
                {{ $t("headerSection.language.en") }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-toggle
        v-model="isDarkTheme"
        :color="isDarkTheme ? 'grey' : 'grey-10'"
        :icon="isDarkTheme ? 'dark_mode' : 'light_mode'"
        :label="
          isDarkTheme
            ? `${$t('headerSection.dark')}`
            : `${$t('headerSection.light')}`
        "
        size="lg"
        style="min-width: 110px"
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

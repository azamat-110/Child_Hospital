<script setup>
import { ref, computed } from "vue";
import clinicLogoLight from "assets/images/clinicLogoLight.svg";
import { useThemeStore } from "stores/useThemeStore";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import LogOutBtn from "components/LogOutBtn.vue";
import { useAuthStore } from "stores/authStore";

const $q = useQuasar();
const { locale } = useI18n();
const themeStore = useThemeStore();
const savedLanguage = localStorage.getItem("app-locale") || "en";
const savedTheme = localStorage.getItem("app-theme") || "light";
const currentLanguage = ref(savedLanguage.toUpperCase());
const authStore = useAuthStore();
const emit = defineEmits(["leftDrawerOpen"]);

const leftDrawerOpen = ref(true);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
  console.log(leftDrawerOpen.value);
  emit("leftDrawerOpen", leftDrawerOpen.value);
};

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
  <q-header
    bordered
    :class="{ 'bg-secondary': isDarkTheme, dark__shadow: isDarkTheme }"
    class="header q-py-sm"
  >
    <q-toolbar class="header__content">
      <div class="header__content-menu">
        <q-btn
          round
          flat
          icon="menu"
          @click="toggleLeftDrawer"
          color="black"
          style="height: 40px"
        />
        <q-item class="header__title text-black"> Dashboard</q-item>
      </div>
      <q-input
        dense
        rounded
        color="primary"
        outlined
        v-model="text"
        label="Search for anything here..."
        class="header__input"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <div class="header__utility">
        <q-btn icon="help_outline" flat color="grey-6" unelevated round />
        <q-btn icon="monitor_heart" flat color="grey-6" unelevated round />
        <q-btn
          icon="settings"
          flat
          color="grey-6"
          unelevated
          round
          class="q-mr-sm"
        />
        <q-separator vertical color="grey-4" />
        <div class="header__utility-notification q-px-md">
          <q-btn
            icon="notifications"
            size="sm"
            unelevated
            round
            color="green-2"
            text-color="green-6"
          />
          <span>1/4</span>
        </div>
        <q-separator vertical color="grey-4" />
        <div class="header__utility-profile q-px-md">
          <q-btn round unelevated>
            <q-avatar size="40px">
              <q-icon name="account_circle" color="black" />
            </q-avatar>
          </q-btn>
          <div class="header__utility-profile-name">
            Darrel Steward<br />
            <span>Super admin</span>
          </div>
          <q-btn icon="expand_more" color="grey-6" round unelevated flat>
            <q-menu
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[0, 15]"
            >
              <q-list style="min-width: 100px">
                <q-item clickable>
                  <q-item-section>Having fun</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Crazy for transitions</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>
                    <LogOutBtn class="q-ml-sm"/>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <!--        <q-btn-->
        <!--          :label="currentLanguage"-->
        <!--          icon="language"-->
        <!--          rounded-->
        <!--          flat-->
        <!--          style="min-width: 90px"-->
        <!--          class="text-black"-->
        <!--        >-->
        <!--          <q-menu-->
        <!--            transition-show="jump-down"-->
        <!--            transition-hide="jump-up"-->
        <!--            anchor="bottom middle"-->
        <!--            self="top middle"-->
        <!--            auto-close-->
        <!--            :class="{ dark__shadow: isDarkTheme }"-->
        <!--          >-->
        <!--            >-->
        <!--            <q-list style="min-width: 100px">-->
        <!--              <q-item clickable @click="changeLanguage('UZ')">-->
        <!--                <q-item-section class="text-center">-->
        <!--                  {{ $t("headerSection.language.uz") }}-->
        <!--                </q-item-section>-->
        <!--              </q-item>-->
        <!--              <q-separator />-->
        <!--              <q-item clickable @click="changeLanguage('RU')">-->
        <!--                <q-item-section class="text-center">-->
        <!--                  {{ $t("headerSection.language.ru") }}-->
        <!--                </q-item-section>-->
        <!--              </q-item>-->
        <!--              <q-separator />-->
        <!--              <q-item clickable @click="changeLanguage('EN')">-->
        <!--                <q-item-section class="text-center">-->
        <!--                  {{ $t("headerSection.language.en") }}-->
        <!--                </q-item-section>-->
        <!--              </q-item>-->
        <!--            </q-list>-->
        <!--          </q-menu>-->
        <!--        </q-btn>-->

        <!--        <q-toggle-->
        <!--          v-model="isDarkTheme"-->
        <!--          :color="isDarkTheme ? 'grey-7' : 'grey-10'"-->
        <!--          :icon="isDarkTheme ? 'dark_mode' : 'light_mode'"-->
        <!--          size="lg"-->
        <!--        />-->
        <!--        -->
      </div>
    </q-toolbar>
  </q-header>
</template>

<style scoped lang="scss">
.header {
  background: #fff;

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-menu {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__title {
    font-size: 24px;
    font-weight: bold;
  }

  &__input {
    min-width: 300px;
  }

  &__utility {
    display: flex;
    align-items: center;

    &-notification {
      display: flex;
      align-items: center;
      gap: 10px;

      & span {
        color: #000;
      }
    }

    &-profile {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: bold;
      color: #000;

      & span {
        color: #939393;
        font-weight: normal;
      }
    }
  }
}

.info {
  &__toolbar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-left: 1rem;

    &-title {
      font-weight: bold;
      color: #000;
      font-size: 1.3rem;
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

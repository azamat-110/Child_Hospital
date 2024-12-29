import { createI18n } from "vue-i18n";
import en from "../i18n/en.json";
import ru from "../i18n/ru.json";
import uz from "../i18n/uz.json";

export default ({ app }) => {
  // Получаем сохраненный язык или устанавливаем 'en' по умолчанию
  const savedLocale = localStorage.getItem("app-locale") || "en";

  const i18n = createI18n({
    legacy: false, // Используем Composition API
    globalInjection: true, // Включаем глобальную доступность $t()
    locale: savedLocale,
    messages: {
      en,
      ru,
      uz,
    },
  });

  app.use(i18n);

  // Добавляем метод для изменения языка
  app.config.globalProperties.$setLocale = (locale) => {
    i18n.global.locale.value = locale; // Меняем текущий язык
    localStorage.setItem("app-locale", locale); // Сохраняем в localStorage
  };
};

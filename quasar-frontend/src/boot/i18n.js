import { createI18n } from "vue-i18n";
import en from "../i18n/en.json";
import ru from "../i18n/ru.json";
import uz from "../i18n/uz.json";

export default ({ app }) => {
  const i18n = createI18n({
    locale: 'en',
    messages: {
      en,
      ru,
      uz,
    },
  });

  app.use(i18n);
};

import { createI18n } from "vue-i18n";
import RU from "./locales/ru.json";
import KZ from "./locales/kz.json";
import EN from "./locales/en.json";

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "EN",
    fallbackLocale: "EN",
    messages: {
        RU,
        KZ,
        EN,
    },
})

export default i18n
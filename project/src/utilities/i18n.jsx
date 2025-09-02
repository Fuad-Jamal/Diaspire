import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome",
          jobBoard: "Job Board",
          // ...add all your keys here
        }
      },
      fr: {
        translation: {
          welcome: "Bienvenue",
          jobBoard: "Tableau des emplois",
          // ...add all your keys here
        }
      },
      de: {
        translation: {
          welcome: "Willkommen",
          jobBoard: "Stellenbörse",
          // ...add all your keys here
        }
      }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          about: {
            title: 'About Us',
            subtitle: 'Your trusted partner in land development',
            statistics: {
              transactions: 'Total Transactions',
              clients: 'Satisfied Clients',
              area: 'Acres of Land',
              listings: 'Active Listings'
            },
            testimonials: {
              title: 'What Our Clients Say'
            },
            contact: {
              title: 'Get in Touch',
              description: 'Ready to start your journey with us?',
              button: 'Contact Us'
            }
          }
        }
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 
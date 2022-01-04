import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const resources = {
    en: {
        translation: {
            "ALLERGIES_NAME": "Allergies of {{name}}",
            "ATTEND_MESSAGE": "Please click on your name if you will attend to our wedding:",
            "ATTEND_PLURAL_MESSAGE": "Please click on the names of those who will attend to our wedding:",
            "BREAKFAST": "8:30  - Breakfast",
            "CEREMONY_DESCRIPTION": "14:00 - Wedding ceremony",
            "DIET_DESCRIPTION": "Is there anything you can't eat?",
            "DIET_PLURAL_DESCRIPTION": "Does anyone of you have allergies?",
            "DIET_WISHES": "Diet wishes",
            "DINNER_DESCRIPTION": "18:30 - Dinner",
            "DRINKS_DESCRIPTION": "17:00 - Drinks & snacks",
            "EMAIL_DESCRIPTION": "We need your e-mail to inform you of any last minute changes:",
            "EMAIL_HERE": "Enter your e-mail",
            "ENTER_YOUR_CODE": "Enter your code here",
            "PARTY_DESCRIPTION": "20:30 - Party",
            "REGISTERED": "You have registered.",
            "REGISTER_BUTTON": "Save",
            "REGISTER_HERE": "You can register here to attend our wedding.",
            "REMARKS": "If you have any remarks or can only partially attend, let us know.",
            "REMARKS_LABEL": "Remarks",
            "SATURDAY": "Saturday",
            "SLEEP_OVER": "You are also invited to stay for the night and eat breakfast with us the next morning. Let us know if you stay:",
            "SLEEP_OVER_PLURAL": "You are also invited to stay for the night and eat breakfast with us the next morning. Let us know who will stay:",
            "THE_PROGRAM_IS_AS_FOLLOWS": "The program is as follows:",
            "SUNDAY": "Sunday",
            "TITLE": "Leon & Sylvia",
            "YOUR_ATTENDANCE": "Attendance",
            "WE_HOPE_YOU_CAN_EVENT": "We hope you can join us at \"Slot Assumburg\" in Heemskerk. ",
            "WEDDING_INFO_TITLE": "Wedding info",
            "WELCOME_MESSAGE": "Welcome on the website for our wedding on 12 March 2022.",
        }
    },
    nl: {
        translation: {
            "ALLERGIES_NAME": "Allergie van {{name}}",
            "ATTEND_MESSAGE": "Klik op je naam als je aanwezig zal zijn:",
            "ATTEND_PLURAL_MESSAGE": "Klik op de namen van degenen die aanwezig zullen zijn:",
            "BREAKFAST": "8:30  - Ontbijt",
            "CEREMONY_DESCRIPTION": "14:00 - Huwelijksvoltrekking",
            "DIET_DESCRIPTION": "Is er iets wat je niet kan eten?",
            "DIET_WISHES": "Dieet wensen",
            "DINNER_DESCRIPTION": "18:30 - Dinerbuffet",
            "DRINKS_DESCRIPTION": "17:00 - Borrel",
            "EMAIL_DESCRIPTION": "We hebben je e-mail nodig om je te informeren over de bruiloft:",
            "EMAIL_HERE": "Vul je e-mail hier in",
            "ENTER_YOUR_CODE": "Vul hier je code in...",
            "PARTY_DESCRIPTION": "20:30 - Feest",
            "REGISTERED": "Je hebt je aangemeld!",
            "REGISTER_BUTTON": "Opslaan",
            "REGISTER_HERE": "Je kunt je hier aanmelden voor onze bruiloft.",
            "REMARKS": "Heb je vragen, opmerkingen?",
            "REMARKS_LABEL": "Opmerkingen",
            "SATURDAY": "Zaterdag",
            "SLEEP_OVER": "Je bent ook uitgenodigd om te overnachten in het kasteel inclusief ontbijt. Laat ons weten of je blijft slapen:",
            "SLEEP_OVER_PLURAL": "Jullie zijn ook uitgenodigd om te overnachten in het kasteel inclusief ontbijt. Laat ons weten of jullie blijven slapen:",
            "SUNDAY": "Zondag",
            "THE_PROGRAM_IS_AS_FOLLOWS": "Het programma ziet er als volgt uit:",
            "TITLE": "Leon & Sylvia",
            "YOUR_ATTENDANCE": "Aanmelding",
            "WE_HOPE_YOU_CAN_EVENT": "We hopen dat je aanwezig kan zijn op \"Slot Assumburg\" in Heemskerk.",
            "WEDDING_INFO_TITLE": "Bruiloft informatie",
            "WELCOME_MESSAGE": "Welkom op onze website voor onze bruiloft op 12 maart 2022.",
        }
    }
}

const locale = window.navigator.language === 'nl' || window.navigator.language === 'nl-NL' || window.navigator.language === 'be' || window.navigator.language === 'nl-BE' ? 'nl' : 'en';

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: locale,

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

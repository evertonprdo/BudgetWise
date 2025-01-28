import { getLocales, getCalendars } from 'expo-localization'

const locales = getLocales()[0]
const calendars = getCalendars()[0]

export const l10n = { ...locales, ...calendars }

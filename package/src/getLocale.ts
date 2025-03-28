
const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1).replace(/\./, '');

const getLocaleWeekday = ( dayIndex: number, locale: string): { short: string, long: string } => {
  const date = new Date(`1978-01-0${dayIndex + 1}T00:00:00.000Z`);
  const weekdayShort = date.toLocaleString(locale, { weekday: 'short', timeZone: 'UTC' });
  const weekdayLong = date.toLocaleString(locale, { weekday: 'long', timeZone: 'UTC' });

  return {
    short: capitalizeFirstLetter(weekdayShort),
    long: capitalizeFirstLetter(weekdayLong)
  }
}

const getLocaleMonth = (monthIndex: number, locale: string): { short: string, long: string } => {
  const date = new Date(`1978-${String(monthIndex + 1).padStart(2, '0')}-01T00:00:00.000Z`);
  const monthShort = date.toLocaleString(locale, { month: 'short', timeZone: 'UTC' });
  const monthLong = date.toLocaleString(locale, { month: 'long', timeZone: 'UTC' });

  return {
    short: capitalizeFirstLetter(monthShort),
    long: capitalizeFirstLetter(monthLong)
  }
}

export interface LocaleInfo {
  weekdays: {short: string, long: string}[],
  months: {short: string, long: string}[]
}

const getLocale = ({ locale }: { locale: string }): LocaleInfo => {
  return {
    weekdays: Array.from({ length: 7 }, (_, i) => getLocaleWeekday(i, locale)),
    months: Array.from({ length: 12 }, (_, i) => getLocaleMonth(i, locale))
  }
};

export default getLocale;

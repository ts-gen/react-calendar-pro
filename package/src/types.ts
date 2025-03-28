export type Reset = {
  year: boolean;
  month: boolean;
  dates: boolean | 'only-first';
  time: boolean;
  locale: boolean;
};

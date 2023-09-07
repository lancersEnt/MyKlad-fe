/* eslint-disable import/prefer-default-export */
export const dateToNormalFormat = (date: string) => {
  const d = new Date(date);
  return d.toString().slice(0, 21);
};

export const dateToMonthYear = (date: string) => {
  const d = new Date(date);

  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };

  const formatter = new Intl.DateTimeFormat('fr-FR', options);

  return formatter.format(d);
};

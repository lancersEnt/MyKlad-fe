/* eslint-disable import/prefer-default-export */
export const dateToNormalFormat = (date: string) => {
  const d = new Date(date);
  return d.toString().slice(0, 21);
};

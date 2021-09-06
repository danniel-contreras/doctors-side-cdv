import { setDate } from "date-fns";

export const filterDates = (quotes, option) => {
  const date = new Date();
  const tomorrow = new Date();
  if (Number(option) === 1) {
    const salesfilter =
      quotes &&
      quotes.filter(
        (qt) =>
          new Date(qt.date).getDay() === date.getDay() &&
          new Date(qt.date).getMonth() === date.getMonth() &&
          new Date(qt.date).getFullYear() === date.getFullYear()
      );
    return salesfilter;
  }
  if (Number(option) === 2) {
    tomorrow.setDate(tomorrow.getDate() + 6);
  }
  if (Number(option) === 3) {
    tomorrow.setDate(tomorrow.getDate() + 9);
  }
  if (Number(option) === 4) {
    tomorrow.setDate(tomorrow.getDate() + 32);
  }
  const salesfilter =
    quotes &&
    quotes.filter(
      (qt) =>
        new Date(qt.date).valueOf() >= date.valueOf() &&
        new Date(qt.date).valueOf() < tomorrow.valueOf()
    );
  return salesfilter;
};

export const nowDates = (quotes) => {
  const date = new Date();
  const salesfilter =
    quotes &&
    quotes.filter(
      (qt) =>
        new Date(qt.date).getDay() === date.getDay() &&
        new Date(qt.date).getMonth() === date.getMonth() &&
        new Date(qt.date).getFullYear() === date.getFullYear()
    );
  return salesfilter;
};

export const intervalDates = (initial, final, quotes) => {
  const ini = `${initial}T00:00`;
  const fn = `${final}T00:00`;
  const filter =
    quotes &&
    quotes.filter(
      (qt) =>
        new Date(qt?.date).valueOf() >= new Date(ini).valueOf() &&
        new Date(qt?.date).valueOf() <= new Date(fn).valueOf()
    );
  return filter;
};

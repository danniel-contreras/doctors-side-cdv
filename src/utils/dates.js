export const filterDates = (quotes, option) => {
  const date = new Date();
  const tomorrow = new Date();
  if (Number(option) === 1) {
    const salesfilter =
      quotes &&
      quotes.filter(
        (qt) =>
          new Date(qt.date).getDate() === date.getDate() &&
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
        new Date(qt.date).getDate() === date.getDate() &&
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

export const getEspecificDate = (date, quotes) => {
  const date_initial = new Date(`${date}T00:00`);
  const year = date_initial.getFullYear();
  const month = date_initial.getMonth();
  const day = date_initial.getDate();
  const filterQuotes =
    quotes &&
    quotes.filter(
      (qt) =>
        new Date(qt?.date).getFullYear() === year &&
        new Date(qt?.date).getMonth() === month &&
        new Date(qt?.date).getDate() === day
    );
  return filterQuotes;
};

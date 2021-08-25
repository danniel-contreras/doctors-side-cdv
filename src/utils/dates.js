export const filterDates = (quotes, option) => {
  if (Number(option) === 1) {
    const date = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 5);
    const salesfilter =
      quotes &&
      quotes.filter(
        (qt) =>
          new Date(qt.date).valueOf() >= date.valueOf() &&
          new Date(qt.date).valueOf() < tomorrow.valueOf()
      );
    return salesfilter;
  }
  if (Number(option) === 2) {
    const date = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 8);
    const salesfilter =
      quotes &&
      quotes.filter(
        (qt) =>
          new Date(qt.date).valueOf() >= date.valueOf() &&
          new Date(qt.date).valueOf() < tomorrow.valueOf()
      );
    return salesfilter;
  }
  if (Number(option) === 3) {
    const date = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 30);
    const salesfilter =
      quotes &&
      quotes.filter(
        (qt) =>
          new Date(qt.date).valueOf() >= date.valueOf() &&
          new Date(qt.date).valueOf() < tomorrow.valueOf()
      );
    return salesfilter;
  }
};

module.exports = (e) => {
  const date = new Date(e);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    timeZone: "UTC",
  });

  return formattedDate;
};

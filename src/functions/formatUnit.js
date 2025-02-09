module.exports = (unit) => {
  if (typeof unit !== "string" || !unit) {
    return "Invalid input"; // Handle undefined or non-string input
  }

  if (unit.includes(",")) {
    return unit;
  }

  const number = parseInt(unit, 10);
  return isNaN(number) ? "Invalid number" : number.toLocaleString("en-US");
};

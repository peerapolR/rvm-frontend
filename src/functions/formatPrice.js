module.exports = (price) => {
  const num = parseFloat(price); // Convert string to float
  if (isNaN(num)) return "Invalid number";
  return new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

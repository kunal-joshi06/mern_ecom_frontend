export function currency(num: number) {
  const formatCurrency = new Intl.NumberFormat("en-IN", {
    style: "currency",
    maximumSignificantDigits: 3,
    currency: "INR",
  }).format(num);
  return formatCurrency;
}

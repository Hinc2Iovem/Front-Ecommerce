const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function FormatCurrency(value: number) {
  return formatter.format(value);
}

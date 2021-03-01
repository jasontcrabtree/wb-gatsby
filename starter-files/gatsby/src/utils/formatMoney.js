const formatter = Intl.NumberFormat('en-NZ', {
  style: 'currency',
  currency: 'NZD',
});

export default function formatMoney(cents) {
  // divide by 100 because we want dollars not cents
  return formatter.format(cents / 100);
}

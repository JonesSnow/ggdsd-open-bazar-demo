const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const formatINR = (amount: number): string => inr.format(amount);

const dateFmt = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export const formatDate = (iso: string): string => {
  const date = new Date(`${iso}T00:00:00`);
  return Number.isNaN(date.getTime()) ? iso : dateFmt.format(date);
};

export const formatRating = (rating: number): string =>
  rating.toFixed(1);

export const pluralize = (count: number, singular: string, plural?: string): string => {
  if (count === 1) return `${count} ${singular}`;
  if (plural) return `${count} ${plural}`;

  const pluralForm = /[^aeiou]y$/i.test(singular)
    ? `${singular.slice(0, -1)}ies`
    : /(?:s|x|z|ch|sh)$/i.test(singular)
      ? `${singular}${/z$/i.test(singular) ? "z" : ""}es`
      : `${singular}s`;

  return `${count} ${pluralForm}`;
};

/** 24h "HH:MM" → "9:30 AM" */
export const formatTime = (time: string): string => {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
};

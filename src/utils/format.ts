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

export const pluralize = (count: number, singular: string, plural?: string): string =>
  `${count} ${count === 1 ? singular : (plural ?? `${singular}s`)}`;

/** 24h "HH:MM" → "9:30 AM" */
export const formatTime = (time: string): string => {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
};

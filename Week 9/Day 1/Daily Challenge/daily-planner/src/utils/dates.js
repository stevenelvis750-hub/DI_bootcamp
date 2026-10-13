// Dates are stored as "YYYY-MM-DD" strings (local time). Strings are safe to
// use as object keys and easy to serialize, unlike Date objects.

const pad = (n) => String(n).padStart(2, "0");

export const toKey = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const fromKey = (key) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const todayKey = () => toKey(new Date());

export const shiftDay = (key, days) => {
  const date = fromKey(key);
  date.setDate(date.getDate() + days);
  return toKey(date);
};

export const formatLong = (key) =>
  fromKey(key).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

// The 7 days (Sun-Sat) of the week that contains `key`.
export const weekOf = (key) => {
  const start = shiftDay(key, -fromKey(key).getDay());
  return Array.from({ length: 7 }, (_, i) => shiftDay(start, i));
};

export const dayName = (key) =>
  fromKey(key).toLocaleDateString(undefined, { weekday: "short" });

export const dayNumber = (key) => fromKey(key).getDate();
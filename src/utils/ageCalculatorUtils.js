import { format, intervalToDuration, isFuture } from "date-fns";

const DAY_MAX_LENGTH = 2;
const MONTH_MAX_LENGTH = 2;
const YEAR_MAX_LENGTH = 4;

function onlyDigits(value) {
  return value.replace(/\D/g, "");
}

function sanitizeByRange(value, { min, max, maxLength }) {
  const sanitized = onlyDigits(value).slice(0, maxLength);

  if (sanitized === "") {
    return "";
  }

  const numericValue = Number(sanitized);

  if (numericValue < min || numericValue > max) {
    return "";
  }

  return sanitized;
}

export function sanitizeDay(value) {
  return sanitizeByRange(value, { min: 1, max: 31, maxLength: DAY_MAX_LENGTH });
}

export function sanitizeMonth(value) {
  return sanitizeByRange(value, { min: 1, max: 12, maxLength: MONTH_MAX_LENGTH });
}

export function sanitizeYear(value) {
  const currentYear = new Date().getFullYear();

  return sanitizeByRange(value, {
    min: 1,
    max: currentYear,
    maxLength: YEAR_MAX_LENGTH,
  });
}

export function parseBirthDate({ day, month, year }) {
  const numericDay = Number(day);
  const numericMonth = Number(month);
  const numericYear = Number(year);

  const candidateDate = new Date(numericYear, numericMonth - 1, numericDay);

  const sameDay = candidateDate.getDate() === numericDay;
  const sameMonth = candidateDate.getMonth() === numericMonth - 1;
  const sameYear = candidateDate.getFullYear() === numericYear;

  if (!sameDay || !sameMonth || !sameYear) {
    return null;
  }

  if (isFuture(candidateDate)) {
    return null;
  }

  return candidateDate;
}

export function calculateAge(birthDate, referenceDate = new Date()) {
  const duration = intervalToDuration({ start: birthDate, end: referenceDate });

  return {
    years: duration.years ?? 0,
    months: duration.months ?? 0,
    days: duration.days ?? 0,
  };
}

export function formatBirthDate(date) {
  return format(date, "dd/MM/yyyy");
}
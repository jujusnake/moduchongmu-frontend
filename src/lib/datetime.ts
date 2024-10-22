import { differenceInDays, format, getYear, parseISO } from 'date-fns';

const parseDateStr = (dateStr: string, formatStr: string = 'yyyy.MM.dd') => {
  const date = parseISO(dateStr);
  return format(date, formatStr);
};

const parseDateRange = (startStr: string, endStr: string) => {
  const startYear = getYear(parseISO(startStr));
  const endYear = getYear(parseISO(endStr));

  if (startYear === endYear) {
    return `${parseDateStr(startStr)} - ${parseDateStr(endStr, 'MM.dd')}`;
  } else {
    return `${parseDateStr(startStr)} - ${parseDateStr(endStr)}`;
  }
};

const getDday = (dateStr: string) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const targetDate = parseISO(dateStr);

  return differenceInDays(today, targetDate);
};

export { parseDateStr, parseDateRange, getDday };

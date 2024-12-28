import { differenceInDays, format, getYear, isSameDay, isWithinInterval, parseISO } from 'date-fns';

const parseDateStr = (dateStr: string, formatStr: string = 'yyyy.MM.dd') => {
  const date = parseISO(dateStr);
  return format(date, formatStr);
};

const parseDateRange = (startStr?: string, endStr?: string) => {
  if (!startStr || !endStr) return '-';
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

const getDdayOrElapsedDay = (startDate: string, endDate: string) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const start = parseISO(startDate);
  const end = parseISO(endDate);

  const dDay = differenceInDays(today, start);

  if (isWithinInterval(today, { start, end })) {
    const elapsedDay = differenceInDays(today, start);
    return isSameDay(today, end) ? `마지막 날` : `${elapsedDay + 1}일차`;
  } else if (dDay < 0) {
    return `D${dDay}`;
  } else {
    return null;
  }
};

export { parseDateStr, parseDateRange, getDday, getDdayOrElapsedDay };

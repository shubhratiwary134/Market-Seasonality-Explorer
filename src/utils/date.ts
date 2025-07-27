import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  add,
} from "date-fns";

export const getCalendarMonth = (month: Date): Date[][] => {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const daysInMonth = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weeks: Date[][] = [];
  let week: Date[] = [];

  daysInMonth.forEach((day) => {
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
    week.push(day);
  });

  if (week.length > 0) {
    weeks.push(week);
  }

  return weeks;
};

export const getNextMonth = (month: Date): Date => {
  return add(month, { months: 1 });
};

export const getPreviousMonth = (month: Date): Date => {
  return add(month, { months: -1 });
};

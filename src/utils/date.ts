import deLocale from 'date-fns/locale/de';
import {
  differenceInSeconds,
  format,
  addSeconds,
  differenceInDays,
} from 'date-fns';

const formatDateToFormat = (dateString: Date, dateFormat: string): string =>
  format(new Date(dateString), dateFormat, { locale: deLocale });

export const formatDateToDisplay = (dateString: Date): string => {
  if (typeof dateString === 'undefined' || !dateString) return '';
  return formatDateToFormat(dateString, `dd.MM.yyyy`);
};

export const formatDateToDisplayOnTable = (dateString: Date): string => {
  if (typeof dateString === 'undefined' || !dateString) return '';
  return formatDateToFormat(dateString, `dd.MM.yyyy HH:mm:ss`);
};
export const formatDateToSort = (dateString: Date): string => {
  if (typeof dateString === 'undefined' || !dateString) return '';
  return formatDateToFormat(dateString, `dd.MM.yyyy'T'HH:mm:ss.SSS'Z'`);
};

export const formatDateForOverviewBar = (dateString: Date): string => {
  if (typeof dateString === 'undefined' || !dateString) return '';
  return formatDateToFormat(dateString, `dd.MM.yyyy HH:mm:ss`);
};

const addLeadingZeros = (number: number) => {
  return number.toString().padStart(2, '0');
};

export const formateDateDifference = (
  dateOneString: Date | null,
  dateTwoString: Date | null,
): string => {
  if (!dateOneString || !dateTwoString) return '';
  const dateOne = new Date(dateOneString || new Date());
  const dateTwo = new Date(dateTwoString || new Date());

  const secondDifference = differenceInSeconds(dateOne, dateTwo);

  const dayDifference = differenceInDays(dateOne, dateTwo);

  const helperDate = addSeconds(new Date(0, 0, 0, 0, 0, 0), secondDifference);

  const hourString = addLeadingZeros(
    helperDate.getHours() + dayDifference * 24,
  );
  const minuteString = addLeadingZeros(helperDate.getMinutes());
  const secondString = addLeadingZeros(helperDate.getSeconds());

  return `${hourString}:${minuteString}:${secondString}`;
};

import { format, parseISO } from 'date-fns';

export const formatTemp = (temp, unit = 'C') => {
  if (unit === 'F') {
    return Math.round((temp * 9) / 5 + 32);
  }
  return Math.round(temp);
};

export const formatDate = (dateString, pattern = 'EEE, MMM d') => {
  if (!dateString) return '';
  return format(parseISO(dateString), pattern);
};

export const formatTime = (dateString) => {
    if (!dateString) return '';
    return format(parseISO(dateString), 'h:mm a');
};

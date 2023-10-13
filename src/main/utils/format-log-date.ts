import dayjs from 'dayjs';
import { Format } from 'electron-log';

export const formatLogDate: Format = ({ data, date, level, scope }) => {
  const message = data.join(' ');
  const label = scope?.label || 'Common';

  const formattedDate = dayjs(date).format('YYYY-MM-DD HH:mm:ss.SSS');

  return `[${formattedDate}][${level}][${label}]: ${message}`;
};

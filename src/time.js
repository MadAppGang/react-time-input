export const [AM, PM] = ['am', 'pm'];

const zerofy = number => `0${number}`.slice(-2);

export const stringify = (time) => {
  if (!time) {
    return '';
  }

  const hours = time.hours === 0 ? 12 : time.hours;
  return `${hours}:${zerofy(time.minutes)} ${time.prefix}`;
};

const numeric = str => str.replace(/\D/g, '');

export const parse = (timeString) => {
  const isString = typeof timeString === 'string';

  if (!isString) {
    return Object.freeze({
      hours: 0, minutes: 0, prefix: AM,
    });
  }

  const value = timeString
    .replace(/\s/, '')
    .replace('-', '')
    .toLowerCase();

  let hours, minutes;

  if (value.includes(':')) {
    [hours, minutes] = value.slice(0, 5).split(':');

    if (hours < 10) {
      [hours, minutes] = value.slice(0, 4).split(':');
    }
  } else {
    if (numeric(value).length === 3) {
      hours = value.slice(0, 1);
      minutes = value.slice(1, 3);
    } else {
      hours = value.slice(0, 2);
      minutes = value.slice(2, 4);
    }
  }

  if (!minutes || isNaN(minutes)) {
    minutes = 0;
  }

  let prefix = AM;

  if (value.endsWith('p') || value.endsWith('pm')) {
    prefix = PM;
  }

  if (value.endsWith('a') || value.endsWith('am')) {
    prefix = AM;
  }

  hours = Number(hours);
  minutes = Number(isNaN(minutes) ? minutes.slice(0, 1) * 10 : minutes);

  if (hours > 12) {
    hours -= 12;
    if (hours <= 24) {
      prefix = PM;
    }
  }

  if (hours > 12) {
    hours = 12;
  }

  if (minutes > 59) {
    hours += Math.floor(minutes / 60);
    minutes = Math.floor(minutes % 60);
  }

  if (hours === 12 && prefix === AM) {
    hours = 0;
  }

  if (isNaN(hours)) {
    hours = 12;
  }

  if (isNaN(minutes)) {
    minutes = 0;
  }

  return Object.freeze({
    hours, minutes, prefix,
  });
};

export const isValid = (timeString) => {
  if (!timeString) {
    return false;
  } 

  return !isNaN(numeric(timeString));
};

export const [AM, PM] = ['am', 'pm'];

export const zerofy = number => `0${number}`.slice(-2);

export const numeric = str => str.replace(/\D/g, '');

export const isAcceptable = (timeString) => {
  const onlyDigits = timeString.replace(/a|am|p|pm|m|:|\s/gi, '');

  if (!onlyDigits) {
    return false;
  } 

  return !isNaN(onlyDigits);
};

export const stringify = (time) => {
  if (!time) {
    return '';
  }

  const hours = time.hours === 0 ? 12 : Math.abs(time.hours);
  const minutes = zerofy(Math.abs(time.minutes));
  const prefix = time.prefix.toLowerCase();

  return `${hours}:${minutes} ${prefix}`;
};

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

    if (hours < 10 && hours.length === 1) {
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

  hours = Number(numeric(hours));
  minutes = Number(isNaN(minutes) ? minutes.slice(0, 1) * 10 : minutes);

  if (hours > 12) {
    hours -= 12;

    if (hours <= 24) {
      prefix = PM;
    }
  }

  if (minutes > 59) {
    hours += Math.floor(minutes / 60);
    minutes = Math.floor(minutes % 60);
  }

  if (hours > 12) {
    hours = 12;
    minutes = 0;
    prefix = AM;
  }

  if (hours === 12 && prefix === AM) {
    hours = 0;
  }

  return Object.freeze({
    hours, minutes, prefix,
  });
};

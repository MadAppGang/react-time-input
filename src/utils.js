export const prefix = {
  AM: 'am',
  PM: 'pm',
};

export const isMobile = () => {
  return window.innerWidth <= 375;
};

export const indexToHour = (i) => {
  if (i === 0) return 12;
  if (i <= 12) return i;
  if (i >= 12) return i - 12;
};

export const getTimePrefix = (i) => {
  if (i < 12) return prefix.AM;

  return prefix.PM;
}

export const composeTimerows = () =>
  new Array(24).fill().map((_, i) => `${indexToHour(i)} ${getTimePrefix(i)}`);

export const to0Format = number => `0${number}`.slice(-2);

export const to24Format = (time) => {
  let { hours, minutes } = time;

  if (time.prefix === prefix.PM && time.hours !== 12) {
    hours = hours + 12;
  } else if (time.prefix === prefix.AM && time.hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
};

export const to12Format = (time) => {
  const hours = indexToHour(time.hours);
  const prefix = getTimePrefix(time.hours);

  return { hours, minutes: time.minutes, prefix };
};

export const timeToMinutes = time => time.hours * 60 + time.minutes;

export const minutesToTime = (minutes) => {
  const hours = Math.floor(Math.abs(minutes) / 60);
  const remnant = Math.abs(minutes) % 60;

  return { hours, minutes: remnant };
};
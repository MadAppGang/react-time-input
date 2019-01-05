import {
  zerofy, stringify, numeric, isAcceptable, parse,
} from '../time';

describe('zerofy', () => {
  test('adds zero to a signle-number string', () => {
    expect(zerofy('1')).toBe('01');
  });

  test('leaves two-number string as-is', () => {
    expect(zerofy('20')).toBe('20');
  });
});

describe('stringify', () => {
  test('composes a string out of time object', () => {
    const output = stringify({ hours: 3, minutes: 2, prefix: 'am' });

    expect(output).toBe('3:02 am');
  });

  test('shows 0 hours as 12', () => {
    const output = stringify({ hours: 0, minutes: 0, prefix: 'am' });

    expect(output).toBe('12:00 am');
  });

  test('ignores negative sign on hours/minutes', () => {
    const output = stringify({ hours: -11, minutes: -20, prefix: 'AM' });

    expect(output).toBe('11:20 am');
  });
});

describe('numeric', () => {
  test('removes all non-numeric symbols from the input string', () => {
    expect(numeric('1:20 pm')).toBe('120');
  });
});

describe('isAcceptable', () => {
  test('returns true for time string', () => {
    expect(isAcceptable('1:20 pm')).toBe(true);
    expect(isAcceptable('04 : 20 PM')).toBe(true);
    expect(isAcceptable('1: 24 pM')).toBe(true);
    expect(isAcceptable('  20: 11 Pm  ')).toBe(true);
  });

  test('returns false string of characters', () => {
    expect(isAcceptable('')).toBe(false);
    expect(isAcceptable('string')).toBe(false);
    expect(isAcceptable('lolfsdg1')).toBe(false);
    expect(isAcceptable('10:!20pmx')).toBe(false);
  });
});

describe('parse', () => {
  test('parses time string properly', () => {
    expect(parse('1:00 pm')).toEqual({ hours: 1, minutes: 0, prefix: 'pm' });
    expect(parse('02:10 pm')).toEqual({ hours: 2, minutes: 10, prefix: 'pm' });
    expect(parse('20:00')).toEqual({ hours: 8, minutes: 0, prefix: 'pm' });
    expect(parse('20:50 am')).toEqual({ hours: 8, minutes: 50, prefix: 'pm' });
    expect(parse('20:50')).toEqual({ hours: 8, minutes: 50, prefix: 'pm' });
    expect(parse('20:60')).toEqual({ hours: 9, minutes: 0, prefix: 'pm' });
    expect(parse('20:80')).toEqual({ hours: 9, minutes: 20, prefix: 'pm' });
    expect(parse('-1:24')).toEqual({ hours: 1, minutes: 24, prefix: 'am' });
    expect(parse('2:69')).toEqual({ hours: 3, minutes: 9, prefix: 'am' });
    expect(parse('')).toEqual({ hours: 0, minutes: 0, prefix: 'am' });
    expect(parse('123')).toEqual({ hours: 1, minutes: 23, prefix: 'am' });
    expect(parse('123p')).toEqual({ hours: 1, minutes: 23, prefix: 'pm' });
    expect(parse('1234p')).toEqual({ hours: 12, minutes: 34, prefix: 'pm' });
    expect(parse('12PM')).toEqual({ hours: 12, minutes: 0, prefix: 'pm' });
    expect(parse('8')).toEqual({ hours: 8, minutes: 0, prefix: 'am' });
    expect(parse('8p')).toEqual({ hours: 8, minutes: 0, prefix: 'pm' });
    expect(parse('8a')).toEqual({ hours: 8, minutes: 0, prefix: 'am' });
    expect(parse('100g')).toEqual({ hours: 1, minutes: 0, prefix: 'am' });
    expect(parse('010')).toEqual({ hours: 0, minutes: 10, prefix: 'am' });
    expect(parse('25:82')).toEqual({ hours: 0, minutes: 0, prefix: 'am' });
  });
});

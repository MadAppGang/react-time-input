import { onEnterKey } from '../utils';

describe('utils', () => {
  let eventHandler;
  let spy;

  beforeEach(() => {
    spy = jest.fn();
    eventHandler = onEnterKey(spy);
  });

  test('returns a function', () => {
    expect(eventHandler).toBeInstanceOf(Function);
  });

  test('does not call spy when the key is not enter', () => {
    eventHandler({ key: 'Not enter' });
    expect(spy).not.toHaveBeenCalled();
  });

  test('calls the spy when the key is enter', () => {
    eventHandler({ key: 'Enter' });
    expect(spy).toHaveBeenCalled();
  });

  test('calls the spy when the key code is 13', () => {
    eventHandler({ keyCode: 13 });
    expect(spy).toHaveBeenCalled();
  });
});

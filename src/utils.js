export const onEnterKey = fn => (event) => {
  const { key, keyCode } = event;

  if (key === 'Enter' || keyCode === 13) {
    fn(event);
  }
};

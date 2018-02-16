/**
 * @param {string} message
 */
export const required = (message = 'Field is required!') => value => ({
  isValid: value && value.trim() !== '', message
});

export default fields => values => {
  const errors = {};

  Object.keys(fields).forEach(key => {
    ([]).concat(fields[key]).forEach(validator => {
      const res = validator(values[key]);

      if (res && !errors[key] && !res.isValid) {
        errors[key] = res.message || true;
      }
    })
  });

  return errors;
}

/**
 * @param  {Object.<RegExp>} regex
 * @param  {string} message
 */
export const matches = (regex, message = 'Incorrect value!') => value => ({
  message,
  isValid: value && regex.test(value),
});

export const min = (min, message = 'Min value: %d!') => value => ({
  message: message.replace('%d', min),
  isValid: parseInt(value, 10) >= min,
});

/**
 * @param {string} message
 */
export const required = (message = 'Field is required!') => value => ({
  message,
  isValid: value && (
    (Array.isArray(value) && value.length > 0) ||
    (typeof value === 'string' && value.trim()) !== ''
  ),
});

export default fields => (values, props) => {
  const errors = {};

  Object.keys(fields).forEach(key => {
    ([]).concat(fields[key]).forEach(validator => {
      const res = validator(values[key], props);

      if (res && !errors[key] && !res.isValid) {
        errors[key] = res.message || true;
      }
    })
  });

  return errors;
}

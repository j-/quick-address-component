import * as React from 'react';

/**
 * Returns a function which, when called with a 'prefix' string, will return a
 * ID that matches the pattern (prefix + "-" + random string). Used to ensure
 * IDs are identical within an instance of a component but not between
 * instances.
 *
 * @example
 *
 * const id = useId();
 * const fieldId = id('value-input'); // => "value-input-4gpk5sf84t6"
 */
export const useID = () => {
  const rand = Math.random().toString(36).substring(2);
  const ref = React.useRef(rand);
  return (prefix: string) => `${prefix}-${ref.current}`;
};

import * as React from 'react';

export const useID = () => {
  const rand = Math.random().toString(36).substring(2);
  const ref = React.useRef(rand);
  return (prefix: string) => `${prefix}-${ref.current}`;
};

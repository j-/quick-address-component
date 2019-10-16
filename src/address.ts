export const breakdownAddress = (partial: string) => {
  // E.g. "Unit 1g  211 Powlett Street, EAST MELBOURNE  VIC  3002"
  const match = partial.match(/^(?:(.+)\x20\x20)?(.+),\x20(.+)\x20\x20(\w{3})\x20\x20(\d{4})$/);
  if (!match) return null;
  return {
    addressLine1: match[1] ? match[1] : match[2],
    addressLine2: match[1] ? match[2] : '',
    suburb: match[3],
    state: match[4],
    postcode: match[5],
  };
};

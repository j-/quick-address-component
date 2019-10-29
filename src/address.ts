/**
 * Used to parse a partial address that's been combined into a single line.
 * Matches:
 *
 * 1. Optional street address line (followed by two spaces)
 * 2. Street address line (followed by a comma and a space)
 * 3. Suburb (followed by two spaces)
 * 4. State (followed by two spaces)
 * 5. Postcode
 */
const partialAddressExp = /^(?:(.+)\x20\x20)?(.+),\x20(.+)\x20\x20([A-Z]{2,3})\x20\x20([0-9]{4})$/;

/**
 * Parse a partial address that's been combined into a single line. Returns
 * an object containing:
 *
 * * `addressLine1`
 * * `addressLine2` (empty string if not provided)
 * * `suburb`
 * * `state`
 * * `postcode` (numeric postcode as a string)
 *
 * If the address cannot be parsed then `null` will be returned.
 *
 * @example
 *
 * // Input
 * parsePartialAddress('Level 1  833 Collins Street, DOCKLANDS  VIC  3008');
 *
 * // Output
 * ({
 *   addressLine1: 'Level 1',
 *   addressLine2: '833 Collins Street',
 *   suburb: 'DOCKLANDS',
 *   state: 'VIC',
 *   postcode: '3008',
 * })
 */
export const parsePartialAddress = (partial: string) => {
  const match = partial.match(partialAddressExp);
  if (!match) return null;
  return {
    addressLine1: match[1] ? match[1] : match[2],
    addressLine2: match[1] ? match[2] : '',
    suburb: match[3],
    state: match[4],
    postcode: match[5],
  };
};

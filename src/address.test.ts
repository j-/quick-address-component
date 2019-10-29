import { parsePartialAddress } from './address';

describe('parsePartialAddress()', () => {
  it('parses an address with one line', () => {
    expect(parsePartialAddress('50 High Street, PARRAMATTA  NSW  2150')).toEqual({
      addressLine1: '50 High Street',
      addressLine2: '',
      suburb: 'PARRAMATTA',
      state: 'NSW',
      postcode: '2150',
    });
  });

  it('parses an address with a special character in the street number', () => {
    expect(parsePartialAddress('48-50 High Street, BUNNAN  NSW  2337')).toEqual({
      addressLine1: '48-50 High Street',
      addressLine2: '',
      suburb: 'BUNNAN',
      state: 'NSW',
      postcode: '2337',
    });
    expect(parsePartialAddress('2a High Street South, KEW  VIC  3101')).toEqual({
      addressLine1: '2a High Street South',
      addressLine2: '',
      suburb: 'KEW',
      state: 'VIC',
      postcode: '3101',
    });
  });

  it('parses an address with two lines', () => {
    expect(parsePartialAddress('Level 1  833 Collins Street, DOCKLANDS  VIC  3008')).toEqual({
      addressLine1: 'Level 1',
      addressLine2: '833 Collins Street',
      suburb: 'DOCKLANDS',
      state: 'VIC',
      postcode: '3008',
    });
  });

  it('parses an address with one word as address line 1', () => {
    expect(parsePartialAddress('Basement  2 Collins Street, MELBOURNE  VIC  3000')).toEqual({
      addressLine1: 'Basement',
      addressLine2: '2 Collins Street',
      suburb: 'MELBOURNE',
      state: 'VIC',
      postcode: '3000',
    });
  });

  it('parses an address with a comma in line 1', () => {
    expect(parsePartialAddress('Suite 1, Ground Floor  1 Collins Street, MELBOURNE  VIC  3000')).toEqual({
      addressLine1: 'Suite 1, Ground Floor',
      addressLine2: '1 Collins Street',
      suburb: 'MELBOURNE',
      state: 'VIC',
      postcode: '3000',
    });
  });

  it('parses a complex two-line address', () => {
    expect(parsePartialAddress('Gwynneville Public School, 10a Acacia Avenue, GWYNNEVILLE  NSW  2500')).toEqual({
      addressLine1: 'Gwynneville Public School, 10a Acacia Avenue',
      addressLine2: '',
      suburb: 'GWYNNEVILLE',
      state: 'NSW',
      postcode: '2500',
    });
    expect(parsePartialAddress('ABC Learning Centre - Plympton, 337 Anzac Highway, PLYMPTON  SA  5038')).toEqual({
      addressLine1: 'ABC Learning Centre - Plympton, 337 Anzac Highway',
      addressLine2: '',
      suburb: 'PLYMPTON',
      state: 'SA',
      postcode: '5038',
    });
    expect(parsePartialAddress('ABC Learning Centre - Whyalla, 46-48 Beerworth Avenue, WHYALLA PLAYFORD  SA  5600')).toEqual({
      addressLine1: 'ABC Learning Centre - Whyalla, 46-48 Beerworth Avenue',
      addressLine2: '',
      suburb: 'WHYALLA PLAYFORD',
      state: 'SA',
      postcode: '5600',
    });
  });
});

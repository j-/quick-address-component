import { normalizeQuery } from './normalize-query';

it('removes insignificant characters', () => {
  expect(normalizeQuery('unit 3-a/123 high st, mt. waverley')).toBe('unit 3 a 123 high st mt waverley');
});

it('trims leading whitespace', () => {
  expect(normalizeQuery('   833 collins')).toBe('833 collins');
});

it('trims trailing whitespace', () => {
  expect(normalizeQuery('833 collins   ')).toBe('833 collins');
});

it('trims leading and trailing whitespace', () => {
  expect(normalizeQuery('   833 collins   ')).toBe('833 collins');
});

it('collapses consecutive whitespace characters', () => {
  expect(normalizeQuery('833   collins  st  docklands')).toBe('833 collins st docklands');
});

it('converts to a consistent case', () => {
  expect(normalizeQuery('Level 1, 833 Collins Street, DOCKLANDS VIC 3008')).toBe('level 1 833 collins street docklands vic 3008');
});

it('does all of the above', () => {
  expect(normalizeQuery('\tLevel 1  833 Collins Street, DOCKLANDS  VIC  3008\n')).toBe('level 1 833 collins street docklands vic 3008');
});

import { shouldQuery } from './should-query';

it('returns `false` for an empty string', () => {
  expect(shouldQuery('', 3)).toBe(false);
});

it('returns `false` for a string with only whitespace', () => {
  expect(shouldQuery('   \t\t\t\n\n\n', 3)).toBe(false);
});

it('returns `false` for a string with only special characters', () => {
  expect(shouldQuery('!@#$%^&*()_+-=[]{}\\', 3)).toBe(false);
});

it('returns `false` for a string with only numbers', () => {
  expect(shouldQuery('123123123', 3)).toBe(false);
});

it('returns `false` for a string with too few letters', () => {
  expect(shouldQuery('833 c', 2)).toBe(false);
  expect(shouldQuery('833 co', 3)).toBe(false);
  expect(shouldQuery('833 col', 4)).toBe(false);
  expect(shouldQuery('833 coll', 5)).toBe(false);
  expect(shouldQuery('833 colli', 6)).toBe(false);
});

it('returns `true` for a string with enough letters', () => {
  expect(shouldQuery('833 co', 2)).toBe(true);
  expect(shouldQuery('833 col', 3)).toBe(true);
  expect(shouldQuery('833 coll', 4)).toBe(true);
  expect(shouldQuery('833 colli', 5)).toBe(true);
  expect(shouldQuery('833 collin', 6)).toBe(true);
});

it('is case insensitive', () => {
  expect(shouldQuery('833 CoLlInS', 6)).toBe(true);
});

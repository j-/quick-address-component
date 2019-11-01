import { QueryEntity } from './entities';

export const normalizeQuery = (query: string): QueryEntity['id'] => (
  query
    // Remove insignificant characters
    // Keep words, digits, and whitespace
    .replace(/[^\w\d\s]/g, ' ')
    // Trim leading whitespace
    .replace(/^\s*/, '')
    // Trim trailing whitespace
    .replace(/\s*$/, '')
    // Collapse multiple whitespace chars
    .replace(/\s+/g, ' ')
    // Convert to consistent case
    .toLowerCase()
);

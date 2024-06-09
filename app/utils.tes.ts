import { formatFieldToName } from './utils'; // Adjust the import path as necessary

describe('formatFieldToName', () => {
  test('formats camelCase to capitalized words', () => {
    expect(formatFieldToName('camelCaseField')).toBe('Camel case field');
  });

  test('formats PascalCase to capitalized words', () => {
    expect(formatFieldToName('PascalCaseField')).toBe('Pascal case field');
  });

  test('formats single word', () => {
    expect(formatFieldToName('field')).toBe('Field');
  });

  test('formats already formatted string', () => {
    expect(formatFieldToName('Already Formatted')).toBe('Already formatted');
  });

  test('formats string with multiple uppercase letters', () => {
    expect(formatFieldToName('FieldWithMultipleUpperCase')).toBe('Field with multiple upper case');
  });

  test('formats string with no uppercase letters', () => {
    expect(formatFieldToName('nouppercase')).toBe('Nouppercase');
  });

  test('formats empty string', () => {
    expect(formatFieldToName('')).toBe('');
  });
});
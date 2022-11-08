const { deterministicPartitionKey } = require('./dpk');

describe('deterministicPartitionKey', () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe('0');
  });
});

describe('deterministicPartitionKey', () => {
  it('Returns the value partitionKey with given object input with partitionKey property', () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: '123' });
    expect(trivialKey).toBe('123');
  });
});

describe('deterministicPartitionKey', () => {
  it('Returns the hashed value with given object input without property', () => {
    const trivialKey = deterministicPartitionKey({ others: '123' });
    expect(trivialKey).toBe(
      '3c4845bac5e1add8ebde4f0bbd867c819d7175ec51b7327480bba0ad9249f2b013fababe707f1d2eb495e2458a1f0e6e2026407c4af68c97b48342a70d9d6a83'
    );
  });
});

describe('deterministicPartitionKey', () => {
  it('Returns the hashed value with given string input', () => {
    const trivialKey = deterministicPartitionKey('123');
    expect(trivialKey).toBe(
      '3f0ff6ca6d8ce3a49489b0f6dbfa9bf9b0c7f037f51a7d49af25778f1172c6c9934eb25fd041b14f2ee14dd13d3559f2d12bb2d470ade89cd046933d555a99b4'
    );
  });
});

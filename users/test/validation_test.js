const assert = require('assert');

const User = require('../src/User');

describe('Validating records', () => {
  it('require a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name is required');
  });
  it('Requires a user name longer that 2 characters', () => {
    const user = new User({ name: 'al' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name must be longer that 2 characters');
  });

  it('disallows invalid records from being saved', (done) => {
    const user = new User({ name: 'Al' });
    user.save().catch((validationResult) => {
      const { message } = validationResult.errors.name;

      assert(message === 'Name must be longer that 2 characters');
      done();
    });
  });
});

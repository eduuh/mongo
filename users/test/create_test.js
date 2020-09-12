const assert = require('assert');

const User = require('../src/User');

describe('Creating Records', () => {
  it('saves a user', (done) => {
    const edwin = new User({ name: 'Edwin Kamau Muraya' });

    edwin.save().then(() => {
      // Has edwin been saved
      assert(!edwin.isNew);
      done();
    });
  });
});

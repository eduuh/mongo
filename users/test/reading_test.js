const assert = require('assert');

const User = require('../src/User');

describe('Reading users out of the database', () => {
  let edwin;

  beforeEach((done) => {
    edwin = new User({ name: 'edwin' });
    edwin.save().then(() => done());
  });

  it('finds a user with a name of edwin', (done) => {
    User.findOne({ _id: edwin._id }).then((user) => {
      assert(user.name === 'edwin');
      done();
    });
  });
});

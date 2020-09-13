const assert = require('assert');

const User = require('../src/User');

describe('Deleting a user', () => {
  let edwin;

  beforeEach((done) => {
    edwin = new User({ name: 'edwin' });
    edwin.save().then(() => {
      done();
    });
  });
  // Remove is deplicated

  it('Class deletone', (done) => {
    User.deleteOne({ name: 'edwin' }).then(() => {
      User.findOne({ name: 'edwin' }).then((user) => {
        assert(user === null);
        done();
      });
    });
  });

  it('Class method findOneAndRemove', (done) => {
    User.findOneAndRemove({ name: 'edwin' }).then(() => {
      User.findOne({ name: 'edwin' }).then((user) => {
        assert(user === null);
        done();
      });
    });
  });

  it('Class method findOneIdAndRemove', (done) => {
    User.findByIdAndRemove(edwin._id).then(() => {
      User.findOne({ name: 'edwin' }).then((user) => {
        assert(user === null);
        done();
      });
    });
  });
});

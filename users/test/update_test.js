const assert = require('assert');
const User = require('../src/User');

describe('Updating records', () => {
  let edwin;

  beforeEach((done) => {
    edwin = new User({ name: 'edwin', postCount: 0 });
    edwin.save().then(() => done());
  });

  function assertName(operation, done) {
    operation.then(() => {
      User.find().then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'alex');
        done();
      });
    });
  }

  it('instance type using set and save', (done) => {
    edwin.set('name', 'alex');
    assertName(edwin.save(), done);
  });

  it('Model Instance update', (done) => {
    assertName(edwin.updateOne({ name: 'alex' }), done);
  });

  it('A user post Count can be incremented by one', (done) => {
    User.updateOne({ name: 'edwin' }, { $inc: { postCount: 1 } }).then(() => {
      User.findOne({ name: 'edwin' }).then((user) => {
        console.log(user);
        assert(user.postCount === 1);
        done();
      });
    });
  });
});

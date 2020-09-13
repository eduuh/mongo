const assert = require('assert');

const User = require('../src/User');

describe('Virtual types', () => {
  it('postCount returns number of posts', (done) => {
    const joe = new User({ name: 'joe', posts: [{ title: 'PostTitle' }] });
    joe
      .save()
      .then(() => User.findOne({ name: 'joe' }))
      .then((user) => {
        console.log(user);
        assert(joe.postCount === 1);
        done();
      });
  });
});

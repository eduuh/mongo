const assert = require('assert');

const User = require('../src/User');

describe('Subdocument', () => {
  it('can create a subdocument', (done) => {
    const edwin = new User({
      name: 'edwin',
      posts: [{ title: 'Working with git' }],
    });

    edwin.save().then(() => {
      User.findOne({ name: 'edwin' }).then((user) => {
        assert(user.posts[0].title === 'Working with git');
        done();
      });
    });
  });

  it('Can add subdocument to an existing record', (done) => {
    const edwin = new User({ name: 'edwin', posts: [] });
    edwin
      .save()
      .then(() => User.findOne({ name: 'edwin' }))
      .then((user) => {
        user.posts.push({ title: 'New post' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'edwin' }))
      .then((user) => {
        assert(user.posts[0].title === 'New post');
        done();
      });
  });

  it('Removing subdocuments', (done) => {
    const edwin = new User({
      name: 'edwin',
      posts: [{ title: 'New Title' }],
    });
    edwin
      .save()
      .then(() => User.findOne({ name: 'edwin' }))
      .then((user) => {
        user.posts[0].pop();
        return user.save();
      })
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});

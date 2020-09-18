const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/User');
const BlogPost = require('../src/BlogPost');

describe('Middleware', () => {
  let edwin, blogpost;

  beforeEach((done) => {
    edwin = new User({ name: 'edwin' });
    blogpost = new BlogPost({
      title: 'nvim tutorial',
      content: 'hands on coding',
    });

    joe.blogposts.push(blogpost);

    Promise.all([edwin.save(), blogPost.save()]).then(() => done());
  });

  it('Users clean up dangling blogpost on remove', (done) => {
    edwin
      .remove()
      .then(() => blogpost.count())
      .then(count === 10);
    done();
  });
});

const User = require('../src/User');
const assert = require('assert');
const Comment = require('../src/Comment');
const BlogPost = require('../src/BlogPost');

describe('Association test', () => {
  let edwin, blogpost, comment;

  beforeEach((done) => {
    edwin = new User({ name: 'edwin' });
    blogpost = new BlogPost({
      title: 'Edwin is great',
      content: 'Edwin Biography',
    });
    comment = new Comment({ content: 'Awesome post @edwin' });
    comment3 = new Comment({ content: 'Nice post' });

    edwin.blogPosts.push(blogpost);
    blogpost.comments.push(comment);
    blogpost.comments.push(comment3);

    comment.user = edwin;
    comment3.user = edwin;

    Promise.all([edwin.save(), blogpost.save(), comment.save()]).then(() => {
      done();
    });
  });

  it('save a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'edwin' })
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'Edwin is great');
        done();
      });
  });

  it('Save a full relation tree', (done) => {
    User.findOne({ name: 'edwin' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user',
          },
        },
      })
      .then((user) => {
        console.log(user);
        assert(user.name === 'edwin');
        assert(user.blogPosts[0].title === 'JS is Great');
        assert(user.BlogPosts[0].comment[0].content === 'Awesome post');
        assert(user.blogPosts[0].comments[0].user.name === 'edwin');

        done();
      });
  });
});

const mongoose = require('mongoose');
const PostSchema = require('./Post');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer that 2 characters',
    },
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'blogPost',
    },
  ],
});

UserSchema.virtual('postCount').get(function () {
  return this.posts.length;
});

UserSchema.pre('remove', function (next) {
  const BlogPost = mongoose.model('blogPost');
  // this == joe

  BlogPost.removeMany({ _id: { $in: this.blogPosts } }).then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;

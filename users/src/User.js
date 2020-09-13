const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer that 2 characters',
    },
  },
  postCount: { type: Number },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;

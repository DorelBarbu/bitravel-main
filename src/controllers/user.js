const User = require('../schema/user');
const md5 = require('md5');
const ObjectId = require('mongoose').Types.ObjectId;

const insertUser = async userData => {
  var user = new User({
    ...userData,
    password: md5(userData.password)
  });
  return user.save();
};

const getUserById = async userId => {
  const user = await User.find({ _id: new ObjectId(userId) });
  if(user.length > 0) {
    return user[0];
  }
  return null;
};

const getUserByEmail = async email => {
  const user = await User.find({ email });
  if(user.length > 0) {
    return user[0];
  }
  return null;
};

const autehnticateUser = async (email, password) => {
  const user = (await getUserByEmail(email));
  if(!user) {
    return {
      isError: true,
      message: 'Username does not exits in the database'
    };
  }
  if(user.password !== password) {
    return {
      isError: true,
      message: 'Passwords do not match'
    };
  }
  return {
    isError: false,
    user
  };
};

module.exports = {
  insertUser,
  getUserById,
  autehnticateUser,
  getUserByEmail
};

const formatUserForDB = (userObj) => {

  const newUser = {
    email: userObj.email,
    password: userObj.password,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return newUser;
};

module.exports = {
  formatUserForDB,
}
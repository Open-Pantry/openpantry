const UserMethods = require('../controllers/UserController.js');

const Auth = {
  validate(email, password, orgID) {
    // spoofing the DB response for simplicity
    return UserMethods.checkPassword(email, password, orgID);
  },
  validateUser(email, organization) {
    return UserMethods.validateEmail(email, organization);
  }
};


module.exports = Auth;

const jwt = require('jwt-simple');
const { validateUser } = require('../middleware/auth');
const secret = require('../keys/apiKey');
var CognitoExpress = require('cognito-express');


const cognitoExpress = new CognitoExpress({
  region: "us-east-1",
  cognitoUserPoolId: "us-east-1_6C4LLdzSO",
  tokenUse: "access",      //Possible Values: access | id
  tokenExpiration: 3600000 //Up to default expiration of 1 hour (3600000 ms)
});

module.exports = (req, res, next) => {
  // When performing a cross domain request, you will recieve
  // a preflighted request first. This is to check if tha app is safe
  // We skip the token outh for [OPTIONS] requests.
  // if(req.method == 'OPTIONS') next();
  const token =
    (req.params && req.params.access_token) ||
    (req.query && req.query.access_token) ||
    req.headers.x_token;
  const key =
    (req.params && req.params.x_key) || (req.query && req.query.x_key) || req.headers.x_email;
  const orgID = req.headers.x_orgID;
  if (token || key) {
    try {
      console.log("Request Token:",token);
      cognitoExpress.validate(token, (err, response) => {
        console.log("Cognito Response:",response);

        if (err) {
          console.log("Error Authing with cognito:",err);
          res.status(400);
          res.json({
            status: 400,
            message: 'Token Expired'
          });
          return;
        }
        // Authorize the user to see if s/he can access our resources
        // The key would be the logged in user's email
        validateUser(key, orgID).then((dbUser) => {
          if (dbUser) {
            if (true) {
              // Always authorized unless we decide to put check for admins only
              // console.log('Successfully validated User');
              next(); // To move to next middleware
            } else {
              res.status(403);
              res.json({
                status: 403,
                message: 'Not Authorized'
              });
            }
          } else {
            // No user with this name exists, respond back with a 401
            res.status(401);
            res.json({
              status: 401,
              message: 'Invalid User'
            });
          }
        });
      });
    } catch (err) {
      res.status(500);
      res.json({
        status: 500,
        message: 'Oops something went wrong',
        error: err
      });
    }
  } else {
    res.status(401);
    res.json({
      status: 401,
      message: 'Invalid Token or Key'
    });
  }
};

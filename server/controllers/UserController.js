var models = require('../models/database');
var User = models.Account;
var Email = require("../models/email/email.js");

module.exports.validateEmail =  (email, orgID) => {
    var query = {
        where: { email: email, organization_id: orgID },
        raw: true,
    };
    return User.findAll(query).spread(function (user) {
        if (user) {
            return user;
        } else {
            return { error: 'Invalid email' };
        }
    })
        .catch(function (err) {
            return { error: err };
        })
};

module.exports.createUser = (req, res) => {
    var newUser = {
        email: req.body.email,
        name:req.body.name,
        password: req.body.password
    };
    User.create(newUser)
        .then((user, create) =>{
            if (create) {
            }
            res.send(user);
        })
        .catch(function (err) {
            res.send(err);
        });
};

module.exports.createUserWithInvitation =  (req, res) =>{
    console.log("Body:", req.body);
    var newUser = {
        email: req.body.email,
        name:req.body.name,
        cognito_id: 'temp',
        organization_id: req.body.orgID,
        role: "employee",
        adminStatus: 0
    };
    User.create(newUser)
        .then((user, create) => {
            if (create) {
            }
            res.send(user);
            console.log("Creating email!");
            // Now let's send an email invitation
            var data = {
                tempPassword: tempPassword,
                email: req.body.email,
                orgID:req.body.orgID
            };
            var email = new Email("verification", data);
            console.log("Created email")
            var emailPromise = email.create().then((message) => {
                console.log("Sending email inside promise.");
                return email.send(message);
            }); //send the email
        })
        .catch(function (err) {
            //res.send(err);
        });
};

module.exports.updateAndLoginUser = (req, res) =>{
    console.log("Updating User Body:", req.body);

    User.update({
        password: req.body.password
    }, {
            where: {
                email: req.body.email,
                organization_id: req.body.orgID,
                role: "employee"
            }
        })
        .then(function (user) {
            console.log("Updated User:", user);
            res.send(user);
        })
        .catch(function (err) {
            //res.send(err);
        });
};


module.exports.checkPassword = function (email, password, orgID) {
    return User.findAll({
        where: {
            email: email,
            organization_id: orgID
        },
        raw: true
    }).spread(function (user) {
        return user;
    })
        .catch(function (err) {
            return { error: err };
        })
};



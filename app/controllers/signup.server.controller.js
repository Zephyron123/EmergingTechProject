﻿const strUtils = require('../utils/string.server.utils');
const customer = require('./customer.server.controller');
const CustomerModel = require('mongoose').model('Customer');

const title = "Sign Up";

exports.render = (req, res, next) => {
    // We are currently sending user data.
    /*if (req.method == "POST") {
        const body = req.body;

        if (body.email && body.firstName && body.lastName && body.password) {
            // All the fields are filled. Create the customer.
            customer.create(req, res, next);
        } else {
            // Missing fields. Re-render the page passing an error message.
            res.render('signup', {
                error: 'Please, provide data for at least first name, last name, email, and password!',
                email: strUtils.getSafe(body.email),
                firstName: strUtils.getSafe(body.firstName),
                lastName: strUtils.getSafe(body.lastName),
                password: strUtils.getSafe(body.password),
                motherTongue: strUtils.getSafe(body.motherTongue),
                favoriteLang: strUtils.getSafe(body.favoriteLang)
            });
        }
    } else {*/
    res.render('signup', {
        title: "Signup Page"
    });
    //}
};

unknownError(err) {
    console.log(err);

    res.render('signup', {
        title: title,
        error: 'Unknown error occurred'
    });
    return;
}

exports.post = (req, res, next) => {
        const body = req.body;

        const user = {
            username = body.username,
            password = body.password,
            accounttype = body.accounttype
        };

        if (user.accounttype == "Patient") {
            user.patientData = [];
        }

        UserModel.exists({
                    username: user.username
                }, (err, result) => {
                    if (err) {
                        console.log(err);

                        res.render('signup', {
                            title: title,
                            error: 'Unknown error occurred'
                        });
                        return;
                    }


                    if (result) {
                        res.render('signup', {
                            title: title,
                            error: 'Username already exists'
                        });
                        return;
                    }

                    UserModel.create(user, (err) => {
                        if (err) {
                            console.log(err);

                            res.render('signup', {
                                title: title,
                                error: 'Unknown error occurred'
                            });
                            return;
                        }
                        req.session = user;
                    });
                }

                // if (exists) {
                //     res.render('signup', {
                //         title: title,
                //         error: 'Username already exists!'
                //     });
                //     return;
                // }
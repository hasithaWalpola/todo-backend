const bycrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require("../models");
const User = db.users;
const Translation = db.translations;


//Create an user
exports.create = async (req, res) => {

    //Hash the password
    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(req.body.password, salt)

    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
    };

    try {
        User.create(user)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while registering the User."
                });
            });
    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }

}

//Get All Users
exports.getAllUsers = async (req, res) => {


    User.scope('withoutPassword').findAll()
        .then(data => {
            res.send({
                code: 200,
                data: data,
                message: "users"
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });

}

//Save translation history
exports.saveTranslationHistory = async (req, res) => {

    const translation = {
        language: req.body.language,
        user_id: req.body.user_id,
    };

    try {
        Translation.create(translation)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while saving the translation."
                });
            });
    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }

}


//Get Translations for user
exports.getTranslationsByUser = async (req, res) => {

    const id = req.params.id;

    Translation.findAll({ where: { user_id: id } })
        .then(data => {
            res.send({
                code: 200,
                data: data,
                message: "users"
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving translations."
            });
        });

}



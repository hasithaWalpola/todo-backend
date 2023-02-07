const bycrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require("../models");
const User = db.users;


exports.login = async (req, res, next) => {

    console.log(req.body.email, 'req.body.email')

    await User.findOne({ where: { email: req.body.email } })
        .then(async data => {
            console.log(data, 'userCheck')

            if (!data) {
                return res.status(400).send({ error: 'Seems like you dont have account' })
            }

            //PasswordComaprison
            const validPassword = await bycrpt.compare(req.body.password, data.password)
            if (!validPassword) {
                return res.status(400).send({ error: 'Incorrect Password' })
            }


            //creating a token
            const token = jwt.sign({ id: data.id }, process.env.TOKEN_SECRET)
            res.header('auth-Token', token)
                .send({ code: 200, token: token, message: 'Login Sucessfull' })
        })
}





const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header('authorization')
    //console.log(token, 'isAuth')

    if (!token) {
        // console.log(token, 'isAuth')
        res.status(401).send({ error: 'unauthorized' })
    }

    try {

        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        //console.log(token, 'isAuth', req.user, verified)
        req.user = verified
        next()
    } catch (err) {
        console.log(err, 'err');
        res.status(401).send({ error: 'unauthorized' })
    }
}


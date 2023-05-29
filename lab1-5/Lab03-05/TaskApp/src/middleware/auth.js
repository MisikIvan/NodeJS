const jwt = require("jsonwebtoken")
const User = require("../../models/user")

const auth = async (req, res, next) => {
    try{
        const token = req.header("Authorization").replace("Bearer", "").trim()
        const decoded = jwt.verify(token, 'kdweueksdsjfij')
        const user = await User.findOne({_id:decoded._id, 'tokens.token':token})

        if (!user)
        {
            throw new Error("Please Authentificate")
        }

        req.user = user;
        req.token = token;
        next();
    }catch(error){
        res.status(401).send(error.message)
    }
}

module.exports = auth;
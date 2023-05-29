const mongoose = require("mongoose")
const validator = require("validator")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        trim:true
    },

    lastName: {
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate(value){
            if (!validator.isEmail(value))
                throw new Error("Email is invalid")
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if (value.toLowerCase() == "password")
                throw new Error("Your password cannot be named as 'password'")
        }
    },

    age: {
        type: Number,
        required: true,
        default:0,
        validate(value){
            if (value <= 0){
                throw new Error("Age must be a positive number");
            }
        }
    },
    tokens:[
        {
            token: {
                type:String,
                required: true
            }
        }
    ]
},{toJSON:{virtuals: true}, toObject:{virtuals:true}});

UserSchema.pre('save', async function (next){
    const user = this;  
    if (user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 8)
    next()
})

UserSchema.statics.findOneByCredentials = async (email, password) =>{
    const user = await User.findOne({email})

    if (!user){
        throw new Error("Incorrect login")
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
    {
        throw new Error("Incorrect password")
    }

    return user
}

UserSchema.methods.toJSON = function (){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

UserSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id.toString()}, 'kdweueksdsjfij')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token;
}

UserSchema.virtual("tasks", {
    ref:"Task",
    localField: "_id",
    foreignField: "owner"
})

// Model
const User = mongoose.model("User", UserSchema)

module.exports = User;
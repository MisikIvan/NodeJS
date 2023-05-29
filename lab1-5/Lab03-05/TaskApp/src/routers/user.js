const express = require("express")
const router = new express.Router()
const User = require("../../models/user")
const auth = require("../middleware/auth")

const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.get("/users",auth, async (req, res) => {
    try{    
        const users = await User.find();

        if (!users){
            res.status(404)
            throw new Error("Users not found")
        }
        res.status(200).send(users)
    }catch{
        res.status(500).send()
    }
})

router.get("/user/:id",auth, async (req, res) => {
    try{
        const user = await User.findById(req.params.id);

        if (!user){
            res.status(404)
            throw new Error("User not found")
        }

        res.status(200).send(user)
    }catch{
        res.status(500).send()
    }
})

router.get("/users/me", auth, async (req, res) => {
    const user = await User.findById(req.user.id)
    await user.populate("tasks")

    res.send(user)
})

router.post("/user", async (req, res) => {
    try{
        const user = new User(req.body);
        await user.save()
        res.status(200).send(user);
    }catch(error){
        res.status(500).send(error.message);
    }
})

router.post("/users/logout", auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token != req.token
        })
        await req.user.save()
        res.send("Successful logout")
    }catch(e){
        res.status(500).send()
    }
})

router.post("/user/login", async (req,res)=>{
    try{
        const user = await User.findOneByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }catch(error) {
        res.status(400).send(error.message)
    }
})

router.delete("/user/:id", auth, async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).send();
          }
          res.send(user);
    }catch{
        res.status(400).send();
    }
})


router.patch('/user/:id', auth, async(req,res) =>{
    try{
        const user = await User.findById(req.params.id)

        if (!user){
            res.status(404)
            throw new Error("User not found")
        }

        const fields = ["firstName", "lastName", "email", "password", "age"]
        fields.forEach((field) =>{
            if (req.body[field])
                user[field] = req.body[field]
        })

        await user.save()
        res.json(user)

    }catch{
        res.status(400).send()
    }
})

module.exports = router;
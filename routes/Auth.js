const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({path:"../config/.env"})

const User = require('../model/User');
const isAuth = require('../middleware/isAuth');
const {validator ,loginRules , registerRules} =require("../middleware/validator")

// router.get('/hello',(req,res)=>{
//     res.send('hi firas')
// })

router.post('/register',registerRules(),validator, async(req,res)=>{
    const {name , lastName , email , password} = req.body
    try {
        //simple validation 
        //check One
        // if(!name ||  !lastName || !email || !password){
        //     return res.status(400).json({msg : "please enter all fields!"})
        // }
        //check for existing user
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({msg:"user already exist"})
        }
        //create new User 
        user = new User({name, lastName , email , password})
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        user.password = hashedPassword;

        //save User
        await user.save();

        //sign user
        const payload = {
            id:user.id
        }
        //token
        const token = await jwt.sign(payload , process.env.secretOrKey ,{ expiresIn: 60 * 60 })
        res.status(200).send({msg : "User Register With Success" , user , token})

    } catch (error) {
        res.status(500).send({msg:"register server error"})
    }
})

router.post('/login',  loginRules(), validator, async(req,res)=>{
    const {email , password}=req.body;
    try {
        //check One
        // if(!email || !password){
        //     return res.status(400).json({msg : "please enter all fields!"})
        // }
        //check User
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({msg : "User does Not exist"})
        }
        //check password
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({msg : "Bad Creadentials password"})
        }

                //sign user
                const payload = {
                    id:user.id,
                    name:user.name
                }
                //token
                const token = await jwt.sign(payload ,process.env.secretOrKey,{expiresIn : 60 *60} )
        //logged success
        res.status(200).send({msg:'logged with success',user , token})
    } catch (error) {
        res.status(500).send({msg:"login server error"})
    }
})

//private routes 
router.get('/user',isAuth,(req,res)=>{
    res.status(200).send({user:req.user})
})

module.exports = router
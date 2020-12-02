const mongoose = require('mongoose')
const User = mongoose.model("User")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')


const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))


exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No User  found in db"
            })
        }
        req.user = user;
        next()
    })
}


exports.getUser = (req, res) => {
    const id = req.body.id
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No User  found in db"
            })
        }
       return res.json(user)
    })
}

exports.signup = (req,res) =>{
    const {first_name,last_name,age,email,contact,photo,aadhar_no,address,password} = req.body 
    if(!email || !password || !first_name || !age || !contact || !aadhar_no || !address) {
     res.status(422).json({error:"please add all the fields"})
     return
    }
   
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
              const user = new User({
                first_name,
                last_name,
                age,
                email,
                contact,
                photo,
                aadhar_no,
                address,
                password : hashedpassword
              })
      
              user.save()
              .then(user=>{
                  transporter.sendMail({
                      to:`${user.name} <${user.email}>`,
                      from:"bansaly37@gmail.com",
                      subject:"signup success",
                      html:"<h1>welcome to instagram</h1>"
                  })
                  res.json({message:"saved successfully"})
              })
              .catch(err=>{
                  console.log(err)
              })
        })
    .catch(err=>{
      console.log(err)
    })
}

exports.signin = (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
               const token = jwt.sign({_id:savedUser._id},'software')
            //   const {_id,name,email,followers,following,pic} = savedUser
               res.json({token,savedUser})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
}


exports.signout = (req,res)=>{
    res.clearCookie("token")
    res.send({ message : "User signout Successfully"})
}

exports.getAllUsers = (req,res) => {
    User.find().exec((err, user) => {
        if(err){
            return res.status(400).json({
                error : "Not user to display in db"
            })
        }
        res.json(user)
    })
}

exports.updateUser = (req,res) =>{
    const {_id,first_name,last_name,age,email,contact,photo,aadhar_no,address} = req.body 
    
   console.log(_id)
     
    User.findByIdAndUpdate(_id, { $set: { first_name,last_name,age,email,contact,photo,aadhar_no,address   }, },{new : true},
        (err, result) => {
            if (err) {
                console.log(err)
                return res.status(422).json({ error: "Updation Failed" })
            }
            res.json({ result, message: "Updation done " })
        })

}

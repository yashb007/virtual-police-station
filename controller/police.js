const mongoose = require('mongoose')
const Police = mongoose.model("Police")
const Fir = mongoose.model("Fir")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')


const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))


exports.getPoliceById = (req, res, next, id) => {
    Police.findById(id).exec((err, police) => {
        if (err || !police) {
            return res.status(400).json({
                error: "No Police  found in db"
            })
        }
        req.police = police;
        next()
    })
}

exports.signup = (req,res) =>{
    const {first_name,last_name,age,email,contact,photo,identity_no,address,password} = req.body 
    if(!email || !password || !first_name || !age || !contact || !identity_no ) {
           res.status(422).json({error:"please add all the fields"})
        return
       }
      
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
              const police = new Police({
                first_name,
                last_name,
                age,
                email,
                contact,
                photo,
                identity_no,
                address,
                password : hashedpassword
              })
      
              police.save()
              .then(police=>{
                  transporter.sendMail({
                      to:`${police.name} <${police.email}>`,
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
    Police.findOne({email:email})
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


exports.getAllPolice = (req,res) => {
    Police.find().exec((err, user) => {
        if(err){
            return res.status(400).json({
                error : "Not police to display in db"
            })
        }
        res.json(user)
    })
}

exports.updateUser = (req,res) =>{
    const {_id,first_name,last_name,age,email,contact,photo,identity_no,password} = req.body 
   
   
      bcrypt.hash(password,12).then(hashedpassword=>{
 
    Police.findByIdAndUpdate(_id, { $set: { first_name,last_name,age,email,contact,photo,identity_no ,password :hashedpassword } }, { new: true },
        (err, result) => {
            if (err) {
                console.log(err)
                return res.status(422).json({ error: "Updation Failed" })
            }
            res.json({ result, message: "Updation done " })
        })
})
}

exports.listAllFirs = (req,res)=> {
     console.log(req.body)
    const id = req.body.police_ID;
    Fir.find({police_ID : id}).then(fir => {
       return res.json(fir)
    })

} 
const mongoose = require('mongoose')
const Event = mongoose.model("Event")
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')


const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))

exports.getEventById = (req, res, next, id) => {
    Event.findById(id).exec((err, event) => {
        if (err || !event) {
            return res.status(400).json({
                error: "No event  found in db"
            })
        }
        req.event = event;
        next()
    })
}


exports.addEvent = (req,res) => {
    const {event_name, subject,start_date,end_date, start_time, place ,people_count } = req.body
    
    var num = () =>{
            s4 = () => {
                let characters = '1234567890';
                var charactersLength = characters.length;
                var result = ''
                for ( var i = 0; i < 4; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                 }
                 return result;
            }
            return s4( ) + '-' + s4( ) + '-' + s4()+ '-' + s4();
        }
    

    const event = new Event({
        event_name,
        subject,
        start_date,
        end_date,
        start_time,
        place ,
        people_count,
        event_app_num : num(),
        applicant_ID : req.user
    })

    event.save().then(event=>{
        console.log(event.applicant_ID.first_name)
        res.json({message:"saved successfully",event})
    })
    .catch(err=>{
        console.log(err)
    })
}


exports.getAllEvents = (req,res) => {
    Event.find().exec((err, event) => {
        if(err){
            return res.status(400).json({
                error : "No Events to display in db"
            })
        }
        res.json(event)
    })
}

exports.findEventByUserId = (req,res) => {
    const id = req.user._id;
    Event.find({applicant_ID : id}).then(event => {
        res.json(event)
    })
}

exports.listPermiEvents = (req,res)=> {
    Event.find({permission : true}).then(event => {
        res.json(event)
    })
}

exports.listNotPermiEvents = (req,res)=> {
    Event.find({permission : false}).then(event => {
        res.json(event)
    })
}

exports.grantpermission = (req,res) =>{
    const event = req.event
    const user = event.applicant_ID
   
    Event.findByIdAndUpdate(event._id,{$set :{ permission : true}}).then(result => {
        transporter.sendMail({
            to:`${user.first_name} <${user.email}>`,
            from:"bansaly37@gmail.com",
            subject:"signup success",
            html:"<h1>successfully Granted</h1>"
        })
        return res.json({"msg": "successfully Granted"})
    })
}


exports.deniedpermission = (req,res) =>{
    const event = req.event
   const user = event.applicant_ID
    Event.findByIdAndUpdate(event._id,{$set :{ permission : false}}).then(result => {
        transporter.sendMail({
            to:`${user.first_name} <${user.email}>`,
            from:"bansaly37@gmail.com",
            subject:"signup success",
            html:"<h1>successfully Denied</h1>"
        })
        return res.json({"msg": "successfully Denied"})
    })
}
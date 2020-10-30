const express = require('express');
const cors = require('cors')
const app = express()
const PORT = process.env.port ||  8080
const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://vps:gCik5W3FWyvlvQXy@cluster0.jbdvq.mongodb.net/VirtualPoliceStation?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected', () => {
    console.log("Connect to mongo");
})
mongoose.connection.on('error', (err) => {
    console.log(" Does not Connect to mongo",err);
})
// require('./models/user')
// require('./models/post')
// app.use(cors())
// app.use(express.json())
// app.use(require('./routes/auth'))
// app.use(require('./routes/post'))
// app.use(require('./routes/user'))


// if(process.env.NODE_ENV=="production"){
//     app.use(Express.static('client/build'))
//     const path = require('path')
//     app.get('*',(req,rse)=>{
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
// }

app.listen(PORT, () => {
    console.log(`Server is started at ${PORT}`)
})
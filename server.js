const express=require('express')
const connect=require('./config/connectDb')
const cors=require('cors')
/* const session=require('express-session')
const MongoStore = require('connect-mongo') */
const cookieParser = require('cookie-parser')

const fileUpload = require('express-fileupload')
const dotenv=require('dotenv')
dotenv.config({path:'./config/config.env'})
const app=express()


connect()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* const sessionStore = new MongoStore({  mongoUrl:process.env.DB_LOCAL_URI , collection: 'sessions' });
app.use(session({
    secret:  'foo' ,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 ,// Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
       
    }
})); */

app.use(cookieParser())

app.use("/public", express.static("public"));

app.use('/api/v1',require('./routes/products'))
app.use('/api/user',require('./routes/user'))
app.use("/api", require("./routes/upload"));
app.use('/api/order',require('./routes/order'))



app.use(fileUpload());


const port=process.env.Port ||4000




app.listen(port,()=>{
    console.log(`server open on ${port}`)
})
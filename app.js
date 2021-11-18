const express = require('express')
const app = express()
const path = require('path')
require('./conn')
const model = require('./scm-model')

// set view engine
app.set('view engine', 'pug')
//set views path
vpath = path.join(__dirname, 'views')
app.set('views', vpath)

//set static path
spath = path.join(__dirname, 'static')
app.use(express.static(spath))

//for json obj of form
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.get("/", (req, res) => {
    res.render('index.pug')
})

app.get("/register", (req, res) => {
    res.render('register')
})

app.get("/login", (req, res) => {
    res.render('login')
})

app.post("/login", async (req, res) => {
    try {
        const mail = req.body.mail
        const pass = parseInt(req.body.pass)
        const data = await model.findOne({ mail })
        //find one thi direct onj male find thi array of obj male
    
        
        if(data.pass===pass){
            res.render('index')
        }
        else{
            res.send('invalid pass(log in)')
        }


    } catch (e) {
        res.send('invalid log in details')

    }
})

app.post("/register", async (req, res) => {
    try {
        const pass = req.body.pass
        const cpass = req.body.cpass
        if (pass === cpass) {
            res.statusCode = 201
            const data = new model(req.body)
            const op = await data.save()
            // res.send(op)
            res.render('index')

        } else {
            res.render('back')
        }
    } catch (e) {
        res.statusCode = 400;
        res.send(e)

    }
})

const port = process.env.port || 200
app.listen(port, () => {
    console.log(`server start at ${port}`);
})
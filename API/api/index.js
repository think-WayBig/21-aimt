let express = require('express');
let app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");

require('dotenv').config();
app.use(bodyParser.json());
app.use(cors());

try {
    mongoose.connect(
        "mongodb+srv://rspmanas1:tdAeDIgnXn1OiNLy@cluster0.loali6z.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(() => {
        console.log("mongodb connection established");
    });
} catch (err) {
    console.log(err)
}

app.get('/', (req, res) => {
    res.send({
        message: "Welcome"
    });
});

const Auth = require('./models/auth');
app.post('/newUser', async (req, res) => {
    try {
        let auth = new Auth({
            Name: req.body.Name,
            Mail: req.body.Mail,
            Password: req.body.Password,
        });

        await auth.save();

        console.log("Data sent successfully")

        res.status(202).send({
            message: "Data sent successfully",
            data: auth
        })
    } catch (error) {
        res.status(202).send({
            message: "Failed",
            error: error,
            data: {
                Name: req.body.Name,
                Mail: req.body.Mail,
                Password: req.body.Password,
            }
        })
    }
});

app.get('/user', async (req, res) => {
    try {
        let data = await Auth.findOne({ Mail: req.body.Mail });
        res.json({
            data: data
        })
    } catch (error) {
        res.status(202).send({
            message: "Failed",
            error: error.message,
        })
    }
})

const Admission = require('./models/admission');
app.post('/newAdmission', async (req, res) => {
    try {
        let admission = new Admission({
            Name: req.body.Name,
            Gender: req.body.Gender,
            Course: req.body.Course,
            Specialization: req.body.Specialization,
            Category: req.body.Category,
            Fname: req.body.Fname,
            Mname: req.body.Mname,
            Dob: req.body.Dob,
            Address: req.body.Address,
            Phone: req.body.Phone,
            Email: req.body.Email,
            Country: req.body.Country,
            State: req.body.State,
            Mschool: req.body.Mschool,
            Myear: req.body.Myear,
            Mpercent: req.body.Mpercent,
            Dcollege: req.body.Dcollege,
            Dyear: req.body.Dyear,
            Dpercent: req.body.Dpercent,
            Hschool: req.body.Hschool,
            Hyear: req.body.Hyear,
            Hpercent: req.body.Hpercent,
            Gcollege: req.body.Gcollege,
            Gyear: req.body.Gyear,
            Gpercent: req.body.Gpercent,
        });

        await admission.save();

        console.log("Data sent successfully")

        res.status(202).send({
            message: "Data sent successfully",
            data: admission
        })
    } catch (error) {
        res.status(202).send({
            message: "Failed",
            error: error,
            data: {
                
            }
        })
    }
});

let PORT = 5000;
app.listen(PORT, () => { console.log('API Running Successfully', `http://localhost:${PORT}`) });
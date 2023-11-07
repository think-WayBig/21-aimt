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

let PORT = 5000;
app.listen(PORT, () => { console.log('API Running Successfully', `http://localhost:${PORT}`) });
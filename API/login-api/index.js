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
    );
} catch (err) {
    console.log(err)
}

app.get('/', (req, res) => {
    res.send({
        message: "Welcome"
    });
});

let PORT = 5000;
app.listen(PORT, () => { console.log('API Running Successfully', `http://localhost:${PORT}`) });
let express = require('express');
let app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const bucket = require('./firebase'); // Import the Firebase Storage bucket
const multer = require('multer');
const upload = multer();

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
        // Check if the email already exists
        const existingUser = await Auth.findOne({ Mail: req.body.Mail });

        if (existingUser) {
            // Email already exists, send a response indicating the conflict
            return res.status(409).send({
                message: "Email already exists",
                data: existingUser
            });
        }

        // Email does not exist, create and save a new user
        let auth = new Auth({
            Name: req.body.Name,
            Mail: req.body.Mail,
            Password: req.body.Password,
            Enrollment: Math.floor(Math.random() * 9000000) + 1000000
        });

        await auth.save();

        console.log("Data sent successfully");

        res.status(202).send({
            message: "Data sent successfully",
            data: auth
        });
    } catch (error) {
        // Handle other errors
        res.status(500).send({
            message: "Failed",
            error: error.message,
            data: {
                Name: req.body.Name,
                Mail: req.body.Mail,
                Password: req.body.Password,
            }
        });
    }
});

app.post('/user', async (req, res) => {
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
const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey("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");

app.post('/sendMail', async (req, res) => {
    const msg = {
        to: req.body.Mail,
        from: 'rkinfotechasr@gmail.com',
        subject: 'Verify your email',
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Affinity Institute of Management and Technology</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for choosing Affinity Institute of Management and Technology. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${req.body.otp}</h2>
          <p style="font-size:0.9em;">Regards,<br />Affinity Institute of Management and Technology</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Affinity Intitute of Management and Technology</p>
            Visit <a href="https://aimt.net.in">https://aimt.net.in</a>
            <p>India</p>
          </div>
        </div>
      </div>`
    };

    try {
        await sendGridMail.send(msg);
        res.json({
            message: "Email sent Successfully!!"
        });
    } catch (error) {
        res.json({
            message: "Error",
            error: error
        });
    }
});

const Courses = require('./models/courses');
app.post('/newCourse', async (req, res) => {
    try {
        let courses = new Courses({
            course_id: req.body.course_id,
            course: req.body.course,
            description: req.body.description,
            subjects: req.body.subjects
        });

        await courses.save();

        console.log("Data sent successfully");

        res.status(202).send({
            message: "Data sent successfully",
            data: courses
        });
    } catch (error) {
        // Handle other errors
        res.status(500).send({
            message: "Failed",
            error: error.message,
            data: {
                course_id: req.body.course_id,
                course: req.body.course,
                description: req.body.description,
                subjects: req.body.subjects
            }
        });
    }
});

app.get('/getCourse/:course_id', async (req, res) => {
    try {
        let data = await Courses.findOne({ course_id: req.params.course_id });
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

app.post('/uploadDocument', upload.single('file'), async (req, res) => {
    try {
        const file = req.file; // Assuming you are using multer middleware for file upload

        if (file) {
            const fileName = `${Date.now()}_${file.originalname}`;
            const fileBlob = bucket.file(fileName);

            const blobStream = fileBlob.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });

            blobStream.on('error', (error) => {
                console.log(error);
                res.status(500).json({
                    message: 'Failed to upload document',
                    error: error.message,
                });
            });

            blobStream.on('finish', async () => {
                // Updated code for generating signed URL with a valid expiration date
                const expirationDate = new Date();
                expirationDate.setFullYear(expirationDate.getFullYear() + 1); // Set to expire in 1 year

                const [url] = await fileBlob.getSignedUrl({
                    action: 'read',
                    expires: expirationDate,
                });

                res.status(200).json({
                    message: 'Document uploaded successfully',
                    storageUrl: url,
                });
            });

            blobStream.end(file.buffer);
        } else {
            res.status(400).json({
                message: 'No file provided in the request',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to upload document',
            error: error.message,
        });
    }
});

app.post('/sendEnrollment', async (req, res) => {
    const msg = {
        to: req.body.Mail,
        from: 'rkinfotechasr@gmail.com',
        subject: 'You are successfully enrolled!!',
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Affinity Institute of Management and Technology</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for choosing Affinity Institute of Management and Technology. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${req.body.otp}</h2>
          <p style="font-size:0.9em;">Regards,<br />Affinity Institute of Management and Technology</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Affinity Intitute of Management and Technology</p>
            Visit <a href="https://aimt.net.in">https://aimt.net.in</a>
            <p>India</p>
          </div>
        </div>
      </div>`
    };

    try {
        await sendGridMail.send(msg);
        res.json({
            message: "Email sent Successfully!!"
        });
    } catch (error) {
        res.json({
            message: "Error",
            error: error
        });
    }
});

app.get('/getUsers', async (req, res) => {
    try {
        // Query the database to get all users
        const auth = await Auth.find();

        // Send the users as a JSON response
        res.json(auth);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

let PORT = 5000;
app.listen(PORT, () => { console.log('API Running Successfully', `http://localhost:${PORT}`) });
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
            Enrollment: "aimt" + Math.floor(Math.random() * 9000000),
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
            City: req.body.City,
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
            Examination: req.body.Examination,
            Docs: "null",
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

app.put('/updateAdmission/:email', async (req, res) => {
    try {
        const email = req.params.email;

        // Find the document based on the email
        let admission = await Admission.findOne({ Email: email });

        if (!admission) {
            return res.status(404).send({
                message: "No admission record found for the provided email",
                data: null
            });
        }

        // Update the admission object with new data from req.body
        admission.Name = req.body.Name;
        admission.Gender = req.body.Gender;
        admission.Course = req.body.Course;
        admission.Specialization = req.body.Specialization;
        admission.Category = req.body.Category;
        admission.Fname = req.body.Fname;
        admission.Mname = req.body.Mname;
        admission.Dob = req.body.Dob;
        admission.Address = req.body.Address;
        admission.Phone = req.body.Phone;
        admission.Country = req.body.Country;
        admission.State = req.body.State;
        admission.City = req.body.City;
        admission.Mschool = req.body.Mschool;
        admission.Myear = req.body.Myear;
        admission.Mpercent = req.body.Mpercent;
        admission.Dcollege = req.body.Dcollege;
        admission.Dyear = req.body.Dyear;
        admission.Dpercent = req.body.Dpercent;
        admission.Hschool = req.body.Hschool;
        admission.Hyear = req.body.Hyear;
        admission.Hpercent = req.body.Hpercent;
        admission.Gcollege = req.body.Gcollege;
        admission.Gyear = req.body.Gyear;
        admission.Gpercent = req.body.Gpercent;
        admission.Examination = req.body.Examination;

        // Save the updated admission object
        await admission.save();

        console.log("Data updated successfully");

        res.status(200).send({
            message: "Data updated successfully",
            data: admission
        });
    } catch (error) {
        res.status(500).send({
            message: "Failed to update data",
            error: error,
            data: null
        });
    }
});

app.get('/getAdmission/:email', async (req, res) => {
    try {
        const email = req.params.email;

        // Using Mongoose findOne to find the document based on email
        const admission = await Admission.findOne({ Email: email });

        if (!admission) {
            // If no admission record is found for the provided email
            return res.status(404).send({
                message: "No admission record found for the provided email",
                data: null
            });
        }

        res.status(200).send({
            message: "Data retrieved successfully",
            data: admission
        });
    } catch (error) {
        res.status(500).send({
            message: "Failed to retrieve data",
            error: error,
            data: null
        });
    }
});

app.put('/updateDocs/:Email', async (req, res) => {
    try {
        const result = await Admission.findOneAndUpdate(
            { Email: req.params.Email },
            { $set: { Docs: req.body.Docs } },
            { returnOriginal: false }
        );

        console.log('Query:', { Docs: req.body.Docs });
        console.log('Update Result:', result);

        if (result) {
            res.status(200).json({ message: 'Docs updated successfully', updatedDocument: result });
        } else {
            res.status(404).json({ message: 'Document not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey("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");

app.post('/sendMail', async (req, res) => {
    const msg = {
        to: req.body.Mail,
        from: 'verification@aimt.net.in',
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

app.put('/updateStatus/:enrollment', async (req, res) => {
    const enrollment = req.params.enrollment;

    try {
        const result = await Auth.findOneAndUpdate(
            { Enrollment: enrollment },
            { $set: { Status: "1" } },
            { returnOriginal: false }
        );

        console.log('Query:', { Enrollment: enrollment });
        console.log('Update Result:', result);

        if (result) {
            res.status(200).json({ message: 'Status updated successfully', updatedDocument: result });
        } else {
            res.status(404).json({ message: 'Document not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
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
        from: 'verification@aimt.net.in',
        subject: 'You are successfully enrolled!!',
        html: `Dear Candidate,
        <br><br>
        Congratulations and welcome to <b>Affinity Institute of Management and Technology!</b> We are thrilled to have you as a part of our esteemed institute and are excited about the educational journey that lies ahead.
        <br>
        Your enrollment is now complete, and we are pleased to provide you with your unique enrollment number: ${req.body.Enrollment}. This number will serve as your identification throughout your time with us.
        <br>
        To get started, please use the following link to log in and access your student portal: <a href='https://www.aimt.net.in/enrollment/'>https://www.aimt.net.in/enrollment/</a>. Here, you will find important resources, course materials, and information related to your program. Your engagement with the student portal is crucial for staying updated on announcements, schedules, and academic resources.
        <br>
        If you have any questions or encounter any issues during the onboarding process, our dedicated support team is here to assist you. Feel free to reach out at <a href="mailto:info@aimt.net.in">info@aimt.net.in</a>
        <br>
        Once again, welcome to Affinity Institute of Management and Technology! We look forward to supporting you in your academic journey and witnessing your success.
        <br><br>
        Best regards,<br>
        Affinity Institute of Management and Technology`
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
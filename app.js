const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('./apiController'); // Assuming User is your model

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

const router = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password,
    };

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ name: data.name });

        if (existingUser) {
            return res.send('This user already exists. Please choose a different username.');
        } else {
            // Hash the password using bcrypt
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);

            data.password = hashedPassword;

            // Create a new user document and save it to the database
            const newUser = await User.create(data);
            console.log('User created successfully:', newUser);
        }

        // Respond to the client or perform additional actions
        res.send('User created successfully');
    } catch (error) {
        console.error('Error creating user:', error);

        // Handle the error and respond to the client
        res.status(500).send('Internal Server Error');
    }
});

// Login user
app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ name: req.body.username });

        if (!user) {
            return res.send('This user cannot be found');
        }

        // Log the user object
        console.log('Retrieved user:', user);

        // Log the hashed password and its type
        console.log('Hashed password from the database:', user.password);
        console.log('Type of hashed password:', typeof user.password);

        // Log the password from the request
        console.log('Password from the request:', req.body.password);

        // Compare the plain text password from the request with the hashed password from the database
        const isPasswordMatch = bcrypt.compareSync(req.body.password, user.password);

        console.log('Is password match?', isPasswordMatch);

        if (isPasswordMatch) {
            res.render("home");
        } else {
            res.send('Wrong password');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.send('An error occurred during login');
    }
});

app.use('/', router);

module.exports = app;

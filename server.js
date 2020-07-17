const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect database
connectDB();

//init middleware
app.use(express.json({ extended : false }));

app.get(
    '/', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Enter a valid E-mail').isEmail(),
        check('password', 'please enter a password with 6 or more charecters').isLength({min: 6})
    ],
    (req, res) => res.send('API running'));

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

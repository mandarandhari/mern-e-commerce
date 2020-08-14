const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: true }));

app.use('/customer/register', require('./routes/customers/register'));
app.use('/customer/login', require('./routes/customers/login'));
app.use('/customer/checkValidEmail', require('./routes/customers/checkValidEmail'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started at port ${port}`));
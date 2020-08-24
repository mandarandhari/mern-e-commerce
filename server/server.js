const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: true }));

app.use('/register', require('./routes/customers/register'));
app.use('/login', require('./routes/customers/login'));
app.use('/customer', require('./routes/customers/customer'));
app.use('/profile', require('./routes/customers/profile'));
app.use('/products', require('./routes/products/products'));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started at port ${port}`));
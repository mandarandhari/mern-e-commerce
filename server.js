const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const serveStatic = require('serve-static');

const app = express();

connectDB();

app.use(express.json({ extended: true }));
app.use(serveStatic(__dirname + '/client/build'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/public/index.html'));

    if (err) {
        res.status(500).send(err);
    }
});

app.use('/register', require(path.join(__dirname, './routes/customers/register')));
app.use('/login', require(path.join(__dirname, './routes/customers/login')));
app.use('/customer', require(path.join(__dirname, './routes/customers/customer')));
app.use('/profile', require(path.join(__dirname, './routes/customers/profile')));
app.use('/products', require(path.join(__dirname, './routes/products')));
app.use('/cart', require(path.join(__dirname, './routes/cart')));
app.use('/order', require(path.join(__dirname, './routes/order')));
app.use('/my-orders', require(path.join(__dirname, './routes/myorders')));
app.use('/addCountries', require(path.join(__dirname, './routes/countries')));
app.use('/contact', require(path.join(__dirname, './routes/contact')));
app.use('/reset-password', require(path.join(__dirname, './routes/customers/reset_password')));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started at port ${port}`));
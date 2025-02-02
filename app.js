const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const { hashedSecret } = require('./crypto/config');

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: hashedSecret,
    resave: false,
    saveUninitialized: true
}));

app.use('/users', userRoutes);

app.get('/', (req, res) => {
    if (req.session.user) {
        res.send('<a href="/dashboard">Dashboard</a> <form action="/logout" method="POST"><button type="submit">Logout</button></form>');
    } else {
        res.send('<form action="/login" method="POST">
                    <input type="text" name="username" placeholder="Username" required>
                    <input type="password" name="password" placeholder="Password" required>
                    <button type="submit">Login</button>
                 </form>');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    console.log('Press Ctrl+C to stop the server');
});

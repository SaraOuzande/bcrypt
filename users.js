const bcrypt = require('bcrypt');

const users = [
    {
        id: 1,
        username: 'admin',
        password: bcrypt.hashSync('admin123', 10), 
        name: 'Admin User'
    },
    {
        id: 2,
        username: 'user1',
        password: bcrypt.hashSync('password123', 10), 
        name: 'User One'
    }
];

module.exports = users;

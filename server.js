const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const grievances = require('./routes/api/grievances');

const app = express();

const db = require('./config/keys').mongoURI;

mongoose.connect(db)
    .then(()=>console.log('Database connected'))
    .catch(err=>console.log(err));

app.get('/',(req, res)=>{
    res.send('Hello');
});

app.use('/api/users', users);
app.use('/api/grievances', grievances);

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Server running on port ${port}`));
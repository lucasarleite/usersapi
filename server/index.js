const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/users.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

app.use('/users', userRoutes);

const CONNECTION_URL = 'mongodb+srv://usersapi:usersapi@cluster0.mpctl.mongodb.net/usersapi?retryWrites=true;';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch((e) => {
        console.log(e.message);
    });

mongoose.set('useFindAndModify', false);
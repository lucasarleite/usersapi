import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());



const CONNECTION_URL = 'mongodb+srv://usersapi:usersapi@cluster0.mpctl.mongodb.net/usersapi?retryWrites=true&w=majority;';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch((e) => {
        console.log(e.message);
    });

mongoose.set('useFindAndModify', false);
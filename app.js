const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


//middleware для бодипарсинга
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//mongoose connection establishing
mongoose.connect('mongodb://localhost:27017/opensource', { useNewUrlParser: true })
    .then(() => {
        console.log('Mongo connected')
    })
    .catch( err => console.log(err));

app.use('/api/users', require('./routes/api/users'));

app.get('/', (req, res) => {
    res.send('asd');
})

port = 3000 || process.env.port;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
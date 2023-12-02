const mongoose = require('mongoose');

const url = "mongodb+srv://philip:free@public.nsauw4d.mongodb.net/ActivityDB?retryWrites=true&w=majority";
const client = new MongoClient(url);

client.connect();

mongoose.connect(url).then(() => console.log('MongoDB Connected...'));

exports.ping = (req, res) => {
    res.send('pong');
};


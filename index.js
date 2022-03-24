const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose')
const rawInfo = require('./models/rawinfo');
const { json } = require('express/lib/response');

const rfList = new Array();
// const methodOverride = require('method-Override');
mongoose.connect('mongodb://localhost:27017/rfid', {useNewUrlParser: true, useUnifiedTopology: true,})
    .then(() => {
        console.log("Mongo Connection OPEN!")
    })
    .catch(err => {
        console.log("Mongo connection ERROR!")
        console.log(err)
    })

app.use(express.static(path.join(__dirname, '/public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.use(express.json()); // for parsing json


app.get('/', (req, res) => {
	res.send('It is working!!!');
});

app.get('/showrawdata', (req, res) => {
	res.render('rawdata', {rfList});
});

app.post('/postit', async (req, res) => {
    const uidInfo = req.body;
    const rfidInfo = {time: new Date(), ...uidInfo};
    console.log('POST from nodeMCU:');
    console.log(rfidInfo);
    rfList.push(rfidInfo);
    //const newEntry = new rawInfo(rfidInfo);
    //console.log(newEntry)
    //await newEntry.save();
    res.send('success! its working!');
})

// starting the server
const PORT = process.env.PORT || 3000;
// running on 0.0.0.0 will work for ip instead of using standard 127.0.0.0(localhost)
app.listen(PORT, '0.0.0.0', () => {
	console.log(`listening on port ${PORT}`);
	console.log('Press cntr+c to stop the server');
});

var cors = require('cors')
var express = require('express');
var app = express();
var port = process.env.PORT || 3000; 
var mongoose = require('mongoose');
var records = require('./api/routes/records'); 
var mqtt = require('mqtt')
var controller = require('./api/controllers/records')

mongoose.connect('mongodb+srv://tsiw:GAa8xvmV3eKrVa8C@cluster0.b0vmz.mongodb.net/TSIW?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

var client  = mqtt.connect('mqtts://295a997120e24c60a5207a820b83e5ee.s2.eu.hivemq.cloud', { username: 'joaoadrianoferreira_sub', password: 'dsfsdkjasdfksad892354234' })
 
client.on('connect', function (conn) {
  console.log(conn);
  client.subscribe('temperature', function (res) {})
})
 
client.on('message', function (topic, message) {
  console.log(message.toString());
  controller.create_record_mqtt(message)
})

app.use(express.json());
app.use(cors()); 
app.use('/records', records);

app.post('/mqtt', function(req,res) {
  client.publish('temperature', req.query.temperature); 
  res.status(200).send('Value Published')
})

app.listen(port, () => {
  console.log("Server running on port " + port); 
});
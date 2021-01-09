var cors = require('cors')
var express = require('express');
var app = express();
var port = process.env.PORT || 3000; 
var mongoose = require('mongoose');
var records = require('./api/routes/records'); 
var mqtt = require('mqtt')
var controller = require('./api/controllers/records')

mongoose.connect('mongodb+srv://tsiw:GAa8xvmV3eKrVa8C@cluster0.b0vmz.mongodb.net/TSIW?retryWrites=true&w=majority',  { useNewUrlParser: true }); 

var client  = mqtt.connect('mqtt://192.168.1.140', { username: 'teste', password: 'teste' })
 
client.on('connect', function () {
  client.subscribe('sound', function (err) {
    if(err) {
      console.log(err)
    }
  })
})
 
client.on('message', function (topic, message) {
  controller.create_record_mqtt(message)
  client.end()
})

app.use(express.json());
app.use(cors()); 
app.use('/records', records);
app.listen(port, () => {
  console.log("Server running on port " + port); 
});
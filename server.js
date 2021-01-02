var cors = require('cors')
var express = require('express');
var app = express();
var port = process.env.PORT || 3000; 
var mongoose = require('mongoose');
var records = require('./api/routes/records'); 

mongoose.connect('mongodb+srv://tsiw:GAa8xvmV3eKrVa8C@cluster0.b0vmz.mongodb.net/TSIW?retryWrites=true&w=majority',  { useNewUrlParser: true }); 

app.use(express.json());
app.use(cors()); 
app.use('/records', records);
app.listen(port, () => {
  console.log("Server running on port " + port); 
});
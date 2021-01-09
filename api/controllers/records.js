var Record = require("../models/records"); 

exports.list_all_records = function (req, res) {
  Record.find({}, function (err, record) {
    if (err)
      res.status(400).send(err);
    res.status(200).json(record);
  });
};

exports.create_record = function (req, res) {
  var new_record = new Record(req.body);
  new_record.save(function (err, record) {
    if (err)
      res.status(400).send(err);
    res.status(200).json(record);
  });
};

exports.create_record_mqtt = function (value) {
  var new_record = new Record({value: value});
  new_record.save(function (err) {
    if (err)
      console.log(err)
  });
};

exports.list_record = function (req, res) {
  Record.findById(req.params.recordId, function (err, record) {
    if (err)
      res.status(400).send(err);
    res.status(200).json(record);
  });
};

exports.update_record = function (req, res) {
  Record.findOneAndUpdate({ _id: req.params.recordId }, req.body, { new: true }, function (err, record) {
    if (err)
      res.status(400).send(err);
    res.status(200).json(record);
  });
};

exports.delete_record = function (req, res) {
  Record.remove({
    _id: req.params.recordId
  }, function (err, record) {
    if (err)
      res.status(400).send(err);
    res.status(200).json({ message: 'Record successfully deleted' });
  });
};
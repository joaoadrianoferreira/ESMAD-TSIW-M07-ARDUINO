
var express = require('express')
var router = express.Router()
var controller = require('../controllers/records');

router.route('/')
.get(controller.list_all_records)
.post(controller.create_record);

router.route('/:recordId')
.get(controller.list_record)
.put(controller.update_record)
.delete(controller.delete_record);

module.exports = router
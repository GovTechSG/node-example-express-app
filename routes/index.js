const express = require('express');
const router = express.Router();


router.get('/', function (req, res, next) {
    return res.jsonp({status: 'OK'});
});

// Routes can be broken up into individual files,
// imported and used as follows. 

router.use('/store', require('./store'));

module.exports = router;


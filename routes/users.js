var express = require('express');
var router = express.Router();
const db = require('../model-mysql');


/* GET listing. */
router.get('/', function(req, res, next) {
  async function week(req, res) {
    try {
      var usertype =  req.session.usertype;
      console.log("user router");
      console.log(usertype);
      res.redirect("/week.html");
    } catch (e) {
      console.log(e);
    }
  }
});


module.exports = router;
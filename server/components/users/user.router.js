const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const create = require('./createUser.js')


router.post('/', createUser)

function createUser(req, res) {

  const db = require('../connectDB.js');
  const con = db.connect();

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO users (fb_id, fb_at, expires_in, fname, lname, email, picture) VALUES ?";
    var values = [
      [
        req.body.id,
        req.body.accessToken,
        req.body.expiresIn,
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.picture.data.url
      ]
    ];
    con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
    });
  });
  res.status(200).send();
}

module.exports = router;

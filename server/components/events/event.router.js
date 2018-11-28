const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get('/', getAllEvents);
router.post('/', createEvent);

function createEvent(req, res) {

  const db = require('../connectDB.js');
  const con = db.connect();

	con.connect(function(err) {
	  if (err) throw err;
	  console.log("Connected!");
	  var sql = "INSERT INTO setup_events (admin_id, fb_event_id, description, e_name, loc_city, loc_country, loc_latitude, loc_longitude, loc_state, loc_street, loc_pc, start_time, cover) VALUES ?";
	  var values = [
            			[
                    req.body.user_id,
                    req.body.event.id,
                    req.body.event.description,
                    req.body.event.name,
                    req.body.event.place.city,
                    req.body.event.place.country,
                    req.body.event.place.latitude,
                    req.body.event.place.longitude,
                    req.body.event.place.state,
                    req.body.event.place.street,
                    req.body.event.place.zip,
                    req.body.event.start_time,
                    req.body.event.cover.source
                  ]
            		];
	  con.query(sql, [values], function (err, result) {
		if (err) throw err;
		console.log("Number of records inserted: " + result.affectedRows);
	  });
	});
  res.status(200).send();
}

function getAllEvents(req,res){
  const data = [{
    id: 1,
    host:"Anna Stasia",
    name: "Pool Party",
    date: "24/11/17"
  }, {
    id: 2,
    host: "Thomas Burleson",
    name: "BBQ",
    date: "15/11/17"
  }, {
    id: 3,
    host: "Will Button",
    name: "PD Day",
    date: "21/12/17"
  }, {
    id: 4,
    host: "Ben Clinkinbeard",
    name: "Park",
    date: "15/11/17"
  }, {
    id: 5,
    host: "Kent Dodds",
    name: "BBQ",
    date: "15/11/17"
  }, {
    id: 6,
    host: "Trevor Ewen",
    name: "BBQ",
    date: "15/11/17"
  }, {
    id: 7,
    host: "Aaron Frost",
    name: "BBQ",
    date: "15/11/17"
  }, {
    id: 8,
    host: "Joel Hooks",
    name: "BBQ",
    date: "15/11/17"
  }, {
    id: 9,
    host: "Jafar Husain",
    name: "BBQ",
    date: "15/11/17"
  }, {
    id: 10,
    host: "Tim Kindberg",
    name: "BBQ",
    date: "15/11/17"
  }, {
    id: 11,
    host: "John Lindquist",
    name: "BBQ",
    date: "15/11/17"
  }, {
    id: 12,
    host: "Joe Maddalone",
    name: "BBQ",
    date: "15/11/17"
  }, {
    id: 13,
    host: "Tyler McGinnis",
    name: "BBQ",
    date: "15/11/17"
  }, {
    id: 14,
    host: "Scott Moss",
    name: "BBQ",
    date: "15/11/17"
  }, {
    id: 15,
    host: "Robert Penner",
    name: "BBQ",
    date: "15/11/17"
  }, {
    id: 16,
    host: "Keith Peters",
    name: "BBQ",
    date: "15/11/17"
  }, {
    id: 17,
    host: "Lukas Ruebbelke",
    name: "BBQ",
    date: "15/11/17"
  }, {
    id: 18,
    host: "Brett Shollenberger",
    name: "BBQ",
    date: "15/11/17"
  }];

  res.status(200).send(data);
}



module.exports = router;

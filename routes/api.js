var express = require('express');
var router = express.Router();
const axios = require('axios');
const API_KEY = 'AIzaSyBWLG6Q2YHCq-ZYJtV8PrfWYZCSRJVJUBc';

/* GET home page. */
router.post('/', function(req, res, next) {
    const gpsArray = req.body['data'];
    var centerLat = 0;
    var centerLon = 0;
    // console.log(gpsArray);
    for (var i = 0; i < gpsArray.length; i++) {
        centerLat += parseFloat(gpsArray[i].lat);
        centerLon += parseFloat(gpsArray[i].lon);
    }
    centerLat = centerLat / gpsArray.length;
    centerLon = centerLon / gpsArray.length;

    // const centerCoordinate = "37.3594556,127.10531470000001";
    const API_URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${centerLat},${centerLon}&radius=500&key=${API_KEY}`;
    var dataList = [];
    axios.get(API_URL)
        .then((data) => {
            for (var i = 0; i < data.data.results.length; i++) {
                dataList[i] = {
                    location: data.data.results[i].geometry.location,
                    name: data.data.results[i].name,
                    rating: data.data.results[i].rating
                }
            }
            console.log(dataList);
            res.status(200).send(dataList);
        })
        .catch((e) => {
            console.log(e);
        });
});

module.exports = router;
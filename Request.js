//ask user for a stop code, and print a list of the next five buses at that stop code,
// with their routes, destinations, and the time until they arrive in minutes. []

import fetch from 'node-fetch';
import * as readline from 'readline';
import readlinesync from 'readline-sync';

let postCodeData = {};
// let postcode = readlinesync.question('enter postCode : ');
// console.log(postcode);
let coordinates = {};
let arivalPredictions = [];
let postcode;
const stopID = "490008660N";

let expression = '/([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\\s?[0-9][A-Za-z]{2})/g'
do {
    try {
        postcode = readlinesync.question('enter postCode : ');
        postCodeData = await sendRequest(`https://api.postcodes.io/postcodes/${postcode}`);
        if (postCodeData.status === 404) throw "Invalid post code";
    } catch (err) {
        console.log(err);
    }
} while (postCodeData.status === 404);


//gets info of the given postcode.
// let coordinatesRequest = 'https://api.postcodes.io/postcodes/' + postcode;

let findStopRequest = 'https://api.tfl.gov.uk/StopPoint/Mode/bus'

let FindStops = "https://api.tfl.gov.uk/StopPoint/" + stopID;

//Gets the list of arrival predictions for the given stop point id
let findArrivals = "https://api.tfl.gov.uk/StopPoint/" + stopID + "/Arrivals\n";

async function sendRequest(url) {
    const response = await fetch(url)
        .then(response => response.json())
        .then(data => {
            return data
        });
    return response;
}


function setCoordinates() {
    coordinates = {
        longitude: postCodeData.result.longitude,
        latitude: postCodeData.result.latitude
    }
}


function setArivalPredictions(data) {
    for (const dataKey in data) {
        let bus = data[dataKey]
        arivalPredictions.push({
            vehicleId: bus.vehicleId,
            lineName: bus.lineName,
            destinationName: bus.destinationName,
            expectedArrival: bus.expectedArrival
        });
    }
}


// let LTdata = await sendRequest(findArrivals);
// let postCodeData = await sendRequest(coordinatesRequest);

setCoordinates();
// console.log(coordinates);

let findStopsNearCoordinates = 'https://api.tfl.gov.uk/StopPoint/?lat=' + coordinates.latitude + '&lon=' + coordinates.longitude + '&stopTypes=NaptanPublicBusCoachTram';

try {
    let stopsNearCoordinates = await sendRequest(findStopsNearCoordinates);
    //run it as != to get an error.
    if (stopsNearCoordinates.length === 0) throw "NO bus stops at given post code";
} catch (err) {
    console.log(err);
}

// console.log('stops near ' + postcode + ': ');
// Gets a list of bus stops close to give coordinates... I think
// console.log(findStopsNearCoordinates);
// console.log(stopsNearCoordinates);

// setArivalPredictions(LTdata);
// console.log('Predictions :')
// console.log(arivalPredictions);

let journeyPlannerRequest = 'https://api.tfl.gov.uk/Journey/JourneyResults/' + postcode + '/to/se114np';
try {
    let journeyPlanner = await sendRequest(journeyPlannerRequest);
    //run it as != to get an error.
    if (journeyPlanner.length != 0) throw "NO buses to from this postcode to...";
} catch (err) {
    console.log(err);
}

// console.log('journey planner: ');
// console.log(journeyPlanner);

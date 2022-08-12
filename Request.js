//ask user for a stop code, and print a list of the next five buses at that stop code,
// with their routes, destinations, and the time until they arrive in minutes. []

import fetch from 'node-fetch';
import * as readline from 'readline';

//todo

//  const reader = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });


 function getIdFromCLI(){
     readline.question(`enter id`, id => {
         console.log(`you enterd ${ id }!`);
         readline.close();
     });
 }

//--------------------------------------------------------------

let postcode = 'HA8 6LJ';
let coordinates = {};
let arivalPredictions = [];

//gets info of the given postcode.
let coordinatesRequest = 'https://api.postcodes.io/postcodes/'+ postcode;
const stopID = "490008660N";
let findStop = 'https://api.tfl.gov.uk/StopPoint/Mode/bus'

let FindStops = "https://api.tfl.gov.uk/StopPoint/" + stopID;

//Gets the list of arrival predictions for the given stop point id
let findArrivals = "https://api.tfl.gov.uk/StopPoint/"+ stopID +"/Arrivals\n";

async function sendRequest(url) {
    const response = await fetch(url)
        .then(response => response.json())
        .then(data =>{return data});
        return response;
}

function setCoordinates(){
    coordinates = {
        longitude:postCodeData.result.longitude,
        latitude: postCodeData.result.latitude
    }
}

function setArivalPredictions(data){
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


let LTdata = await sendRequest(findArrivals);
let postCodeData = await sendRequest(coordinatesRequest);

setCoordinates();

let findStopsNearCoordinates = 'https://api.tfl.gov.uk/StopPoint/?lat='+coordinates.latitude +'&lon='+ coordinates.longitude +'&stopTypes=NaptanPublicBusCoachTram';
let stopsNearCoordinates = await sendRequest(findStopsNearCoordinates);

console.log('stops near ' + postcode + ': ');
// Gets a list of bus stops close to give coordinates... I think
console.log(findStopsNearCoordinates);
console.log(stopsNearCoordinates);

setArivalPredictions(LTdata);
console.log('Predictions :')
console.log(arivalPredictions);

let journeyPlannerRequest ='https://api.tfl.gov.uk/Journey/JourneyResults/' + postcode + '/to/N129HJ';
let journeyPlanner = await sendRequest(journeyPlannerRequest);
console.log('journey planner: ');
console.log(journeyPlanner);
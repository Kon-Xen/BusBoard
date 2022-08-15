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

// catch postcode error

// post code to have 6 at least characters ht16P\O.
// or have 7 characters ( 4th to be a space)

// Could divide postcode in to 2 3 letter chunks and see if the chunks are LLN and NLL (L = letter N = Number.)

// Make sure is all capitalised :  turn the string in to caps first ?

// First 2 characters  to be letters 3rd to be number 4th space OR number if the next 2 are letters
// if 4th is space then 5th to be a number 6th and 7th to be letters

// then pass it to the postcode api to check if is a real postcode.
// or !
// even easier just take the input and then send it straight to the postcode API and check what it returns.
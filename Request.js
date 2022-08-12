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

let postcode = 'HA8 6LJ';
let coordinates = {};
let buses = [];
//gets info of the given postcode.
let coordinatesRequest = 'https://api.postcodes.io/postcodes/'+ postcode;
const stopID = "490008660N";
let findStop = 'https://api.tfl.gov.uk/StopPoint/Mode/bus'

let FindStops = "https://api.tfl.gov.uk/StopPoint/" + stopID;

//Gets the list of arrival predictions for the given stop point id
let findArrivals = "https://api.tfl.gov.uk/StopPoint/"+ stopID +"/Arrivals\n";

let findStopsNearCoordinates = 'https://api.tfl.gov.uk/StopPoint/?lat='+coordinates.latitude +'&lon='+coordinates.longitude +'&stopTypes=NaptanPublicBusCoachTram';

async function doQuery(url) {
    const response = await fetch(url)
        .then(response => response.json())
        .then(data =>{return data});
        return response;
}
/lines 40 and 41 are the most important...  then line 64 or 65...
// and then ....
function setCoordinates(){
    coordinates = {
        longitude:postCodeData.result.longitude,
        latitude: postCodeData.result.latitude
    }
}

function getArivals(data){
    for (const dataKey in data) {
        let bus = data[dataKey]
        buses.push({
            vehicleId: bus.vehicleId,
            lineName: bus.lineName,
            destinationName: bus.destinationName,
            expectedArrival: bus.expectedArrival
        });
    }
}

let LTdata = await doQuery(findArrivals);
let postCodeData = await doQuery(coordinatesRequest);
// you need to use await
//yes ?
// ill push now to my branch
setCoordinates();

let stopsNearCoordinates = await doQuery(findStopsNearCoordinates);

console.log(findStopsNearCoordinates);
console.log(stopsNearCoordinates);

// getArivals(LTdata);
// console.log(buses);


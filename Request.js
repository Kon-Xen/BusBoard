//ask user for a stop code, and print a list of the next five buses at that stop code,
// with their routes, destinations, and the time until they arrive in minutes. []

import fetch from 'node-fetch';
import * as readline from 'readline';

//todo
// console.log("Enter bus stop code ");
// let input = readline.createInterface( process.stdin, process.stdout);

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



const stopID = "490008660N";

let findStop = 'https://api.tfl.gov.uk/StopPoint/Mode/bus'

let FindStops = "https://api.tfl.gov.uk/StopPoint/" + stopID;

//Gets the list of arrival predictions for the given stop point id
let findArrivals = "https://api.tfl.gov.uk/StopPoint/"+ stopID +"/Arrivals\n";

async function doQuery(url) {
    const response =  await fetch(url)
        .then(response => response.json())
        .then(data =>{return data});
        return response;
}


let data = doQuery(FindStops)
    .then (response => console.log(response));

// console.log(typeof data);
//


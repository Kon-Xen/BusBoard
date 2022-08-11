//ask user for a stop code, and print a list of the next five buses at that stop code,
// with their routes, destinations, and the time until they arrive in minutes. []

// import fetch from 'node-fetch';
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
import readline from 'readline';

//todo
// console.log("Enter bus stop code ");
// let input = readline.createInterface( process.stdin, process.stdout);

const stop = "490008660N";
// let findStop = "https://api.tfl.gov.uk/StopPoint/" + stop;
let findStop = 'https://api.tfl.gov.uk/StopPoint/Mode/bus'
let findAllstops = "https://api.tfl.gov.uk/StopPoint/" + stop;

function doQuery(url) {
    return fetch(url)
        .then(response => response.json())
        // return response
        .then(body => console.log(body));
}

//Gets a distinct list of disrupted stop points for the given modes

let data = doQuery(findStop);

// console.log(typeof data);



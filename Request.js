//ask user for a stop code, and print a list of the next five buses at that stop code,
// with their routes, destinations, and the time until they arrive in minutes. []

// import fetch from 'node-fetch';
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
import readline from 'readline';

//todo
// console.log("Enter bus stop code ");
// let input = readline.createInterface( process.stdin, process.stdout);

const stop = "490008660N";
let findStop = "https://api.tfl.gov.uk/StopPoint/" + stop;
let findAllstops = "https://api.tfl.gov.uk/StopPoint/" + stop;

function doQuery(url) {
    const response = fetch(url)
        .then(response => response.json())
        .then(body => console.log(body));
}

doQuery(findStop);

object.clidren

consol.log()
// console.log(response);



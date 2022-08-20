import readlinesync from "readline-sync";
import StopPointClient from "./StopPointClient.js";

class UserInterface {

    masterMenu = [
        "****** Bus Board ******",
        ' ',
        '****** Options',
        '1. Find nearest 2 bus stops',
        '2. Plan a journey to any postcode in London',
        '3. Check for any disruptions'
    ];

    subMenu = ['Show journey to the bus stops ? y/n'];

    userInput = null;

    renderMenu(menu) {
        for (let item in menu) {
            console.log(menu[item]);
        }
    }

    renderNearestBusStops(stops, postcode) {
        console.log('');
        console.log('****** Nearest stops near' + postcode + ' ******');
        console.log('');
        let counter = 1;
        for (let index in stops) {
            let stop = stops[index];

            console.log('****** Stop ' + counter);
            console.log('name:' + stop.commonName + ' letter: ' + stop.stopLetter);
            console.log('distance: ' + Math.round(stop.distance) + 'm');

            console.log('* available services *');
            if (stop.modes.length > 0) {//todo "do I really need that?"
                for (let index in stop.modes) {
                    console.log('types: ' + stop.modes[index]);
                }
            }
            for (let index in stop.lines) {
                console.log('line: ' + stop.lines[index].name);
            }

            console.log('');
            counter += 1;
        }
    }

    renderJourneysToStops(journeys,stops){
        for (let index in journeys) {
            let journey=journeys[index];
            console.log('');
            console.log('*');
            console.log('directions to : ' + stops[index].commonName);
            console.log('estimated time: ' + journey.journeys[0].duration + 'mins');
            console.log('estimated arrival: ' + journey.journeys[0].arrivalDateTime);
            console.log('directions: ');
            console.log(journey.journeys[0].legs[0].instruction.detailed);
            console.log('*');
        }
    }

    renderJourney(journey) {
        console.log(journey);
    }

    renderDisruptions(disruptions) {
        console.log(disruptions);
    }

    getMenuOption() {
        let isSet = null;

        console.log('Please enter option: ');

        while (isSet === null) {

            this.userInput = readlinesync.question('Option: ');

            if (isNaN(this.userInput) || this.userInput < 1 || this.userInput > 5) {
                console.log('You entered: ' + this.userInput);
                console.log('please try again');

            } else {
                isSet = 1;
            }
        }
        return this.userInput;
    }

    askForPostCode() {
        let postCodeCheck;
        let postCode
        do {
            try {
                postCode = readlinesync.question('enter postCode: ');
                postCodeCheck = StopPointClient.sendRequest('https://api.postcodes.io/postcodes/' + postCode);
                if (postCodeCheck.status === 404) throw "Invalid post code";
            } catch (err) {
                console.log(err);
            }
        }
        while (postCodeCheck.status === 404);

        return postCode;
    }

    askForDirections() {
        let isSet = null;
        let choice;
        let errorMessage = "Sorry didn't get that.. Did you enter y or n ?";

        while (isSet === null) {
            choice = readlinesync.question('do you wish for directions to the buss stops ? (y/n): ').toUpperCase();
            choice === 'Y' || choice === 'N' ? isSet = 1 : console.log(errorMessage);
        }
        return this.userInput = choice;
    }
}

export default new UserInterface();

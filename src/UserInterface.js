import readlinesync from "readline-sync";
import StopPointClient from "./StopPointClient.js";

class UserInterface {

    masterMenu = [
        "****** Bus Board ******",
        ' ',
        '****** Options',
        '1. Find nearest 2 bus stops',
        '2. Plan a journey to any postcode in London',
        '3. list disrupted stop points for the given modes',
        '4. A list of a bus\'s upcoming stops (and estimated times?)'
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

    askForJourney() {
        let journey;
        let choice;
        do {
            try {
                choice = readlinesync.question('do you wish for directions to the buss stop ? (y/n): ');
                if (choice === 'y') {
                    // do boogie
                }

                if (postCodeCheck.status === 404) throw "Did you enter y or n ? ";
            } catch (err) {
                console.log(err);
            }
        }
        while (postCodeCheck.status === 404);

        return choice;
    }

}

export default new UserInterface();

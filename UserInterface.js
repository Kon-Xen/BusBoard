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

    renderNearestBusStops(busStops) {
        console.log(busStops);
    }

    renderJourney(journey) {
        console.log(journey);
    }

    renderDisruptions(disruptions) {
        console.log(disruptions);
    }

    askForOption() {
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

}

export default new UserInterface();

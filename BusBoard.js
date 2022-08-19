import userInterface from "./src/UserInterface.js";
import StopPointClient from "./src/StopPointClient.js";

async function runBusBoard() {
    let coordinates = {};
    let nearestBusStops = {};

    userInterface.renderMenu(userInterface.masterMenu);

    let menuOption = userInterface.getMenuOption();
    let postCode = userInterface.askForPostCode();

    let postCodeData = await StopPointClient.getPostcodeData(postCode);
    setCoordinates(postCodeData.result);


    switch (menuOption) {
        case '1':
            let stops = await findNearest2BusStops();
            userInterface.renderNearestBusStops(stops,postCode);
            break;
        case '2':
            console.log('From');
            let postCodeA = userInterface.askForPostCode();
            console.log('To');
            let postCodeB = userInterface.askForPostCode();
            let journey = await StopPointClient.getJourney(postCodeA, postCodeB);
            userInterface.renderJourney(journey);
            break;
        case '3':
            let modes = 'bus,dlr';
            let disruptions = StopPointClient.getDisruptedStopPoints(modes);
            userInterface.renderDisruptions;
            break;
        case '4':
            //do something
            break;
        case '5':
            //do something
            break;
    }

    function setCoordinates(data) {

        coordinates = {
            longitude: data.longitude,
            latitude: data.latitude
        }
    }

    async function findNearest2BusStops() {

        let busStops = await StopPointClient.getNearestBusStops(coordinates.longitude, coordinates.latitude);
        let arrayOfBusStops = Object.entries(busStops.stopPoints);

        return [arrayOfBusStops[0],arrayOfBusStops[1]];

        //todo ask for direction to the stops ....1
    }

    function sortBussStops(busStops) {
        return busStops.sort((a, b) => {
            compare(a, b)
        });
    }

    function compare(a, b) {

        console.log(a);
        const stopPointA = a.distance;

        const stopPointB = b.distance;

        let comparison = 0;
        if (stopPointA > stopPointB) {
            comparison = 1;
        } else if (stopPointA < stopPointB) {
            comparison = -1;
        }
        return comparison;
    }

    // c) provide a list of a bus's upcoming stops (and estimated times?)
}

runBusBoard();


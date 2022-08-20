import userInterface from "./src/UserInterface.js";
import StopPointClient from "./src/StopPointClient.js";
import UserInterface from "./src/UserInterface.js";

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
            await nearest2BusStops();
            break;
        case '2':
            console.log('From');
            let from = userInterface.askForPostCode();
            console.log('To');
            let to = userInterface.askForPostCode();
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

    async function nearest2BusStops() {

        let busStops = await StopPointClient.getNearestBusStops(coordinates.longitude, coordinates.latitude);
        let arrayOfBusStops = Object.entries(busStops.stopPoints);
        let stops = [arrayOfBusStops[0][1], arrayOfBusStops[1][1]];

        UserInterface.renderNearestBusStops(stops, postCode);

        let showDirections = UserInterface.askForDirections();

        if (showDirections === 'Y') {
            let journeys = [
                await StopPointClient.getJourney(postCode, stops[0].id),
                await StopPointClient.getJourney(postCode, stops[1].id)
            ];
            userInterface.renderJourneysToStops(journeys, stops);
        }
    }


    // function sortBussStops(busStops) {
    //     return busStops.sort((a, b) => {
    //         compare(a, b)
    //     });
    // }
    //
    // function compare(a, b) {
    //
    //     console.log(a);
    //     const stopPointA = a.distance;
    //     const stopPointB = b.distance;
    //
    //     let comparison = 0;
    //     if (stopPointA > stopPointB) {
    //         comparison = 1;
    //     } else if (stopPointA < stopPointB) {
    //         comparison = -1;
    //     }
    //     return comparison;
    // }

    // c) provide a list of a bus's upcoming stops (and estimated times?)
}

runBusBoard();


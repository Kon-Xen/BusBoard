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
            await planJourney();
            break;
        case '3':
            await checkForDisruptions();
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

    async function planJourney(){
        console.log('From');
        let from = userInterface.askForPostCode();
        console.log('To');
        let to = userInterface.askForPostCode();
        let journey = await StopPointClient.getJourney(postCodeA, postCodeB);
        userInterface.renderJourney(journey);
    }

    async function checkForDisruptions(){
        let modes = 'bus,dlr';
        let disruptionsList = StopPointClient.getDisruptedStopPoints(modes);
        userInterface.renderDisruptions(disruptionsList);
    }
}

runBusBoard();


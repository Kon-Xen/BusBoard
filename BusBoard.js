import userInterface from "./src/UserInterface.js";
import StopPointClient from "./src/StopPointClient.js";
import UserInterface from "./src/UserInterface.js";

async function runBusBoard() {

    userInterface.renderMenu(userInterface.masterMenu);
    let menuOption = userInterface.getMenuOption();

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

    async function nearest2BusStops() {

        let postCode = userInterface.askForPostCode();
        let postCodeData = await StopPointClient.getPostcodeData(postCode);

        let coords = {
            lon: postCodeData.result.longitude,
            lat: postCodeData.result.latitude
        }

        let busStops = await StopPointClient.getNearestBusStops(coords.lon, coords.lat);

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

    async function planJourney() {
        //todo make a menu for it in the UI
        //todo display the data properly
        console.log('From');
        let from = userInterface.askForPostCode();
        console.log('To');
        let to = userInterface.askForPostCode();
        let journey = await StopPointClient.getJourney(from, to);
        userInterface.renderJourney(journey);
    }

    async function checkForDisruptions() {
        //todo menu for modes?
        //todo display data properly!
        let modes = ["bus"];
        let disruptionsList = await StopPointClient.getDisruptedStopPoints(modes);
        userInterface.renderDisruptions(disruptionsList);
    }


}

runBusBoard();


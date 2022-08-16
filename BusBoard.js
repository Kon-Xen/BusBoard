import userInterface from "./UserInterface.js";
import busBoardApi from "./BusBoardApi.js";

let coordinates = {};
let nearestBusStops = {};

userInterface.renderMenu(userInterface.masterMenu);

let option = userInterface.askForOption();
let postCode = userInterface.askForPostCode();

let postCodeData = await busBoardApi.getPostcodeData(postCode);
setCoordinates(postCodeData.result);


switch (option) {
    case '1':
        let allNearestBusStops = await busBoardApi.getNearestBusStops(coordinates);
        nearestBusStops = findClosest(allNearestBusStops);

        userInterface.renderNearestBusStops(nearestBusStops);
        //todo ask for direction to the stops ....1
        break;
    case '2':
        console.log('From');
        let postCodeA = userInterface.askForPostCode();
        console.log('To');
        let postCodeB = userInterface.askForPostCode();
        let journey = await busBoardApi.getJourney(postCodeA, postCodeB);
        userInterface.renderJourney(journey);
        break;
    case '3':
        let modes = 'bus,dlr';
        let disruptions = busBoardApi.getDisruptedStopPoints(modes);
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

function findClosest(busStops){
    let prevStop = busStops[0];
    let closest = [];

    for(let i=1; i<=busStops.length;i++){
        if( busStops[i].distance > prevStop.distance ){
            closest.push(busStops[i]);
        }
        console.log(busStops[i]);
        prevStop = busStops[i];
    }

    // for(let stop in busStops){
    // busStops.item.distance
    // }
    return closest;
}


// c) provide a list of a bus's upcoming stops (and estimated times?)

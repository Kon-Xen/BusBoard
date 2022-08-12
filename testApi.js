const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
let lineDetailsMore = {};

async function getArrivalTime() {
   const response = await fetch('https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals')
    .then(response => response.json())
    .then(data => {let getData = data
        //get bus arrival time by stop id
        let lineDetails = getData.map(getData => {
            let details = {
                'lineId': 0,
                'destinationName': '',
                'timeToStation': 0
            }
            details.lineId = getData.lineId;
            details.destinationName = getData.destinationName;
            details.timeToStation = getData.timeToStation;
            return details;
        })
        lineDetails.sort((a, b) => a.timeToStation - b.timeToStation);
        //Cant slice??
        // for (let i = 0; i < 5; i++){
        //     console.log(lineDetails[i])
        // }
        return lineDetails;
    });

    return response;
}
getArrivalTime()
.then (response => console.log(response))
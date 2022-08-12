//input postcode, find two nearest bus stop
//each busstop five nearest bus to arrive.
//stop code 490008660N
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
let rawData = {};
fetch('https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals')
    .then(response => response.json())
    .then(data => {let getData = data
        // console.log(getData)
        // let lineNumber = getData.find(data => data.lineId == 214);
        // console.log(lineNumber);
        let lineDetails = getData.map(getData => {
            let details = {
                lineId: 0,
                destinationName: '',
                timeToStation: 0
            }
            details.lineId = getData.lineId;
            details.destinationName = getData.destinationName;
            details.timeToStation = getData.timeToStation;
            return details;
        })
        lineDetails.sort((a, b) => a.timeToStation - b.timeToStation);
        //Cant slice??
        for (let i = 0; i < 5; i++){
            console.log(lineDetails[i])
        }
    });
    

// console.log(rawData);


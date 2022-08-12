const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
fetch('https://api.tfl.gov.uk/StopPoint/?lat=51.553935&lon=-0.144754&stopTypes=NaptanPublicBusCoachTram')
    .then(response => response.json())
    .then(data => console.log(data))
    //     let busStop = data.stopPoints.map(data => {
    //         let busStopDetails = {
    //             commonName: '',
    //             distance: 0
    //         }
    //         busStopDetails.commonName = data.commonName;
    //         busStopDetails.distance = data.distance;
    //         return busStopDetails;
    //     })
    //     console.log(busStop);
    //    return busStop;
    // })

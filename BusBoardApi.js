import fetch from "node-fetch";


class BusBoardApi {

    async sendRequest(url) {
        const response = await fetch(url)
            .then(response => response.json())
            .then(data => {
                return data
            });
        return response;
    }

    getPostcodeData(postCode) {
        let postCodeData;
        try {
            postCodeData = this.sendRequest('https://api.postcodes.io/postcodes/' + postCode);
            if (postCodeData.status === 404) throw "Invalid post code";
        } catch (err) {
            console.log(err);
            //todo logg the error to a file;
        }
        return postCodeData;
    }

    getNearestBusStops(coordinates) {
        let busStopsNearCoordinates;
        let busStopsNearCoordinatesQuery = 'https://api.tfl.gov.uk/StopPoint/?lat=' + coordinates.latitude + '&lon=' + coordinates.longitude + '&stopTypes=NaptanPublicBusCoachTram';
        try {
            busStopsNearCoordinates = this.sendRequest(busStopsNearCoordinatesQuery);
            if (busStopsNearCoordinates.length === 0) throw "NO bus stops at given post code";
        } catch (err) {
            console.log(err);
        }

        return busStopsNearCoordinates;
    }

    getJourney(postCodeA, postCodeB) {
        let journey;
        try {
            journey = this.sendRequest('https://api.tfl.gov.uk/Journey/JourneyResults/' + postCodeA + '/to/' + postCodeB);

            if (journey.length === 0) throw "NO buses to from this postcode to...";
        } catch (err) {
            console.log(err);
        }
        return journey;
    }

    getDisruptedStopPoints(modes) {
        let disruptions;
        try {
            disruptions = this.sendRequest(`https://api.tfl.gov.uk/StopPoint/Mode/${modes}/Disruption?includeRouteBlockedStops`);

            if (disruptions.length === 0) throw "NO disruptions";
        } catch (err) {
            console.log(err);
        }
        return disruptions;
    }


}

export default new BusBoardApi();
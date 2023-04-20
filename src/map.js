import { ERRORS_MSG } from '@/constants'
import { isEmpty, map } from 'lodash'
import { MODES } from '@/components/routes/constants'

export function getRelevantOffice(placesService, location, query = 'exadel') {
    return new Promise((resolve, reject) => {
        const queryCallback = (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results.length) {
                console.log(results, results[0].geometry.location.lat(), results[0].geometry.location.lng())
                resolve({ destination: results[0].geometry.location })
            } else {
                reject(new Error(ERRORS_MSG.NEARBY))
            }
        }

        placesService.findPlaceFromQuery({ query, fields: ['geometry', 'name'] }, queryCallback)
    })
}

export function calculateRoute(directionsService, origin, destination, mode = 'DRIVING') {
    return new Promise((resolve, reject) => {
        directionsService
            .route({ origin, destination, travelMode: mode })
            .then((response) => {
                resolve(response)
            })
            .catch((e) => {
                reject(new Error('Directions request failed due to ' + e.code))
            })
    })
}
// {lat: 53.8797499, lng: 27.4766713} {lat: 40.02619695064507, lng: -105.22340111215398}

export function getAvailableRoutesByModes(directionsService, origin, destination) {
    return new Promise((resolve, reject) => {
        console.log(origin, destination)
        const requests = []
        const routes = {}
        map(MODES, (mode) => {
            requests.push(calculateRoute(directionsService, origin, destination, mode))
        })
        Promise.allSettled(requests)
            .then((responses) => {
                map(MODES, (mode, i) => {
                    const response = responses[i]
                    if (response.status === 'fulfilled') {
                        routes[mode] = {
                            mode: mode,
                            response: response.value,
                            duration: response.value.routes[0].legs[0].duration.text,
                            distance: response.value.routes[0].legs[0].distance.text,
                            startLoc: response.value.routes[0].legs[0].start_location,
                            endLoc: response.value.routes[0].legs[0].end_location,
                            startAddress: response.value.routes[0].legs[0].start_address,
                            endAddress: response.value.routes[0].legs[0].end_address,
                            bounds: response.value.routes[0].bounds,
                        }
                    }
                })
                if (isEmpty(routes)) {
                    reject(new Error('No routes have been found'))
                } else {
                    resolve(routes)
                }
            })
            .catch((e) => {
                reject(new Error('Directions request failed due to ' + e.code))
            })
    })
}

export function geocode(geocoder, request = {}) {
    return new Promise((resolve, reject) => {
        geocoder
            .geocode(request)
            .then(({ results }) => {
                resolve(results)
            })
            .catch((e) => {
                console.log(e)
                reject(new Error('Geocode was not successful for the following reason: ' + e.code))
            })
    })
}

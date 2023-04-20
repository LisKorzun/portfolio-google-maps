import { ERRORS_MSG } from '@/constants'

export function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    })
                },
                () => {
                    // Browser supports geolocation, but user has denied permission
                    reject(new Error(ERRORS_MSG.HTML5_GEO))
                },
                { enableHighAccuracy: true }
            )
        } else {
            // Browser doesn't support geolocation
            reject(new Error(ERRORS_MSG.BROWSER))
        }
    })
}

// JavaScript program to calculate Distance Between
// Two Points on Earth

function distance(lat1, lat2, lon1, lon2) {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = (lon1 * Math.PI) / 180
    lon2 = (lon2 * Math.PI) / 180
    lat1 = (lat1 * Math.PI) / 180
    lat2 = (lat2 * Math.PI) / 180

    // Haversine formula
    let dlon = lon2 - lon1
    let dlat = lat2 - lat1
    let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2)

    let c = 2 * Math.asin(Math.sqrt(a))

    // Radius of earth in kilometers. Use 3956 for miles
    let r = 6371

    // calculate the result
    return c * r
}

// Driver code

// let lat1 = 53.32055555555556
// let lat2 = 53.31861111111111
// let lon1 = -1.7297222222222221
// let lon2 = -1.6997222222222223
// distance(lat1, lat2, lon1, lon2)

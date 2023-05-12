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

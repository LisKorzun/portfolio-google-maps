import { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import mapArray from 'lodash/map'
import { MODES } from '@/components/routes'

export const useMapDirectionsService = (map) => {
    const [directionsService, setDirectionsService] = useState()

    useEffect(() => {
        if (!isEmpty(map)) {
            setDirectionsService(new window.google.maps.DirectionsService())
        }
    }, [map])

    const calculateRoute = (origin, destination, mode = 'DRIVING') =>
        new Promise((resolve, reject) => {
            directionsService
                .route({ origin, destination, travelMode: mode })
                .then((response) => {
                    resolve(response)
                })
                .catch((e) => {
                    reject(new Error('Directions request failed due to ' + e.code))
                })
        })

    const getAvailableRoutesByModes = (origin, destination) =>
        new Promise((resolve, reject) => {
            const routes = {}
            const requests = mapArray(MODES, (mode) => calculateRoute(origin, destination, mode))
            Promise.allSettled(requests)
                .then((responses) => {
                    mapArray(MODES, (mode, i) => {
                        const response = responses[i]
                        if (
                            response.status === 'fulfilled' &&
                            response.value?.routes.length &&
                            response.value.routes[0]?.legs.length
                        ) {
                            routes[mode] = {
                                mode: mode,
                                route: response.value,
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

    return { getAvailableRoutesByModes }
}

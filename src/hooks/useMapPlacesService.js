import { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'

export const useMapPlacesService = (map) => {
    const [placesService, setPlacesService] = useState()

    useEffect(() => {
        if (!isEmpty(map)) {
            setPlacesService(new window.google.maps.places.PlacesService(map))
        }
    }, [map])

    const getRelevantOffice = (query = 'exadel') =>
        new Promise((resolve, reject) => {
            const queryCallback = (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && results.length) {
                    resolve(results[0].geometry.location)
                } else {
                    reject(new Error('Places request failed. Please try again later.'))
                }
            }

            placesService.findPlaceFromQuery({ query, fields: ['geometry', 'name'] }, queryCallback)
        })

    return { getRelevantOffice }
}

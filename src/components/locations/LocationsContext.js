import { createContext, useCallback, useContext, useState } from 'react'
import { LOGO_IMAGE as logo, MARKER_IMAGE } from '@/constants'
import { templateComplexInfo } from '@/components/templates'
import { officesByArea } from '@/data'
import { isEmpty } from 'lodash'
import {
    DEFAULT_CENTER,
    DEFAULT_MAP_OPTIONS,
    DEFAULT_ZOOM,
    isAnimated,
    markerAnimationDelay,
    zoomOptions,
} from '@/components/locations/constants'

export const LocationsContext = createContext({})

export const useLocationsMap = () => useContext(LocationsContext)

export const LocationsProvider = ({ children }) => {
    const [map, setMap] = useState()
    const [markers, setMarkers] = useState([])

    const renderMarkers = (area) => {
        if (!map) return

        console.log('renderMarkers', area, markers)
        const offices = officesByArea[area]
        markers.forEach((marker) => marker.setMap(null))
        if (!isEmpty(area)) {
            const animate = isAnimated[area]
            const initialBounds = new google.maps.LatLngBounds()
            const mapMarkers = offices.map(({ position, ...rest }, i) => {
                const marker = new google.maps.Marker({
                    position,
                    icon: MARKER_IMAGE,
                    animation: animate ? google.maps.Animation.BOUNCE : undefined,
                })
                initialBounds.extend(position)
                if (animate) {
                    window.setTimeout(() => {
                        marker.setMap(map)
                        window.setTimeout(() => {
                            marker.setAnimation(null)
                        }, 600)
                    }, i * 200 + 200)
                } else {
                    marker.setMap(map)
                }
                return marker
            })
            map.setCenter(initialBounds.getCenter())
            map.setZoom(zoomOptions[area] ?? 5)

            setMarkers(mapMarkers)
        } else {
            setMarkers([])
            map.setOptions(DEFAULT_MAP_OPTIONS)
            map.setZoom(DEFAULT_ZOOM)
            map.setCenter(DEFAULT_CENTER)
        }
    }

    const providerState = { map, setMap, renderMarkers }

    return <LocationsContext.Provider value={providerState}>{children}</LocationsContext.Provider>
}

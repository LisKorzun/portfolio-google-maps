import { useLayoutEffect } from 'react'
import { useGoogleMap } from '@ubilabs/google-maps-react-hooks'
import { templateComplexInfo } from '@/components/templates'
import { LOGO_IMAGE as logo, MARKER_IMAGE } from '@/constants'
import { DEFAULT_CENTER, DEFAULT_MAP_OPTIONS, DEFAULT_ZOOM, mapsOptions } from '@/components/locations/constants'
import { markersByContinent } from '@/data'

export const MapMarkersByContinent = ({ continent, delay = 200 }) => {
    const map = useGoogleMap()

    const mapOptions = mapsOptions[continent]
    const markers = markersByContinent[continent]

    useLayoutEffect(() => {
        if (!map) {
            return () => {}
        }

        const initialBounds = new google.maps.LatLngBounds()
        const infoWindow = new google.maps.InfoWindow()

        const mapMarkers = markers.map(({ position, ...rest }, i) => {
            // Create markers with animation
            const marker = new google.maps.Marker({
                position,
                icon: MARKER_IMAGE,
                animation: google.maps.Animation.BOUNCE,
            })
            initialBounds.extend(position)
            // Add Info Window to them on marker click
            marker.addListener('click', () => {
                infoWindow.setContent(templateComplexInfo({ ...rest, logo }))
                infoWindow.open(map, marker)
            })
            // Add markers to the map sequentially
            window.setTimeout(() => {
                marker.setMap(map)
                window.setTimeout(() => {
                    marker.setAnimation(null)
                }, 70)
            }, i * delay + 400)
            return marker
        })

        // Close infoWindow on zoom changed event
        map.addListener('zoom_changed', () => {
            infoWindow.close()
        })
        map.setCenter(initialBounds.getCenter())
        map.setZoom(mapOptions.zoom)

        return () => {
            map.setOptions(DEFAULT_MAP_OPTIONS)
            map.setZoom(DEFAULT_ZOOM)
            map.setCenter(DEFAULT_CENTER)
            mapMarkers.forEach((marker) => marker.setMap(null))
        }
    }, [map])

    return null
}

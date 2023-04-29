import { useLayoutEffect } from 'react'
import { useGoogleMap } from '@ubilabs/google-maps-react-hooks'
import { MarkerClusterer, SuperClusterAlgorithm } from '@googlemaps/markerclusterer'
import { markersByContinent } from '@/data'
import { mapValues } from 'lodash'
import { templateComplexInfo } from '@/components/templates'
import { LOGO_IMAGE as logo, MARKER_IMAGE } from '@/constants'
import { DEFAULT_CENTER, DEFAULT_MAP_OPTIONS, DEFAULT_ZOOM } from '@/components/locations/constants'
import { useLocationsMap } from '@/components/locations/LocationsContext'

const zoom = 2.25

export const ContinentsMapMarkers = () => {
    const { map } = useLocationsMap()

    useLayoutEffect(() => {
        if (!map) {
            return () => {}
        }
        map.setZoom(zoom)
        const initialBounds = new google.maps.LatLngBounds()
        const infoWindow = new google.maps.InfoWindow()

        const clusters = mapValues(markersByContinent, (data) => {
            // Create markers for every continent cluster
            const markers = data.map(({ position, ...rest }) => {
                const marker = new window.google.maps.Marker({
                    position,
                    icon: MARKER_IMAGE,
                })
                initialBounds.extend(position)
                // Add Info Window to them on marker click
                marker.addListener('click', () => {
                    infoWindow.setContent(templateComplexInfo({ ...rest, logo }))
                    infoWindow.open(map, marker)
                })
                return marker
            })
            // Create Cluster for every continent
            return new MarkerClusterer({
                markers,
                map,
                algorithm: new SuperClusterAlgorithm({ radius: 280 }),
            })
        })

        // Close infoWindow on zoom changed event
        map.addListener('zoom_changed', () => {
            infoWindow.close()
        })
        map.setCenter(initialBounds.getCenter())

        return () => {
            map.setOptions(DEFAULT_MAP_OPTIONS)
            map.setZoom(DEFAULT_ZOOM)
            map.setCenter(DEFAULT_CENTER)
            mapValues(clusters, (cluster) => cluster.setMap(null))
        }
    }, [map])

    return null
}

import { createContext, useContext, useState } from 'react'
import { isEmpty, mapValues } from 'lodash'
import { MarkerClusterer, SuperClusterAlgorithm } from '@googlemaps/markerclusterer'

import { LOGO_IMAGE as logo, MARKER_IMAGE } from '@/constants'
import { officesByArea, officesByContinent } from '@/data'
import { DEFAULT_CENTER, DEFAULT_MAP_OPTIONS, DEFAULT_ZOOM, mapSettingsByArea } from '@/components/locations/constants'
import { templateComplexInfo } from '@/components/templates'

export const LocationsContext = createContext({})

export const useLocationsMap = () => useContext(LocationsContext)

export const LocationsProvider = ({ children }) => {
    const [map, setMap] = useState()
    const [markers, setMarkers] = useState([])
    const [clusters, setClusters] = useState([])

    const renderMarkers = (area) => {
        if (!map) return
        clearMap()
        if (!isEmpty(area)) {
            const offices = officesByArea[area]
            const settings = mapSettingsByArea[area]
            const animate = settings?.isAnimated
            const initialBounds = new google.maps.LatLngBounds()
            const infoWindow = new google.maps.InfoWindow()

            const mapMarkers = offices.map(({ position, ...rest }, i) => {
                const marker = new google.maps.Marker({
                    position,
                    icon: MARKER_IMAGE,
                    animation: animate ? google.maps.Animation.BOUNCE : undefined,
                })
                initialBounds.extend(position)
                // Add Info Window to them on marker click
                marker.addListener('click', () => {
                    infoWindow.setContent(templateComplexInfo({ ...rest, logo }))
                    infoWindow.open(map, marker)
                })
                if (animate) {
                    // Add markers to the map sequentially
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
            // Close infoWindow on zoom changed event
            map.addListener('zoom_changed', () => {
                infoWindow.close()
            })
            map.setCenter(initialBounds.getCenter())
            map.setZoom(settings?.zoom ?? 5)

            setMarkers(mapMarkers)
        } else {
            setMarkers([])
            map.setOptions(DEFAULT_MAP_OPTIONS)
            map.setZoom(DEFAULT_ZOOM)
            map.setCenter(DEFAULT_CENTER)
        }
    }

    const renderClusters = () => {
        if (!map) return

        clearMap()
        map.setZoom(DEFAULT_ZOOM)
        const initialBounds = new google.maps.LatLngBounds()
        const infoWindow = new google.maps.InfoWindow()
        const clusters = mapValues(officesByContinent, (data) => {
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
        setClusters(clusters)
    }

    const clearMap = () => {
        markers.forEach((marker) => marker.setMap(null))
        mapValues(clusters, (cluster) => cluster.setMap(null))
    }

    const providerState = { map, setMap, renderMarkers, renderClusters }

    return <LocationsContext.Provider value={providerState}>{children}</LocationsContext.Provider>
}

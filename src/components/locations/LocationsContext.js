import { createContext, useCallback, useContext, useState } from 'react'
import { isEmpty, mapValues } from 'lodash'
import { MarkerClusterer, SuperClusterAlgorithm } from '@googlemaps/markerclusterer'

import { LOGO_IMAGE as logo, MARKER_IMAGE } from '@/constants'
import { templateComplexInfo } from '@/components/templates'
import { PANORAMA_OPTIONS } from '@/components/locations/constants'

export const LocationsContext = createContext({})

export const useLocationsMap = () => useContext(LocationsContext)

export const LocationsProvider = ({ children }) => {
    const [map, setMap] = useState()
    const [markers, setMarkers] = useState([])
    const [clusters, setClusters] = useState([])
    const [bounds, setBounds] = useState([])
    const [zoom, setZoom] = useState()
    const [panorama, setPanorama] = useState()
    const [info, setInfo] = useState()

    const initMap = useCallback((ref, options) => {
        const mapInstance = new window.google.maps.Map(ref, options)
        const infoInstance = new google.maps.InfoWindow()
        const panoramaInstance = mapInstance.getStreetView()
        panoramaInstance.setOptions(PANORAMA_OPTIONS)

        setMap(mapInstance)
        setInfo(infoInstance)
        setPanorama(panoramaInstance)

        panoramaInstance.addListener('status_changed', () => {
            console.log(panoramaInstance.getPosition(), panoramaInstance.getStatus())
        })
        mapInstance.addListener('zoom_changed', () => {
            infoInstance.close()
        })
    }, [])
    const clearMap = () => {
        panorama.setVisible(false)
        markers.forEach((marker) => marker.setMap(null))
        mapValues(clusters, (cluster) => cluster.setMap(null))
    }

    const renderMarkers = (offices, areaZoom, animate) => {
        if (!map) return

        clearMap()
        if (!isEmpty(offices)) {
            const initialBounds = new google.maps.LatLngBounds()
            const mapMarkers = offices.map(({ position, ...rest }, i) => {
                const marker = new google.maps.Marker({
                    position,
                    icon: MARKER_IMAGE,
                    animation: animate ? google.maps.Animation.BOUNCE : undefined,
                })
                initialBounds.extend(position)
                // Add Info Window to them on marker click
                marker.addListener('click', () => {
                    info.setContent(templateComplexInfo({ ...rest, logo }))
                    info.open(map, marker)
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
            map.setCenter(initialBounds.getCenter())
            map.setZoom(areaZoom)
            setBounds(initialBounds)
            setMarkers(mapMarkers)
            setZoom(areaZoom)
        }
    }

    const renderClusters = (officesByContinent, areaZoom) => {
        if (!map) return

        markers.forEach((marker) => marker.setMap(null))
        map.setZoom(areaZoom)
        const initialBounds = new google.maps.LatLngBounds()
        const clusters = mapValues(officesByContinent, (data) => {
            // Create markers for every continent cluster
            const markers = data.map(({ position, ...rest }) => {
                const marker = new window.google.maps.Marker({
                    position,
                    icon: MARKER_IMAGE,
                })
                initialBounds.extend(position)
                marker.addListener('click', () => {
                    info.setContent(templateComplexInfo({ ...rest, logo }))
                    info.open(map, marker)
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
        map.setCenter(initialBounds.getCenter())
        setClusters(clusters)
    }

    const zoomIn = (position, zoom) => {
        map.setCenter(position)
        map.setZoom(zoom)
    }
    const zoomOutBack = () => {
        map.setCenter(bounds.getCenter())
        map.setZoom(zoom)
    }
    const renderPanorama = (position, isVisible) => {
        console.log(position)
        panorama.setPosition(position)
        console.log(panorama.getPosition(), panorama.getStatus())
        panorama.setVisible(isVisible)
    }

    const providerState = {
        map,
        initMap,
        renderMarkers,
        renderClusters,
        renderPanorama,
        zoomIn,
        zoomOutBack,
    }

    return <LocationsContext.Provider value={providerState}>{children}</LocationsContext.Provider>
}

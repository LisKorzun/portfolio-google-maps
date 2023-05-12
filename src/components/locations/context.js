import { createContext, useCallback, useContext, useState } from 'react'

import { useMapClusters, useMapInfoWindow, useMapMarkers, useMapStreetView, useMapZoom } from '@/hooks'
import { DEFAULT_ZOOM } from '@/components/locations/constants'

export const MapLocationsContext = createContext({})

export const useMapLocations = () => useContext(MapLocationsContext)

export const MapLocationsProvider = ({ children }) => {
    const [map, setMap] = useState()
    const [mapReady, setMapReady] = useState(false)

    const { renderMarkers, cleanMarkers } = useMapMarkers()
    const { renderClusters, cleanClusters } = useMapClusters()
    const { focusArea, focusBack } = useMapZoom(map)
    const { showInfo, toggleInfo, infoShown } = useMapInfoWindow(map)
    const { panoramaAvailable, panoramaShown, getPanorama, togglePanorama, closePanorama } = useMapStreetView(map)

    const initMap = useCallback((ref, options, clusters) => {
        const mapInstance = new window.google.maps.Map(ref, options)
        renderClusters(mapInstance, clusters)
        setMap(mapInstance)
        setMapReady(true)
    }, [])

    const cleanMap = () => {
        cleanMarkers()
        cleanClusters()
        closePanorama()
    }

    const showMarkers = (data, zoom, animate = false) => {
        cleanMap()
        const center = renderMarkers(map, data, showInfo, animate)
        focusArea(zoom, center)
    }
    const showClusters = (data, zoom = DEFAULT_ZOOM) => {
        cleanMap()
        const center = renderClusters(map, data, showInfo)
        focusArea(zoom, center)
    }

    const store = {
        map,
        mapReady,
        initMap,
        infoShown,
        panoramaAvailable,
        panoramaShown,
        showMarkers,
        showClusters,
        getPanorama,
        togglePanorama,
        focusArea,
        focusBack,
        toggleInfo,
    }

    return <MapLocationsContext.Provider value={store}>{children}</MapLocationsContext.Provider>
}

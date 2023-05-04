import { createContext, useCallback, useContext, useState } from 'react'
import { useMapMarkers } from '@/components/locations/useMapMarkers'
import { useMapClusters } from '@/components/locations/useMapClusters'
import { useMapZoom } from '@/components/locations/useMapZoom'
import { useMapInfoWindow } from '@/components/locations/useMapInfoWindow'
import { useMapStreetView } from '@/components/locations/useMapStreetView'

export const MapLocationsContext = createContext({})

export const useMapLocations = () => useContext(MapLocationsContext)

export const MapLocationsProvider = ({ children }) => {
    const [map, setMap] = useState()
    const [mapReady, setMapReady] = useState(false)

    const { renderMarkers, cleanMarkers } = useMapMarkers(map)
    const { renderClusters, cleanClusters } = useMapClusters(map)
    const { focusArea, focusBack } = useMapZoom(map)
    const { showInfo, toggleInfo, infoShown } = useMapInfoWindow(map)
    const { panoramaAvailable, panoramaShown, getPanorama, togglePanorama, closePanorama } = useMapStreetView(map)

    const initMap = useCallback((ref, options) => {
        setMap(new window.google.maps.Map(ref, options))
        setMapReady(true)
    }, [])

    const cleanMap = () => {
        cleanMarkers()
        cleanClusters()
        closePanorama()
    }

    const showMarkers = (data, zoom, animate = false) => {
        cleanMap()
        const center = renderMarkers(data, showInfo, animate)
        focusArea(zoom, center)
    }
    const showClusters = (data, zoom) => {
        cleanMap()
        const center = renderClusters(data, showInfo)
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

import { createContext, useCallback, useContext, useState } from 'react'

import { getUserLocation } from '@/utils'
import { getAvailableRoutesByModes, getRelevantOffice } from '@/map'
import { MARKER_IMAGE, STATUS } from '@/constants'

export const NearestContext = createContext({})

export const useNearestContext = () => useContext(NearestContext)

export const NearestProvider = ({ children }) => {
    const [status, setStatus] = useState(STATUS.INITIAL)
    const [error, setError] = useState('')

    const [map, setMap] = useState()
    const [directionsService, setDirectionsService] = useState()
    const [directionsRenderer, setDirectionsRenderer] = useState()
    const [placesService, setPlacesService] = useState()

    const [travelMode, setTravelMode] = useState('DRIVING')
    const [panelIsShown, setPanelIsShown] = useState(false)
    const [availableRoutes, setAvailableRoutes] = useState({})

    const buildRoute = async () => {
        setStatus(STATUS.SEARCHING)
        try {
            const origin = await getUserLocation()
            const { destination } = await getRelevantOffice(placesService, origin)
            const routes = await getAvailableRoutesByModes(directionsService, origin, destination)
            const currentRoute = routes[travelMode]
            directionsRenderer.setDirections(currentRoute.response)
            map.fitBounds(currentRoute.bounds)
            setAvailableRoutes(routes)
            setStatus(STATUS.DONE)
        } catch (e) {
            console.log(e)
            setStatus(STATUS.ERROR)
            setError(e.message)
        }
    }

    const initMap = useCallback((ref, options, sideBarRef) => {
        const mapInstance = new window.google.maps.Map(ref, options)
        const directionsRendererInstance = new window.google.maps.DirectionsRenderer()
        directionsRendererInstance.setMap(mapInstance)
        directionsRendererInstance.setOptions({
            markerOptions: {
                icon: MARKER_IMAGE,
                animation: window.google.maps.Animation.DROP,
            },
        })
        directionsRendererInstance.setPanel(sideBarRef)
        setMap(mapInstance)
        setDirectionsRenderer(directionsRendererInstance)
        setPlacesService(new window.google.maps.places.PlacesService(mapInstance))
        setDirectionsService(new window.google.maps.DirectionsService())
    }, [])

    const changeTravelMode = async (mode) => {
        try {
            setTravelMode(mode)
            directionsRenderer.setDirections(availableRoutes[mode].response)
            map.fitBounds(availableRoutes[mode].bounds)
        } catch (e) {
            setStatus(STATUS.ERROR)
            setError(e.message)
        }
    }

    const providerState = {
        status,
        error,
        travelMode,
        availableRoutes,
        panelIsShown,
        setPanelIsShown,
        buildRoute,
        initMap,
        changeTravelMode,
        currentRoute: availableRoutes[travelMode],
    }

    return <NearestContext.Provider value={providerState}>{children}</NearestContext.Provider>
}

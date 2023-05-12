import { createContext, useCallback, useContext, useState } from 'react'
import { STATUS } from '@/constants'
import { getUserLocation } from '@/components/routes/nearest'
import { useMapDirectionsRenderer, useMapDirectionsService, useMapPlacesService } from '@/hooks'

export const MapNearestRouteContext = createContext({})

export const useMapNearestRoute = () => useContext(MapNearestRouteContext)

export const MapNearestRouteProvider = ({ children }) => {
    const [status, setStatus] = useState(STATUS.INITIAL)
    const [error, setError] = useState('')
    const [map, setMap] = useState()
    const [travelMode, setTravelMode] = useState('DRIVING')
    const [availableRoutes, setAvailableRoutes] = useState({})

    const { routeDetailsIsShown, initDirectionsRenderer, renderRoute, toggleRoteDetails } = useMapDirectionsRenderer()
    const { getAvailableRoutesByModes } = useMapDirectionsService(map)
    const { getRelevantOffice } = useMapPlacesService(map)

    const initMap = useCallback((ref, options, panelRef) => {
        const mapInstance = new window.google.maps.Map(ref, options)
        initDirectionsRenderer(mapInstance, panelRef)
        setMap(mapInstance)
    }, [])

    const buildRoute = async () => {
        setStatus(STATUS.SEARCHING)
        try {
            const origin = await getUserLocation()
            const destination = await getRelevantOffice()
            const routes = await getAvailableRoutesByModes(origin, destination)
            setAvailableRoutes(routes)
            const activeRoute = routes[travelMode]
            renderRoute(activeRoute.route)
            map.fitBounds(activeRoute.bounds)
            setStatus(STATUS.DONE)
        } catch (e) {
            setStatus(STATUS.ERROR)
            setError(e.message)
        }
    }

    const changeTravelMode = (mode) => {
        try {
            setTravelMode(mode)
            renderRoute(availableRoutes[mode].route)
            map.fitBounds(availableRoutes[mode].bounds)
        } catch (e) {
            setStatus(STATUS.ERROR)
            setError(e.message)
        }
    }

    const state = {
        map,
        initMap,
        status,
        error,
        travelMode,
        buildRoute,
        changeTravelMode,
        toggleRoteDetails,
        availableRoutes,
        routeDetailsIsShown,
        route: availableRoutes[travelMode],
    }

    return <MapNearestRouteContext.Provider value={state}>{children}</MapNearestRouteContext.Provider>
}

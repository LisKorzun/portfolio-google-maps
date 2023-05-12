import { useState } from 'react'
import { MARKER_IMAGE } from '@/constants'

export const useMapDirectionsRenderer = () => {
    const [directionsRenderer, setDirectionsRenderer] = useState()
    const [routeDetailsIsShown, setRouteDetailsIsShown] = useState(false)

    const initDirectionsRenderer = (map, ref) => {
        const directionsRendererInstance = new window.google.maps.DirectionsRenderer()
        directionsRendererInstance.setMap(map)
        directionsRendererInstance.setOptions({
            markerOptions: {
                icon: MARKER_IMAGE,
                animation: window.google.maps.Animation.DROP,
            },
        })
        directionsRendererInstance.setPanel(ref)

        setDirectionsRenderer(directionsRendererInstance)
    }

    const renderRoute = (route) => {
        directionsRenderer.setDirections(route)
    }

    const toggleRoteDetails = () => {
        setRouteDetailsIsShown((current) => !current)
    }

    return { routeDetailsIsShown, initDirectionsRenderer, renderRoute, toggleRoteDetails }
}

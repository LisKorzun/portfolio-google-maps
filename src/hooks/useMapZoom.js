import { useState } from 'react'

export const useMapZoom = (map) => {
    const [center, setCenter] = useState([])
    const [zoom, setZoom] = useState()

    const focusArea = (zoomArea, centerPosition, retain = true) => {
        if (!map) return

        map.setCenter(centerPosition)
        map.setZoom(zoomArea)
        if (retain) {
            setZoom(zoomArea)
            setCenter(centerPosition)
        }
    }
    const focusBack = () => {
        if (!map) return

        map.setCenter(center)
        map.setZoom(zoom)
    }

    return { focusArea, focusBack }
}

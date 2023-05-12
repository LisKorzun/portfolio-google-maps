import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

import { smoothTransition } from '@/animations'
import { DEFAULT_MAP_OPTIONS, useMapNearestRoute } from '@/components/routes/nearest'

export const NearestRouteMap = () => {
    const mapRef = useRef()
    const mapPanelRef = useRef()
    const { initMap, routeDetailsIsShown } = useMapNearestRoute()

    useEffect(() => {
        initMap(mapRef.current, DEFAULT_MAP_OPTIONS, mapPanelRef.current)
    }, [initMap])

    return (
        <>
            <motion.div ref={mapRef} id="map-nearest-route" className="h-full grow" />
            <motion.div
                ref={mapPanelRef}
                id="nearest-map-panel"
                className="h-full overflow-auto bg-white text-[13px]"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: routeDetailsIsShown ? 300 : 0, opacity: routeDetailsIsShown ? 1 : 0.5 }}
                transition={smoothTransition}
            />
        </>
    )
}

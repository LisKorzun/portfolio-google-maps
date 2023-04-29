import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

import { useNearestContext } from '@/components/routes/NearestContext'
import { skyMapStyles } from '@/mapStyled'
import { smoothTransition } from '@/animations'

const mapOptions = {
    center: { lat: 19.931636041579534, lng: 3.7955652719844224 },
    zoom: 2.4,
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: { position: 3 },
    styles: skyMapStyles,
}

export const NearestMap = () => {
    const mapRef = useRef()
    const mapSideBarRef = useRef()
    const { initMap, panelIsShown } = useNearestContext()

    useEffect(() => {
        initMap(mapRef.current, mapOptions, mapSideBarRef.current)
    }, [initMap])

    return (
        <>
            <motion.div ref={mapRef} id="nearest-map" className="h-full grow" />
            <motion.div
                ref={mapSideBarRef}
                className="h-full overflow-auto bg-white text-[13px]"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: panelIsShown ? 300 : 0, opacity: panelIsShown ? 1 : 0.5 }}
                transition={smoothTransition}
            />
        </>
    )
}

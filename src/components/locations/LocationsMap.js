import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { DEFAULT_MAP_OPTIONS } from '@/components/locations/constants'
import { useLocationsMap } from '@/components/locations/LocationsContext'

export const LocationsMap = () => {
    const mapRef = useRef()
    const { setMap } = useLocationsMap()

    useEffect(() => {
        setMap(new window.google.maps.Map(mapRef.current, DEFAULT_MAP_OPTIONS))
    }, [setMap])

    return <motion.div ref={mapRef} id="locations-map" className="w-full h-full" />
}

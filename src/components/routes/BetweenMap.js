import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { skyMapStyles } from '@/mapStyled'

const mapOptions = {
    center: { lat: 19.931636041579534, lng: 3.7955652719844224 },
    zoom: 2.4,
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: { position: 3 },
    styles: skyMapStyles,
}

export const BetweenMap = () => {
    const mapRef = useRef()
    const [map, setMap] = useState()
    const [bounds, setBounds] = useState()

    useEffect(() => {
        setMap(new window.google.maps.Map(mapRef.current, mapOptions))
        setBounds(new window.google.maps.LatLngBounds())
    }, [])

    return <motion.div ref={mapRef} className="w-full h-full" />
}

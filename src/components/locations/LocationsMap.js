import { useEffect, useRef } from 'react'
import { DEFAULT_MAP_OPTIONS, useLocationsMap } from '@/components/locations'

export const LocationsMap = () => {
    const mapRef = useRef()
    const { setMap } = useLocationsMap()

    useEffect(() => {
        setMap(new window.google.maps.Map(mapRef.current, DEFAULT_MAP_OPTIONS))
    }, [setMap])

    return <div ref={mapRef} id="locations-map" className="w-full h-full" />
}

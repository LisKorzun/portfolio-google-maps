import { useEffect, useMemo, useRef } from 'react'
import groupBy from 'lodash/groupBy'

import { DEFAULT_MAP_OPTIONS, useMapLocations } from '@/components/locations'

export const LocationsMap = ({ offices }) => {
    const mapRef = useRef()
    const { initMap } = useMapLocations()
    const officesByContinent = useMemo(() => groupBy(offices, ({ continent }) => continent), [offices])

    useEffect(() => {
        initMap(mapRef.current, DEFAULT_MAP_OPTIONS, officesByContinent)
    }, [initMap])

    return <div ref={mapRef} id="map-locations" className="w-full h-full" />
}

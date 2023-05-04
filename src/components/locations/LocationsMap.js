import { useEffect, useMemo, useRef } from 'react'
import { DEFAULT_MAP_OPTIONS, getZoomByArea, useLocationsMap } from '@/components/locations'
import { groupBy } from 'lodash'
import { useMapLocations } from '@/components/locations/context'

export const LocationsMap = ({ offices }) => {
    const mapRef = useRef()
    const { initMap } = useMapLocations()
    // const officesByContinent = useMemo(() => groupBy(offices, ({ continent }) => continent), [offices])

    useEffect(() => {
        initMap(mapRef.current, DEFAULT_MAP_OPTIONS)
    }, [initMap])
    //
    // useEffect(() => {
    //     if (map) {
    //         renderClusters(officesByContinent, getZoomByArea())
    //     }
    // }, [map])

    return <div ref={mapRef} id="map-locations" className="w-full h-full" />
}

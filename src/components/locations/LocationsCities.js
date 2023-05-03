import { groupBy, isEmpty, keys, map } from 'lodash'
import Accordion from '@/components/Accordion'
import { useMemo, useState } from 'react'
import {
    DEFAULT_CITY_ZOOM,
    DEFAULT_COUNTRY_ZOOM,
    getZoomByArea,
    LocationsCityDetails,
    useLocationsMap,
} from '@/components/locations'

export const LocationsCities = ({ country, countryOffices }) => {
    const [activeCity, setActiveCity] = useState('')
    const { renderMarkers } = useLocationsMap()

    const officesByCity = useMemo(() => groupBy(countryOffices, ({ city }) => city), [countryOffices])
    const cities = keys(officesByCity)

    const onCityChanged = (offices) => (city) => {
        setActiveCity(city)
        if (isEmpty(city)) {
            renderMarkers(countryOffices, getZoomByArea(country, DEFAULT_COUNTRY_ZOOM), false)
        } else {
            renderMarkers(offices, getZoomByArea(city, DEFAULT_CITY_ZOOM), true)
        }
    }
    return (
        <>
            {map(cities, (city, i) => (
                <Accordion
                    key={i}
                    tabId={city}
                    title={city}
                    subtitle="1 office"
                    expanded={activeCity}
                    onChange={onCityChanged(officesByCity[city])}
                    expandedBgColor="#f1f5f9"
                    expandedTextColor="#023047"
                    level={3}
                >
                    <LocationsCityDetails office={officesByCity[city][0]} />
                </Accordion>
            ))}
        </>
    )
}

import { useMemo, useState } from 'react'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import keys from 'lodash/keys'
import map from 'lodash/map'

import Accordion from '@/components/Accordion'
import {
    DEFAULT_CITY_ZOOM,
    DEFAULT_COUNTRY_ZOOM,
    getZoomByArea,
    LocationsCityDetails,
    useMapLocations,
} from '@/components/locations'
import { COLOURS } from '@/constants'

export const LocationsCities = ({ country, countryOffices }) => {
    const [activeCity, setActiveCity] = useState('')
    const { showMarkers } = useMapLocations()

    const officesByCity = useMemo(() => groupBy(countryOffices, ({ city }) => city), [countryOffices])
    const cities = keys(officesByCity)

    const onCityChanged = (offices) => (city) => {
        setActiveCity(city)

        if (isEmpty(city)) {
            showMarkers(countryOffices, getZoomByArea(country, DEFAULT_COUNTRY_ZOOM))
        } else {
            showMarkers(offices, getZoomByArea(city, DEFAULT_CITY_ZOOM), true)
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
                    expandedBgColor={COLOURS.GRAY_100}
                    expandedTextColor={COLOURS.PRIMARY_DARK}
                    level={3}
                >
                    <LocationsCityDetails office={officesByCity[city][0]} />
                </Accordion>
            ))}
        </>
    )
}

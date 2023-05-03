import { useMemo, useState } from 'react'
import { groupBy, isEmpty, keys, map } from 'lodash'

import Accordion from '@/components/Accordion'
import { getZoomByArea, LocationsCities, useLocationsMap } from '@/components/locations'
import { DEFAULT_CONTINENT_ZOOM, DEFAULT_COUNTRY_ZOOM } from '@/components/locations/constants'

export const LocationsCountries = ({ continent, continentOffices }) => {
    const [activeCountry, setActiveCountry] = useState('')
    const { renderMarkers } = useLocationsMap()

    const officesByCountry = useMemo(() => groupBy(continentOffices, ({ country }) => country), [continentOffices])
    const countries = keys(officesByCountry)

    const onCountryChanged = (offices) => (country) => {
        setActiveCountry(country)
        if (isEmpty(country)) {
            renderMarkers(continentOffices, getZoomByArea(continent, DEFAULT_CONTINENT_ZOOM), false)
        } else {
            renderMarkers(offices, getZoomByArea(country, DEFAULT_COUNTRY_ZOOM), true)
        }
    }
    return (
        <>
            {map(countries, (country, i) => {
                const citiesCount = officesByCountry[country].length

                return (
                    <Accordion
                        key={i}
                        tabId={country}
                        title={country}
                        subtitle={`${citiesCount} ${citiesCount > 1 ? 'cities' : 'city'}`}
                        expanded={activeCountry}
                        onChange={onCountryChanged(officesByCountry[country])}
                        expandedBgColor="#e2e8f0"
                        expandedTextColor="#023047"
                        level={2}
                    >
                        <LocationsCities country={country} countryOffices={officesByCountry[country]} />
                    </Accordion>
                )
            })}
        </>
    )
}

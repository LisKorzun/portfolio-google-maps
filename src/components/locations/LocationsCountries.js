import { useMemo, useState } from 'react'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import keys from 'lodash/keys'
import map from 'lodash/map'

import Accordion from '@/components/Accordion'
import {
    DEFAULT_CONTINENT_ZOOM,
    DEFAULT_COUNTRY_ZOOM,
    getZoomByArea,
    LocationsCities,
    useMapLocations,
} from '@/components/locations'
import { COLOURS } from '@/constants'

export const LocationsCountries = ({ continent, continentOffices }) => {
    const [activeCountry, setActiveCountry] = useState('')
    const { showMarkers } = useMapLocations()

    const officesByCountry = useMemo(() => groupBy(continentOffices, ({ country }) => country), [continentOffices])
    const countries = keys(officesByCountry)

    const onCountryChanged = (offices) => (country) => {
        setActiveCountry(country)

        if (isEmpty(country)) {
            showMarkers(continentOffices, getZoomByArea(continent, DEFAULT_CONTINENT_ZOOM))
        } else {
            showMarkers(offices, getZoomByArea(country, DEFAULT_COUNTRY_ZOOM), true)
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
                        expandedBgColor={COLOURS.GRAY_200}
                        expandedTextColor={COLOURS.PRIMARY_DARK}
                        level={2}
                    >
                        <LocationsCities country={country} countryOffices={officesByCountry[country]} />
                    </Accordion>
                )
            })}
        </>
    )
}

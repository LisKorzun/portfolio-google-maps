import { countriesByContinent, officesByCountry } from '@/data'
import { isEmpty, map as mapArray } from 'lodash'
import { useState } from 'react'
import Accordion from '@/components/Accordion'
import { useLocationsMap } from '@/components/locations/LocationsContext'

export const LocationsCountries = ({ continent }) => {
    const [activeCountry, setActiveCountry] = useState('')
    const { renderMarkers } = useLocationsMap()
    const countries = countriesByContinent[continent]

    const onCountryChanged = (id) => {
        setActiveCountry(id)
        if (isEmpty(id)) {
            renderMarkers(continent)
        } else {
            renderMarkers(id)
        }
    }
    return (
        <>
            {mapArray(countries, (country, i) => (
                <Accordion
                    key={i}
                    tabId={country}
                    title={country}
                    subtitle={`${officesByCountry[country].length} offices`}
                    expanded={activeCountry}
                    onChange={onCountryChanged}
                    bgColor="#cbd5e1"
                >
                    <div>{country}</div>
                    <div>{officesByCountry[country].length} offices</div>
                </Accordion>
            ))}
        </>
    )
}

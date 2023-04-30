import { countriesByContinent, officesByContinent, officesByCountry } from '@/data'
import { groupBy, isEmpty, keys, map as mapArray } from 'lodash'
import { useEffect, useState } from 'react'
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
        <div className="text-slate-600 text-sm flex flex-col h-full overflow-y-scroll">
            {mapArray(countries, (country, i) => (
                <div key={i} className="overflow-hidden text-primary-dark">
                    <Accordion
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
                </div>
            ))}
        </div>
    )
}

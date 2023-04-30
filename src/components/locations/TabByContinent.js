import { officesByContinent } from '@/data'
import { groupBy, isEmpty, keys, map as mapArray } from 'lodash'
import { useEffect, useState } from 'react'
import Accordion from '@/components/Accordion'
import { useLocationsMap } from '@/components/locations/LocationsContext'

export const TabByContinent = ({ continent }) => {
    const { renderMarkers } = useLocationsMap()
    const [activeArea, setActiveArea] = useState('')
    const officesByCountry = groupBy(officesByContinent[continent], ({ country }) => country)
    const countries = keys(officesByCountry)
    const onAreaChanged = (area) => {
        setActiveArea(area)
        if (isEmpty(area)) {
            renderMarkers(continent)
        } else {
            renderMarkers(area)
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
                        expanded={activeArea}
                        onChanged={onAreaChanged}
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

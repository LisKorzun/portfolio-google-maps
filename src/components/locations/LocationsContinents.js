import { useMemo, useState } from 'react'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'

import Accordion from '@/components/Accordion'
import { generateContinentsTabs, LocationsCountries, useMapLocations } from '@/components/locations'
import { SidebarHeading } from '@/components/common'

export const LocationsContinents = ({ offices }) => {
    const [activeContinent, setActiveContinent] = useState('')
    const { showMarkers, showClusters } = useMapLocations()

    const officesByContinent = useMemo(() => groupBy(offices, ({ continent }) => continent), [offices])
    const continentsTabs = useMemo(() => generateContinentsTabs(officesByContinent), [officesByContinent])
    const subtitle = useMemo(
        () => `${offices.length} offices on ${continentsTabs.length} continents`,
        [offices.length, continentsTabs.length]
    )

    const onContinentChange = (offices, zoom) => (continent) => {
        setActiveContinent(continent)
        isEmpty(continent) ? showClusters(officesByContinent) : showMarkers(offices, zoom)
    }

    return (
        <>
            <SidebarHeading title="Locations" subtitle={subtitle} />

            {continentsTabs.map(({ id, title, subtitle, offices, zoom }, i) => (
                <Accordion
                    key={i}
                    tabId={id}
                    title={title}
                    subtitle={subtitle}
                    expanded={activeContinent}
                    onChange={onContinentChange(offices, zoom)}
                >
                    <LocationsCountries continent={id} continentOffices={offices} />
                </Accordion>
            ))}
        </>
    )
}

import { useMemo, useState } from 'react'
import { groupBy, isEmpty } from 'lodash'
import Image from 'next/image'

import Accordion from '@/components/Accordion'
import { generateContinentsTabs, getZoomByArea, LocationsCountries, useLocationsMap } from '@/components/locations'

export const LocationsContinents = ({ offices }) => {
    const [activeContinent, setActiveContinent] = useState('')
    const { renderMarkers, renderClusters } = useLocationsMap()

    const officesByContinent = useMemo(() => groupBy(offices, ({ continent }) => continent), [offices])
    const continentsTabs = useMemo(() => generateContinentsTabs(officesByContinent), [officesByContinent])

    const onContinentChange = (offices, zoom) => (continent) => {
        setActiveContinent(continent)
        if (isEmpty(continent)) {
            renderClusters(officesByContinent, getZoomByArea())
        } else {
            renderMarkers(offices, zoom, false)
        }
    }

    return (
        <>
            <div className="w-full px-8 py-6 flex flex-col justify-end relative bg-primary-dark h-[140px]">
                <Image
                    src="/way-finder-primary-light.png"
                    alt="way-finder"
                    width={47.3}
                    height={36}
                    priority
                    className="absolute top-0 left-7 w-auto h-auto opacity-50"
                />
                <h3 className="font-black text-white text-4xl">Locations</h3>
                <div className="text-white text-xs">{`${offices.length} offices on ${continentsTabs.length} continents`}</div>
            </div>

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

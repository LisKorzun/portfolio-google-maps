import { useState } from 'react'
import Image from 'next/image'

import Accordion from '@/components/Accordion'
import { continentTabs, LocationsCountries, useLocationsMap } from '@/components/locations'
import { AREAS } from '@/constants'

export const LocationsContinents = () => {
    const [activeContinent, setActiveContinent] = useState('')
    const { renderMarkers, renderClusters } = useLocationsMap()

    const onContinentChange = (id) => {
        setActiveContinent(id)
        if (id === AREAS.CONTINENT) {
            renderClusters()
        } else {
            renderMarkers(id)
        }
    }

    return (
        <>
            <div className="w-full px-8 pt-16 pb-6 flex items-center relative bg-primary-dark">
                <Image
                    src="/way-finder-primary-light.png"
                    alt="way-finder"
                    width={47.3}
                    height={36}
                    priority
                    className="absolute top-0 left-7 w-auto h-auto opacity-50"
                />
                <h3 className="font-black text-white text-4xl">Locations</h3>
            </div>

            {continentTabs.map(({ id, title, subtitle }, i) => (
                <div key={i} className="overflow-hidden text-primary-dark">
                    <Accordion
                        tabId={id}
                        title={title}
                        subtitle={subtitle}
                        expanded={activeContinent}
                        onChange={onContinentChange}
                        bgColor="#209EBC"
                    >
                        <LocationsCountries continent={id} />
                    </Accordion>
                </div>
            ))}
        </>
    )
}

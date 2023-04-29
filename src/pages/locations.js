import { useState } from 'react'
import Image from 'next/image'

import { ContinentsMapMarkers, LocationsMap, LocationsProvider, MapMarkersByContinent } from '@/components/locations'
import { ContentWrapper, MapLoadWrapper } from '@/components/wrappers'
import Accordion from '@/components/Accordion'
import { LOCATIONS_TABS, LOCATIONS_TABS_IDS } from '@/components/locations/constants'
import { CONTINENTS } from '@/constants'

export default function Locations() {
    const [activeTab, setActiveTab] = useState('')

    return (
        <ContentWrapper>
            <LocationsProvider>
                <div className="w-full md:w-2/3 h-[70vh] md:h-auto mr-4 bg-primary-dark">
                    <MapLoadWrapper>
                        <div className="w-full h-full">
                            <LocationsMap />
                            {activeTab === LOCATIONS_TABS_IDS.CONTINENTS && <ContinentsMapMarkers />}
                            {activeTab === LOCATIONS_TABS_IDS.NORTH_AMERICA && (
                                <MapMarkersByContinent continent={CONTINENTS.N_AMERICA} />
                            )}
                            {activeTab === LOCATIONS_TABS_IDS.SOUTH_AMERICA && (
                                <MapMarkersByContinent continent={CONTINENTS.S_AMERICA} />
                            )}
                            {activeTab === LOCATIONS_TABS_IDS.EUROPE && (
                                <MapMarkersByContinent continent={CONTINENTS.EUROPE} delay={50} />
                            )}
                            {activeTab === LOCATIONS_TABS_IDS.ASIA && <MapMarkersByContinent continent={CONTINENTS.ASIA} />}
                        </div>
                    </MapLoadWrapper>
                </div>
                <div className="w-full md:w-1/3 h-auto pb-8">
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

                    {LOCATIONS_TABS.map(({ Component, title, id }, i) => (
                        <div key={i} className="overflow-hidden text-primary-dark">
                            <Accordion tabId={id} expanded={activeTab} setExpanded={setActiveTab} title={title} bgColor="#209EBC">
                                <Component />
                            </Accordion>
                        </div>
                    ))}
                </div>
            </LocationsProvider>
        </ContentWrapper>
    )
}

import { useEffect, useLayoutEffect, useState } from 'react'
import Image from 'next/image'

import { ContinentsMapMarkers, LocationsMap, LocationsProvider } from '@/components/locations'
import { ContentWrapper, MapLoadWrapper } from '@/components/wrappers'
import Accordion from '@/components/Accordion'
import { LOCATIONS_TABS } from '@/components/locations/constants'
import { AREAS } from '@/constants'

export default function Locations() {
    const [activeTab, setActiveTab] = useState('')

    return (
        <ContentWrapper>
            <LocationsProvider>
                <div className="w-full md:w-2/3 h-[70vh] md:h-auto mr-4 bg-primary-dark">
                    <MapLoadWrapper>
                        <div className="w-full h-full">
                            <LocationsMap activeArea={activeTab} />
                            {activeTab === AREAS.CONTINENT && <ContinentsMapMarkers />}
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

                    {LOCATIONS_TABS.map(({ Component, title, subtitle, id, continent }, i) => (
                        <div key={i} className="overflow-hidden text-primary-dark">
                            <Accordion
                                tabId={id}
                                title={title}
                                subtitle={subtitle}
                                expanded={activeTab}
                                setExpanded={setActiveTab}
                                bgColor="#209EBC"
                            >
                                <Component continent={continent} />
                            </Accordion>
                        </div>
                    ))}
                </div>
            </LocationsProvider>
        </ContentWrapper>
    )
}

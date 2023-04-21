import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import { GoogleMapsProvider } from '@ubilabs/google-maps-react-hooks'

import { ContinentsMapMarkers, LocationsProvider } from '@/components/locations'
import { motion } from 'framer-motion'
import Accordion from '@/components/Accordion'
import { DEFAULT_MAP_OPTIONS, LOCATIONS_TABS, LOCATIONS_TABS_IDS } from '@/components/locations/constants'
import { MapMarkersByContinent } from '@/components/locations/MapMarkersByContinent'
import { CONTINENTS } from '@/constants'

export default function Locations() {
    const [activeTab, setActiveTab] = useState('')
    const [mapContainer, setMapContainer] = useState(null)
    const isLoaded = useRef(false)

    const mapRef = useCallback((node) => {
        node && setMapContainer(node)
    }, [])

    const onLoad = () => {
        isLoaded.current = true
    }

    return (
        <LocationsProvider>
            <div className="w-full md:w-2/3 h-[70vh] md:h-auto mr-4 relative">
                <GoogleMapsProvider
                    googleMapsAPIKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}
                    mapContainer={mapContainer}
                    mapOptions={DEFAULT_MAP_OPTIONS}
                    onLoadMap={onLoad}
                >
                    <div className="w-full h-full">
                        <div ref={mapRef} style={{ height: '100%' }} />
                        {activeTab === LOCATIONS_TABS_IDS.CONTINENTS && <ContinentsMapMarkers />}
                        {activeTab === LOCATIONS_TABS_IDS.NORTH_AMERICA && (
                            <MapMarkersByContinent continent={CONTINENTS.N_AMERICA} />
                        )}
                        {activeTab === LOCATIONS_TABS_IDS.SOUTH_AMERICA && (
                            <MapMarkersByContinent continent={CONTINENTS.S_AMERICA} />
                        )}
                        {activeTab === LOCATIONS_TABS_IDS.EUROPE && (
                            <MapMarkersByContinent continent={CONTINENTS.EUROPE} delay={70} />
                        )}
                        {activeTab === LOCATIONS_TABS_IDS.ASIA && <MapMarkersByContinent continent={CONTINENTS.ASIA} />}
                    </div>
                </GoogleMapsProvider>
            </div>
            <div className="w-full md:w-1/3 h-auto pb-8">
                <motion.div
                    className="px-8 pt-16 pb-6 flex items-center relative bg-primary-dark"
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        type: 'spring',
                        stiffness: 250,
                        damping: 18,
                    }}
                >
                    <Image
                        src="/way-finder-primary-light.png"
                        alt="way-finder"
                        width={47.3}
                        height={36}
                        priority
                        className="absolute top-0 left-7 w-auto h-auto opacity-50"
                    />
                    <h3 className="font-black text-white text-4xl">Locations</h3>
                </motion.div>

                {LOCATIONS_TABS.map(({ Component, title, id }, i) => (
                    <div key={i} className="overflow-hidden px-8 text-primary-dark">
                        <Accordion tabId={id} expanded={activeTab} setExpanded={setActiveTab} title={title}>
                            <Component />
                        </Accordion>
                    </div>
                ))}
            </div>
        </LocationsProvider>
    )
}

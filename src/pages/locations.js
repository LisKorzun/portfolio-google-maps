import { useState } from 'react'
import { isEmpty } from 'lodash'
import Image from 'next/image'

import { MotionImage } from '@/components/common'
import { LocationsProvider } from '@/components/locations'
import { smoothTransition } from '@/animations'
import { motion } from 'framer-motion'
import Accordion from '@/components/Accordion'
import { LOCATIONS_TABS } from '@/components/locations/constants'

export default function Locations() {
    const [activeTab, setActiveTab] = useState('')

    return (
        <LocationsProvider>
            <div className="w-full md:w-2/3 h-[70vh] md:h-auto mr-4 relative">
                <div className="absolute top-0 right-0 bg-primary-dark z-back w-full h-full ">
                    <MotionImage
                        src="/continents.png"
                        alt="continents"
                        width={1000}
                        height={1000}
                        priority
                        className=" w-full h-auto z-img"
                        animate={{ opacity: isEmpty(activeTab) ? 1 : 0 }}
                        transition={{ ...smoothTransition, delay: 0.2 }}
                    />
                </div>
            </div>
            <div className="w-full md:w-1/3 h-auto bg-primary-dark pb-8">
                <motion.div
                    className="px-8 pt-14 pb-6 flex items-center relative"
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        type: 'spring',
                        stiffness: 250,
                        damping: 18,
                    }}
                >
                    <Image
                        src="/way-finder-blue.png"
                        alt="way-finder"
                        width={47.3}
                        height={36}
                        priority
                        className="absolute top-0 left-7 w-auto h-auto"
                    />
                    <h3 className="font-black text-primary-light text-4xl">Locations</h3>
                </motion.div>

                {LOCATIONS_TABS.map(({ Component, title, id }, i) => (
                    <div key={i} className="overflow-hidden px-8 text-white">
                        <Accordion tabId={id} expanded={activeTab} setExpanded={setActiveTab} title={title}>
                            <Component />
                        </Accordion>
                    </div>
                ))}
            </div>
        </LocationsProvider>
    )
}

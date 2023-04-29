import { useState } from 'react'
import { isEmpty } from 'lodash'
import { Wrapper } from '@googlemaps/react-wrapper'
import Image from 'next/image'
import { motion } from 'framer-motion'

import Accordion from '@/components/Accordion'
import { BetweenMap, DefaultMap, NearestMap, NearestProvider } from '@/components/routes'
import { ROUTES_TABS, ROUTES_TABS_IDS } from '@/components/routes/constants'
import { smoothTransition } from '@/animations'
import Layout from '@/components/Layout'

const options = {
    libraries: ['places'],
    apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
}

export default function Routes() {
    const [activeTab, setActiveTab] = useState('')

    return (
        <Layout>
            <NearestProvider>
                <div className="w-full md:w-2/3 h-[70vh] md:h-auto mr-4 relative">
                    <Wrapper {...options}>
                        <motion.div
                            key="default"
                            className="w-full h-full"
                            initial={{ opacity: 0, height: '100%' }}
                            animate={{
                                opacity: isEmpty(activeTab) ? 1 : 0.7,
                                height: isEmpty(activeTab) ? '100%' : 0,
                            }}
                            transition={{ ...smoothTransition, delay: 0.1 }}
                        >
                            <DefaultMap />
                        </motion.div>
                        <motion.div
                            key={ROUTES_TABS_IDS.NEAREST}
                            className="w-full h-full flex"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                                opacity: activeTab === ROUTES_TABS_IDS.NEAREST ? 1 : 0.8,
                                height: activeTab === ROUTES_TABS_IDS.NEAREST ? '100%' : 0,
                            }}
                            transition={{ ...smoothTransition, delay: 0.1 }}
                        >
                            <NearestMap />
                        </motion.div>
                        <motion.div
                            key={ROUTES_TABS_IDS.BETWEEN}
                            className="w-full h-full"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                                opacity: activeTab === ROUTES_TABS_IDS.BETWEEN ? 1 : 0.7,
                                height: activeTab === ROUTES_TABS_IDS.BETWEEN ? '100%' : 0,
                            }}
                            transition={{ ...smoothTransition, delay: 0.1 }}
                        >
                            <BetweenMap />
                        </motion.div>
                    </Wrapper>
                </div>
                <div className="w-full md:w-1/3 h-auto pb-8">
                    <motion.div
                        className="px-8 pt-16 pb-6 flex items-center bg-primary-light relative"
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 250,
                            damping: 18,
                        }}
                    >
                        <Image
                            src="/way-finder-primary-dark.png"
                            alt="way-finder"
                            width={47.3}
                            height={36}
                            priority
                            className="absolute top-0 left-7 w-auto h-auto opacity-50"
                        />
                        <h3 className="font-black text-primary-dark text-4xl">Routes</h3>
                    </motion.div>

                    {ROUTES_TABS.map(({ Component, title, id }, i) => (
                        <div key={i} className="overflow-hidden text-primary-dark">
                            <Accordion tabId={id} expanded={activeTab} setExpanded={setActiveTab} title={title} bgColor="#023047">
                                <Component />
                            </Accordion>
                        </div>
                    ))}
                </div>
            </NearestProvider>
        </Layout>
    )
}

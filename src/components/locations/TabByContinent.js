import { markersByContinent } from '@/data'
import { groupBy, isEmpty, keys, map } from 'lodash'
import { useState } from 'react'
import Accordion from '@/components/Accordion'
import { CloseIcon, FocusIcon } from '@/components/icons'
import { smoothTransition } from '@/animations'
import { AnimatePresence, motion } from 'framer-motion'

const CountryAccordion = ({ tabId, expanded, setExpanded, title, bgColor, children }) => {
    const isOpen = tabId === expanded
    return (
        <>
            <motion.div
                initial={{ height: 'auto', backgroundColor: '#fff', color: '#023047' }}
                animate={{
                    height: isOpen || isEmpty(expanded) ? 'auto' : 0,
                    backgroundColor: isOpen ? bgColor : '#f1f5f9',
                    color: isOpen ? '#f1f5f9' : '#023047',
                }}
                transition={{
                    backgroundColor: { duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] },
                    color: { duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] },
                    height: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] },
                }}
                className={`${isOpen && 'text-primary-light'}`}
            >
                <header
                    className="text-base font-medium py-4 border-inherit cursor-pointer flex justify-between items-center"
                    onClick={() => setExpanded(isOpen ? '' : tabId)}
                >
                    {title}
                    {(!isOpen || isEmpty(expanded)) && (
                        <FocusIcon
                            key="focus"
                            className="w-6 h-6 shrink-0"
                            initial={{ scale: 0.3, opacity: 0.5 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={smoothTransition}
                        />
                    )}
                    {isOpen && (
                        <CloseIcon
                            key="close"
                            className="w-6 h-6 shrink-0"
                            initial={{ scale: 0.3, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={smoothTransition}
                        />
                    )}
                </header>
            </motion.div>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        key="content"
                        className="bg-slate-100 border-b border-slate-100 text-sm overflow-hidden"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: 495 },
                            collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={smoothTransition}
                    >
                        {children}
                    </motion.section>
                )}
            </AnimatePresence>
        </>
    )
}

export const TabByContinent = ({ continent }) => {
    const [activeTab, setActiveTab] = useState('')
    const officesByCountry = groupBy(markersByContinent[continent], ({ country }) => country)
    const countries = keys(officesByCountry)
    console.log(officesByCountry, countries)
    return (
        <div className="text-slate-600 text-sm flex flex-col h-full">
            {/*<div className="self-end">{countries.length} countries</div>*/}
            {map(countries, (country, i) => (
                <div key={i} className="overflow-hidden text-primary-dark">
                    <Accordion tabId={country} expanded={activeTab} setExpanded={setActiveTab} title={country} bgColor="#cbd5e1">
                        <div>{country}</div>
                        <div>{officesByCountry[country].length} offices</div>
                    </Accordion>
                </div>
            ))}
        </div>
    )
}

import { AnimatePresence, motion } from 'framer-motion'
import { smoothTransition } from '@/animations'
import { CaretDownIcon } from '@/components/icons'

export default function Accordion({ tabId, expanded, setExpanded, title, children }) {
    const isOpen = tabId === expanded

    return (
        <>
            <motion.header
                className="text-lg font-medium py-6 border-inherit cursor-pointer flex justify-between items-center"
                onClick={() => setExpanded(isOpen ? '' : tabId)}
            >
                {title}
                <CaretDownIcon
                    className="w-6 h-6 shrink-0"
                    initial={false}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: 'linear' }}
                />
            </motion.header>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: 'auto' },
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

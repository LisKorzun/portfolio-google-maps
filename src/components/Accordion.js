import { AnimatePresence, motion } from 'framer-motion'
import { smoothTransition } from '@/animations'
import { CloseIcon, FocusIcon } from '@/components/icons'
import { isEmpty } from 'lodash'

export default function Accordion({ tabId, expanded, setExpanded, title, bgColor, children }) {
    const isOpen = tabId === expanded

    return (
        <>
            <motion.div
                initial={{ height: 'auto', backgroundColor: '#fff', color: '#023047' }}
                animate={{
                    height: isOpen || isEmpty(expanded) ? 'auto' : 0,
                    backgroundColor: isOpen ? bgColor : '#fff',
                    color: isOpen ? '#fff' : '#023047',
                }}
                transition={{
                    backgroundColor: { duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] },
                    color: { duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] },
                    height: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] },
                }}
                className={`${isOpen && 'text-primary-light'}`}
            >
                <header
                    className="text-lg font-medium px-8  py-6 border-inherit cursor-pointer flex justify-between items-center"
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

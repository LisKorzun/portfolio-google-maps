import isEmpty from 'lodash/isEmpty'
import { AnimatePresence, motion } from 'framer-motion'

import { smoothTransition } from '@/animations'
import { ACCORDION_HEADER_HEIGHT, CONTENT_HEADING_HEIGHT, MIN_CONTENT_HEIGHT } from '@/constants'
import { CloseIcon, FocusIcon } from '@/components/icons'
import { useWindowSize } from '@/hooks/useWindowSize'

const DEFAULT_BG = '#ffffff'
const DEFAULT_COLOR = '#023047'

export default function Accordion({
    tabId,
    expanded,
    setExpanded,
    title,
    subtitle,
    children,
    onChange,
    expandedBgColor = '#209EBC',
    expandedTextColor = '#fff',
    level = 1,
}) {
    const isOpen = tabId === expanded
    const { width, height } = useWindowSize()
    const sectionHeight = height - 300 < MIN_CONTENT_HEIGHT ? MIN_CONTENT_HEIGHT : height - 300
    const detailsHeight = width < 865 ? 'auto' : sectionHeight - CONTENT_HEADING_HEIGHT - level * ACCORDION_HEADER_HEIGHT

    return (
        <>
            <motion.div
                initial={{
                    height: ACCORDION_HEADER_HEIGHT,
                    backgroundColor: DEFAULT_BG,
                    color: DEFAULT_COLOR,
                    opacity: 1,
                }}
                animate={{
                    height: isOpen || isEmpty(expanded) ? ACCORDION_HEADER_HEIGHT : 0,
                    backgroundColor: isOpen ? expandedBgColor : DEFAULT_BG,
                    color: isOpen ? expandedTextColor : DEFAULT_COLOR,
                    opacity: isOpen || isEmpty(expanded) ? 1 : 0,
                }}
                transition={{
                    backgroundColor: { duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] },
                    color: { duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] },
                    height: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] },
                }}
                className="overflow-hidden"
            >
                <header
                    className={`text-lg font-medium pr-8 pl-8 py-1 h-full border-inherit cursor-pointer flex justify-between items-center`}
                    onClick={() => {
                        setExpanded && setExpanded(isOpen ? '' : tabId)
                        onChange && onChange(isOpen ? '' : tabId)
                    }}
                >
                    <div className="leading-snug">
                        <div>{title}</div>
                        {subtitle && <div className="text-xs font-light"> {subtitle}</div>}
                    </div>
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
                        className="text-sm overflow-auto"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: {
                                opacity: 1,
                                height: detailsHeight,
                                transitionEnd: {
                                    overflow: 'auto',
                                },
                            },
                            collapsed: { opacity: 0, height: 0, overflow: 'hidden' },
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

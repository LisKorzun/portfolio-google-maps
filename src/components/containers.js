import { motion } from 'framer-motion'
import { smoothTransition } from '@/animations'

export const MainContentContainer = ({ children }) => (
    <motion.main
        className="w-full mx-auto flex flex-col-reverse md:flex-row md:container"
        initial={{ opacity: 0, x: 400 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -400 }}
        transition={{ type: 'spring', stiffness: 280, damping: 20 }}
    >
        {children}
    </motion.main>
)

export const MapContainer = ({ children }) => <div className="w-full md:w-2/3 h-[560px] md:h-auto mr-4">{children}</div>

export const MapAnimatedContainer = ({ id, isActive, children, initialHeight = 0 }) => (
    <motion.div
        key={id}
        className="w-full h-full flex"
        initial={{ opacity: 0, height: initialHeight }}
        animate={{ opacity: isActive ? 1 : 0, height: isActive ? '100%' : 0 }}
        transition={{ ...smoothTransition, delay: 0.1 }}
    >
        {children}
    </motion.div>
)

export const SidebarContainer = ({ children }) => <div className="w-full md:w-1/3 h-fit md:h-auto md:h-full pb-8">{children}</div>

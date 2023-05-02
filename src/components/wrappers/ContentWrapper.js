import { motion } from 'framer-motion'

export const ContentWrapper = ({ children }) => (
    <motion.main
        className="w-full mx-auto flex flex-col-reverse md:flex-row md:container"
        initial={{ opacity: 0, x: 400 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -400 }}
        transition={{
            type: 'spring',
            stiffness: 280,
            damping: 20,
        }}
    >
        {children}
    </motion.main>
)

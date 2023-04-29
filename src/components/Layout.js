import { motion } from 'framer-motion'

export default function Layout({ children }) {
    return (
        <motion.main
            className="w-full mx-auto flex flex-col-reverse md:flex-row md:container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                type: 'spring',
                stiffness: 250,
                damping: 25,
            }}
        >
            {children}
        </motion.main>
    )
}

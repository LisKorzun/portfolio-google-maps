import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { LOGO_IMAGE } from '@/constants'

export default function Layout({ children }) {
    return (
        <motion.main
            className="w-full mx-auto flex flex-col-reverse md:flex-row md:container"
            // initial={{ x: 300, opacity: 0 }}
            // animate={{ x: 0, opacity: 1 }}
            // exit={{ x: -300, opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout
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

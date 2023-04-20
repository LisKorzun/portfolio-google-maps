import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { LOGO_IMAGE } from '@/constants'

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Exadel Offices</title>
            </Head>
            <div className="min-h-screen md:max-h-screen grid grid-rows-mobile lg:grid-rows-desktop">
                <nav className="w-full mx-auto px-8 py-7 flex items-center md:px-0 md:container">
                    <Link href="/">
                        <Image src={LOGO_IMAGE} alt="Exadel Logo" width={248} height={49} priority />
                        <div className="text-primary-dark font-bold text-3xl mt-0.5">Offices</div>
                    </Link>
                </nav>
                <motion.main
                    className="w-full mx-auto flex flex-col-reverse md:flex-row md:container"
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    layout
                    transition={{
                        type: 'spring',
                        stiffness: 250,
                        damping: 25,
                    }}
                >
                    {children}
                </motion.main>
                <footer className="w-full mx-auto px-8 py-4 flex justify-end items-end text-primary-dark text-[10px] md:px-0 md:container">
                    Made with 💕 Google Maps
                </footer>
            </div>
        </>
    )
}

import { AnimatePresence } from 'framer-motion'
import { DM_Sans } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { LOGO_IMAGE } from '@/constants'

import '@/styles/globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700'] })

export default function App({ Component, pageProps, router }) {
    const page = router.asPath

    return (
        <>
            <style jsx global>{`
                html {
                    font-family: ${dmSans.style.fontFamily};
                }
            `}</style>
            <>
                <Head>
                    <title>Exadel Offices</title>
                </Head>
                <div className="overflow-hidden min-h-screen md:max-h-screen grid grid-rows-mobile lg:grid-rows-desktop">
                    <nav className="w-full mx-auto px-8 py-7 flex items-center md:px-0 md:container">
                        <Link href="/">
                            <Image src={LOGO_IMAGE} alt="Exadel Logo" width={248} height={49} priority />
                            <div className="text-primary-dark font-bold text-3xl mt-0.5">Offices</div>
                        </Link>
                    </nav>
                    <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
                        <Component {...pageProps} key={page} />
                    </AnimatePresence>
                    <footer className="w-full mx-auto px-8 py-4 flex justify-end items-end text-primary-dark text-[10px] md:px-0 md:container">
                        Made with 💕 Google Maps
                    </footer>
                </div>
            </>
        </>
    )
}

import { AnimatePresence } from 'framer-motion'
import { DM_Sans } from 'next/font/google'

import Layout from '@/components/Layout'

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
            <AnimatePresence mode="wait" initial={true} onExitComplete={() => window.scrollTo(0, 0)}>
                <Layout key={page}>
                    <Component {...pageProps} />
                </Layout>
            </AnimatePresence>
        </>
    )
}

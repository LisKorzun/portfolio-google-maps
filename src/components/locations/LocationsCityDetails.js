import { useState } from 'react'
import { motion } from 'framer-motion'

import { useLocationsMap } from '@/components/locations'
import { ZoomInIcon, ZoomOutIcon } from '@/components/icons'
import Image from 'next/image'
import { smoothTransition } from '@/animations'

export const LocationsCityDetails = ({ office }) => {
    const [panoramaShown, setPanoramaShown] = useState(false)
    const [zoomedIn, setZoomedIn] = useState(false)
    const { renderPanorama, zoomIn, zoomOutBack } = useLocationsMap()

    const togglePanorama = () => {
        setPanoramaShown((current) => {
            renderPanorama(office.position, !current)
            return !current
        })
    }

    const toggleZoomIn = () => {
        setZoomedIn((current) => {
            if (current) {
                zoomOutBack()
            } else {
                zoomIn(office.position, 16)
            }
            return !current
        })
    }

    return (
        <div className="p-8 flex flex-col items-center text-primary-dark">
            <Image src={office.image} alt={office.city} width={150} height={150} priority />
            <div className="text-base  font-bold my-2">
                Office in {office.city}, {office.country}
            </div>
            <div className="text-xs  mb-1">{office.address}</div>
            <div className="text-xs  mb-5">{office.phone}</div>
            <div className="flex gap-2">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    transition={smoothTransition}
                    className="text-white bg-primary-dark py-2 px-4 border-none outline-none"
                    onClick={toggleZoomIn}
                >
                    {zoomedIn ? (
                        <ZoomOutIcon className="w-6 h-6 shrink-0" key="zoom-out" />
                    ) : (
                        <ZoomInIcon className="w-6 h-6 shrink-0" key="zoom-in" />
                    )}
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    transition={smoothTransition}
                    className="text-white bg-primary-dark py-2 px-4 border-none outline-none"
                    onClick={togglePanorama}
                >
                    {panoramaShown ? 'Hide' : 'Show'} panorama
                </motion.button>
            </div>
        </div>
    )
}

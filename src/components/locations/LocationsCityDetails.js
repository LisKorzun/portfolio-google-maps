import { useEffect, useState } from 'react'
import Image from 'next/image'

import { DEFAULT_CITY_ZOOM_IN, useMapLocations } from '@/components/locations'
import { InfoIcon, PanoramaIcon, ZoomInIcon, ZoomOutIcon } from '@/components/icons'
import { MotionIconButton } from '@/components/common'

export const LocationsCityDetails = ({ office }) => {
    const [zoomedIn, setZoomedIn] = useState(false)
    const { getPanorama, focusArea, focusBack, infoShown, toggleInfo, panoramaAvailable, panoramaShown, togglePanorama } =
        useMapLocations()

    useEffect(() => {
        getPanorama(office.position, office.streetVewRadius)
    }, [getPanorama, office.position, office.streetVewRadius])

    const toggleZoom = () => {
        zoomedIn ? focusBack() : focusArea(DEFAULT_CITY_ZOOM_IN, office.position, false)
        setZoomedIn((current) => !current)
    }

    return (
        <div className="p-8 flex md:flex-col md:items-center xl:flex-row xl:items-start gap-4 text-primary-dark">
            <Image src={office.image} alt={office.city} width={160} height={160} priority className="min-w-[160px]" />
            <div className="flex flex-col justify-between md:items-center xl:items-start">
                <div>
                    <div className="text-base leading-snug font-bold">
                        Office in {office.city}, {office.country}
                    </div>

                    <div className="flex my-5 gap-2">
                        <MotionIconButton onClick={toggleZoom} activated={zoomedIn}>
                            {zoomedIn ? (
                                <ZoomOutIcon className="w-6 h-6 shrink-0" key="zoom-out" whileHover={{ scale: 1.15 }} />
                            ) : (
                                <ZoomInIcon className="w-6 h-6 shrink-0" key="zoom-in" whileHover={{ scale: 1.15 }} />
                            )}
                        </MotionIconButton>
                        <MotionIconButton onClick={togglePanorama} activated={panoramaShown} disabled={!panoramaAvailable}>
                            <PanoramaIcon className="w-6 h-6 shrink-0 " key="panorama" whileHover={{ scale: 1.15 }} />
                        </MotionIconButton>
                        <MotionIconButton onClick={() => toggleInfo(office)} activated={infoShown}>
                            <InfoIcon className="w-6 h-6 shrink-0 " key="info" whileHover={{ scale: 1.15 }} />
                        </MotionIconButton>
                    </div>
                </div>
                <div className="flex flex-col justify-between md:items-center md:text-center xl:items-start xl:text-start">
                    <div className="text-xs  mb-1">{office.address}</div>
                    <div className="text-xs">{office.phone}</div>
                </div>
            </div>
        </div>
    )
}

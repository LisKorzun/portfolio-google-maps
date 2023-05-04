import { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'

import { templateComplexInfo } from '@/components/templates'
import { LOGO_IMAGE as logo } from '@/constants'

export const useMapInfoWindow = (map) => {
    const [info, setInfo] = useState()
    const [infoShown, setInfoShown] = useState(false)

    const initInfoWindow = (map) => {
        const infoInstance = new window.google.maps.InfoWindow()
        setInfo(infoInstance)

        infoInstance.addListener('closeclick', () => {
            setInfoShown(false)
        })
        infoInstance.addListener('visible', () => {
            setInfoShown(true)
        })
        map.addListener('zoom_changed', () => {
            infoInstance.close()
            setInfoShown(false)
        })
    }
    useEffect(() => {
        if (!isEmpty(map)) {
            initInfoWindow(map)
        }
    }, [map])

    const showInfo = (data) => {
        const { position, ...rest } = data

        info.setOptions({ pixelOffset: new window.google.maps.Size(0, -60) })
        info.setContent(templateComplexInfo({ ...rest, logo }))
        info.setPosition(position)
        info.open(map)

        setInfoShown(true)
    }

    const closeInfo = () => {
        info.close()
        setInfoShown(false)
    }

    const toggleInfo = (data) => {
        infoShown ? closeInfo() : showInfo(data)
    }

    return { showInfo, toggleInfo, infoShown }
}

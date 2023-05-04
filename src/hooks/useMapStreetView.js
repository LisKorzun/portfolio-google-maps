import { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'

import { PANORAMA_VIEW_OPTIONS } from '@/components/locations'

export const useMapStreetView = (map) => {
    const [streetViewService, setStreetViewService] = useState()
    const [panorama, setPanorama] = useState()
    const [panoramaShown, setPanoramaShown] = useState(false)
    const [panoramaAvailable, setPanoramaAvailable] = useState(false)

    const initStreetView = (map) => {
        const panoramaInstance = map.getStreetView()
        panoramaInstance.setOptions(PANORAMA_VIEW_OPTIONS)
        setPanorama(panoramaInstance)

        setStreetViewService(new window.google.maps.StreetViewService())
    }

    useEffect(() => {
        if (!isEmpty(map)) {
            initStreetView(map)
        }
    }, [map])

    const getPanorama = (position) => {
        const options = {
            location: position,
            preference: window.google.maps.StreetViewPreference.BEST,
            radius: 80,
        }
        setPanoramaAvailable(false)
        streetViewService
            .getPanorama(options, (data, status) => {
                if (status === 'OK') {
                    panorama.setPano(data.location.pano)
                    panorama.setPov({ heading: 270, pitch: 0 })
                    setPanoramaAvailable(true)
                }
            })
            .catch(() => {})
    }

    const togglePanorama = () => {
        setPanoramaShown((current) => {
            panorama.setVisible(!current)
            return !current
        })
    }

    const closePanorama = () => {
        panorama.setVisible(false)
        setPanoramaShown(false)
    }

    return { getPanorama, togglePanorama, closePanorama, panoramaAvailable, panoramaShown }
}
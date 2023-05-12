import { useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import { MARKER_IMAGE } from '@/constants'

export const useMapMarkers = () => {
    const [markers, setMarkers] = useState([])

    const renderMarkers = (map, offices, onMarkerClick, animate = false) => {
        if (!map) return

        if (!isEmpty(offices)) {
            const initialBounds = new google.maps.LatLngBounds()
            const mapMarkers = offices.map((office, i) => {
                const marker = new google.maps.Marker({
                    position: office.position,
                    icon: MARKER_IMAGE,
                    animation: animate ? google.maps.Animation.BOUNCE : undefined,
                })
                initialBounds.extend(office.position)
                // Add Info Window to them on marker click
                marker.addListener('click', () => {
                    onMarkerClick(office)
                })
                if (animate) {
                    // Add markers to the map sequentially
                    window.setTimeout(() => {
                        marker.setMap(map)
                        window.setTimeout(() => {
                            marker.setAnimation(null)
                        }, 600)
                    }, i * 200 + 200)
                } else {
                    marker.setMap(map)
                }
                return marker
            })
            setMarkers(mapMarkers)

            return initialBounds.getCenter()
        }
    }

    const cleanMarkers = () => {
        markers.forEach((marker) => marker.setMap(null))
    }

    return { renderMarkers, cleanMarkers }
}

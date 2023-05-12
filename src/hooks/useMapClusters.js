import { useState } from 'react'
import mapValues from 'lodash/mapValues'
import { MarkerClusterer, SuperClusterAlgorithm } from '@googlemaps/markerclusterer'

import { MARKER_IMAGE } from '@/constants'

export const useMapClusters = () => {
    const [clusters, setClusters] = useState([])

    const renderClusters = (map, officesByContinent, onMarkerClick) => {
        if (!map) return

        const initialBounds = new google.maps.LatLngBounds()
        const clusters = mapValues(officesByContinent, (offices) => {
            // Create markers for every continent cluster
            const markers = offices.map((office) => {
                const marker = new window.google.maps.Marker({
                    position: office.position,
                    icon: MARKER_IMAGE,
                })
                initialBounds.extend(office.position)
                if (typeof onMarkerClick === 'function') {
                    marker.addListener('click', () => {
                        onMarkerClick(office)
                    })
                }
                return marker
            })
            // Create Cluster for every continent
            return new MarkerClusterer({
                markers,
                map,
                algorithm: new SuperClusterAlgorithm({ radius: 280 }),
            })
        })
        setClusters(clusters)

        return initialBounds.getCenter()
    }

    const cleanClusters = () => {
        mapValues(clusters, (cluster) => cluster.setMap(null))
    }

    return { renderClusters, cleanClusters }
}

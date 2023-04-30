import { concat, groupBy, keys, map } from 'lodash'
import { AREAS } from '@/constants'
import { darkMapStyles } from '@/mapStyled'
import offices, { continents, officesByContinent } from '@/data'

export const DEFAULT_ZOOM = 2.25
export const DEFAULT_CENTER = { lat: 11.14695916085034, lng: -26.441557748896827 }
export const DEFAULT_MAP_OPTIONS = {
    zoom: DEFAULT_ZOOM,
    minZoom: DEFAULT_ZOOM,
    maxZoom: DEFAULT_ZOOM + 10,
    center: DEFAULT_CENTER,
    disableDefaultUI: true,
    fullscreenControl: true,
    fullscreenControlOptions: { position: 8 },
    zoomControl: true,
    zoomControlOptions: { position: 3 },
    restriction: undefined,
    styles: darkMapStyles,
}

const setZoomOptions = (zoom) => ({ zoom, minZoom: zoom - 1, maxZoom: zoom + 3 })
export const mapsOptions = {
    [AREAS.N_AMERICA]: {
        ...setZoomOptions(4),
        restriction: { latLngBounds: { north: 70, south: 5, east: -35, west: -160 } },
    },
    [AREAS.S_AMERICA]: {
        ...setZoomOptions(4),
        restriction: { latLngBounds: { north: 40, south: -55, east: 0, west: -130 } },
    },
    [AREAS.EUROPE]: {
        ...setZoomOptions(5),
        restriction: { latLngBounds: { north: 65, south: 35, east: 45, west: -10 } },
    },
    [AREAS.ASIA]: {
        ...setZoomOptions(5),
        restriction: { latLngBounds: { north: 60, south: 20, east: 100, west: 20 } },
    },
}

export const mapSettingsByArea = {
    [AREAS.N_AMERICA]: {
        zoom: 4,
        isAnimated: false,
    },
    [AREAS.S_AMERICA]: {
        zoom: 4,
        isAnimated: false,
    },
    [AREAS.EUROPE]: {
        zoom: 5,
        isAnimated: false,
    },
    [AREAS.ASIA]: {
        zoom: 6,
        isAnimated: false,
    },
    [AREAS.BRAZIL]: {
        zoom: 5,
        isAnimated: true,
    },
    [AREAS.CHILE]: {
        zoom: 6,
        isAnimated: true,
    },
    [AREAS.COLOMBIA]: {
        zoom: 6,
        isAnimated: true,
    },
    [AREAS.USA]: {
        zoom: 5,
        isAnimated: true,
    },
    [AREAS.CANADA]: {
        zoom: 6,
        isAnimated: true,
    },
    [AREAS.POLAND]: {
        zoom: 6.5,
        isAnimated: true,
    },
    [AREAS.BULGARIA]: {
        zoom: 7,
        isAnimated: true,
    },
    [AREAS.GERMANY]: {
        zoom: 7,
        isAnimated: true,
    },
    [AREAS.HUNGARY]: {
        zoom: 7,
        isAnimated: true,
    },
    [AREAS.SWITZERLAND]: {
        zoom: 7.5,
        isAnimated: true,
    },
    [AREAS.LITHUANIA]: {
        zoom: 7,
        isAnimated: true,
    },
    [AREAS.BELARUS]: {
        zoom: 6.5,
        isAnimated: true,
    },
    [AREAS.UKRAINE]: {
        zoom: 6,
        isAnimated: true,
    },
}

export const continentTabs = concat(
    [
        {
            id: AREAS.CONTINENT,
            title: `Explore ${AREAS.CONTINENT}`,
            subtitle: `${offices.length} offices on ${continents.length} continents`,
        },
    ],
    map(continents, (continent) => {
        const officesCount = officesByContinent[continent].length
        const officesLabel = officesCount > 1 ? 'offices' : 'office'
        const countriesCount = keys(groupBy(officesByContinent[continent], ({ country }) => country)).length
        const countriesLabel = countriesCount > 1 ? 'countries' : 'country'

        return {
            id: continent,
            title: `Explore ${continent}`,
            subtitle: `${officesCount} ${officesLabel} in ${countriesCount} ${countriesLabel}`,
        }
    })
)

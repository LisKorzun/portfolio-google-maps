import { BetweenTab } from '@/components/routes'
import { TabByContinent } from '@/components/locations'
import { CONTINENTS } from '@/constants'
import { darkMapStyles } from '@/mapStyled'

export const LOCATIONS_TABS_IDS = {
    CONTINENTS: 'continents',
    NORTH_AMERICA: 'north-america',
    SOUTH_AMERICA: 'south-america',
    EUROPE: 'europe',
    ASIA: 'asia',
}

export const LOCATIONS_TABS = [
    {
        id: LOCATIONS_TABS_IDS.CONTINENTS,
        title: 'Explore Continents',
        Component: BetweenTab,
    },
    {
        id: LOCATIONS_TABS_IDS.NORTH_AMERICA,
        continent: CONTINENTS.N_AMERICA,
        title: 'Explore North America',
        Component: (props) => <TabByContinent {...props} />,
    },
    {
        id: LOCATIONS_TABS_IDS.SOUTH_AMERICA,
        continent: CONTINENTS.S_AMERICA,
        title: 'Explore South America',
        Component: (props) => <TabByContinent {...props} />,
    },
    {
        id: LOCATIONS_TABS_IDS.EUROPE,
        continent: CONTINENTS.EUROPE,
        title: 'Explore Europe',
        Component: (props) => <TabByContinent {...props} />,
    },
    {
        id: LOCATIONS_TABS_IDS.ASIA,
        continent: CONTINENTS.ASIA,
        title: 'Explore Asia',
        Component: (props) => <TabByContinent {...props} />,
    },
]

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
    [CONTINENTS.N_AMERICA]: {
        ...setZoomOptions(4),
        restriction: { latLngBounds: { north: 70, south: 5, east: -35, west: -160 } },
    },
    [CONTINENTS.S_AMERICA]: {
        ...setZoomOptions(4),
        restriction: { latLngBounds: { north: 40, south: -55, east: 0, west: -130 } },
    },
    [CONTINENTS.EUROPE]: {
        ...setZoomOptions(5),
        restriction: { latLngBounds: { north: 65, south: 35, east: 45, west: -10 } },
    },
    [CONTINENTS.ASIA]: {
        ...setZoomOptions(5),
        restriction: { latLngBounds: { north: 60, south: 20, east: 100, west: 20 } },
    },
}

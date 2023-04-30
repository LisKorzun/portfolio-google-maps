import { keys } from 'lodash'
import { BetweenTab } from '@/components/routes'
import { TabByContinent } from '@/components/locations'
import { AREAS } from '@/constants'
import { darkMapStyles } from '@/mapStyled'
import offices, {
    officesByContinent,
    officesInSAmerica,
    officesInNAmerica,
    countriesInNAmerica,
    countriesInSAmerica,
    officesInEurope,
    countriesInEurope,
    officesInAsia,
    countriesInAsia,
} from '@/data'

export const LOCATIONS_TABS_IDS = {
    CONTINENTS: 'continents',
    NORTH_AMERICA: 'north-america',
    SOUTH_AMERICA: 'south-america',
    EUROPE: 'europe',
    ASIA: 'asia',
}

export const LOCATIONS_TABS = [
    {
        id: AREAS.CONTINENT,
        title: 'Explore Continents',
        subtitle: `${offices.length} offices on ${keys(officesByContinent).length} continents`,
        Component: BetweenTab,
    },
    {
        id: AREAS.N_AMERICA,
        continent: AREAS.N_AMERICA,
        title: 'Explore North America',
        subtitle: `${officesInNAmerica.length} offices in ${countriesInNAmerica.length} countries`,
        Component: (props) => <TabByContinent {...props} />,
    },
    {
        id: AREAS.S_AMERICA,
        continent: AREAS.S_AMERICA,
        title: 'Explore South America',
        subtitle: `${officesInSAmerica.length} offices in ${countriesInSAmerica.length} countries`,
        Component: (props) => <TabByContinent {...props} />,
    },
    {
        id: AREAS.EUROPE,
        continent: AREAS.EUROPE,
        title: 'Explore Europe',
        subtitle: `${officesInEurope.length} offices in ${countriesInEurope.length} countries`,
        Component: (props) => <TabByContinent {...props} />,
    },
    {
        id: AREAS.ASIA,
        continent: AREAS.ASIA,
        title: 'Explore Asia',
        subtitle: `${officesInAsia.length} offices in ${countriesInAsia.length} countries`,
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
export const zoomOptions = {
    [AREAS.N_AMERICA]: 4,
    [AREAS.S_AMERICA]: 4,
    [AREAS.EUROPE]: 5,
    [AREAS.ASIA]: 5,
    [AREAS.CHILE]: 6,
    [AREAS.COLOMBIA]: 6,
    [AREAS.CANADA]: 6,
}

export const isAnimated = {
    [AREAS.CANADA]: true,
    [AREAS.USA]: true,
    [AREAS.BRAZIL]: true,
    [AREAS.CHILE]: true,
    [AREAS.COLOMBIA]: true,
}

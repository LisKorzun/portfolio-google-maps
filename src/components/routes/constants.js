import { NearestRouteContent } from '@/components/routes/nearest'
import { BicycleIcon, BusIcon, CarIcon, PersonWalkingIcon } from '@/components/icons'

export const ROUTES_TABS_IDS = {
    NEAREST: 'nearest',
}

export const ROUTES_TABS = [
    {
        id: ROUTES_TABS_IDS.NEAREST,
        title: 'Route to the nearest office',
        Component: NearestRouteContent,
    },
]

export const TRAVEL_MODES = {
    DRIVING: 'DRIVING',
    WALKING: 'WALKING',
    TRANSIT: 'TRANSIT',
    BICYCLING: 'BICYCLING',
}

export const TRAVEL_MODES_ICONS = {
    [TRAVEL_MODES.DRIVING]: CarIcon,
    [TRAVEL_MODES.WALKING]: PersonWalkingIcon,
    [TRAVEL_MODES.TRANSIT]: BusIcon,
    [TRAVEL_MODES.BICYCLING]: BicycleIcon,
}

export const MODES = Object.values(TRAVEL_MODES)

import { NearestTab } from '@/components/routes/NearestTab'
import { BetweenTab } from '@/components/routes/BetweenTab'

export const ROUTES_TABS_IDS = {
    NEAREST: 'nearest',
    BETWEEN: 'between',
}

export const ROUTES_TABS = [
    {
        id: ROUTES_TABS_IDS.NEAREST,
        title: 'Route to the nearest office',
        Component: NearestTab,
    },
    {
        id: ROUTES_TABS_IDS.BETWEEN,
        title: 'Routes between offices',
        Component: BetweenTab,
    },
]

export const TRAVEL_MODES = {
    DRIVING: 'DRIVING',
    WALKING: 'WALKING',
    TRANSIT: 'TRANSIT',
    BICYCLING: 'BICYCLING',
}

export const MODES = Object.values(TRAVEL_MODES)

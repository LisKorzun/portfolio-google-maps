import { BetweenTab } from '@/components/routes'
import { ROUTES_TABS_IDS } from '@/components/routes/constants'

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
        title: 'Explore continents',
        Component: BetweenTab,
    },
    {
        id: LOCATIONS_TABS_IDS.NORTH_AMERICA,
        title: 'Explore North America',
        Component: BetweenTab,
    },
    {
        id: LOCATIONS_TABS_IDS.SOUTH_AMERICA,
        title: 'Explore South America',
        Component: BetweenTab,
    },
    {
        id: LOCATIONS_TABS_IDS.EUROPE,
        title: 'Explore Europe',
        Component: BetweenTab,
    },
    {
        id: LOCATIONS_TABS_IDS.ASIA,
        title: 'Explore Asia',
        Component: BetweenTab,
    },
]

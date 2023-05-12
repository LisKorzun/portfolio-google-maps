import { DEFAULT_CONTINENT_ZOOM, DEFAULT_ZOOM } from '@/components/locations/constants'
import { AREAS } from '@/constants'
import groupBy from 'lodash/groupBy'
import keys from 'lodash/keys'
import map from 'lodash/map'

export const getZoomByArea = (area, defaultZoom = DEFAULT_ZOOM) => {
    let zoom = defaultZoom
    switch (area) {
        case AREAS.N_AMERICA:
        case AREAS.S_AMERICA:
            zoom = 4
            break
        case AREAS.EUROPE:
        case AREAS.ASIA:
        case AREAS.BRAZIL:
        case AREAS.USA:
            zoom = 5
            break
        case AREAS.CHILE:
        case AREAS.COLOMBIA:
        case AREAS.CANADA:
        case AREAS.UKRAINE:
            zoom = 6
            break
        case AREAS.POLAND:
        case AREAS.BELARUS:
            zoom = 6.5
            break
        case AREAS.BULGARIA:
        case AREAS.GERMANY:
        case AREAS.HUNGARY:
        case AREAS.LITHUANIA:
            zoom = 7
            break
        case AREAS.SWITZERLAND:
        case AREAS.GEORGIA:
            zoom = 7.5
            break
    }

    return zoom
}

export const generateContinentsTabs = (officesByContinent) =>
    map(officesByContinent, (offices, continent) => {
        const officesCount = offices.length
        const officesLabel = officesCount > 1 ? 'offices' : 'office'
        const countries = keys(groupBy(offices, ({ country }) => country))
        const countriesLabel = countries.length > 1 ? 'countries' : 'country'

        return {
            offices,
            countries,
            id: continent,
            title: `Explore ${continent}`,
            zoom: getZoomByArea(continent, DEFAULT_CONTINENT_ZOOM),
            subtitle: `${officesCount} ${officesLabel} in ${countries.length} ${countriesLabel}`,
        }
    })

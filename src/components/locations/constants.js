import { darkMapStyles } from '@/mapStyled'

export const DEFAULT_ZOOM = 2.25
export const DEFAULT_CONTINENT_ZOOM = 4
export const DEFAULT_COUNTRY_ZOOM = 6
export const DEFAULT_CITY_ZOOM = 12

export const DEFAULT_CENTER = { lat: 11.14695916085034, lng: -26.441557748896827 }
export const DEFAULT_MAP_OPTIONS = {
    zoom: DEFAULT_ZOOM,
    minZoom: DEFAULT_ZOOM,
    center: DEFAULT_CENTER,
    disableDefaultUI: true,
    fullscreenControl: true,
    fullscreenControlOptions: { position: 8 },
    zoomControl: true,
    zoomControlOptions: { position: 3 },
    restriction: undefined,
    styles: darkMapStyles,
}

export const PANORAMA_OPTIONS = {
    addressControl: false,
    zoomControlOptions: { position: 3 },
    enableCloseButton: false,
}

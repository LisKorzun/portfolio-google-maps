import { skyMapStyles } from '@/mapStyled'

export const DEFAULT_MAP_OPTIONS = {
    center: { lat: 19.931636041579534, lng: 3.7955652719844224 },
    zoom: 2.4,
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: { position: 3 },
    styles: skyMapStyles,
}

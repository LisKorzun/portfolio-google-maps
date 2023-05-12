import isEmpty from 'lodash/isEmpty'
import { ROUTES_TABS_IDS } from '@/components/routes/constants'
import { MapAnimatedContainer } from '@/components/containers'
import { NearestRouteMap } from '@/components/routes/nearest'
import { RoutesDefaultMap } from '@/components/routes/RoutesDefaultMap'

export const RoutesMaps = ({ activeTab }) => {
    return (
        <>
            <MapAnimatedContainer id="default" isActive={isEmpty(activeTab)} initialHeight="100%">
                <RoutesDefaultMap />
            </MapAnimatedContainer>
            <MapAnimatedContainer id={ROUTES_TABS_IDS.NEAREST} isActive={activeTab === ROUTES_TABS_IDS.NEAREST}>
                <NearestRouteMap />
            </MapAnimatedContainer>
        </>
    )
}

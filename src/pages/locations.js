import { LocationsContinents, LocationsMap, MapLocationsProvider } from '@/components/locations'
import { MainContentContainer, MapContainer, SidebarContainer } from '@/components/containers'
import { MapLoadWrapper } from '@/components/wrappers'

import offices from '@/data'

export default function Locations() {
    return (
        <MainContentContainer>
            <MapLocationsProvider>
                <MapContainer>
                    <MapLoadWrapper>
                        <LocationsMap offices={offices} />
                    </MapLoadWrapper>
                </MapContainer>
                <SidebarContainer>
                    <LocationsContinents offices={offices} />
                </SidebarContainer>
            </MapLocationsProvider>
        </MainContentContainer>
    )
}

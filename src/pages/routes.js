import { useState } from 'react'

import { MapLoadWrapper } from '@/components/wrappers'
import { RoutesMaps, RoutesSidebar } from '@/components/routes'
import { MainContentContainer, MapContainer, SidebarContainer } from '@/components/containers'
import { MapNearestRouteProvider } from '@/components/routes/nearest'

export default function Routes() {
    const [activeTab, setActiveTab] = useState('')

    return (
        <MainContentContainer>
            <MapNearestRouteProvider>
                <MapContainer>
                    <MapLoadWrapper>
                        <RoutesMaps activeTab={activeTab} />
                    </MapLoadWrapper>
                </MapContainer>
                <SidebarContainer>
                    <RoutesSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                </SidebarContainer>
            </MapNearestRouteProvider>
        </MainContentContainer>
    )
}

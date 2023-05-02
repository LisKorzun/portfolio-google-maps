import { LocationsContinents, LocationsMap, LocationsProvider } from '@/components/locations'
import { ContentWrapper, MapLoadWrapper } from '@/components/wrappers'
import offices from '@/data'

export default function Locations() {
    return (
        <ContentWrapper>
            <LocationsProvider>
                <div className="w-full md:w-2/3 h-[70vh] md:h-auto mr-4">
                    <MapLoadWrapper>
                        <LocationsMap offices={offices} />
                    </MapLoadWrapper>
                </div>
                <div className="w-full md:w-1/3 h-auto md:h-full pb-8">
                    <LocationsContinents offices={offices} />
                </div>
            </LocationsProvider>
        </ContentWrapper>
    )
}

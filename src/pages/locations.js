import { LocationsContinents, LocationsMap, MapLocationsProvider } from '@/components/locations'
import { ContentWrapper, MapLoadWrapper } from '@/components/wrappers'
import offices from '@/data'

export default function Locations() {
    return (
        <ContentWrapper>
            <MapLocationsProvider>
                <div className={`w-full md:w-2/3 h-[560px] md:h-auto mr-4`}>
                    <MapLoadWrapper>
                        <LocationsMap offices={offices} />
                    </MapLoadWrapper>
                </div>
                <div className={`w-full md:w-1/3 h-fit md:h-auto md:h-full pb-8`}>
                    <LocationsContinents offices={offices} />
                </div>
            </MapLocationsProvider>
        </ContentWrapper>
    )
}

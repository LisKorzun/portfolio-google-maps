import { Wrapper } from '@googlemaps/react-wrapper'

const options = {
    libraries: ['places'],
    apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
}

export const MapLoadWrapper = ({ children }) => (
    <Wrapper {...options} className="w-full h-full">
        {children}
    </Wrapper>
)

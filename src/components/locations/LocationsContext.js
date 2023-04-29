import { createContext, useContext, useState } from 'react'

export const LocationsContext = createContext({})

export const useLocationsMap = () => useContext(LocationsContext)

export const LocationsProvider = ({ children }) => {
    const [map, setMap] = useState()

    const providerState = { map, setMap }

    return <LocationsContext.Provider value={providerState}>{children}</LocationsContext.Provider>
}

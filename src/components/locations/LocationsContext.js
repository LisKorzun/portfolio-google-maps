import { createContext, useContext } from 'react'

export const LocationsContext = createContext({})

export const useLocationsContext = () => useContext(LocationsContext)

export const LocationsProvider = ({ children }) => {
    const providerState = {}

    return <LocationsContext.Provider value={providerState}>{children}</LocationsContext.Provider>
}

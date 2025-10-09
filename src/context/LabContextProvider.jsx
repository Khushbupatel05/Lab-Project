import { createContext } from "react"

export const LabContext = createContext();

const LabContextProvider = ({children}) => {
    const value = {}
  return (
    <LabContext.Provider value={value}>
      {children}
    </LabContext.Provider>
  )
}

export default LabContextProvider
import { createContext } from "react"

export const LanContext = createContext();

const LabContextProvider = ({children}) => {
    const value = {}
  return (
    <LabContextProvider value={value}>
      {children}
    </LabContextProvider>
  )
}

export default LabContextProvider
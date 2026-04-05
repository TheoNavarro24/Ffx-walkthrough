import { createContext, useContext, useState } from 'react'

const TocContext = createContext({ sections: [], activeId: null, setSections: () => {}, setActiveId: () => {} })

export function TocProvider({ children }) {
  const [sections, setSections] = useState([])
  const [activeId, setActiveId] = useState(null)
  return (
    <TocContext.Provider value={{ sections, activeId, setSections, setActiveId }}>
      {children}
    </TocContext.Provider>
  )
}

export function useToc() {
  return useContext(TocContext)
}

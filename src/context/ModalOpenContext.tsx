import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

type ModalOpenContextValue = {
  isModalOpen: boolean
  setModalOpen: (open: boolean) => void
}

const ModalOpenContext = createContext<ModalOpenContextValue | null>(null)

export function ModalOpenProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const setModalOpen = useCallback((open: boolean) => setIsModalOpen(open), [])

  const value = useMemo(
    () => ({ isModalOpen, setModalOpen }),
    [isModalOpen, setModalOpen],
  )

  return (
    <ModalOpenContext.Provider value={value}>{children}</ModalOpenContext.Provider>
  )
}

export function useModalOpen() {
  const context = useContext(ModalOpenContext)
  if (!context) {
    throw new Error("useModalOpen debe usarse dentro de ModalOpenProvider")
  }
  return context
}

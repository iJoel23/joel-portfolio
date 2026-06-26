import { useCallback, useMemo, useState, type ReactNode } from "react"
import { ModalOpenContext } from "./modalOpenContextStore"

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
